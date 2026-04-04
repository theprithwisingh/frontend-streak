import { Mail } from 'lucide-react';

export default function CTA() {
  return (
    <section className="w-full py-16 md:py-24 bg-pureWhite border-b-4 border-pureBlack">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="flex flex-col md:flex-row border-4 border-pureBlack shadow-[12px_12px_0px_#000] overflow-hidden">
          
          {/* Left: 60% Newsletter Signup */}
          <div className="w-full md:w-3/5 bg-pureBlack text-pureWhite p-10 md:p-16 flex flex-col justify-center">
             <div className="flex items-center gap-4 mb-6">
               <div className="bg-hotMagenta p-3 border-4 border-pureWhite shadow-[4px_4px_0px_#FFF] rotate-[-5deg]">
                 <Mail className="w-8 h-8 text-pureWhite" />
               </div>
               <span className="font-body font-black uppercase tracking-widest text-vibrantYellow text-lg text-shadow-sm">Insiders Only</span>
             </div>
             
             <h2 className="font-heading text-5xl md:text-6xl mb-6">GET THE DROPS BEFORE ANYONE ELSE</h2>
             <p className="font-body text-gray-400 font-bold mb-10 text-xl border-l-4 border-electricBlue pl-4">
               No spam. Just hard-hitting, exclusive backstage content and early access to live shows.
             </p>

             <form className="flex flex-col sm:flex-row gap-0 group">
               <input 
                 type="email" 
                 placeholder="ENTER EMAIL ADDRESS" 
                 className="flex-1 bg-pureWhite text-pureBlack font-heading text-xl p-5 border-4 border-pureWhite focus:outline-none placeholder-gray-500 uppercase font-bold w-full"
               />
               <button 
                 type="button" 
                 className="bg-neonGreen text-pureBlack font-heading text-xl uppercase font-black px-8 py-5 border-4 border-pureWhite sm:-ml-2 hover:bg-vibrantYellow transition-colors flex-shrink-0"
               >
                 Sign Up
               </button>
             </form>
          </div>

          {/* Right: 40% Stylized Background / Graphic */}
          <div className="w-full md:w-2/5 bg-vibrantYellow border-t-4 md:border-t-0 md:border-l-4 border-pureBlack relative p-10 hidden md:flex items-center justify-center overflow-hidden">
             {/* Diagonal stripes via CSS */}
             <div className="absolute inset-0" style={{
                backgroundImage: 'repeating-linear-gradient(45deg, #000 0, #000 10px, transparent 10px, transparent 20px)',
                opacity: 0.15
             }}></div>
             
             {/* Large Floating Tape Graphic */}
             <div className="relative z-10 w-64 h-64 bg-pureWhite border-4 border-pureBlack rounded-full flex items-center justify-center shadow-[10px_10px_0px_#FF00A0] animate-pulse">
                <div className="w-16 h-16 bg-pureBlack rounded-full border-4 border-pureWhite flex justify-between px-2 items-center">
                   <div className="w-2 h-2 bg-pureWhite rounded-full"></div>
                   <div className="w-2 h-2 bg-pureWhite rounded-full"></div>
                </div>
             </div>

             <div className="absolute bottom-4 right-4 bg-pureBlack text-pureWhite font-heading font-black px-4 py-2 rotate-[-10deg] border-4 border-pureBlack z-20">
                100% FREE
             </div>
          </div>

        </div>

      </div>
    </section>
  );
}
