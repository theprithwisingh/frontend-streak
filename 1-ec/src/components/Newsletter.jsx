import { useNewsletterStore } from '../store/useNewsletterStore'

function Newsletter() {
  const { email, isSubmitted, setEmail, submit } = useNewsletterStore()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (email) submit()
  }

  return (
    <section className="py-20 lg:py-28 bg-surface-container-low">
      <div className="container-main">
        <div className="max-w-3xl mx-auto text-center">
          <span className="label-industrial block mb-4 text-primary">Beyond The Asphalt</span>
          <h2 className="mb-5 font-headline text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-[-0.02em] text-on-surface">
            Stay Ahead Of
            <br className="hidden sm:block" />
            The Curve.
          </h2>
          <p className="mx-auto mb-10 max-w-lg font-body text-base leading-relaxed text-on-surface-variant">
            Subscribe to receive early access to limited drops, technical whitepapers on kinetic energy, and editorial stories from the cutting edge of sport.
          </p>
          
          {isSubmitted ? (
            <div className="mx-auto max-w-md p-4 rounded-xl bg-primary-fixed text-primary font-headline font-bold">
              Thank you for subscribing to the Laboratory Digest.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-3 mx-auto max-w-md">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-5 py-3.5 rounded-xl ghost-border bg-surface-container-lowest font-body text-sm text-on-surface placeholder:text-outline focus:outline-none focus:border-primary transition-colors"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" className="inline-flex items-center justify-center shrink-0 gap-2 w-full sm:w-auto px-8 py-3.5 rounded-xl gradient-cta font-body text-sm font-semibold tracking-wide text-white hover:opacity-90 transition-opacity duration-300">
                Subscribe
              </button>
            </form>
          )}

          <p className="mt-4 font-body text-xs text-outline">Stay ahead of the curve with our weekly technical digest.</p>
        </div>
      </div>
    </section>
  )
}

export default Newsletter
