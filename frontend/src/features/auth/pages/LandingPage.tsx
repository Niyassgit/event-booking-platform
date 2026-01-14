import FAQSection from "./FAQSection";
import Footer from "./Footer";
import HeroSection from "./HeroSection";
import ImageGallery from "./ImageGallery";
import LoginForm from "./LoginForm";

const LandingPage = () => {
  return (
    <>
      {/* Hero */}
      <section className="mb-32">
        <HeroSection />
      </section>

      <section className="flex justify-center items-center mb-32">
        <div className="w-[60%]">
          <LoginForm />
        </div>
      </section>

      <section className="mb-32">
        <ImageGallery />
      </section>

      <section className="mb-32">
        <FAQSection />
      </section>

      <Footer />
    </>
  );
};

export default LandingPage;
