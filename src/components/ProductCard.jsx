export default function ProductCard({ product }) {
  const price = product.variants?.[0]?.price || product.base_price || 0
  const colors = (product.variants || [])
    .map(v => v.color)
    .filter((v, i, a) => v && a.indexOf(v) === i)
    .slice(0, 5)

  return (
    <div className="group rounded-xl border border-gray-200 bg-white overflow-hidden hover:shadow-md transition-shadow">
      <div className="aspect-[4/3] bg-gray-100 relative">
        {product.images?.[0] ? (
          <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full grid place-items-center text-gray-400 text-sm">Нет изображения</div>
        )}
        {colors.length > 0 && (
          <div className="absolute bottom-2 left-2 flex gap-1">
            {colors.map((c, idx) => (
              <span key={idx} title={c} className="w-4 h-4 rounded-full border border-white shadow" style={{ background: c.startsWith('#') ? c : undefined }}>
                {!c.startsWith('#') && <span className="sr-only">{c}</span>}
              </span>
            ))}
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="text-xs uppercase tracking-wide text-rose-500 font-semibold">{product.category}</div>
        <h3 className="font-semibold text-gray-900 line-clamp-1">{product.name}</h3>
        <p className="text-sm text-gray-500 line-clamp-2 mt-1">{product.description || ' '}</p>
        <div className="mt-3 font-bold">{price.toLocaleString('ru-RU')} ₽</div>
      </div>
    </div>
  )
}
