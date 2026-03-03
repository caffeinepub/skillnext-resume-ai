import Map "mo:core/Map";
import Array "mo:core/Array";
import Text "mo:core/Text";
import Iter "mo:core/Iter";
import Time "mo:core/Time";
import Nat "mo:core/Nat";
import Order "mo:core/Order";
import Runtime "mo:core/Runtime";
import Float "mo:core/Float";
import Principal "mo:core/Principal";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  public type Category = { #tea; #coffee; #snacks; #biscuits };

  public type Product = {
    id : Nat;
    name : Text;
    category : Category;
    description : Text;
    price : Float;
    imageUrl : Text;
    inStock : Bool;
  };

  public type OrderItem = {
    productId : Nat;
    productName : Text;
    quantity : Nat;
    unitPrice : Float;
  };

  public type OrderStatus = { #pending; #confirmed; #completed };

  public type Order = {
    id : Nat;
    customerName : Text;
    customerId : Principal;
    items : [OrderItem];
    subtotal : Float;
    gstAmount : Float;
    total : Float;
    status : OrderStatus;
    timestamp : Int;
  };

  public type UserProfile = {
    name : Text;
    email : Text;
  };

  module Product {
    public func compare(product1 : Product, product2 : Product) : Order.Order {
      Nat.compare(product1.id, product2.id);
    };
  };

  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  let products = Map.empty<Nat, Product>();
  let orders = Map.empty<Nat, Order>();
  let userProfiles = Map.empty<Principal, UserProfile>();

  var nextProductId = 1;
  var nextOrderId = 1;

  // User Profile Management
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Initialize with 12 sample products
  public shared ({ caller }) func init() : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can initialize products");
    };

    let sampleProducts = [
      {
        id = 1;
        name = "Green Tea";
        category = #tea;
        description = "Refreshing green tea leaves";
        price = 2.5;
        imageUrl = "https://example.com/green-tea.jpg";
        inStock = true;
      },
      {
        id = 2;
        name = "Black Tea";
        category = #tea;
        description = "Strong black tea";
        price = 2.0;
        imageUrl = "https://example.com/black-tea.jpg";
        inStock = true;
      },
      {
        id = 3;
        name = "Espresso";
        category = #coffee;
        description = "Rich espresso coffee";
        price = 3.0;
        imageUrl = "https://example.com/espresso.jpg";
        inStock = true;
      },
      {
        id = 4;
        name = "Latte";
        category = #coffee;
        description = "Smooth latte coffee";
        price = 3.5;
        imageUrl = "https://example.com/latte.jpg";
        inStock = true;
      },
      {
        id = 5;
        name = "Potato Chips";
        category = #snacks;
        description = "Crunchy potato chips";
        price = 1.5;
        imageUrl = "https://example.com/chips.jpg";
        inStock = true;
      },
      {
        id = 6;
        name = "Popcorn";
        category = #snacks;
        description = "Buttery popcorn";
        price = 1.0;
        imageUrl = "https://example.com/popcorn.jpg";
        inStock = true;
      },
      {
        id = 7;
        name = "Chocolate Biscuits";
        category = #biscuits;
        description = "Delicious chocolate biscuits";
        price = 2.2;
        imageUrl = "https://example.com/chocolate-biscuits.jpg";
        inStock = true;
      },
      {
        id = 8;
        name = "Oatmeal Cookies";
        category = #biscuits;
        description = "Healthy oatmeal cookies";
        price = 2.8;
        imageUrl = "https://example.com/oatmeal-cookies.jpg";
        inStock = true;
      },
      {
        id = 9;
        name = "Herbal Tea";
        category = #tea;
        description = "Soothing herbal tea";
        price = 2.7;
        imageUrl = "https://example.com/herbal-tea.jpg";
        inStock = true;
      },
      {
        id = 10;
        name = "Cappuccino";
        category = #coffee;
        description = "Classic cappuccino";
        price = 3.2;
        imageUrl = "https://example.com/cappuccino.jpg";
        inStock = true;
      },
      {
        id = 11;
        name = "Pretzels";
        category = #snacks;
        description = "Salty pretzels";
        price = 1.3;
        imageUrl = "https://example.com/pretzels.jpg";
        inStock = true;
      },
      {
        id = 12;
        name = "Shortbread Cookies";
        category = #biscuits;
        description = "Buttery shortbread cookies";
        price = 2.9;
        imageUrl = "https://example.com/shortbread-cookies.jpg";
        inStock = true;
      },
    ];

    for (product in sampleProducts.values()) {
      products.add(product.id, product);
    };
    nextProductId := 13;
  };

  // Product queries - public access (guests can browse)
  public query ({ caller }) func getProducts() : async [Product] {
    products.values().toArray().sort();
  };

  public query ({ caller }) func getProductsByCategory(category : Category) : async [Product] {
    products.values().toArray().filter(
      func(p) { p.category == category }
    );
  };

  public query ({ caller }) func getProduct(id : Nat) : async Product {
    switch (products.get(id)) {
      case (null) { Runtime.trap("Product not found") };
      case (?product) { product };
    };
  };

  // Product management - admin only
  public shared ({ caller }) func addProduct(product : Product) : async Nat {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can add products");
    };

    let newProduct = {
      product with
      id = nextProductId;
    };
    products.add(nextProductId, newProduct);
    nextProductId += 1;
    newProduct.id;
  };

  public shared ({ caller }) func updateProduct(product : Product) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can update products");
    };

    if (not products.containsKey(product.id)) {
      Runtime.trap("Product not found");
    };

    products.add(product.id, product);
  };

  public shared ({ caller }) func deleteProduct(id : Nat) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can delete products");
    };

    if (not products.containsKey(id)) {
      Runtime.trap("Product not found");
    };

    products.remove(id);
  };

  // Order management
  public shared ({ caller }) func placeOrder(customerName : Text, items : [OrderItem]) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can place orders");
    };

    if (items.size() == 0) {
      Runtime.trap("Order must contain at least one item");
    };

    let subtotal = items.foldLeft(0.0, func(acc, item) { acc + (item.unitPrice * item.quantity.toFloat()) });
    let gstAmount = subtotal * 0.18;
    let total = subtotal + gstAmount;

    let newOrder = {
      id = nextOrderId;
      customerName;
      customerId = caller;
      items;
      subtotal;
      gstAmount;
      total;
      status = #pending;
      timestamp = Time.now();
    };

    orders.add(nextOrderId, newOrder);
    nextOrderId += 1;
    newOrder.id;
  };

  public query ({ caller }) func getOrders() : async [Order] {
    if (AccessControl.isAdmin(accessControlState, caller)) {
      // Admins can see all orders
      orders.values().toArray();
    } else if (AccessControl.hasPermission(accessControlState, caller, #user)) {
      // Users can only see their own orders
      orders.values().toArray().filter(func(order) { order.customerId == caller });
    } else {
      Runtime.trap("Unauthorized: Only users can view orders");
    };
  };

  public query ({ caller }) func getOrder(id : Nat) : async Order {
    switch (orders.get(id)) {
      case (null) { Runtime.trap("Order not found") };
      case (?order) {
        // Admins can see any order, users can only see their own
        if (AccessControl.isAdmin(accessControlState, caller) or order.customerId == caller) {
          order;
        } else {
          Runtime.trap("Unauthorized: Can only view your own orders");
        };
      };
    };
  };

  public shared ({ caller }) func updateOrderStatus(id : Nat, status : OrderStatus) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can update order status");
    };

    switch (orders.get(id)) {
      case (null) { Runtime.trap("Order not found") };
      case (?order) {
        let updatedOrder = {
          order with
          status;
        };
        orders.add(id, updatedOrder);
      };
    };
  };

  public query ({ caller }) func isAdmin() : async Bool {
    AccessControl.isAdmin(accessControlState, caller);
  };
};
