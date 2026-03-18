import { Toaster } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CartSidebar } from "./components/CartSidebar";
import { FeaturedProducts } from "./components/FeaturedProducts";
import { HeroSection } from "./components/HeroSection";
import { Navbar } from "./components/Navbar";
import { OurMillets } from "./components/OurMillets";
import { OurPromise } from "./components/OurPromise";
import { SiteFooter } from "./components/SiteFooter";
import { TraditionalRice } from "./components/TraditionalRice";
import { WhyChoose } from "./components/WhyChoose";
import { CartProvider } from "./context/CartContext";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <div className="min-h-screen bg-background flex flex-col">
          <Navbar />
          <main className="flex-1">
            <HeroSection />
            <WhyChoose />
            <FeaturedProducts />
            <TraditionalRice />
            <OurMillets />
            <OurPromise />
          </main>
          <SiteFooter />
          <CartSidebar />
          <Toaster richColors />
        </div>
      </CartProvider>
    </QueryClientProvider>
  );
}
