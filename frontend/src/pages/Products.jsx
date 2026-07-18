import React, { useState, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { isLoggedIn } from "../components/ProtectedAction";

const allProducts = [
  { id: 1, name: "Vitamin C Brightening Serum", brand: "Minimalist", price: 599, originalPrice: 799, discount: 25, image: "/images/products/vitamin-c-serum.png", category: "Skincare", skinType: "combination", rating: 4.8, reviews: 1456 },
  { id: 2, name: "Hydrating Sunscreen SPF 50", brand: "Dot & Key", price: 449, originalPrice: 549, discount: 18, image: "/images/products/sunscreen-spf50.png", category: "Skincare", skinType: "oily", rating: 4.5, reviews: 890 },
  { id: 3, name: "Niacinamide 10% Face Serum", brand: "The Ordinary", price: 699, originalPrice: 899, discount: 22, image: "/images/products/niacinamide-serum.png", category: "Skincare", skinType: "oily", rating: 4.6, reviews: 1203 },
  { id: 4, name: "Rose Water Toner", brand: "Plum", price: 299, originalPrice: 350, discount: 15, image: "/images/products/rose-water-toner.png", category: "Skincare", skinType: "sensitive", rating: 4.4, reviews: 567 },
  { id: 5, name: "Retinol Night Cream", brand: "Olay", price: 999, originalPrice: 1299, discount: 23, image: "/images/products/retinol-night-cream.png", category: "Skincare", skinType: "dry", rating: 4.6, reviews: 445 },
  { id: 6, name: "Lip Butter Balm", brand: "Laneige", price: 1850, originalPrice: 2100, discount: 12, image: "/images/products/lip-butter-balm.png", category: "Makeup", skinType: "all", rating: 4.8, reviews: 678 },
  { id: 7, name: "Aloe Vera Gel", brand: "Mamaearth", price: 199, originalPrice: 249, discount: 20, image: "/images/products/aloe-vera-gel.png", category: "Skincare", skinType: "all", rating: 4.4, reviews: 789 },
  { id: 8, name: "Sheet Mask Combo", brand: "WOW", price: 399, originalPrice: 499, discount: 20, image: "/images/products/sheet-mask-combo.png", category: "Skincare", skinType: "all", rating: 4.5, reviews: 345 },
  { id: 9, name: "Matte Lipstick Set", brand: "Plum", price: 799, originalPrice: 999, discount: 20, image: "/images/products/matte-lipstick.png", category: "Makeup", skinType: "all", rating: 4.3, reviews: 234 },
  { id: 10, name: "Kajal Eyeliner", brand: "Mamaearth", price: 249, originalPrice: 299, discount: 17, image: "/images/products/kajal-eyeliner.png", category: "Makeup", skinType: "all", rating: 4.5, reviews: 567 },
  { id: 11, name: "Hair Growth Serum", brand: "Minimalist", price: 849, originalPrice: 1099, discount: 23, image: "/images/products/hair-growth-serum.png", category: "Haircare", skinType: "all", rating: 4.6, reviews: 892 },
  { id: 12, name: "Argan Oil Hair Mask", brand: "WOW", price: 599, originalPrice: 749, discount: 20, image: "/images/products/argan-hair-mask.png", category: "Haircare", skinType: "all", rating: 4.7, reviews: 445 },
  { id: 13, name: "Caffeine Eye Serum", brand: "The Ordinary", price: 549, originalPrice: 699, discount: 21, image: "/images/products/caffeine-eye-serum.png", category: "Skincare", skinType: "all", rating: 4.5, reviews: 678 },
  { id: 14, name: "Body Lotion SPF 30", brand: "Dot & Key", price: 449, originalPrice: 549, discount: 18, image: "/images/products/body-lotion-spf30.png", category: "Bath & Body", skinType: "dry", rating: 4.4, reviews: 321 },
  { id: 15, name: "Vitamin E Face Oil", brand: "Plum", price: 699, originalPrice: 899, discount: 22, image: "/images/products/vitamin-e-face-oil.png", category: "Skincare", skinType: "dry", rating: 4.6, reviews: 456 },
  { id: 16, name: "Charcoal Face Wash", brand: "Mamaearth", price: 299, originalPrice: 349, discount: 14, image: "/images/products/charcoal-face-wash.png", category: "Skincare", skinType: "oily", rating: 4.3, reviews: 789 },
];

const categories = ["All", "Skincare", "Makeup", "Haircare", "Bath & Body"];
const skinTypes = ["All", "Dry", "Oily", "Combination", "Sensitive"];
const brands = ["All", "Minimalist", "Dot & Key", "The Ordinary", "Plum", "Olay", "Laneige", "Mamaearth", "WOW"];
const priceRanges = [
  { label: "All", min: 0, max: Infinity },
  { label: "Under ₹300", min: 0, max: 300 },
  { label: "₹300 - ₹600", min: 300, max: 600 },
  { label: "₹600 - ₹1000", min: 600, max: 1000 },
  { label: "Above ₹1000", min: 1000, max: Infinity },
];
const sortOptions = [
  { label: "Relevance", value: "relevance" },
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Price: High to Low", value: "price_desc" },
  { label: "Highest Rated", value: "rating" },
  { label: "Most Reviewed", value: "reviews" },
  { label: "Biggest Discount", value: "discount" },
];

const Products = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { addToCart } = useCart();

  const urlCategory = searchParams.get("category");

  const [selectedCategory, setSelectedCategory] = useState(urlCategory || "All");
  const [selectedSkinType, setSelectedSkinType] = useState("All");
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [selectedPrice, setSelectedPrice] = useState(priceRanges[0]);
  const [sortBy, setSortBy] = useState("relevance");
  const [searchQuery, setSearchQuery] = useState("");
  const [wishlist, setWishlist] = useState([]);

  const filteredProducts = useMemo(() => {
    let result = [...allProducts];

    if (searchQuery) {
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.brand.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory !== "All") {
      result = result.filter((p) => p.category === selectedCategory);
    }

    if (selectedSkinType !== "All") {
      result = result.filter(
        (p) => p.skinType === selectedSkinType.toLowerCase() || p.skinType === "all"
      );
    }

    if (selectedBrand !== "All") {
      result = result.filter((p) => p.brand === selectedBrand);
    }

    result = result.filter(
      (p) => p.price >= selectedPrice.min && p.price <= selectedPrice.max
    );

    switch (sortBy) {
      case "price_asc": result.sort((a, b) => a.price - b.price); break;
      case "price_desc": result.sort((a, b) => b.price - a.price); break;
      case "rating": result.sort((a, b) => b.rating - a.rating); break;
      case "reviews": result.sort((a, b) => b.reviews - a.reviews); break;
      case "discount": result.sort((a, b) => b.discount - a.discount); break;
      default: break;
    }

    return result;
  }, [selectedCategory, selectedSkinType, selectedBrand, selectedPrice, sortBy, searchQuery]);

  const toggleWishlist = (id) => {
    if (!isLoggedIn()) { navigate("/login"); return; }
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const clearFilters = () => {
    setSelectedCategory("All");
    setSelectedSkinType("All");
    setSelectedBrand("All");
    setSelectedPrice(priceRanges[0]);
    setSortBy("relevance");
    setSearchQuery("");
  };

  const activeFiltersCount = [
    selectedCategory !== "All",
    selectedSkinType !== "All",
    selectedBrand !== "All",
    selectedPrice.label !== "All",
  ].filter(Boolean).length;

  return (
    <div className="min-h-screen bg-cream pb-16">

      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-primaryDark text-white px-4 py-8 text-center">
        <h1 className="text-2xl md:text-3xl font-bold mb-1">All Products</h1>
        <p className="text-white/80 text-sm">
          Discover {allProducts.length}+ curated beauty products
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-6">

        {/* Search */}
        <div className="bg-white rounded-2xl shadow-sm p-4 mb-4">
          <div className="flex items-center border border-gray-200 rounded-full px-4 py-2.5 focus-within:border-primary bg-cream">
            <svg className="w-4 h-4 text-gray-400 mr-2 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search products or brands..."
              className="w-full text-sm outline-none bg-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery("")} className="text-gray-400 hover:text-gray-600 ml-2">✕</button>
            )}
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-sm p-4 mb-6">
          <div className="flex flex-wrap gap-3 items-end">

            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-400 font-medium">Category</label>
              <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}
                className="border border-gray-200 rounded-full px-3 py-1.5 text-sm outline-none focus:border-primary bg-cream cursor-pointer">
                {categories.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-400 font-medium">Skin Type</label>
              <select value={selectedSkinType} onChange={(e) => setSelectedSkinType(e.target.value)}
                className="border border-gray-200 rounded-full px-3 py-1.5 text-sm outline-none focus:border-primary bg-cream cursor-pointer">
                {skinTypes.map((s) => <option key={s}>{s}</option>)}
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-400 font-medium">Brand</label>
              <select value={selectedBrand} onChange={(e) => setSelectedBrand(e.target.value)}
                className="border border-gray-200 rounded-full px-3 py-1.5 text-sm outline-none focus:border-primary bg-cream cursor-pointer">
                {brands.map((b) => <option key={b}>{b}</option>)}
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-400 font-medium">Price Range</label>
              <select value={selectedPrice.label}
                onChange={(e) => setSelectedPrice(priceRanges.find((p) => p.label === e.target.value))}
                className="border border-gray-200 rounded-full px-3 py-1.5 text-sm outline-none focus:border-primary bg-cream cursor-pointer">
                {priceRanges.map((p) => <option key={p.label}>{p.label}</option>)}
              </select>
            </div>

            <div className="flex flex-col gap-1 ml-auto">
              <label className="text-xs text-gray-400 font-medium">Sort By</label>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-200 rounded-full px-3 py-1.5 text-sm outline-none focus:border-primary bg-cream cursor-pointer">
                {sortOptions.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
              </select>
            </div>

            {activeFiltersCount > 0 && (
              <button onClick={clearFilters}
                className="text-xs text-red-400 hover:text-red-600 border border-red-200 px-3 py-1.5 rounded-full hover:bg-red-50 transition">
                Clear All ({activeFiltersCount})
              </button>
            )}
          </div>
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-gray-500">
            Showing <span className="font-semibold text-gray-800">{filteredProducts.length}</span> products
          </p>
          <div className="flex gap-2 flex-wrap">
            {selectedCategory !== "All" && (
              <span className="bg-primary/10 text-primary text-xs px-3 py-1 rounded-full font-medium">{selectedCategory} ✕</span>
            )}
            {selectedSkinType !== "All" && (
              <span className="bg-primary/10 text-primary text-xs px-3 py-1 rounded-full font-medium">{selectedSkinType} skin ✕</span>
            )}
            {selectedBrand !== "All" && (
              <span className="bg-primary/10 text-primary text-xs px-3 py-1 rounded-full font-medium">{selectedBrand} ✕</span>
            )}
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <span className="text-6xl">😕</span>
            <h3 className="text-lg font-semibold text-gray-700">No products found</h3>
            <p className="text-gray-400 text-sm">Try changing your filters</p>
            <button onClick={clearFilters}
              className="bg-primary text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-primaryDark transition">
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                onClick={() => navigate(`/product/${product.id}`)}
                className="bg-white rounded-2xl shadow-sm hover:shadow-md transition cursor-pointer border border-gray-100 group"
              >
                {/* Product Image */}
                <div className="relative bg-cream rounded-t-2xl h-48 flex items-center justify-center overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                  />

                  {/* Wishlist */}
                  <button
                    onClick={(e) => { e.stopPropagation(); toggleWishlist(product.id); }}
                    className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full shadow flex items-center justify-center text-sm hover:scale-110 transition"
                  >
                    {wishlist.includes(product.id) ? "❤️" : "🤍"}
                  </button>

                  {/* Discount badge */}
                  <span className="absolute top-2 left-2 bg-primary text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    {product.discount}% OFF
                  </span>
                </div>

                {/* Product Info */}
                <div className="p-3">
                  <p className="text-xs text-gray-400 uppercase tracking-wide">{product.brand}</p>
                  <p className="text-sm font-medium text-gray-800 mt-0.5 line-clamp-2">{product.name}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <div className="flex items-center gap-0.5 bg-green-500 text-white text-xs font-bold px-1.5 py-0.5 rounded">
                      <span>★</span><span>{product.rating}</span>
                    </div>
                    <span className="text-xs text-gray-400">({product.reviews.toLocaleString()})</span>
                  </div>
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className="font-bold text-gray-900">₹{product.price}</span>
                    <span className="text-xs text-gray-400 line-through">₹{product.originalPrice}</span>
                  </div>

                  {/* Add to Bag button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (!isLoggedIn()) {
                        navigate("/login");
                        return;
                      }
                      addToCart(product);
                    }}
                    className="w-full mt-3 border border-primary text-primary text-xs py-2 rounded-full font-semibold hover:bg-primary hover:text-white transition"
                  >
                    Add to Bag
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;