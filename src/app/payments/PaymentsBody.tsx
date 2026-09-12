import FoundationForFastSection from "./sections/foundation-for-fast-section";
import Section4 from "./sections/section4";
import SeeWhoBuildingSection from "./sections/see-who-building-section";
import GalleryShowcaseSection from "./sections/gallery-showcase-section";
import BuildTheFutureSection from "./sections/build-the-future-section";

export default function PaymentsBody() {
  return (
    <main className="block bg-background">
      <FoundationForFastSection />
      <FoundationForFastSection />
      <Section4 />
      <SeeWhoBuildingSection />
      <GalleryShowcaseSection />
      <BuildTheFutureSection />
    </main>
  );
}
