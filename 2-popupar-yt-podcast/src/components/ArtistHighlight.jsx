import { Plus } from 'lucide-react';

export default function ArtistHighlight() {
  const artists = [
    { name: "SARAH JENKINS", role: "HOST • TECH", color: "bg-vibrantYellow", img: "https://i.pravatar.cc/500?img=1" },
    { name: "MARCUS RENTON", role: "HOST • BUSINESS", color: "bg-hotMagenta", img: "https://i.pravatar.cc/500?img=11" },
    { name: "ELENA ROSTOVA", role: "HOST • SCIENCE", color: "bg-neonGreen", img: "https://i.pravatar.cc/500?img=44" },
    { name: "JULIAN BANKS", role: "HOST • DESIGN", color: "bg-electricBlue", img: "https://i.pravatar.cc/500?img=60" },
  ];

  return (
    <section className="w-full py-16 md:py-24 bg-pureWhite border-b-4 border-pureBlack">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b-8 border-pureBlack pb-8 gap-6">
          <div>
            <h2 className="text-5xl md:text-7xl font-heading font-black text-pureBlack drop-shadow-[4px_4px_0px_#00FF00]">THE<br/>VOICES</h2>
          </div>
          <p className="font-body font-bold text-xl uppercase tracking-widest max-w-sm text-right">
            Meet the minds shaping the conversation across our network.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
           {artists.map((artist, idx) => (
             <div 
               key={idx} 
               className={`relative h-[500px] border-4 border-pureBlack group cursor-pointer ${artist.color} flex flex-col p-4 shadow-[8px_8px_0px_#000] hover:-translate-y-2 hover:-translate-x-2 hover:shadow-[16px_16px_0px_#000] transition-all`}
             >
                <div className="font-heading font-black text-2xl rotate-180" style={{ writingMode: 'vertical-rl' }}>
                  {artist.name}
                </div>
                
                <div className="absolute inset-x-4 top-4 bottom-24 border-4 border-pureBlack bg-pureWhite overflow-hidden">
                   <img 
                     src={artist.img} 
                     alt={artist.name} 
                     className="w-full h-full object-cover grayscale contrast-125 group-hover:scale-110 transition-transform duration-700 blur-[1px] group-hover:blur-none"
                   />
                   <div className={`absolute inset-0 opacity-20 group-hover:opacity-0 transition-opacity ${artist.color} mix-blend-color`}></div>
                </div>

                <div className="mt-auto pt-4 flex justify-between items-end pointer-events-none">
                  <div className="font-body font-bold text-sm tracking-widest uppercase border-t-4 border-pureBlack pt-2">
                    {artist.role}
                  </div>
                  <div className="bg-pureWhite border-4 border-pureBlack p-2 group-hover:bg-pureBlack group-hover:text-pureWhite transition-colors">
                     <Plus className="w-6 h-6 stroke-[3px]" />
                  </div>
                </div>

             </div>
           ))}
        </div>

      </div>
    </section>
  );
}
