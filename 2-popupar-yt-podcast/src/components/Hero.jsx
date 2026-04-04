import { ArrowRight, Star } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative w-full bg-vibrantYellow overflow-hidden border-b-4 border-pureBlack pt-12 md:pt-24 pb-12 flex flex-col items-center">
      
      {/* Background Marquee Strips */}
      <div className="absolute top-10 left-0 w-full rotate-[-3deg] bg-pureBlack text-vibrantYellow py-3 border-y-4 border-pureBlack overflow-hidden z-0 whitespace-nowrap hidden md:block">
         <div className="animate-marquee inline-block font-heading text-2xl uppercase tracking-widest px-4">
            SOUND UNLEASHED • RAW AUDIO • NO FILTER • SOUND UNLEASHED • RAW AUDIO • NO FILTER • SOUND UNLEASHED • RAW AUDIO • NO FILTER • 
         </div>
      </div>
      <div className="absolute top-32 left-0 w-full rotate-[4deg] bg-hotMagenta text-pureWhite py-3 border-y-4 border-pureBlack overflow-hidden z-0 whitespace-nowrap hidden md:block">
         <div className="animate-marquee inline-block font-heading text-2xl uppercase tracking-widest px-4" style={{animationDirection: 'reverse'}}>
            LATEST DROPS • JOIN THE MOVEMENT • LATEST DROPS • JOIN THE MOVEMENT • LATEST DROPS • JOIN THE MOVEMENT • LATEST DROPS • JOIN THE MOVEMENT •
         </div>
      </div>

      <div className="container mx-auto px-6 max-w-6xl relative z-10 flex flex-col md:flex-row items-center gap-12 mt-12 md:mt-24">
        
        {/* Left Typography */}
        <div className="w-full md:w-3/5 flex flex-col gap-6">
          <div className="inline-block bg-neonGreen text-pureBlack px-4 py-1 border-4 border-pureBlack w-max font-bold shadow-[4px_4px_0px_#000]">
            #1 PODCAST NETWORK
          </div>
          <h1 className="text-6xl md:text-8xl leading-[0.9] text-pureBlack tracking-tighter drop-shadow-[4px_4px_0px_#FF00A0]">
            BRUTAL<br />HONESTY<br />ON AIR.
          </h1>
          <p className="font-body text-xl md:text-2xl font-bold max-w-lg mt-4 bg-pureWhite p-4 border-4 border-pureBlack shadow-[6px_6px_0px_#0055FF]">
            Dive into raw, unfiltered conversations with the world's most polarizing minds. No scripts. No safety nets.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <button className="bg-electricBlue text-pureWhite font-heading text-xl uppercase px-8 py-4 border-4 border-pureBlack shadow-[6px_6px_0px_#000] hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-[4px_4px_0px_#000] transition-all flex items-center justify-center gap-2">
              Start Listening <ArrowRight className="w-6 h-6" />
            </button>
            <button className="bg-pureWhite text-pureBlack font-heading text-xl uppercase px-8 py-4 border-4 border-pureBlack shadow-[6px_6px_0px_#000] hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-[4px_4px_0px_#000] transition-all flex items-center justify-center gap-2">
              View Schedule
            </button>
          </div>
        </div>

        {/* Right Graphic / Image */}
        <div className="w-full md:w-2/5 relative">
          <div className="absolute inset-0 bg-hotMagenta border-4 border-pureBlack translate-x-4 translate-y-4 shadow-[8px_8px_0px_#000]"></div>
          <img 
            src="https://picsum.photos/seed/hero/800/800" 
            alt="Host shouting into mic" 
            className="relative z-10 w-full h-[500px] object-cover border-4 border-pureBlack grayscale contrast-150"
          />
          {/* Badge */}
          <div className="absolute -bottom-8 -left-8 bg-neonGreen border-4 border-pureBlack rounded-full p-4 flex items-center justify-center w-32 h-32 z-20 shadow-[4px_4px_0px_#000] animate-spin-slow">
             <div className="text-center font-heading font-black leading-none text-xl rotate-12">
               RAW<br/>AUDIO
             </div>
          </div>
        </div>

      </div>
    </section>
  );
}
