'use client';

import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Product } from '../../types/product';
import { ChevronDown, Filter, X, Star, Heart, Search, Grid, List } from 'lucide-react';
import Image from 'next/image';

interface Category {
  $id: string;
  name: string;
  status: boolean;
}

interface Brand {
  $id: string;
  name: string;
  prefix: string;
  status: boolean;
}

interface EnhancedFilters {
  selectedBrand: string;
  selectedCategories: string[];
  priceRange: [number, number];
  season: string;
  showFeatured: boolean;
  showNew: boolean;
  showOnSale: boolean;
  searchTerm: string;
}

interface Props {
  className?: string;
}

export default function EnhancedProductCatalog({ className = '' }: Props) {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'name' | 'price-low' | 'price-high' | 'newest'>('newest');
  
  // Enhanced filter states
  const [filters, setFilters] = useState<EnhancedFilters>({
    selectedBrand: '',
    selectedCategories: [],
    priceRange: [0, 1000],
    season: '',
    showFeatured: false,
    showNew: false,
    showOnSale: false,
    searchTerm: ''
  });

  // Get available categories for selected brand
  const availableCategoriesForBrand = useMemo(() => {
    if (!filters.selectedBrand) return categories;
    
    // Get all products from the selected brand
    const brandProducts = products.filter(p => p.brand_id === filters.selectedBrand);
    
    // Get unique category IDs from those products
    const brandCategoryIds = [...new Set(brandProducts.map(p => p.category_id))];
    
    // Return only categories that have products in the selected brand
    return categories.filter(cat => brandCategoryIds.includes(cat.$id));
  }, [filters.selectedBrand, products, categories]);

  // Get price range for selected brand
  const priceRangeForBrand = useMemo(() => {
    let relevantProducts = products;
    
    if (filters.selectedBrand) {
      relevantProducts = products.filter(p => p.brand_id === filters.selectedBrand);
    }
    
    if (relevantProducts.length === 0) return [0, 1000];
    
    const prices = relevantProducts.map(p => p.discount_price > 0 ? p.discount_price : p.price);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    
    return [Math.floor(minPrice), Math.ceil(maxPrice)];
  }, [filters.selectedBrand, products]);

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch products, brands, and categories in parallel
        const [productsRes, brandsRes, categoriesRes] = await Promise.all([
          fetch('/api/admin/products?available=true&limit=200'),
          fetch('/api/admin/brands?status=true'),
          fetch('/api/admin/categories?status=true')
        ]);

        const [productsData, brandsData, categoriesData] = await Promise.all([
          productsRes.json(),
          brandsRes.json(),
          categoriesRes.json()
        ]);

        console.log('📦 Enhanced Catalog Data:', {
          products: productsData.products?.length || 0,
          brands: brandsData.brands?.length || 0,
          categories: categoriesData.categories?.length || 0
        });

        setProducts(productsData.products || []);
        setBrands(brandsData.brands || []);
        setCategories(categoriesData.categories || []);
        
        // Auto-adjust price range based on available products
        const allPrices = (productsData.products || []).map((p: Product) => 
          p.discount_price > 0 ? p.discount_price : p.price
        );
        
        if (allPrices.length > 0) {
          const minPrice = Math.min(...allPrices);
          const maxPrice = Math.max(...allPrices);
          setFilters(prev => ({
            ...prev,
            priceRange: [Math.floor(minPrice), Math.ceil(maxPrice)]
          }));
        }

      } catch (error) {
        console.error('❌ Error fetching catalog data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = products.filter(product => {
      // Enhanced search term filter
      if (filters.searchTerm) {
        const searchLower = filters.searchTerm.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(searchLower);
        const matchesDescription = product.description?.toLowerCase().includes(searchLower);
        const matchesCustomId = (product as any).customProductId?.toLowerCase().includes(searchLower);
        const matchesCartonCode = (product as any).cartonCode?.toLowerCase().includes(searchLower);
        
        // Also search in brand and category names
        const brand = brands.find(b => b.$id === product.brand_id);
        const category = categories.find(c => c.$id === product.category_id);
        const matchesBrand = brand?.name.toLowerCase().includes(searchLower);
        const matchesCategory = category?.name.toLowerCase().includes(searchLower);
        
        if (!matchesName && !matchesDescription && !matchesCustomId && 
            !matchesCartonCode && !matchesBrand && !matchesCategory) {
          return false;
        }
      }

      // Brand filter (primary filter)
      if (filters.selectedBrand && product.brand_id !== filters.selectedBrand) {
        return false;
      }
      
      // Category filter (secondary - only show categories from selected brand)
      if (filters.selectedCategories.length > 0 && !filters.selectedCategories.includes(product.category_id)) {
        return false;
      }
      
      // Season filter
      if (filters.season && (product as any).season && (product as any).season !== filters.season) {
        return false;
      }
      
      // Price range filter
      const price = product.discount_price > 0 ? product.discount_price : product.price;
      if (price < filters.priceRange[0] || price > filters.priceRange[1]) {
        return false;
      }
      
      // Special filters
      if (filters.showFeatured && !product.is_featured) return false;
      if (filters.showNew && !product.is_new) return false;
      if (filters.showOnSale && !(product.discount_price > 0 && product.discount_price < product.price)) return false;
      
      return true;
    });
    
    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          const priceA = a.discount_price > 0 ? a.discount_price : a.price;
          const priceB = b.discount_price > 0 ? b.discount_price : b.price;
          return priceA - priceB;
        case 'price-high':
          const priceA2 = a.discount_price > 0 ? a.discount_price : a.price;
          const priceB2 = b.discount_price > 0 ? b.discount_price : b.price;
          return priceB2 - priceA2;
        case 'newest':
          return new Date(b.$createdAt).getTime() - new Date(a.$createdAt).getTime();
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });
    
    return filtered;
  }, [products, filters, sortBy]);

  // Filter handlers
  const handleBrandChange = (brandId: string) => {
    setFilters(prev => ({
      ...prev,
      selectedBrand: brandId,
      selectedCategories: [] // Clear categories when brand changes
    }));
  };

  const handleCategoryToggle = (categoryId: string) => {
    setFilters(prev => ({
      ...prev,
      selectedCategories: prev.selectedCategories.includes(categoryId)
        ? prev.selectedCategories.filter(id => id !== categoryId)
        : [...prev.selectedCategories, categoryId]
    }));
  };

  const clearAllFilters = () => {
    setFilters({
      selectedBrand: '',
      selectedCategories: [],
      priceRange: [priceRangeForBrand[0], priceRangeForBrand[1]] as [number, number],
      season: '',
      showFeatured: false,
      showNew: false,
      showOnSale: false,
      searchTerm: ''
    });
  };

  const activeFiltersCount = 
    (filters.selectedBrand ? 1 : 0) +
    filters.selectedCategories.length +
    (filters.season ? 1 : 0) +
    (filters.showFeatured ? 1 : 0) +
    (filters.showNew ? 1 : 0) +
    (filters.showOnSale ? 1 : 0) +
    (filters.searchTerm ? 1 : 0);

  if (loading) {
    return (
      <div className={`min-h-screen bg-gray-50 ${className}`}>
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="space-y-4">
                <div className="h-32 bg-gray-200 rounded"></div>
                <div className="h-48 bg-gray-200 rounded"></div>
              </div>
              <div className="md:col-span-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="bg-white rounded-lg shadow-sm">
                      <div className="h-48 bg-gray-200 rounded-t-lg"></div>
                      <div className="p-4 space-y-2">
                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gray-50 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Product Catalog / كتالوج المنتجات
          </h1>
          <p className="text-gray-600">
            Discover our premium collection / اكتشف مجموعتنا المميزة
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Enhanced Sidebar Filters */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">
                  Filters / الفلاتر
                </h2>
                {activeFiltersCount > 0 && (
                  <button
                    onClick={clearAllFilters}
                    className="text-sm text-red-600 hover:text-red-700 font-medium"
                  >
                    Clear All ({activeFiltersCount})
                  </button>
                )}
              </div>

              {/* Enhanced Search */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Search Products / البحث في المنتجات
                </label>
                <div className="space-y-2">
                  {/* Main Search */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      value={filters.searchTerm}
                      onChange={(e) => setFilters(prev => ({ ...prev, searchTerm: e.target.value }))}
                      placeholder="Search by name, description, or ID..."
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  {/* Search Tips */}
                  <div className="text-xs text-gray-500 bg-gray-50 p-2 rounded">
                    <div className="font-medium mb-1">Search Tips:</div>
                    <div>• Product names & descriptions</div>
                    <div>• Custom Product IDs (e.g., PRD-2024-001)</div>
                    <div>• Carton codes for warehouse tracking</div>
                  </div>
                </div>
              </div>

              {/* Hierarchical Brand & Category Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Brands & Categories / الماركات والفئات
                </label>
                
                <div className="space-y-2 max-h-80 overflow-y-auto border border-gray-200 rounded-lg p-3">
                  {/* All Brands Option */}
                  <label className="flex items-center font-medium">
                    <input
                      type="radio"
                      name="brand"
                      checked={!filters.selectedBrand}
                      onChange={() => handleBrandChange('')}
                      className="text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <span className="ml-2 text-gray-900">All Brands / كل الماركات</span>
                  </label>
                  
                  {/* Individual Brands with Categories */}
                  {brands.map((brand) => {
                    const brandProducts = products.filter(p => p.brand_id === brand.$id);
                    const brandCategoryIds = [...new Set(brandProducts.map(p => p.category_id))];
                    const brandCategories = categories.filter(cat => brandCategoryIds.includes(cat.$id));
                    const isSelected = filters.selectedBrand === brand.$id;
                    
                    return (
                      <div key={brand.$id} className="border-l-2 border-gray-100 pl-2">
                        {/* Brand Header */}
                        <label className="flex items-center font-medium mb-2">
                          <input
                            type="radio"
                            name="brand"
                            checked={isSelected}
                            onChange={() => handleBrandChange(brand.$id)}
                            className="text-blue-600 focus:ring-blue-500 border-gray-300"
                          />
                          <span className="ml-2 text-gray-900">
                            {brand.name}
                            <span className="text-xs text-gray-500 ml-1">
                              ({brandProducts.length} products)
                            </span>
                          </span>
                        </label>
                        
                        {/* Categories under this brand */}
                        {isSelected && brandCategories.length > 0 && (
                          <div className="ml-6 space-y-1 bg-gray-50 rounded p-2">
                            <div className="text-xs font-medium text-gray-600 mb-2">
                              Categories in {brand.name}:
                            </div>
                            {brandCategories.map((category) => {
                              const categoryProductsCount = brandProducts.filter(p => p.category_id === category.$id).length;
                              return (
                                <label key={category.$id} className="flex items-center text-sm">
                                  <input
                                    type="checkbox"
                                    checked={filters.selectedCategories.includes(category.$id)}
                                    onChange={() => handleCategoryToggle(category.$id)}
                                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                  />
                                  <span className="ml-2">
                                    {category.name}
                                    <span className="text-xs text-gray-500 ml-1">
                                      ({categoryProductsCount})
                                    </span>
                                  </span>
                                </label>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Season Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Product Season / موسم المنتج
                </label>
                
                <div className="space-y-2 border border-gray-200 rounded-lg p-3">
                  {/* All Seasons */}
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="season"
                      checked={!filters.season}
                      onChange={() => setFilters(prev => ({ ...prev, season: '' }))}
                      className="text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <span className="ml-2">🌈 All Seasons / كل الفصول</span>
                  </label>
                  
                  {/* Summer */}
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="season"
                      checked={filters.season === 'summer'}
                      onChange={() => setFilters(prev => ({ ...prev, season: 'summer' }))}
                      className="text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <span className="ml-2">🌞 Summer Collection / مجموعة الصيف</span>
                    <span className="text-xs text-gray-500 ml-2">
                      ({products.filter(p => (p as any).season === 'summer').length} products)
                    </span>
                  </label>
                  
                  {/* Winter */}
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="season"
                      checked={filters.season === 'winter'}
                      onChange={() => setFilters(prev => ({ ...prev, season: 'winter' }))}
                      className="text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <span className="ml-2">❄️ Winter Collection / مجموعة الشتاء</span>
                    <span className="text-xs text-gray-500 ml-2">
                      ({products.filter(p => (p as any).season === 'winter').length} products)
                    </span>
                  </label>
                  
                  {/* All Season */}
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="season"
                      checked={filters.season === 'all-season'}
                      onChange={() => setFilters(prev => ({ ...prev, season: 'all-season' }))}
                      className="text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <span className="ml-2">🌤️ All Season Wear / ملابس كل الفصول</span>
                    <span className="text-xs text-gray-500 ml-2">
                      ({products.filter(p => (p as any).season === 'all-season').length} products)
                    </span>
                  </label>
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Price Range / نطاق السعر
                </label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <input
                      type="number"
                      value={filters.priceRange[0]}
                      onChange={(e) => setFilters(prev => ({
                        ...prev,
                        priceRange: [parseInt(e.target.value) || 0, prev.priceRange[1]]
                      }))}
                      className="w-20 p-1 text-sm border border-gray-300 rounded"
                      placeholder="Min"
                    />
                    <span>-</span>
                    <input
                      type="number"
                      value={filters.priceRange[1]}
                      onChange={(e) => setFilters(prev => ({
                        ...prev,
                        priceRange: [prev.priceRange[0], parseInt(e.target.value) || 1000]
                      }))}
                      className="w-20 p-1 text-sm border border-gray-300 rounded"
                      placeholder="Max"
                    />
                  </div>
                  <div className="text-xs text-gray-500">
                    Range: {priceRangeForBrand[0]} - {priceRangeForBrand[1]} EGP
                  </div>
                </div>
              </div>

              {/* Special Filters */}
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-gray-700">Special Filters</h3>
                
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.showFeatured}
                    onChange={() => setFilters(prev => ({ ...prev, showFeatured: !prev.showFeatured }))}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm">Featured / مميز</span>
                </label>

                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.showNew}
                    onChange={() => setFilters(prev => ({ ...prev, showNew: !prev.showNew }))}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm">New / جديد</span>
                </label>

                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.showOnSale}
                    onChange={() => setFilters(prev => ({ ...prev, showOnSale: !prev.showOnSale }))}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm">On Sale / تخفيض</span>
                </label>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {/* Results Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 bg-white rounded-lg shadow-sm p-4">
              <div className="mb-4 sm:mb-0">
                <p className="text-gray-600">
                  Showing {filteredProducts.length} of {products.length} products
                  {filters.selectedBrand && (
                    <span className="ml-2 text-sm text-blue-600">
                      from {brands.find(b => b.$id === filters.selectedBrand)?.name}
                    </span>
                  )}
                  {filters.season && (
                    <span className="ml-2 text-sm text-green-600">
                      • {filters.season === 'summer' ? '🌞 Summer' : 
                         filters.season === 'winter' ? '❄️ Winter' : '🌤️ All Season'}
                    </span>
                  )}
                  {filters.selectedCategories.length > 0 && (
                    <span className="ml-2 text-sm text-purple-600">
                      • {filters.selectedCategories.length} categories selected
                    </span>
                  )}
                </p>
                {filteredProducts.length === 0 && filters.searchTerm && (
                  <p className="text-sm text-red-600 mt-1">
                    No results for "{filters.searchTerm}"
                  </p>
                )}
              </div>
              
              <div className="flex items-center space-x-4">
                {/* Sort */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="newest">Newest First</option>
                  <option value="name">Name A-Z</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>

                {/* View Mode */}
                <div className="flex border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 ${viewMode === 'grid' ? 'bg-blue-500 text-white' : 'text-gray-600'}`}
                  >
                    <Grid className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 ${viewMode === 'list' ? 'bg-blue-500 text-white' : 'text-gray-600'}`}
                  >
                    <List className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Products Display */}
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                <div className="text-gray-400 mb-4">
                  <Filter className="h-16 w-16 mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your filters or search terms
                </p>
                {activeFiltersCount > 0 && (
                  <button
                    onClick={clearAllFilters}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium"
                  >
                    Clear All Filters
                  </button>
                )}
              </div>
            ) : (
              <div className={viewMode === 'grid' 
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" 
                : "space-y-4"
              }>
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.$id}
                    product={product}
                    brands={brands}
                    categories={categories}
                    viewMode={viewMode}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Product Card Component
interface ProductCardProps {
  product: Product;
  brands: Brand[];
  categories: Category[];
  viewMode: 'grid' | 'list';
}

function ProductCard({ product, brands, categories, viewMode }: ProductCardProps) {
  const brand = brands.find(b => b.$id === product.brand_id);
  const category = categories.find(c => c.$id === product.category_id);
  
  const getImageUrl = () => {
    if ((product as any).mainImageUrl) return (product as any).mainImageUrl;
    if ((product as any).mainImageId) return `/api/storage/files/${(product as any).mainImageId}`;
    if ((product as any).media_id) return (product as any).media_id;
    return 'https://via.placeholder.com/300x400?text=No+Image';
  };

  const price = product.discount_price > 0 ? product.discount_price : product.price;
  const hasDiscount = product.discount_price > 0 && product.discount_price < product.price;

  if (viewMode === 'list') {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6 flex items-center space-x-6">
        <div className="flex-shrink-0">
          <img
            src={getImageUrl()}
            alt={product.name}
            className="w-24 h-24 object-cover rounded-lg"
          />
        </div>
        
        <div className="flex-grow">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                {product.name}
              </h3>
              
              <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                {brand && <span>{brand.name}</span>}
                {category && <span>• {category.name}</span>}
                {(product as any).season && (
                  <span>• {(product as any).season === 'summer' ? '🌞 Summer' : 
                         (product as any).season === 'winter' ? '❄️ Winter' : '🌤️ All Season'}</span>
                )}
              </div>

              {/* Product IDs and Codes */}
              <div className="flex flex-wrap gap-2 mb-2">
                {(product as any).customProductId && (
                  <span className="text-xs text-blue-600 font-mono bg-blue-50 px-2 py-1 rounded">
                    ID: {(product as any).customProductId}
                  </span>
                )}
                {(product as any).cartonCode && (
                  <span className="text-xs text-green-600 font-mono bg-green-50 px-2 py-1 rounded">
                    Carton: {(product as any).cartonCode}
                  </span>
                )}
              </div>

              <p className="text-gray-600 text-sm line-clamp-2">
                {product.description}
              </p>
            </div>
            
            <div className="text-right">
              <div className="flex items-baseline space-x-2 mb-2">
                <span className="text-2xl font-bold text-gray-900">
                  {price} EGP
                </span>
                {hasDiscount && (
                  <span className="text-sm text-gray-500 line-through">
                    {product.price} EGP
                  </span>
                )}
              </div>
              
              <div className="flex items-center justify-end space-x-2">
                {product.is_new && (
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                    New
                  </span>
                )}
                {product.is_featured && (
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                    Featured
                  </span>
                )}
                {hasDiscount && (
                  <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                    Sale
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative">
        <img
          src={getImageUrl()}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
        
        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col space-y-1">
          {product.is_new && (
            <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
              New
            </span>
          )}
          {product.is_featured && (
            <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
              Featured
            </span>
          )}
          {hasDiscount && (
            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
              {Math.round(((product.price - product.discount_price) / product.price) * 100)}% OFF
            </span>
          )}
        </div>

        {/* Season indicator */}
        {(product as any).season && (
          <div className="absolute top-2 right-2">
            <span className="bg-white bg-opacity-90 text-gray-700 text-xs px-2 py-1 rounded-full">
              {(product as any).season === 'summer' ? '🌞' : 
               (product as any).season === 'winter' ? '❄️' : '🌤️'}
            </span>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
          {brand && <span>{brand.name}</span>}
          {category && <span>{category.name}</span>}
        </div>
        
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {product.name}
        </h3>

        {/* Product IDs and Codes */}
        <div className="text-xs space-y-1 mb-2">
          {(product as any).customProductId && (
            <div className="text-blue-600 font-mono bg-blue-50 px-2 py-1 rounded">
              Product ID: {(product as any).customProductId}
            </div>
          )}
          {(product as any).cartonCode && (
            <div className="text-green-600 font-mono bg-green-50 px-2 py-1 rounded">
              Carton: {(product as any).cartonCode}
            </div>
          )}
        </div>
        
        <div className="flex items-baseline justify-between">
          <div className="flex items-baseline space-x-2">
            <span className="text-xl font-bold text-gray-900">
              {price} EGP
            </span>
            {hasDiscount && (
              <span className="text-sm text-gray-500 line-through">
                {product.price} EGP
              </span>
            )}
          </div>
          
          <Link
            href={`/product/${product.slug}`}
            className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-3 py-1 rounded-lg font-medium transition-colors"
          >
            View
          </Link>
        </div>
      </div>
    </div>
  );
}