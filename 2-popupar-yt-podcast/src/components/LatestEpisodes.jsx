import { Play, Clock } from 'lucide-react';

export default function LatestEpisodes() {
  const episodes = [
    { title: "THE PSYCHOLOGY OF SCARCITY", host: "Sarah Jenkins", duration: "1:45:00", date: "TODAY", img: "https://picsum.photos/seed/epi1/500/500", color: "bg-electricBlue" },
    { title: "WHY 90% OF STARTUPS FAIL", host: "Marcus Renton", duration: "2:10:00", date: "YESTERDAY", img: "https://picsum.photos/seed/epi2/500/500", color: "bg-hotMagenta" },
    { title: "DECODING HUMAN BEHAVIOR", host: "Dr. Elena Rostova", duration: "1:15:00", date: "3 DAYS AGO", img: "https://picsum.photos/seed/epi3/500/500", color: "bg-neonGreen" },
    { title: "MODERN FINANCE MYTHS", host: "Alex Chen", duration: "1:30:00", date: "LAST WEEK", img: "https://picsum.photos/seed/epi4/500/500", color: "bg-vibrantYellow" },
    { title: "THE CREATOR ECONOMY BUBBLE", host: "Sarah Jenkins", duration: "2:05:00", date: "LAST WEEK", img: "https://picsum.photos/seed/epi5/500/500", color: "bg-electricBlue" },
    { title: "DESIGNING THE FUTURE", host: "Julian Banks", duration: "1:55:00", date: "2 WEEKS AGO", img: "https://picsum.photos/seed/epi6/500/500", color: "bg-pureBlack" },
  ];

  const tags = ["ALL", "BUSINESS", "TECH", "CULTURE", "SCIENCE", "TRUE CRIME"];

  return (
    <section className="w-full bg-pureBlack text-pureWhite py-16 md:py-24 border-b-4 border-pureBlack">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-8">
          <h2 className="text-6xl md:text-8xl font-heading font-black drop-shadow-[4px_4px_0px_#0055FF]">THE<br/>VAULT</h2>
          
          <div className="flex flex-wrap gap-3">
             {tags.map((tag, idx) => (
                <button 
                  key={idx} 
                  className={`font-body font-bold px-4 py-2 border-4 border-pureWhite uppercase tracking-widest text-sm hover:bg-neonGreen hover:text-pureBlack hover:-translate-y-1 transition-all
                  ${idx === 0 ? 'bg-pureWhite text-pureBlack' : 'bg-transparent text-pureWhite'}
                  `}
                >
                  {tag}
                </button>
             ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
           {episodes.map((ep, idx) => (
              <div key={idx} className="bg-pureWhite text-pureBlack border-4 border-pureBlack hover:-translate-y-2 hover:-translate-x-2 transition-transform shadow-[0px_0px_0px_#000] hover:shadow-[12px_12px_0px_#FFF] group cursor-pointer flex flex-col">
                 
                 <div className="relative h-64 border-b-4 border-pureBlack overflow-hidden">
                    <img 
                      src={ep.img} 
                      alt={ep.title} 
                      className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500" 
                    />
                    <div className="absolute inset-0 bg-pureBlack/20 group-hover:bg-transparent transition-colors"></div>
                    <div className={`absolute top-4 left-4 ${ep.color} text-pureBlack font-bold font-heading px-3 py-1 border-4 border-pureBlack shadow-[2px_2px_0px_#000]`}>
                       {ep.date}
                    </div>
                    <button className="absolute bottom-4 right-4 bg-pureWhite p-3 rounded-full border-4 border-pureBlack shadow-[4px_4px_0px_#000] rotate-0 group-hover:rotate-12 group-hover:bg-vibrantYellow transition-all">
                       <Play className="w-6 h-6 text-pureBlack fill-pureBlack ml-1" />
                    </button>
                 </div>

                 <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                       <div className="flex items-center gap-2 mb-3 text-sm font-bold uppercase tracking-wider text-gray-500">
                          <Clock className="w-4 h-4" /> {ep.duration}
                       </div>
                       <h3 className="font-heading text-2xl font-black mb-4 group-hover:text-electricBlue transition-colors line-clamp-2 leading-tight">
                         {ep.title}
                       </h3>
                    </div>
                    <div className="font-body font-bold border-t-4 border-pureBlack pt-4 uppercase mt-auto">
                      FEAT. {ep.host}
                    </div>
                 </div>

              </div>
           ))}
        </div>

        <div className="mt-16 text-center">
           <button className="bg-transparent text-pureWhite font-heading text-xl font-black uppercase px-12 py-4 border-4 border-pureWhite hover:bg-pureWhite hover:text-pureBlack hover:-translate-y-1 shadow-[0px_0px_0px_#FFF] hover:shadow-[6px_6px_0px_#0055FF] transition-all">
             Load More
           </button>
        </div>

      </div>
    </section>
  );
}
