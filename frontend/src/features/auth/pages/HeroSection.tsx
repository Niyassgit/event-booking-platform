import { motion } from "framer-motion";
import { Button } from "../../../components/ui/button";
import { Calendar, Users, Sparkles, ArrowRight } from "lucide-react";

const FloatingShape = ({
  className,
  delay = 0,
}: {
  className?: string;
  delay?: number;
}) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, scale: 0 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.8, delay }}
  />
);

const HeroSection = () => {
  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-hero">
      {/* Background Glow Effects */}
      <div className="absolute inset-0 bg-gradient-glow opacity-60" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/5 blur-3xl animate-pulse" />
      <div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-accent/5 blur-3xl animate-pulse"
        style={{ animationDelay: "2s" }}
      />

      {/* Floating Decorative Elements */}
      <FloatingShape
        className="absolute top-20 left-[10%] w-4 h-4 rounded-full bg-primary/30 animate-float"
        delay={0.2}
      />
      <FloatingShape
        className="absolute top-40 right-[15%] w-6 h-6 rounded-full bg-accent/30 animate-float-delayed"
        delay={0.4}
      />
      <FloatingShape
        className="absolute bottom-40 left-[20%] w-3 h-3 rounded-full bg-primary/40 animate-float"
        delay={0.6}
      />
      <FloatingShape
        className="absolute top-1/3 right-[8%] w-8 h-8 rounded-lg rotate-45 border border-primary/20 animate-float-delayed"
        delay={0.3}
      />
      <FloatingShape
        className="absolute bottom-1/3 left-[8%] w-6 h-6 rounded-lg rotate-12 border border-accent/20 animate-float"
        delay={0.5}
      />

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-6 py-20 lg:py-32">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-secondary/50 backdrop-blur-sm mb-8"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-muted-foreground">
              Trusted by 10,000+ event organizers
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6"
          >
            Create <span className="text-gradient">Unforgettable</span>
            <br />
            Events with Ease
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 leading-relaxed"
          >
            From intimate gatherings to massive conferences, our platform
            empowers you to plan, promote, and execute events that leave lasting
            impressions.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 mb-16"
          >
            <Button size="lg" className="group text-lg px-8 py-6 shadow-glow">
              Start Planning Free
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6 border-border hover:bg-secondary hover:text-foreground"
            >
              Watch Demo
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-16"
          >
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-5 h-5 text-primary" />
                <span className="text-3xl md:text-4xl font-display font-bold">
                  50K+
                </span>
              </div>
              <span className="text-sm text-muted-foreground">
                Events Created
              </span>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-5 h-5 text-accent" />
                <span className="text-3xl md:text-4xl font-display font-bold">
                  2M+
                </span>
              </div>
              <span className="text-sm text-muted-foreground">
                Happy Attendees
              </span>
            </div>
            <div className="flex flex-col items-center col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-5 h-5 text-primary" />
                <span className="text-3xl md:text-4xl font-display font-bold">
                  99%
                </span>
              </div>
              <span className="text-sm text-muted-foreground">
                Satisfaction Rate
              </span>
            </div>
          </motion.div>
        </div>
      </div>

    </section>
  );
};

export default HeroSection;
