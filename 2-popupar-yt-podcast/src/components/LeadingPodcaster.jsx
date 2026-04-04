import { TrendingUp, Award, Zap } from 'lucide-react';

export default function LeadingPodcaster() {
  return (
    <section className="w-full bg-neonGreen border-b-4 border-pureBlack pt-16 md:pt-24 pb-0 relative overflow-hidden">
      
      <div className="absolute top-1/2 left-1/2 w-full h-[200px] bg-electricBlue border-y-4 border-pureBlack -translate-x-1/2 -translate-y-1/2 rotate-[-5deg] flex items-center shadow-[0_10px_0_#000]">
        <div className="animate-marquee whitespace-nowrap font-heading text-7xl md:text-9xl text-pureBlack opacity-30 select-none">
          TOP CHART • TOP CHART • TOP CHART • TOP CHART • TOP CHART •
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-end gap-0">
          
          {/* Content Left */}
          <div className="w-full md:w-1/2 bg-pureWhite border-4 border-pureBlack p-8 md:p-12 shadow-[12px_12px_0px_#000] z-20 -mb-10 md:mb-16">
            <div className="inline-block bg-vibrantYellow px-4 py-2 font-body font-black uppercase text-xl border-4 border-pureBlack shadow-[4px_4px_0px_#000] rotate-2 mb-8">
              Creator Spotlight
            </div>
            <h2 className="font-heading text-6xl md:text-7xl leading-[0.9] text-pureBlack mb-6">
              MARCUS<br/>RENTON
            </h2>
            <p className="font-body text-xl font-bold border-l-8 border-electricBlue pl-4 py-2 bg-gray-50 mb-8">
              "The most dangerous man in media." Redefining the interview format with zero cuts and zero apologies.
            </p>
            
            <div className="grid grid-cols-2 gap-4">
               <div className="border-4 border-pureBlack p-4 bg-hotMagenta text-pureWhite flex flex-col items-center justify-center text-center shadow-[4px_4px_0px_#000] hover:translate-y-1 transition-transform">
                 <TrendingUp className="w-8 h-8 mb-2" />
                 <span className="font-heading text-3xl">#1</span>
                 <span className="font-body font-bold text-sm tracking-widest uppercase">Global Rank</span>
               </div>
               <div className="border-4 border-pureBlack p-4 bg-pureBlack text-pureWhite flex flex-col items-center justify-center text-center shadow-[4px_4px_0px_#FFB800] hover:translate-y-1 transition-transform">
                 <Award className="w-8 h-8 mb-2 text-vibrantYellow" />
                 <span className="font-heading text-3xl">3</span>
                 <span className="font-body font-bold text-sm tracking-widest uppercase">Webby Awards</span>
               </div>
            </div>
          </div>

          {/* Image Right */}
          <div className="w-full md:w-1/2 relative md:pl-8 flex justify-center items-end">
            <div className="w-full max-w-md relative">
               <img 
                 src="https://picsum.photos/seed/podcaster/800/800" 
                 alt="Marcus Renton"
                 className="block w-full h-auto border-t-4 border-x-4 border-pureBlack grayscale contrast-125 object-cover relative z-10 pointer-events-none"
               />
               <div className="absolute top-10 -right-10 hidden lg:flex flex-col gap-2 z-20">
                  <div className="bg-electricBlue text-pureWhite border-4 border-pureBlack p-4 text-center shadow-[4px_4px_0px_#000] rotate-6">
                    <Zap className="w-10 h-10 mx-auto mb-1 text-vibrantYellow fill-vibrantYellow" />
                    <span className="font-heading font-black text-xl">1M+</span><br/>
                    <span className="font-body text-xs font-bold uppercase">Subscribers</span>
                  </div>
               </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
