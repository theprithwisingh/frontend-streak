import { Link } from '@tanstack/react-router'

function ProductCard({ id, image, category, name, price, badge, badgeColor = "bg-primary text-on-primary" }) {
  return (
    <Link to="/product/$productId" params={{ productId: String(id || 1) }} className="block group product-card shadow-ambient-sm hover:shadow-ambient transition-shadow duration-500">
      <div className="relative overflow-hidden bg-surface-container aspect-[4/3]">
        <img
          src={image}
          alt={name}
          className="card-img"
        />
        {badge && (
          <span className={`absolute top-4 left-4 label-industrial ${badgeColor} px-3 py-1 rounded-full`}>
            {badge}
          </span>
        )}
      </div>
      <div className="p-6 lg:p-8">
        <span className="label-industrial block mb-2 text-outline">{category}</span>
        <h3 className="mb-1 font-headline text-xl font-bold text-on-surface">{name}</h3>
        <p className="font-body text-lg font-semibold text-primary">{price}</p>
      </div>
    </Link>
  )
}

export default ProductCard
