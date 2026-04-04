import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SocialProof from './components/SocialProof';
import FeatureEpisode from './components/FeatureEpisode';
import ExploreCategories from './components/ExploreCategories';
import LeadingPodcaster from './components/LeadingPodcaster';
import CTA from './components/CTA';
import LatestEpisodes from './components/LatestEpisodes';
import ArtistHighlight from './components/ArtistHighlight';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-pureWhite text-pureBlack">
      <Navbar />
      <Hero />
      <SocialProof />
      <FeatureEpisode />
      <ExploreCategories />
      <LeadingPodcaster />
      <ArtistHighlight />
      <CTA />
      <LatestEpisodes />
      <Footer />
    </div>
  );
}

export default App;
