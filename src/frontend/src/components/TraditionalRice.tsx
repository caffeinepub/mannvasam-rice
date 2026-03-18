import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import { useProductsByCategory } from "../hooks/useQueries";

const RICE_IMAGES: Record<string, string> = {
  "Mappilla Samba": "/assets/generated/mappilla-samba.dim_400x400.jpg",
  Thooyamali: "/assets/generated/thooyamali.dim_400x400.jpg",
  "Black Rice": "/assets/generated/black-rice.dim_400x400.jpg",
  Pootniyanam: "/assets/generated/pootniyanam.dim_400x400.jpg",
  Nanwara: "/assets/generated/nanwara.dim_400x400.jpg",
};

export function TraditionalRice() {
  const { data: products = [] } = useProductsByCategory("rice");

  return (
    <section className="py-16 bg-background" id="rice-gallery">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-2">
            Our Traditional Rice
          </h2>
          <p className="font-body text-muted-foreground">
            Shop Traditional Rice
          </p>
          <div className="section-divider max-w-xs mx-auto mt-3">
            <span className="text-accent text-lg">🍚</span>
          </div>
        </motion.div>

        <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory md:grid md:grid-cols-5 md:overflow-visible">
          {products.map((p, i) => (
            <motion.div
              key={String(p.id)}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="flex-shrink-0 w-48 md:w-auto snap-center"
            >
              <div className="aspect-square rounded-xl overflow-hidden shadow-card bg-muted">
                <img
                  src={
                    RICE_IMAGES[p.name] ||
                    "/assets/generated/mappilla-samba.dim_400x400.jpg"
                  }
                  alt={p.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <p className="font-body text-sm font-medium text-center mt-2 text-foreground">
                {p.name}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-8"
        >
          <Button
            size="lg"
            className="bg-secondary hover:bg-secondary/90 text-secondary-foreground px-10"
            onClick={() =>
              document
                .getElementById("products")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            data-ocid="rice.primary_button"
          >
            Shop Traditional Rice
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
