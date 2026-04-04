import { Star, Headphones, Users, Mic2 } from 'lucide-react';

export default function SocialProof() {
  const stats = [
    { label: "Monthly Listens", value: "2.4M", icon: <Headphones className="w-8 h-8 text-electricBlue" />, color: "bg-vibrantYellow" },
    { label: "Active Hosts", value: "45+", icon: <Mic2 className="w-8 h-8 text-hotMagenta" />, color: "bg-neonGreen" },
    { label: "Community", value: "150K", icon: <Users className="w-8 h-8 text-neonGreen" />, color: "bg-electricBlue" }
  ];

  return (
    <section className="w-full bg-pureWhite border-b-4 border-pureBlack py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row border-4 border-pureBlack shadow-[8px_8px_0px_#000]">
          
          {/* Left Side: Rating & Logos */}
          <div className="w-full lg:w-1/2 p-8 lg:p-12 border-b-4 lg:border-b-0 lg:border-r-4 border-pureBlack bg-pureWhite flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-8 h-8 fill-vibrantYellow text-pureBlack stroke-2" />
              ))}
            </div>
            <h3 className="font-heading text-4xl mb-6">"THE ONLY PLATFORM THAT MATTERS"</h3>
            <p className="font-body font-bold text-gray-600 mb-8 uppercase tracking-wider">Trusted by top creators</p>
            <div className="flex gap-4 flex-wrap">
              {['Spotify', 'Apple', 'Google', 'Amazon'].map((platform) => (
                 <div key={platform} className="px-4 py-2 border-4 border-pureBlack bg-pureWhite shadow-[2px_2px_0px_#000] font-heading font-black text-xl hover:bg-hotMagenta hover:text-pureWhite transition-colors cursor-pointer">
                   {platform}
                 </div>
              ))}
            </div>
          </div>

          {/* Right Side: Stats Grid */}
          <div className="w-full lg:w-1/2 bg-pureBlack p-8 grid gap-6">
            {stats.map((stat, idx) => (
              <div key={idx} className={`${stat.color} border-4 border-pureWhite p-6 flex items-center justify-between shadow-[4px_4px_0px_#FFF] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[8px_8px_0px_#FFF] transition-transform`}>
                <div className="bg-pureWhite p-3 border-4 border-pureBlack rounded-full">
                  {stat.icon}
                </div>
                <div className="text-right text-pureBlack">
                  <div className="font-heading text-4xl">{stat.value}</div>
                  <div className="font-body font-bold uppercase tracking-wider">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
