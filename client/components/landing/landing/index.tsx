// import Navbar from "../navbar";

// export default function Landing(){
//     return(
//         <>
//         <Navbar/>
//         </>
//     )
// }



import Navbar from "../navbar";
import Hero from "../Hero";
import HowItWorks from "../HowItWorks";
import InterviewFormats from "../InterviewFormats";
import Features from "../Features";
import CtaSection from "../CtaSection";
import Footer from "../Footer";

export default function Landing() {
  return (
    <>
      <Navbar />
      <main className="bg-background">
        <Hero />
        <HowItWorks />
        <InterviewFormats />
        <Features />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}