// ============================================================
//  DATABASE.JS – Customer Business Data
//  Edit this file to match YOUR business.
// ============================================================

// ---------- BUSINESS INFORMATION ----------
const businessInfo = {
  name: "Nothing Before Coffee",
  tagline: "Premium Coffee at Affordable Prices",
  location: "Jaipur",
  since: 2017,
  rating: 4.8,
  reviewCount: 5000,
  founders: "Akshay Kedia and Ankesh Jain",
  uniqueSellingPoint: "over 110 items on the menu",
  specialOffer: "₹100 coffee offer"
};

// ---------- PRODUCT CATEGORIES ----------
const categories = [
  {
    name: "Hot Coffee",
    products: ["Americano", "Cappuccino", "Latte", "Espresso", "Macchiato", "Irish Coffee", "Hot Chocolate"]
  },
  {
    name: "Cold Coffee",
    products: ["Iced Americano", "Iced Latte", "Cold Brew", "Iced Mocha", "Cold Coffee with Ice Cream"]
  },
  {
    name: "Shrappe (Frappe)",
    products: ["Classic Shrappe", "Caramel Shrappe", "Mocha Shrappe", "Vanilla Shrappe", "Hazelnut Shrappe"]
  },
  {
    name: "Shakes",
    products: ["Chocolate Shake", "Strawberry Shake", "Vanilla Shake", "Oreo Shake", "KitKat Shake", "Banana Shake"]
  },
  {
    name: "Food & Snacks",
    products: ["Tandoori Maggi", "Veg Burger", "Cheese Sandwich", "French Fries", "Pizza", "Garlic Bread"]
  },
  {
    name: "Desserts",
    products: ["Brownie with Ice Cream", "Chocolate Mousse", "Cheesecake", "Waffles", "Pastries"]
  }
];

// ---------- SELECTABLE ATTRIBUTES ----------
const attributes = [
  { id: 'service', label: 'Friendly Staff', category: 'service' },
  { id: 'ambience', label: 'Great Ambience', category: 'ambience' },
  { id: 'value', label: 'Value for Money', category: 'value' },
  { id: 'speed', label: 'Quick Service', category: 'service' },
  { id: 'music', label: 'Good Music / Vibe', category: 'ambience' },
  { id: 'seating', label: 'Comfortable Seating', category: 'ambience' },
  { id: 'outdoor', label: 'Outdoor Seating', category: 'ambience' },
  { id: 'clean', label: 'Clean & Hygienic', category: 'ambience' }
];