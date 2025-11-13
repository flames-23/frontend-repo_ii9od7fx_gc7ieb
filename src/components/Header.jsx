import { ShoppingCart, Search } from 'lucide-react'

export default function Header({ search, setSearch }) {
  return (
    <header className="sticky top-0 z-10 backdrop-blur bg-white/70 border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-rose-500 to-amber-500" />
          <div>
            <h1 className="text-xl font-bold tracking-tight">Мебелла</h1>
            <p className="text-xs text-gray-500 -mt-1">Каталог мебели</p>
          </div>
        </div>
        <div className="flex-1" />
        <div className="hidden md:flex items-center gap-3">
          <div className="relative w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Поиск моделей..."
              className="w-full pl-9 pr-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-rose-400/40"
            />
          </div>
          <button className="relative p-2 rounded-lg border border-gray-200 hover:bg-gray-50">
            <ShoppingCart className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 text-[10px] bg-rose-500 text-white rounded-full px-1.5 py-0.5">0</span>
          </button>
        </div>
      </div>
    </header>
  )
}
