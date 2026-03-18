import { Button } from "@/components/ui/button";
import { Heart, Leaf, ShieldCheck } from "lucide-react";
import { motion } from "motion/react";

const promises = [
  {
    icon: ShieldCheck,
    label: "No Chemicals",
    desc: "Zero pesticides or synthetic fertilisers",
  },
  {
    icon: Leaf,
    label: "No Polishing",
    desc: "Full bran retained for complete nutrition",
  },
  {
    icon: Heart,
    label: "No Shortcuts",
    desc: "Traditional farming, honest practices",
  },
];

export function OurPromise() {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-3">
            Our Promise
          </h2>
          <div className="section-divider max-w-xs mx-auto">
            <span className="text-accent text-lg">🤝</span>
          </div>
          <p className="font-body text-muted-foreground mt-4 max-w-xl mx-auto italic text-lg">
            "Every grain you eat carries the purity of soil and the strength of
            tradition."
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-16">
          {promises.map((p, i) => (
            <motion.div
              key={p.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="text-center"
            >
              <div className="w-20 h-20 rounded-full bg-accent/15 flex items-center justify-center mx-auto mb-4">
                <p.icon className="w-9 h-9 text-accent-foreground" />
              </div>
              <h3 className="font-heading font-bold text-xl text-foreground mb-2">
                {p.label}
              </h3>
              <p className="font-body text-sm text-muted-foreground">
                {p.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="rounded-2xl bg-secondary p-10 text-center"
        >
          <h3 className="font-heading text-2xl md:text-3xl font-bold text-secondary-foreground mb-3">
            Start Your Healthy Journey Today
          </h3>
          <p className="text-secondary-foreground/80 font-body mb-6">
            Join thousands of families who have rediscovered the taste of pure,
            traditional grains.
          </p>
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-10 font-semibold"
            onClick={() =>
              document
                .getElementById("products")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            data-ocid="promise.primary_button"
          >
            Shop Now
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
