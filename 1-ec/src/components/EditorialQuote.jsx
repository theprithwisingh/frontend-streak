function EditorialQuote() {
  return (
    <section className="relative overflow-hidden py-24 lg:py-36 bg-inverse-surface text-inverse-on-surface">
      {/* Subtle gradient orbs */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-primary/10 blur-[120px]"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-primary-container/10 blur-[100px]"></div>

      <div className="container-main relative z-10">
        <span className="label-industrial block mb-8 text-inverse-primary">The Blueprint</span>
        <blockquote className="max-w-4xl">
          <p className="font-headline text-3xl sm:text-4xl lg:text-[3.25rem] font-bold leading-[1.15] tracking-[-0.02em]">
            &ldquo;We don&rsquo;t just build shoes; we architect
            <span className="text-inverse-primary"> ecosystems </span>
            for the human foot.&rdquo;
          </p>
        </blockquote>
        <div className="flex items-center gap-4 mt-10">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-inverse-primary/20">
            <span className="font-headline text-lg font-bold text-inverse-primary">KL</span>
          </div>
          <div>
            <p className="font-body text-sm font-semibold text-inverse-on-surface">Kai Lindhurst</p>
            <p className="font-body text-xs text-inverse-on-surface/60">Chief Design Architect, KINETIC</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default EditorialQuote
