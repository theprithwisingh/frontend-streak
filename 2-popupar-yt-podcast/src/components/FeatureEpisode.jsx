import { PlayCircle } from 'lucide-react';

export default function FeatureEpisode() {
  return (
    <section className="w-full bg-electricBlue border-b-4 border-pureBlack py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-6">
        
        <div className="mb-12 flex flex-col md:flex-row justify-between items-end gap-6">
          <h2 className="text-6xl md:text-8xl text-pureWhite drop-shadow-[4px_4px_0px_#000]">FEATURED<br/>DROP</h2>
          <div className="bg-vibrantYellow text-pureBlack px-4 py-2 border-4 border-pureBlack font-bold shadow-[4px_4px_0px_#000] rotate-[-2deg]">
            EPISODE #142 • 2 HRS AGO
          </div>
        </div>

        <div className="bg-pureWhite border-4 border-pureBlack shadow-[12px_12px_0px_#FF00A0] flex flex-col md:flex-row overflow-hidden group">
          
          <div className="w-full md:w-1/2 relative bg-hotMagenta">
             <img 
               src="https://picsum.photos/seed/feat/800/800" 
               alt="Studio Setup"
               className="w-full h-full object-cover grayscale mix-blend-multiply transition-all duration-500 group-hover:grayscale-0 group-hover:mix-blend-normal min-h-[300px]"
             />
             <div className="absolute inset-0 flex items-center justify-center">
               <button className="bg-pureWhite p-4 rounded-full border-4 border-pureBlack shadow-[0px_0px_0px_#000] hover:scale-110 hover:bg-vibrantYellow transition-all group-hover:shadow-[8px_8px_0px_#000]">
                 <PlayCircle className="w-16 h-16 text-pureBlack" />
               </button>
             </div>
          </div>

          <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-pureWhite relative">
             <div className="absolute top-4 right-4 text-6xl font-heading text-black/5 opacity-50 z-0 select-none">#142</div>
             <div className="relative z-10 flex flex-col gap-6">
               <div className="flex gap-2">
                 <span className="bg-pureBlack text-pureWhite px-3 py-1 font-body font-bold text-sm tracking-wider uppercase">Tech</span>
                 <span className="bg-neonGreen text-pureBlack border-2 border-pureBlack px-3 py-1 font-body font-bold text-sm tracking-wider uppercase">Deep Dive</span>
               </div>
               
               <h3 className="font-heading text-4xl md:text-5xl leading-tight mt-4">
                 THE FUTURE OF ARTIFICIAL CREATIVITY
               </h3>
               
               <p className="font-body font-medium text-lg leading-relaxed border-l-4 border-hotMagenta pl-4 py-2">
                 We sit down with leading AI researchers to discuss whether machines will eventually replace human artists, and what that means for culture.
               </p>

               <div className="mt-8 flex items-center gap-4 border-t-4 border-pureBlack pt-6">
                 <div className="w-16 h-16 bg-vibrantYellow border-4 border-pureBlack rounded-full overflow-hidden shrink-0">
                    <img src="https://i.pravatar.cc/300?img=68" alt="Host" className="w-full h-full object-cover grayscale" />
                 </div>
                 <div>
                   <div className="font-heading text-2xl">SARAH JENKINS</div>
                   <div className="font-body font-bold text-gray-500 uppercase tracking-widest text-sm">Host & Producer</div>
                 </div>
               </div>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
}
