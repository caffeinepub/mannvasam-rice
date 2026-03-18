import { useQuery } from "@tanstack/react-query";
import type { Product } from "../backend.d";
import { useActor } from "./useActor";

const FALLBACK_RICE: Product[] = [
  {
    id: BigInt(1),
    name: "Mappilla Samba",
    description:
      "Traditional aromatic rice with a rich, nutty flavour, cultivated in Tamil Nadu.",
    category: "rice",
    price: BigInt(28000),
    weightOptions: [BigInt(500), BigInt(1000)],
  },
  {
    id: BigInt(2),
    name: "Thooyamali",
    description:
      "Pristine white heritage rice, delicate in texture and packed with natural goodness.",
    category: "rice",
    price: BigInt(32000),
    weightOptions: [BigInt(500), BigInt(1000)],
  },
  {
    id: BigInt(3),
    name: "Black Rice",
    description:
      "Anthocyanin-rich black rice, a powerful antioxidant with a nutty flavour.",
    category: "rice",
    price: BigInt(45000),
    weightOptions: [BigInt(500), BigInt(1000)],
  },
  {
    id: BigInt(4),
    name: "Pootniyanam",
    description:
      "Ancient heirloom rice known for its unique aroma and high nutritional value.",
    category: "rice",
    price: BigInt(26000),
    weightOptions: [BigInt(500), BigInt(1000)],
  },
  {
    id: BigInt(5),
    name: "Nanwara",
    description:
      "Short-grain traditional rice with a creamy texture, perfect for everyday cooking.",
    category: "rice",
    price: BigInt(30000),
    weightOptions: [BigInt(500), BigInt(1000)],
  },
];

const FALLBACK_MILLETS: Product[] = [
  {
    id: BigInt(6),
    name: "Foxtail Millet",
    description:
      "Protein-rich ancient grain for diabetes management and weight loss.",
    category: "millet",
    price: BigInt(18000),
    weightOptions: [BigInt(500), BigInt(1000)],
  },
  {
    id: BigInt(7),
    name: "Little Millet",
    description:
      "Tiny but mighty millet packed with fibre and essential minerals.",
    category: "millet",
    price: BigInt(20000),
    weightOptions: [BigInt(500), BigInt(1000)],
  },
  {
    id: BigInt(8),
    name: "Kodo Millet",
    description:
      "Iron-rich millet with a light texture, ideal for porridges and flatbreads.",
    category: "millet",
    price: BigInt(19000),
    weightOptions: [BigInt(500), BigInt(1000)],
  },
  {
    id: BigInt(9),
    name: "Ragi",
    description:
      "Calcium powerhouse finger millet, beloved for its earthy flavour.",
    category: "millet",
    price: BigInt(16000),
    weightOptions: [BigInt(500), BigInt(1000)],
  },
  {
    id: BigInt(10),
    name: "Pearl Millet",
    description:
      "Energy-dense bajra with a robust flavour, perfect for rotis and porridges.",
    category: "millet",
    price: BigInt(15000),
    weightOptions: [BigInt(500), BigInt(1000)],
  },
];

export function useAllProducts() {
  const { actor, isFetching } = useActor();
  return useQuery<Product[]>({
    queryKey: ["all-products"],
    queryFn: async () => {
      if (!actor) return [...FALLBACK_RICE, ...FALLBACK_MILLETS];
      try {
        const products = await actor.getAllProducts();
        if (products.length === 0)
          return [...FALLBACK_RICE, ...FALLBACK_MILLETS];
        return products;
      } catch {
        return [...FALLBACK_RICE, ...FALLBACK_MILLETS];
      }
    },
    enabled: !isFetching,
    placeholderData: [...FALLBACK_RICE, ...FALLBACK_MILLETS],
  });
}

export function useProductsByCategory(category: string) {
  const { actor, isFetching } = useActor();
  const fallback = category === "rice" ? FALLBACK_RICE : FALLBACK_MILLETS;
  return useQuery<Product[]>({
    queryKey: ["products", category],
    queryFn: async () => {
      if (!actor) return fallback;
      try {
        const products = await actor.getProductsByCategory(category);
        if (products.length === 0) return fallback;
        return products;
      } catch {
        return fallback;
      }
    },
    enabled: !isFetching,
    placeholderData: fallback,
  });
}
