import { Button } from "@/components/ui/button";
import { motion } from "motion/react";

export function HeroSection() {
  return (
    <section
      className="relative min-h-[560px] md:min-h-[680px] flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage:
          "url('/assets/generated/hero-rice-field.dim_1400x700.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-foreground/40" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center px-4 max-w-3xl mx-auto"
      >
        <p className="text-accent font-body text-sm font-semibold tracking-[0.2em] uppercase mb-4">
          100% Natural · Traditional · Unpolished
        </p>
        <h1 className="font-heading text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
          Authentic Traditional Rice from the Roots of Nature
        </h1>
        <p className="text-white/85 font-body text-lg mb-8">
          Grown with love by Indian farmers, delivered straight to your table.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-3"
            onClick={() =>
              document
                .getElementById("products")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            data-ocid="hero.primary_button"
          >
            Shop Now
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-secondary text-secondary bg-white/10 hover:bg-secondary hover:text-secondary-foreground backdrop-blur-sm font-semibold px-8 py-3"
            onClick={() =>
              document
                .getElementById("rice-gallery")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            data-ocid="hero.secondary_button"
          >
            Explore Varieties
          </Button>
        </div>
      </motion.div>
    </section>
  );
}
