import Array "mo:core/Array";
import Map "mo:core/Map";
import Text "mo:core/Text";
import Iter "mo:core/Iter";
import Runtime "mo:core/Runtime";

actor {
  // Data types
  type Product = {
    id : Nat;
    name : Text;
    description : Text;
    category : Text;
    price : Nat;
    weightOptions : [Nat];
  };

  type CartItem = {
    product : Product;
    quantity : Nat;
  };

  // Product storage
  let initialProducts = [
    {
      id = 1;
      name = "Mappilla Samba";
      description = "Traditional rice variety";
      category = "Traditional Rice";
      price = 500;
      weightOptions = [1_000, 5_000];
    },
    {
      id = 2;
      name = "Thooyamali";
      description = "Aromatic rice variety";
      category = "Traditional Rice";
      price = 450;
      weightOptions = [1_000, 5_000];
    },
    {
      id = 3;
      name = "Black Rice";
      description = "Nutrient-rich rice variety";
      category = "Traditional Rice";
      price = 600;
      weightOptions = [1_000, 5_000];
    },
    {
      id = 4;
      name = "Pootniyanam";
      description = "Traditional rice variety from Tamil Nadu";
      category = "Traditional Rice";
      price = 550;
      weightOptions = [1_000, 5_000];
    },
    {
      id = 5;
      name = "Nanwara";
      description = "Rare traditional rice variety";
      category = "Traditional Rice";
      price = 700;
      weightOptions = [1_000, 5_000];
    },
    {
      id = 6;
      name = "Foxtail Millet";
      description = "Healthy millet alternative";
      category = "Millets";
      price = 300;
      weightOptions = [500, 1_000];
    },
    {
      id = 7;
      name = "Little Millet";
      description = "Nutrient-rich millet";
      category = "Millets";
      price = 250;
      weightOptions = [500, 1_000];
    },
    {
      id = 8;
      name = "Kodo Millet";
      description = "Popular millet variety";
      category = "Millets";
      price = 275;
      weightOptions = [500, 1_000];
    },
    {
      id = 9;
      name = "Ragi";
      description = "High in calcium millet";
      category = "Millets";
      price = 200;
      weightOptions = [500, 1_000];
    },
    {
      id = 10;
      name = "Pearl Millet";
      description = "Rich in nutrients";
      category = "Millets";
      price = 225;
      weightOptions = [500, 1_000];
    },
  ];

  let products = Map.empty<Nat, Product>();
  for (product in initialProducts.values()) {
    products.add(product.id, product);
  };

  // Cart storage (single cart for demo)
  let cart = Map.empty<Nat, CartItem>();

  // Product methods
  public query ({ caller }) func getAllProducts() : async [Product] {
    products.values().toArray();
  };

  public query ({ caller }) func getProductsByCategory(category : Text) : async [Product] {
    products.values().filter(func(p) { p.category == category }).toArray();
  };

  public query ({ caller }) func getProduct(productId : Nat) : async Product {
    switch (products.get(productId)) {
      case (null) { Runtime.trap("Product does not exist") };
      case (?product) { product };
    };
  };

  // Shopping cart methods
  public shared ({ caller }) func addToCart(productId : Nat, quantity : Nat) : async () {
    if (quantity <= 0) { Runtime.trap("Quantity must be greater than 0") };
    switch (products.get(productId)) {
      case (null) { Runtime.trap("Product does not exist") };
      case (?product) {
        if (cart.containsKey(productId)) { Runtime.trap("Item is already in the cart") };
        let cartItem : CartItem = { product; quantity };
        cart.add(productId, cartItem);
      };
    };
  };

  public shared ({ caller }) func removeFromCart(productId : Nat) : async () {
    cart.remove(productId);
  };

  public shared ({ caller }) func clearCart() : async () {
    cart.clear();
  };

  public query ({ caller }) func getCart() : async [CartItem] {
    cart.values().toArray();
  };
};
