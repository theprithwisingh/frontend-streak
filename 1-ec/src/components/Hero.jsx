import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ArrowIcon from './ui/ArrowIcon'
import { Link } from '@tanstack/react-router'
import shoe1 from '../assets/shoe1.png'
import shoe2 from '../assets/shoe2.png'
import shoe3 from '../assets/shoe3.png'
import shoe4 from '../assets/shoe4.png'

const SHOE_DATA = [
  {
    id: 1,
    src: shoe1, // Blue Nike
    weight: "205g",
    size: "9",
    energyReturn: "+24%"
  },
  {
    id: 2,
    src: shoe2, // Orange/Yellow
    weight: "198g",
    size: "9",
    energyReturn: "+22%"
  },
  {
    id: 3,
    src: shoe3, // Black Nike
    weight: "192g",
    size: "8.5",
    energyReturn: "+18%"
  },
  {
    id: 4,
    src: shoe4, // White/Red Nike
    weight: "210g",
    size: "9.5",
    energyReturn: "+26%"
  }
];

function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % SHOE_DATA.length);
    }, 5000); // cycle every 5 seconds for slow fade

    return () => clearInterval(interval);
  }, []);

  const currentShoe = SHOE_DATA[currentIndex];

  return (
    <section className="relative overflow-hidden pt-28 lg:pt-36 pb-20 lg:pb-28">
      <div className="container-main">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12 lg:gap-6">

          {/* Left — Text Content */}
          <div className="animate-fade-up max-w-xl">
            <span className="label-industrial block mb-4 text-primary">Series 01 — Performance Architecture</span>
            <h1 className="mb-6 font-headline text-5xl sm:text-6xl lg:text-[4.5rem] font-extrabold leading-[1.05] tracking-[-0.03em] text-on-surface">
              Engineered
              <br />
              <span className="bg-gradient-to-r from-primary to-primary-container bg-clip-text text-transparent">
                Depth
              </span>
              <br />
              In Every Step.
            </h1>
            <p className="mb-10 max-w-md font-body text-base lg:text-lg leading-relaxed text-on-surface-variant">
              Experience architectural depth in every step. The Series 01 combines structural precision with responsive kinetic energy return.
            </p>
            <div className="flex items-center gap-4">
              <Link to="/" className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl gradient-cta font-body text-sm font-semibold tracking-wide text-white hover:opacity-90 transition-opacity duration-300">
                Shop Performance
                <ArrowIcon />
              </Link>
              <Link to="/" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl ghost-border font-body text-sm font-semibold text-primary hover:bg-surface-container-high transition-colors duration-300">
                View All
              </Link>
            </div>

            {/* Image Indicators */}
            <div className="flex gap-2 mt-8">
              {SHOE_DATA.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${index === currentIndex ? 'w-8 bg-primary' : 'w-2 bg-on-surface-variant/30 hover:bg-on-surface-variant/60'}`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Right — Hero Shoe Image */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-lg lg:max-w-xl aspect-square">
              <div className="absolute inset-0 m-auto w-[85%] aspect-square rounded-full bg-gradient-to-br from-primary-fixed/40 to-primary-fixed-dim/20 blur-3xl"></div>

              <div className="relative z-10 w-full h-full flex items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentIndex}
                    src={currentShoe.src}
                    alt={`KINETIC Series 01 - variant ${currentIndex + 1}`}
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 1.05, y: -10 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    // mix-blend-multiply helps perfectly remove white backgrounds from these images against our off-white surface!
                    className="absolute inset-0 w-full h-full object-contain mix-blend-multiply z-10"
                  />
                </AnimatePresence>
              </div>
            </div>

            {/* Floating spec badge */}
            <div className="absolute bottom-6 left-4 lg:left-0 z-20 floating-badge shadow-ambient-sm bg-surface">
              <p className="label-industrial text-on-surface-variant">Weight</p>
              <AnimatePresence mode="wait">
                <motion.p
                  key={`weight-${currentIndex}`}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="font-headline text-xl font-bold text-on-surface"
                >
                  {currentShoe.weight}
                </motion.p>
              </AnimatePresence>
              <AnimatePresence mode="wait">
                <motion.p
                  key={`size-${currentIndex}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="label-industrial mt-0.5 text-outline"
                >
                  Size {currentShoe.size}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* Floating energy badge */}
            <div className="absolute top-16 right-4 lg:right-0 z-20 floating-badge shadow-ambient-sm bg-surface">
              <p className="label-industrial text-primary">Energy Return</p>
              <AnimatePresence mode="wait">
                <motion.p
                  key={`energy-${currentIndex}`}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="font-headline text-xl font-bold text-on-surface"
                >
                  {currentShoe.energyReturn}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero

