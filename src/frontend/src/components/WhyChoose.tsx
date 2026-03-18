import { Gem, Leaf, Sprout, Users } from "lucide-react";
import { motion } from "motion/react";

const features = [
  {
    icon: Leaf,
    title: "100% Traditional Varieties",
    desc: "Heritage seeds passed down through generations, preserving ancient wisdom.",
  },
  {
    icon: Sprout,
    title: "Naturally Grown",
    desc: "Cultivated without synthetic chemicals, honoring the land and your health.",
  },
  {
    icon: Gem,
    title: "Unpolished & Nutrient Rich",
    desc: "Full bran layer intact, delivering maximum fibre, minerals, and vitamins.",
  },
  {
    icon: Users,
    title: "Direct from Farmers",
    desc: "Fair-trade partnerships with small-scale farmers across Tamil Nadu.",
  },
];

export function WhyChoose() {
  return (
    <section className="py-16 bg-background" id="about">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-3">
            Why Choose Mannvasam?
          </h2>
          <div className="section-divider max-w-xs mx-auto">
            <span className="text-accent text-lg">🌾</span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-card rounded-lg p-6 text-center shadow-card border border-border"
            >
              <div className="w-14 h-14 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-4">
                <f.icon className="w-7 h-7 text-secondary" />
              </div>
              <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
                {f.title}
              </h3>
              <p className="font-body text-sm text-muted-foreground">
                {f.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
