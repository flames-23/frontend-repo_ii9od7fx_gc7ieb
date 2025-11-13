import { useEffect, useMemo, useState } from 'react'
import Header from './components/Header'
import ProductCard from './components/ProductCard'

const CATEGORIES = [
  { key: 'стулья', label: 'Стулья' },
  { key: 'шкафы', label: 'Шкафы' },
  { key: 'тумбы', label: 'Тумбы' },
  { key: 'столы', label: 'Столы' },
]

function App() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState('')
  const [search, setSearch] = useState('')

  const backend = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (activeCategory) params.set('category', activeCategory)
      if (search) params.set('search', search)
      const res = await fetch(`${backend}/api/products?${params.toString()}`)
      const data = await res.json()
      setProducts(data)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const t = setTimeout(() => fetchProducts(), 400)
    return () => clearTimeout(t)
  }, [activeCategory, search])

  const filtered = useMemo(() => products, [products])

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-white">
      <Header search={search} setSearch={setSearch} />

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setActiveCategory('')}
            className={`px-4 py-2 rounded-full border ${activeCategory === '' ? 'bg-rose-600 text-white border-rose-600' : 'bg-white hover:bg-gray-50 border-gray-200'}`}
          >
            Все
          </button>
          {CATEGORIES.map(c => (
            <button
              key={c.key}
              onClick={() => setActiveCategory(c.key)}
              className={`px-4 py-2 rounded-full border ${activeCategory === c.key ? 'bg-rose-600 text-white border-rose-600' : 'bg-white hover:bg-gray-50 border-gray-200'}`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center text-gray-500 py-20">Загрузка каталога...</div>
        ) : filtered.length === 0 ? (
          <div className="text-center text-gray-500 py-20">Ничего не найдено</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {filtered.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </main>

      <footer className="border-t border-gray-100 py-8 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Мебелла. Все права защищены.
      </footer>
    </div>
  )
}

export default App
