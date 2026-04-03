function EcosystemCard({ src, alt, name, price }) {
  return (
    <article className="group product-card shadow-ambient-sm hover:shadow-ambient transition-shadow duration-500">
      <div className="overflow-hidden bg-surface-container aspect-square">
        <img
          src={src}
          alt={alt}
          className="card-img"
        />
      </div>
      <div className="p-5">
        <h4 className="font-headline text-sm font-bold text-on-surface">{name}</h4>
        <p className="mt-1 font-body text-sm font-semibold text-primary">{price}</p>
      </div>
    </article>
  )
}

export default EcosystemCard
