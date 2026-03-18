import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner";
import type { Product } from "../backend.d";
import { useCart } from "../context/CartContext";
import { useProductsByCategory } from "../hooks/useQueries";

const MILLET_IMAGES: Record<string, string> = {
  "Foxtail Millet": "/assets/generated/foxtail-millet.dim_400x400.jpg",
  "Little Millet": "/assets/generated/little-millet.dim_400x400.jpg",
  "Kodo Millet": "/assets/generated/kodo-millet.dim_400x400.jpg",
  Ragi: "/assets/generated/ragi.dim_400x400.jpg",
  "Pearl Millet": "/assets/generated/pearl-millet.dim_400x400.jpg",
};

function MilletCard({ product, index }: { product: Product; index: number }) {
  const { addToCart } = useCart();
  const price = Number(product.price) / 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="bg-card rounded-xl shadow-card border border-border overflow-hidden group text-center"
      data-ocid={`millets.item.${index + 1}`}
    >
      <div className="aspect-square overflow-hidden bg-muted">
        <img
          src={
            MILLET_IMAGES[product.name] ||
            "/assets/generated/foxtail-millet.dim_400x400.jpg"
          }
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
      </div>
      <div className="p-4">
        <h3 className="font-heading font-semibold text-sm text-foreground mb-1">
          {product.name}
        </h3>
        <p className="font-heading font-bold text-primary mb-3">₹{price}</p>
        <Button
          size="sm"
          className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground text-xs"
          onClick={async () => {
            await addToCart(product);
            toast.success(`${product.name} added to cart!`);
          }}
          data-ocid={`millets.item.${index + 1}`}
        >
          <ShoppingCart className="w-3 h-3 mr-1" />
          Add to Cart
        </Button>
      </div>
    </motion.div>
  );
}

export function OurMillets() {
  const { data: millets = [] } = useProductsByCategory("millet");

  return (
    <section className="py-16 bg-muted/40">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-3">
            Our Millets
          </h2>
          <div className="section-divider max-w-xs mx-auto">
            <span className="text-accent text-lg">🌿</span>
          </div>
          <p className="text-muted-foreground font-body mt-3">
            Ancient grains for modern wellness
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {millets.map((m, i) => (
            <MilletCard key={String(m.id)} product={m} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
