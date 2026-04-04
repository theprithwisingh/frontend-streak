import { Menu, Mic } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="w-full bg-pureWhite border-b-4 border-pureBlack py-4 px-6 md:px-12 flex justify-between items-center z-50 relative">
      <div className="flex items-center gap-2">
        <div className="bg-electricBlue border-4 border-pureBlack p-2 flex items-center justify-center shadow-[4px_4px_0px_#000]">
          <Mic className="text-pureWhite w-6 h-6" strokeWidth={3} />
        </div>
        <span className="font-heading text-2xl tracking-tighter uppercase font-black text-pureBlack">
          OnAir
        </span>
      </div>

      <div className="hidden md:flex items-center gap-8 font-body font-bold text-pureBlack uppercase tracking-wide">
        <a href="#" className="hover:-translate-y-1 hover:text-hotMagenta transition-all">Episodes</a>
        <a href="#" className="hover:-translate-y-1 hover:text-vibrantYellow transition-all">Hosts</a>
        <a href="#" className="hover:-translate-y-1 hover:text-neonGreen transition-all">Community</a>
      </div>

      <div className="flex items-center gap-4">
        <button className="hidden md:block bg-pureBlack text-pureWhite font-heading uppercase px-6 py-3 border-4 border-pureBlack hover:-translate-y-1 hover:shadow-[4px_4px_0px_#FFB800] transition-all">
          Subscribe
        </button>
        <button className="md:hidden bg-vibrantYellow p-2 border-4 border-pureBlack shadow-[3px_3px_0px_#000]">
          <Menu className="w-6 h-6 text-pureBlack" />
        </button>
      </div>
    </nav>
  );
}
