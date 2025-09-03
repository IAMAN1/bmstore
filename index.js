// server/index.ts
import express2 from "express";

// server/routes.ts
import { createServer } from "http";

// server/storage.ts
import { randomUUID } from "crypto";
var MemStorage = class {
  products;
  cartItems;
  admins;
  adminSessions;
  orders;
  users;
  userSessions;
  constructor() {
    this.products = /* @__PURE__ */ new Map();
    this.cartItems = /* @__PURE__ */ new Map();
    this.admins = /* @__PURE__ */ new Map();
    this.adminSessions = /* @__PURE__ */ new Map();
    this.orders = /* @__PURE__ */ new Map();
    this.users = /* @__PURE__ */ new Map();
    this.userSessions = /* @__PURE__ */ new Map();
    this.seedProducts();
    this.seedAdmins();
    this.seedUsers();
  }
  seedProducts() {
    const sampleProducts = [
      {
        name: "Premium Wireless Headphones",
        description: "Noise-canceling technology with 30-hour battery life",
        price: "299.00",
        category: "Electronics",
        imageUrl: "https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
        images: [
          "https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600",
          "https://images.unsplash.com/photo-1484704849700-f032a568e944?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600",
          "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600"
        ],
        inStock: 50,
        featured: 1
      },
      {
        name: "Minimalist Smartphone",
        description: "Clean design meets powerful performance",
        price: "799.00",
        category: "Electronics",
        imageUrl: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
        images: [
          "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600"
        ],
        inStock: 25,
        featured: 1
      },
      {
        name: "Classic Timepiece",
        description: "Timeless design with premium materials",
        price: "199.00",
        category: "Accessories",
        imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
        images: [
          "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600"
        ],
        inStock: 30,
        featured: 1
      },
      {
        name: "Ceramic Coffee Mug",
        description: "Handcrafted ceramic with perfect balance",
        price: "29.00",
        category: "Home",
        imageUrl: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
        images: [
          "https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600"
        ],
        inStock: 100,
        featured: 1
      },
      {
        name: "Ultra-thin Laptop",
        description: "Professional performance in sleek design",
        price: "1299.00",
        category: "Electronics",
        imageUrl: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
        images: [
          "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600"
        ],
        inStock: 15,
        featured: 1
      },
      {
        name: "Ceramic Plant Pot",
        description: "Modern planters for indoor greenery",
        price: "45.00",
        category: "Home",
        imageUrl: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
        images: [
          "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600"
        ],
        inStock: 75,
        featured: 1
      },
      {
        name: "LED Desk Lamp",
        description: "Adjustable lighting with touch controls",
        price: "89.00",
        category: "Home",
        imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
        images: [
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600"
        ],
        inStock: 40,
        featured: 1
      },
      {
        name: "Running Shoes",
        description: "Lightweight comfort meets modern style",
        price: "129.00",
        category: "Fashion",
        imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
        images: [
          "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600"
        ],
        inStock: 60,
        featured: 1
      }
    ];
    sampleProducts.forEach((product) => {
      this.createProduct(product);
    });
  }
  seedAdmins() {
    const defaultAdmin = {
      id: randomUUID(),
      username: "admin",
      password: "admin123",
      // In production, this should be hashed
      name: "Store Administrator",
      email: "admin@bluemart.com",
      role: "admin",
      createdAt: /* @__PURE__ */ new Date()
    };
    this.admins.set(defaultAdmin.id, defaultAdmin);
  }
  seedUsers() {
    const defaultUser = {
      id: randomUUID(),
      username: "user",
      password: "user123",
      // In production, this should be hashed
      name: "General User",
      email: "user@bluemart.com",
      role: "user",
      createdAt: /* @__PURE__ */ new Date()
    };
    this.users.set(defaultUser.id, defaultUser);
  }
  async getProducts(search) {
    let products2 = Array.from(this.products.values());
    if (search?.category) {
      products2 = products2.filter((p) => p.category === search.category);
    }
    if (search?.query) {
      const query = search.query.toLowerCase();
      products2 = products2.filter(
        (p) => p.name.toLowerCase().includes(query) || p.description.toLowerCase().includes(query)
      );
    }
    if (search?.sortBy) {
      switch (search.sortBy) {
        case "price_asc":
          products2.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
          break;
        case "price_desc":
          products2.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
          break;
        case "newest":
          products2.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
          break;
        case "featured":
        default:
          products2.sort((a, b) => b.featured - a.featured);
          break;
      }
    }
    const offset = search?.offset || 0;
    const limit = search?.limit || products2.length;
    return products2.slice(offset, offset + limit);
  }
  async getProduct(id) {
    return this.products.get(id);
  }
  async createProduct(insertProduct) {
    const id = randomUUID();
    const product = {
      ...insertProduct,
      id,
      images: insertProduct.images || [],
      inStock: insertProduct.inStock || 0,
      featured: insertProduct.featured || 0,
      createdAt: /* @__PURE__ */ new Date()
    };
    this.products.set(id, product);
    return product;
  }
  async getCartItems(sessionId) {
    const items = Array.from(this.cartItems.values()).filter((item) => item.sessionId === sessionId);
    const itemsWithProducts = [];
    for (const item of items) {
      const product = this.products.get(item.productId);
      if (product) {
        itemsWithProducts.push({ ...item, product });
      }
    }
    return itemsWithProducts;
  }
  async addToCart(insertItem) {
    const existingItem = Array.from(this.cartItems.values()).find((item) => item.sessionId === insertItem.sessionId && item.productId === insertItem.productId);
    if (existingItem) {
      existingItem.quantity += insertItem.quantity || 1;
      this.cartItems.set(existingItem.id, existingItem);
      return existingItem;
    }
    const id = randomUUID();
    const cartItem = {
      ...insertItem,
      id,
      quantity: insertItem.quantity || 1,
      createdAt: /* @__PURE__ */ new Date()
    };
    this.cartItems.set(id, cartItem);
    return cartItem;
  }
  async updateCartItem(id, quantity) {
    const item = this.cartItems.get(id);
    if (!item) return void 0;
    item.quantity = quantity;
    this.cartItems.set(id, item);
    return item;
  }
  async removeFromCart(id) {
    return this.cartItems.delete(id);
  }
  async clearCart(sessionId) {
    const items = Array.from(this.cartItems.entries()).filter(([_, item]) => item.sessionId === sessionId);
    items.forEach(([id]) => this.cartItems.delete(id));
    return true;
  }
  // Admin methods implementation
  async authenticateAdmin(credentials) {
    const admin = Array.from(this.admins.values()).find((a) => a.username === credentials.username && a.password === credentials.password);
    return admin || null;
  }
  async createAdmin(adminData) {
    const id = randomUUID();
    const admin = {
      ...adminData,
      id,
      role: "admin",
      createdAt: /* @__PURE__ */ new Date()
    };
    this.admins.set(id, admin);
    return admin;
  }
  async createAdminSession(adminId) {
    const sessionId = randomUUID();
    const token = randomUUID();
    const expiresAt = /* @__PURE__ */ new Date();
    expiresAt.setHours(expiresAt.getHours() + 24);
    const session = {
      id: sessionId,
      adminId,
      token,
      expiresAt,
      createdAt: /* @__PURE__ */ new Date()
    };
    this.adminSessions.set(token, session);
    return session;
  }
  async validateAdminSession(token) {
    const session = this.adminSessions.get(token);
    if (!session || session.expiresAt < /* @__PURE__ */ new Date()) {
      if (session) {
        this.adminSessions.delete(token);
      }
      return null;
    }
    const admin = this.admins.get(session.adminId);
    return admin || null;
  }
  async deleteAdminSession(token) {
    return this.adminSessions.delete(token);
  }
  async updateProduct(id, productData) {
    const existingProduct = this.products.get(id);
    if (!existingProduct) return void 0;
    const updatedProduct = {
      ...existingProduct,
      ...productData,
      id,
      // Keep original ID
      createdAt: existingProduct.createdAt
      // Keep original creation date
    };
    this.products.set(id, updatedProduct);
    return updatedProduct;
  }
  async deleteProduct(id) {
    return this.products.delete(id);
  }
  async getAdminStats() {
    const products2 = Array.from(this.products.values());
    const categories = new Set(products2.map((p) => p.category));
    return {
      totalProducts: products2.length,
      totalCategories: categories.size,
      lowStockProducts: products2.filter((p) => p.inStock < 10).length,
      featuredProducts: products2.filter((p) => p.featured > 0).length
    };
  }
  // Order management methods
  async createOrder(orderData) {
    const id = randomUUID();
    const orderNumber = `ORD-${Date.now()}`;
    const order = {
      id,
      orderNumber,
      customerName: orderData.customerName,
      customerEmail: orderData.customerEmail,
      customerPhone: orderData.customerPhone || null,
      shippingAddress: orderData.shippingAddress,
      totalAmount: orderData.totalAmount,
      status: "pending",
      transferSlipUrl: orderData.transferSlipUrl || null,
      transferSlipFilename: orderData.transferSlipFilename || null,
      notes: null,
      items: JSON.stringify(orderData.items),
      createdAt: /* @__PURE__ */ new Date(),
      verifiedAt: null,
      verifiedBy: null
    };
    this.orders.set(id, order);
    return order;
  }
  async getOrders() {
    return Array.from(this.orders.values()).sort((a, b) => {
      return (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0);
    });
  }
  async getOrder(orderId) {
    return this.orders.get(orderId);
  }
  async updateOrderStatus(updateData) {
    const order = this.orders.get(updateData.orderId);
    if (!order) return void 0;
    const updatedOrder = {
      ...order,
      status: updateData.status,
      notes: updateData.notes || order.notes,
      verifiedAt: updateData.status === "verified" ? /* @__PURE__ */ new Date() : order.verifiedAt
      // verifiedBy would be set by the calling function with admin ID
    };
    this.orders.set(updateData.orderId, updatedOrder);
    return updatedOrder;
  }
  async deleteOrder(orderId) {
    return this.orders.delete(orderId);
  }
  async getPendingOrders() {
    return Array.from(this.orders.values()).filter((order) => order.status === "pending").sort((a, b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0));
  }
  // User authentication methods
  async authenticateUser(credentials) {
    const user = Array.from(this.users.values()).find((u) => u.username === credentials.username && u.password === credentials.password);
    return user || null;
  }
  async createUser(userData) {
    const id = randomUUID();
    const user = {
      ...userData,
      id,
      role: "user",
      createdAt: /* @__PURE__ */ new Date()
    };
    this.users.set(id, user);
    return user;
  }
  async createUserSession(userId) {
    const sessionId = randomUUID();
    const token = randomUUID();
    const expiresAt = /* @__PURE__ */ new Date();
    expiresAt.setHours(expiresAt.getHours() + 24);
    const session = {
      id: sessionId,
      userId,
      token,
      expiresAt,
      createdAt: /* @__PURE__ */ new Date()
    };
    this.userSessions.set(token, session);
    return session;
  }
  async validateUserSession(token) {
    const session = this.userSessions.get(token);
    if (!session || session.expiresAt < /* @__PURE__ */ new Date()) {
      if (session) {
        this.userSessions.delete(token);
      }
      return null;
    }
    const user = this.users.get(session.userId);
    return user || null;
  }
  async deleteUserSession(token) {
    return this.userSessions.delete(token);
  }
};
var storage = new MemStorage();

// shared/schema.ts
import { sql } from "drizzle-orm";
import { pgTable, text, varchar, decimal, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
var products = pgTable("products", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  category: text("category").notNull(),
  imageUrl: text("image_url").notNull(),
  images: text("images").array().notNull().default(sql`'{}'::text[]`),
  inStock: integer("in_stock").notNull().default(0),
  featured: integer("featured").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow()
});
var cartItems = pgTable("cart_items", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  sessionId: text("session_id").notNull(),
  productId: varchar("product_id").notNull().references(() => products.id),
  quantity: integer("quantity").notNull().default(1),
  createdAt: timestamp("created_at").defaultNow()
});
var insertProductSchema = createInsertSchema(products).omit({
  id: true,
  createdAt: true
});
var insertCartItemSchema = createInsertSchema(cartItems).omit({
  id: true,
  createdAt: true
});
var productSearchSchema = z.object({
  query: z.string().optional(),
  category: z.string().optional(),
  sortBy: z.enum(["featured", "price_asc", "price_desc", "newest"]).optional(),
  limit: z.number().min(1).max(100).optional(),
  offset: z.number().min(0).optional()
});
var admins = pgTable("admins", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  role: text("role").notNull().default("admin"),
  createdAt: timestamp("created_at").defaultNow()
});
var adminSessions = pgTable("admin_sessions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  adminId: varchar("admin_id").notNull().references(() => admins.id),
  token: text("token").notNull().unique(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow()
});
var adminLoginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required")
});
var adminRegisterSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email is required")
});
var updateProductSchema = insertProductSchema.partial().extend({
  id: z.string()
});
var productActionSchema = z.object({
  action: z.enum(["create", "update", "delete"]),
  productData: z.union([insertProductSchema, updateProductSchema]).optional(),
  productId: z.string().optional()
});
var users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  createdAt: timestamp("created_at").defaultNow()
});
var userSessions = pgTable("user_sessions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  token: text("token").notNull().unique(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow()
});
var userLoginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required")
});
var userRegisterSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email is required")
});
var orders = pgTable("orders", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  orderNumber: text("order_number").notNull().unique(),
  customerName: text("customer_name").notNull(),
  customerEmail: text("customer_email").notNull(),
  customerPhone: text("customer_phone"),
  shippingAddress: text("shipping_address").notNull(),
  totalAmount: decimal("total_amount", { precision: 10, scale: 2 }).notNull(),
  status: text("status").notNull().default("pending"),
  // pending, verified, processing, shipped, delivered, cancelled
  transferSlipUrl: text("transfer_slip_url"),
  // URL to the uploaded transfer slip image
  transferSlipFilename: text("transfer_slip_filename"),
  // Original filename
  notes: text("notes"),
  // Admin notes
  items: text("items").notNull(),
  // JSON string of order items
  createdAt: timestamp("created_at").defaultNow(),
  verifiedAt: timestamp("verified_at"),
  verifiedBy: varchar("verified_by").references(() => admins.id)
});
var createOrderSchema = z.object({
  customerName: z.string().min(1, "Customer name is required"),
  customerEmail: z.string().email("Valid email is required"),
  customerPhone: z.string().optional(),
  shippingAddress: z.string().min(1, "Shipping address is required"),
  totalAmount: z.string().min(1, "Total amount is required"),
  items: z.array(z.object({
    id: z.string(),
    name: z.string(),
    price: z.string(),
    quantity: z.number(),
    imageUrl: z.string()
  })),
  transferSlipUrl: z.string().optional(),
  transferSlipFilename: z.string().optional()
});
var updateOrderStatusSchema = z.object({
  orderId: z.string(),
  status: z.enum(["pending", "verified", "processing", "shipped", "delivered", "cancelled"]),
  notes: z.string().optional()
});

// server/routes.ts
import { z as z2 } from "zod";
async function registerRoutes(app2) {
  app2.get("/api/products", async (req, res) => {
    try {
      const search = productSearchSchema.parse({
        query: req.query.query,
        category: req.query.category,
        sortBy: req.query.sortBy,
        limit: req.query.limit ? parseInt(req.query.limit) : void 0,
        offset: req.query.offset ? parseInt(req.query.offset) : void 0
      });
      const products2 = await storage.getProducts(search);
      res.json(products2);
    } catch (error) {
      res.status(400).json({ message: "Invalid search parameters" });
    }
  });
  app2.get("/api/products/:id", async (req, res) => {
    try {
      const product = await storage.getProduct(req.params.id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: "Error fetching product" });
    }
  });
  app2.get("/api/cart", async (req, res) => {
    try {
      const sessionId = req.query.sessionId || "default";
      const cartItems2 = await storage.getCartItems(sessionId);
      res.json(cartItems2);
    } catch (error) {
      res.status(500).json({ message: "Error fetching cart" });
    }
  });
  app2.post("/api/cart", async (req, res) => {
    try {
      const sessionId = req.body.sessionId || "default";
      const cartItemData = insertCartItemSchema.parse({
        ...req.body,
        sessionId
      });
      const cartItem = await storage.addToCart(cartItemData);
      res.status(201).json(cartItem);
    } catch (error) {
      if (error instanceof z2.ZodError) {
        return res.status(400).json({ message: "Invalid cart item data", errors: error.errors });
      }
      res.status(500).json({ message: "Error adding to cart" });
    }
  });
  app2.put("/api/cart/:id", async (req, res) => {
    try {
      const { quantity } = req.body;
      if (typeof quantity !== "number" || quantity < 0) {
        return res.status(400).json({ message: "Invalid quantity" });
      }
      if (quantity === 0) {
        const success = await storage.removeFromCart(req.params.id);
        return res.json({ success });
      }
      const cartItem = await storage.updateCartItem(req.params.id, quantity);
      if (!cartItem) {
        return res.status(404).json({ message: "Cart item not found" });
      }
      res.json(cartItem);
    } catch (error) {
      res.status(500).json({ message: "Error updating cart item" });
    }
  });
  app2.delete("/api/cart/:id", async (req, res) => {
    try {
      const success = await storage.removeFromCart(req.params.id);
      res.json({ success });
    } catch (error) {
      res.status(500).json({ message: "Error removing from cart" });
    }
  });
  app2.delete("/api/cart", async (req, res) => {
    try {
      const sessionId = req.query.sessionId || "default";
      const success = await storage.clearCart(sessionId);
      res.json({ success });
    } catch (error) {
      res.status(500).json({ message: "Error clearing cart" });
    }
  });
  app2.get("/api/categories", async (req, res) => {
    try {
      const products2 = await storage.getProducts();
      const categories = Array.from(new Set(products2.map((p) => p.category)));
      res.json(categories);
    } catch (error) {
      res.status(500).json({ message: "Error fetching categories" });
    }
  });
  app2.post("/api/checkout", async (req, res) => {
    try {
      const { sessionId = "default", customerInfo, transferSlipUrl, transferSlipFilename, items, total } = req.body;
      const orderData = createOrderSchema.parse({
        customerName: `${customerInfo.firstName} ${customerInfo.lastName}`,
        customerEmail: customerInfo.email,
        customerPhone: customerInfo.phone,
        shippingAddress: `${customerInfo.address}, ${customerInfo.city}, ${customerInfo.state} ${customerInfo.zipCode}`,
        totalAmount: total.toString(),
        items: items.map((item) => ({
          id: item.product.id,
          name: item.product.name,
          price: item.product.price,
          quantity: item.quantity,
          imageUrl: item.product.imageUrl
        })),
        transferSlipUrl,
        transferSlipFilename
      });
      const order = await storage.createOrder(orderData);
      await storage.clearCart(sessionId);
      res.json({
        success: true,
        orderId: order.orderNumber,
        message: "Order placed successfully! Please wait for admin verification.",
        order: {
          orderNumber: order.orderNumber,
          status: order.status,
          totalAmount: order.totalAmount,
          createdAt: order.createdAt
        }
      });
    } catch (error) {
      if (error instanceof z2.ZodError) {
        return res.status(400).json({ message: "Invalid order data", errors: error.errors });
      }
      res.status(500).json({ message: "Checkout failed" });
    }
  });
  app2.post("/api/auth/login", async (req, res) => {
    try {
      const credentials = userLoginSchema.parse(req.body);
      const user = await storage.authenticateUser(credentials);
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      const session = await storage.createUserSession(user.id);
      res.json({
        user: {
          id: user.id,
          username: user.username,
          name: user.name,
          email: user.email
        },
        token: session.token,
        expiresAt: session.expiresAt
      });
    } catch (error) {
      if (error instanceof z2.ZodError) {
        return res.status(400).json({ message: "Invalid input", errors: error.errors });
      }
      res.status(500).json({ message: "Login failed" });
    }
  });
  app2.post("/api/auth/register", async (req, res) => {
    try {
      const userData = userRegisterSchema.parse(req.body);
      const user = await storage.createUser(userData);
      res.status(201).json({
        user: {
          id: user.id,
          username: user.username,
          name: user.name,
          email: user.email
        }
      });
    } catch (error) {
      if (error instanceof z2.ZodError) {
        return res.status(400).json({ message: "Invalid input", errors: error.errors });
      }
      res.status(500).json({ message: "Registration failed" });
    }
  });
  app2.post("/api/auth/logout", async (req, res) => {
    try {
      const token = req.headers.authorization?.replace("Bearer ", "");
      if (token) {
        await storage.deleteUserSession(token);
      }
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ message: "Logout failed" });
    }
  });
  const requireUserAuth = async (req, res, next) => {
    try {
      const token = req.headers.authorization?.replace("Bearer ", "");
      if (!token) {
        return res.status(401).json({ message: "Authentication required" });
      }
      const user = await storage.validateUserSession(token);
      if (!user) {
        return res.status(401).json({ message: "Invalid or expired session" });
      }
      req.user = user;
      next();
    } catch (error) {
      res.status(500).json({ message: "Authentication error" });
    }
  };
  app2.post("/api/admin/login", async (req, res) => {
    try {
      const credentials = adminLoginSchema.parse(req.body);
      const admin = await storage.authenticateAdmin(credentials);
      if (!admin) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      const session = await storage.createAdminSession(admin.id);
      res.json({
        admin: {
          id: admin.id,
          username: admin.username,
          name: admin.name,
          email: admin.email,
          role: admin.role
        },
        token: session.token,
        expiresAt: session.expiresAt
      });
    } catch (error) {
      if (error instanceof z2.ZodError) {
        return res.status(400).json({ message: "Invalid input", errors: error.errors });
      }
      res.status(500).json({ message: "Login failed" });
    }
  });
  app2.post("/api/admin/logout", async (req, res) => {
    try {
      const token = req.headers.authorization?.replace("Bearer ", "");
      if (token) {
        await storage.deleteAdminSession(token);
      }
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ message: "Logout failed" });
    }
  });
  app2.post("/api/admin/register", async (req, res) => {
    try {
      const adminData = adminRegisterSchema.parse(req.body);
      const admin = await storage.createAdmin(adminData);
      res.status(201).json({
        admin: {
          id: admin.id,
          username: admin.username,
          name: admin.name,
          email: admin.email,
          role: admin.role
        }
      });
    } catch (error) {
      if (error instanceof z2.ZodError) {
        return res.status(400).json({ message: "Invalid input", errors: error.errors });
      }
      res.status(500).json({ message: "Registration failed" });
    }
  });
  const requireAdminAuth = async (req, res, next) => {
    try {
      const token = req.headers.authorization?.replace("Bearer ", "");
      if (!token) {
        return res.status(401).json({ message: "Authentication required" });
      }
      const admin = await storage.validateAdminSession(token);
      if (!admin) {
        return res.status(401).json({ message: "Invalid or expired session" });
      }
      req.admin = admin;
      next();
    } catch (error) {
      res.status(500).json({ message: "Authentication error" });
    }
  };
  app2.get("/api/admin/stats", requireAdminAuth, async (req, res) => {
    try {
      const stats = await storage.getAdminStats();
      res.json(stats);
    } catch (error) {
      res.status(500).json({ message: "Error fetching stats" });
    }
  });
  app2.post("/api/admin/products", requireAdminAuth, async (req, res) => {
    try {
      const productData = insertProductSchema.parse(req.body);
      const product = await storage.createProduct(productData);
      res.status(201).json(product);
    } catch (error) {
      if (error instanceof z2.ZodError) {
        return res.status(400).json({ message: "Invalid product data", errors: error.errors });
      }
      res.status(500).json({ message: "Error creating product" });
    }
  });
  app2.put("/api/admin/products/:id", requireAdminAuth, async (req, res) => {
    try {
      const productData = updateProductSchema.parse({ ...req.body, id: req.params.id });
      const product = await storage.updateProduct(req.params.id, productData);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json(product);
    } catch (error) {
      if (error instanceof z2.ZodError) {
        return res.status(400).json({ message: "Invalid product data", errors: error.errors });
      }
      res.status(500).json({ message: "Error updating product" });
    }
  });
  app2.delete("/api/admin/products/:id", requireAdminAuth, async (req, res) => {
    try {
      const success = await storage.deleteProduct(req.params.id);
      if (!success) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ message: "Error deleting product" });
    }
  });
  app2.get("/api/admin/orders", requireAdminAuth, async (req, res) => {
    try {
      const orders2 = await storage.getOrders();
      res.json(orders2);
    } catch (error) {
      res.status(500).json({ message: "Error fetching orders" });
    }
  });
  app2.get("/api/admin/orders/pending", requireAdminAuth, async (req, res) => {
    try {
      const pendingOrders = await storage.getPendingOrders();
      res.json(pendingOrders);
    } catch (error) {
      res.status(500).json({ message: "Error fetching pending orders" });
    }
  });
  app2.get("/api/admin/orders/:id", requireAdminAuth, async (req, res) => {
    try {
      const order = await storage.getOrder(req.params.id);
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
      res.json(order);
    } catch (error) {
      res.status(500).json({ message: "Error fetching order" });
    }
  });
  app2.put("/api/admin/orders/:id/status", requireAdminAuth, async (req, res) => {
    try {
      const updateData = updateOrderStatusSchema.parse({
        orderId: req.params.id,
        ...req.body
      });
      const order = await storage.updateOrderStatus(updateData);
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
      res.json(order);
    } catch (error) {
      if (error instanceof z2.ZodError) {
        return res.status(400).json({ message: "Invalid status update data", errors: error.errors });
      }
      res.status(500).json({ message: "Error updating order status" });
    }
  });
  app2.delete("/api/admin/orders/:id", requireAdminAuth, async (req, res) => {
    try {
      const success = await storage.deleteOrder(req.params.id);
      if (!success) {
        return res.status(404).json({ message: "Order not found" });
      }
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ message: "Error deleting order" });
    }
  });
  app2.post("/api/upload/transfer-slip", async (req, res) => {
    try {
      const { imageData, filename } = req.body;
      if (!imageData || !filename) {
        return res.status(400).json({ message: "Image data and filename are required" });
      }
      const mockUrl = `https://example.com/transfer-slips/${Date.now()}_${filename}`;
      res.json({
        success: true,
        url: mockUrl,
        filename,
        message: "Transfer slip uploaded successfully"
      });
    } catch (error) {
      res.status(500).json({ message: "File upload failed" });
    }
  });
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path2 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets")
    }
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"]
    }
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = parseInt(process.env.PORT || "5000", 10);
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true
  }, () => {
    log(`serving on port ${port}`);
  });
})();
