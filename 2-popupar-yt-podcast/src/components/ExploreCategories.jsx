import { ArrowRight } from 'lucide-react';

export default function ExploreCategories() {
  const categories = [
    { title: "True Crime", color: "bg-hotMagenta", span: "col-span-1 md:col-span-2 md:row-span-2", img: "https://picsum.photos/seed/cat1/500/500" },
    { title: "Tech", color: "bg-vibrantYellow", span: "col-span-1", img: "https://picsum.photos/seed/cat2/500/500" },
    { title: "Comedy", color: "bg-neonGreen", span: "col-span-1 md:col-span-2", img: "https://picsum.photos/seed/cat3/500/500" },
    { title: "Business", color: "bg-electricBlue", span: "col-span-1", img: "https://picsum.photos/seed/cat4/500/500" },
    { title: "Culture", color: "bg-pureBlack", textColor: "text-pureWhite", span: "col-span-1 md:col-span-2", img: "https://picsum.photos/seed/cat5/500/500" },
  ];

  return (
    <section className="w-full bg-pureWhite border-b-4 border-pureBlack py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="mb-12">
          <h2 className="text-6xl md:text-8xl text-pureBlack drop-shadow-[4px_4px_0px_#FFB800] tracking-tighter">BINGE<br/>WORTHY</h2>
          <p className="font-body text-xl font-bold mt-4 uppercase tracking-wider">Find your next addiction</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-1 bg-pureBlack border-4 border-pureBlack shadow-[8px_8px_0px_#000]">
          {categories.map((cat, i) => (
             <div 
               key={i} 
               className={`relative group overflow-hidden ${cat.span} ${cat.color} min-h-[250px] cursor-pointer`}
             >
                {/* Fallback specific borders via standard classes on items */}
                <div className={`absolute inset-0 border-2 border-transparent hover:border-pureWhite transition-colors z-20 pointer-events-none`}></div>
                
                <img 
                  src={cat.img} 
                  alt={cat.title} 
                  className="absolute inset-0 w-full h-full object-cover opacity-40 grayscale group-hover:grayscale-0 group-hover:scale-110 group-hover:opacity-60 transition-all duration-500 mix-blend-multiply" 
                />
                
                <div className="absolute inset-0 p-8 flex flex-col justify-end z-10">
                   <h3 className={`font-heading text-4xl ${cat.textColor || 'text-pureBlack'} group-hover:translate-x-2 transition-transform uppercase font-black`}>
                     {cat.title}
                   </h3>
                   <div className="w-0 overflow-hidden group-hover:w-full group-hover:mt-4 transition-all duration-500 ease-out">
                      <div className={`flex items-center gap-2 ${cat.textColor || 'text-pureBlack'} font-body font-bold`}>
                        EXPLORE <ArrowRight className="w-5 h-5" />
                      </div>
                   </div>
                </div>
             </div>
          ))}
        </div>

      </div>
    </section>
  );
}
