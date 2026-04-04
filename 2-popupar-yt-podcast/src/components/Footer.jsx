import { Mic, ArrowUpRight } from 'lucide-react';
import { FaTwitter, FaYoutube, FaInstagram } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="w-full bg-pureWhite border-pureBlack overflow-hidden relative">
      
      {/* Top Banner Marquee */}
      <div className="w-full bg-vibrantYellow border-y-4 border-pureBlack py-4 flex whitespace-nowrap overflow-hidden">
        <div className="animate-marquee inline-block font-heading text-4xl uppercase font-black text-pureBlack px-4">
          SUBSCRIBE TODAY • DON'T MISS A DROP • SUBSCRIBE TODAY • DON'T MISS A DROP • SUBSCRIBE TODAY • DON'T MISS A DROP • SUBSCRIBE TODAY • DON'T MISS A DROP •
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16 md:py-24 relative z-10 grid grid-cols-1 md:grid-cols-12 gap-12 text-pureBlack">
        
        {/* Brand & Logo */}
        <div className="md:col-span-5 flex flex-col items-start gap-6">
           <div className="flex items-center gap-2">
             <div className="bg-electricBlue border-4 border-pureBlack p-3 shadow-[6px_6px_0px_#000] rotate-[-5deg] hover:rotate-0 transition-transform cursor-pointer">
               <Mic className="text-pureWhite w-10 h-10" />
             </div>
             <span className="font-heading text-5xl tracking-tighter uppercase font-black">
               OnAir
             </span>
           </div>
           <p className="font-body font-bold text-lg max-w-sm border-l-4 border-neonGreen pl-4 py-1">
             The brutal truth delivered straight to your eardrums. Unfiltered. Uncut. Unapologetic.
           </p>
           
           <div className="flex gap-4 mt-4">
              <a href="#" className="p-3 border-4 border-pureBlack bg-pureWhite hover:bg-hotMagenta hover:text-pureWhite shadow-[4px_4px_0px_#000] hover:-translate-y-1 transition-all">
                <FaTwitter className="w-6 h-6" />
              </a>
              <a href="#" className="p-3 border-4 border-pureBlack bg-pureWhite hover:bg-pureBlack hover:text-pureWhite shadow-[4px_4px_0px_#000] hover:-translate-y-1 transition-all">
                <FaYoutube className="w-6 h-6" />
              </a>
              <a href="#" className="p-3 border-4 border-pureBlack bg-pureWhite hover:bg-electricBlue hover:text-pureWhite shadow-[4px_4px_0px_#000] hover:-translate-y-1 transition-all">
                <FaInstagram className="w-6 h-6" />
              </a>
           </div>
        </div>

        {/* Links Col 1 */}
        <div className="md:col-span-3">
           <h4 className="font-heading text-2xl font-black mb-6 border-b-4 border-pureBlack pb-2 inline-block">NETWORK</h4>
           <ul className="flex flex-col gap-4 font-body font-bold uppercase tracking-wider text-sm">
             <li><a href="#" className="hover:text-electricBlue hover:ml-2 transition-all flex items-center gap-1 group">Episodes <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" /></a></li>
             <li><a href="#" className="hover:text-vibrantYellow hover:ml-2 transition-all flex items-center gap-1 group">Hosts <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" /></a></li>
             <li><a href="#" className="hover:text-neonGreen hover:ml-2 transition-all flex items-center gap-1 group">Schedule <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" /></a></li>
             <li><a href="#" className="hover:text-hotMagenta hover:ml-2 transition-all flex items-center gap-1 group">Live Events <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" /></a></li>
           </ul>
        </div>

        {/* Links Col 2 */}
        <div className="md:col-span-4 flex flex-col items-start md:items-end md:text-right">
           <h4 className="font-heading text-2xl font-black mb-6 border-b-4 border-pureBlack pb-2 inline-block">LEGAL</h4>
           <ul className="flex flex-col gap-4 font-body font-bold uppercase tracking-wider text-sm md:items-end">
             <li><a href="#" className="hover:underline decoration-4 underline-offset-4 decoration-neonGreen">Terms of Service</a></li>
             <li><a href="#" className="hover:underline decoration-4 underline-offset-4 decoration-hotMagenta">Privacy Policy</a></li>
             <li><a href="#" className="hover:underline decoration-4 underline-offset-4 decoration-electricBlue">Cookie Policy</a></li>
             <li><a href="#" className="hover:underline decoration-4 underline-offset-4 decoration-vibrantYellow">Sponsors</a></li>
           </ul>
        </div>

      </div>

      <div className="w-full bg-pureBlack text-pureWhite py-6 border-t-4 border-pureBlack text-center font-body font-bold uppercase tracking-widest text-sm relative z-10">
        © {new Date().getFullYear()} ONAIR NETWORK. ALL RIGHTS RESERVED.
      </div>
      
    </footer>
  );
}
