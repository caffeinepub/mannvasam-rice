import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner";
import type { Product } from "../backend.d";
import { useCart } from "../context/CartContext";
import { useProductsByCategory } from "../hooks/useQueries";

const RICE_IMAGES: Record<string, string> = {
  "Mappilla Samba": "/assets/generated/mappilla-samba.dim_400x400.jpg",
  Thooyamali: "/assets/generated/thooyamali.dim_400x400.jpg",
  "Black Rice": "/assets/generated/black-rice.dim_400x400.jpg",
  Pootniyanam: "/assets/generated/pootniyanam.dim_400x400.jpg",
  Nanwara: "/assets/generated/nanwara.dim_400x400.jpg",
};

function ProductCard({ product, index }: { product: Product; index: number }) {
  const { addToCart } = useCart();
  const price = Number(product.price) / 100;

  const handleAdd = async () => {
    await addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="bg-card rounded-xl shadow-card border border-border overflow-hidden group"
      data-ocid={`products.item.${index + 1}`}
    >
      <div className="aspect-square overflow-hidden bg-muted">
        <img
          src={
            RICE_IMAGES[product.name] ||
            "/assets/generated/mappilla-samba.dim_400x400.jpg"
          }
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
      </div>
      <div className="p-4">
        <h3 className="font-heading font-semibold text-base text-foreground mb-1">
          {product.name}
        </h3>
        <p className="font-body text-xs text-muted-foreground mb-3 line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="font-heading font-bold text-lg text-primary">
            ₹{price}
          </span>
          <Button
            size="sm"
            className="bg-secondary hover:bg-secondary/90 text-secondary-foreground"
            onClick={handleAdd}
            data-ocid={`products.item.${index + 1}`}
          >
            <ShoppingCart className="w-4 h-4 mr-1" />
            Add to Cart
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

export function FeaturedProducts() {
  const { data: products = [] } = useProductsByCategory("rice");

  return (
    <section className="py-16 bg-muted/40" id="products">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-3">
            Featured Products
          </h2>
          <div className="section-divider max-w-xs mx-auto">
            <span className="text-accent text-lg">🌾</span>
          </div>
          <p className="text-muted-foreground font-body mt-3">
            Hand-picked traditional rice varieties grown naturally
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {products.map((p, i) => (
            <ProductCard key={String(p.id)} product={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
