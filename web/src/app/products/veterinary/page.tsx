"use client";
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';

// Real veterinary pharmaceutical products for Sobek Pharma - Veterinary Division
const veterinaryPharmaceuticalProducts = [
  {
    id: 'livestock',
    title: 'Livestock & Cattle',
    icon: '🐄',
    products: [
      {
        name: 'SOBEK-VET OXYTETRACYCLINE',
        genericName: 'Oxytetracycline HCl',
        strength: '200mg/ml',
        form: 'Injectable Solution',
        indication: 'Respiratory infections, Mastitis, Foot rot in cattle and sheep',
        packSize: '100ml vial',
        withdrawalPeriod: 'Meat: 28 days, Milk: 7 days',
        registration: 'GOVS-VET-001/2023',
        species: 'Cattle, Sheep, Goats'
      },
      {
        name: 'SOBEK-VET IVERMECTIN',
        genericName: 'Ivermectin',
        strength: '10mg/ml',
        form: 'Injectable Solution',
        indication: 'Internal and external parasites, Mange, Lice',
        packSize: '50ml, 100ml vial',
        withdrawalPeriod: 'Meat: 35 days, Milk: Not for lactating animals',
        registration: 'GOVS-VET-002/2023',
        species: 'Cattle, Sheep, Goats'
      },
      {
        name: 'SOBEK-VET PENICILLIN G',
        genericName: 'Procaine Penicillin G + Dihydrostreptomycin',
        strength: '200,000 IU + 250mg/ml',
        form: 'Injectable Suspension',
        indication: 'Bacterial infections, Pneumonia, Metritis, Mastitis',
        packSize: '100ml vial',
        withdrawalPeriod: 'Meat: 21 days, Milk: 4 days',
        registration: 'GOVS-VET-003/2023',
        species: 'Cattle, Sheep, Goats, Pigs'
      }
    ]
  },
  {
    id: 'poultry',
    title: 'Poultry Health',
    icon: '🐔',
    products: [
      {
        name: 'SOBEK-VET COLISTIN',
        genericName: 'Colistin Sulfate',
        strength: '12% w/w',
        form: 'Oral Powder',
        indication: 'E.coli infections, Salmonella, Enteritis in poultry',
        packSize: '100g, 500g sachet',
        withdrawalPeriod: 'Meat: 5 days, Eggs: 0 days',
        registration: 'GOVS-VET-004/2023',
        species: 'Broilers, Layers, Turkeys'
      },
      {
        name: 'SOBEK-VET TYLOSIN',
        genericName: 'Tylosin Tartrate',
        strength: '20% w/w',
        form: 'Water Soluble Powder',
        indication: 'CRD, Infectious sinusitis, Mycoplasma infections',
        packSize: '100g, 500g sachet',
        withdrawalPeriod: 'Meat: 5 days, Eggs: 3 days',
        registration: 'GOVS-VET-005/2023',
        species: 'Broilers, Layers, Ducks'
      },
      {
        name: 'SOBEK-VET MULTIVITAMIN',
        genericName: 'Vitamin A, D3, E, K, B-Complex',
        strength: 'As per WHO standards',
        form: 'Water Soluble Powder',
        indication: 'Growth promotion, Stress management, Immune enhancement',
        packSize: '100g, 250g, 1kg',
        withdrawalPeriod: 'No withdrawal period',
        registration: 'GOVS-VET-006/2023',
        species: 'All Poultry'
      }
    ]
  },
  {
    id: 'aquaculture',
    title: 'Aquaculture',
    icon: '🐟',
    products: [
      {
        name: 'SOBEK-VET FLORFENICOL',
        genericName: 'Florfenicol',
        strength: '10% w/w',
        form: 'Medicated Feed Premix',
        indication: 'Bacterial gill disease, Furunculosis, Columnaris in fish',
        packSize: '1kg, 5kg bag',
        withdrawalPeriod: '12 days before harvest',
        registration: 'GOVS-VET-007/2023',
        species: 'Tilapia, Catfish, Salmon'
      },
      {
        name: 'SOBEK-VET FISH VITAMIN C',
        genericName: 'L-Ascorbic Acid (Vitamin C)',
        strength: '35% w/w',
        form: 'Feed Additive',
        indication: 'Immune system support, Stress resistance, Wound healing',
        packSize: '1kg, 5kg bag',
        withdrawalPeriod: 'No withdrawal period',
        registration: 'GOVS-VET-008/2023',
        species: 'All Fish Species'
      }
    ]
  },
  {
    id: 'companion',
    title: 'Companion Animals',
    icon: '🐕',
    products: [
      {
        name: 'SOBEK-VET CEPHALEXIN',
        genericName: 'Cephalexin',
        strength: '250mg, 500mg',
        form: 'Capsules',
        indication: 'Skin infections, Urinary tract infections, Respiratory infections',
        packSize: '10 capsules/strip',
        withdrawalPeriod: 'Not applicable',
        registration: 'GOVS-VET-009/2023',
        species: 'Dogs, Cats'
      },
      {
        name: 'SOBEK-VET ANTI-TICK',
        genericName: 'Fipronil',
        strength: '9.7% w/v',
        form: 'Spot-on Solution',
        indication: 'Fleas, Ticks, Lice control',
        packSize: '0.67ml, 1.34ml, 2.68ml pipettes',
        withdrawalPeriod: 'Not applicable',
        registration: 'GOVS-VET-010/2023',
        species: 'Dogs, Cats'
      }
    ]
  },
  {
    id: 'feed-additives',
    title: 'Feed Additives & Supplements',
    icon: '🌾',
    products: [
      {
        name: 'SOBEK-VET ACIDIFIER',
        genericName: 'Organic Acids Complex',
        strength: 'Formic acid 15%, Propionic acid 10%',
        form: 'Liquid Feed Additive',
        indication: 'pH regulation, Mold inhibition, Growth promotion',
        packSize: '5L, 20L containers',
        withdrawalPeriod: 'No withdrawal period',
        registration: 'GOVS-VET-011/2023',
        species: 'All Farm Animals'
      },
      {
        name: 'SOBEK-VET PROBIOTIC',
        genericName: 'Multi-strain Probiotics',
        strength: '10^9 CFU/g',
        form: 'Feed Additive Powder',
        indication: 'Gut health, Immune support, FCR improvement',
        packSize: '1kg, 5kg, 25kg bags',
        withdrawalPeriod: 'No withdrawal period',
        registration: 'GOVS-VET-012/2023',
        species: 'Poultry, Ruminants, Swine'
      }
    ]
  }
];

const veterinaryStats = [
  { number: '15+', label: 'Years in Veterinary', icon: '📅' },
  { number: '60+', label: 'Veterinary Products', icon: '💉' },
  { number: '1,500+', label: 'Veterinary Clinics', icon: '🏥' },
  { number: '5M+', label: 'Animals Treated', icon: '🐾' }
];

export default function VeterinaryProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Filter products based on category and search
  const filteredProducts = veterinaryPharmaceuticalProducts.filter(category => {
    if (selectedCategory !== 'all' && category.id !== selectedCategory) return false;
    if (searchTerm) {
      return category.products.some(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.genericName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.indication.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.species.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return true;
  });

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[500px] md:h-[600px] w-full overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(https://images.unsplash.com/photo-1500595046743-cd271d694d30?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwxfHx2ZXRlcmluYXJ5JTIwZG9jdG9yJTIwYW5pbWFsJTIwaGVhbHRofGVufDB8MHx8fDE3NjA1MjA3ODV8MA&ixlib=rb-4.1.0&q=85)`
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-gray-800/80 to-gray-700/70"></div>
        </div>

        <div className="relative h-full flex items-center">
          <div className="container mx-auto px-4 md:px-8">
            <div className="max-w-4xl">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                  Veterinary <span className="text-red-400">Products</span>
                </h1>
                <p className="text-xl md:text-2xl text-gray-100 leading-relaxed mb-8">
                  Professional veterinary pharmaceuticals for animal health and welfare
                </p>
                <p className="text-lg md:text-xl text-gray-200 leading-relaxed max-w-3xl">
                  GOVS licensed products manufactured to international standards with proper withdrawal periods for food safety.
                </p>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Company Stats */}
        <div className="absolute bottom-8 left-8 right-8 hidden md:block">
          <div className="grid grid-cols-4 gap-4 max-w-4xl">
            {veterinaryStats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1 + index * 0.1 }}
                className="bg-white/20 backdrop-blur-md rounded-xl p-4 text-center border border-white/30"
              >
                <div className="text-2xl mb-1">{stat.icon}</div>
                <div className="text-2xl font-bold text-white">{stat.number}</div>
                <div className="text-xs text-gray-200">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Bar */}
            <div className="flex-1 max-w-md">
              <input
                type="text"
                placeholder="Search by product name, generic name, species, or indication..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === 'all' 
                    ? 'bg-red-600 text-white' 
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
              >
                All Products
              </button>
              {veterinaryPharmaceuticalProducts.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category.id 
                      ? 'bg-red-600 text-white' 
                      : 'bg-white text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {category.icon} {category.title}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          {filteredProducts.map((category, categoryIndex) => (
            <div key={category.id} className="mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
              >
                <h2 className="text-4xl font-bold text-gray-900 mb-4">
                  {category.icon} {category.title}
                </h2>
              </motion.div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {category.products.map((product, productIndex) => (
                  <motion.div
                    key={productIndex}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: productIndex * 0.1 }}
                    className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300 group"
                  >
                    {/* Product Image */}
                    <div className="h-48 bg-gradient-to-br from-green-100 to-blue-100 flex items-center justify-center">
                      <div className="text-6xl opacity-20">💉</div>
                    </div>

                    {/* Product Info */}
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-red-600 transition-colors">
                          {product.name}
                        </h3>
                        <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                          GOVS Licensed
                        </span>
                      </div>

                      <p className="text-red-600 font-semibold mb-2">{product.genericName}</p>
                      
                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Strength:</span>
                          <span className="font-medium text-right">{product.strength}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Form:</span>
                          <span className="font-medium">{product.form}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Pack Size:</span>
                          <span className="font-medium">{product.packSize}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Species:</span>
                          <span className="font-medium text-right">{product.species}</span>
                        </div>
                      </div>

                      <div className="mb-4">
                        <h4 className="text-sm font-semibold text-gray-900 mb-2">Indications:</h4>
                        <p className="text-sm text-gray-600 leading-relaxed">{product.indication}</p>
                      </div>

                      <div className="mb-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                        <h4 className="text-sm font-semibold text-yellow-800 mb-1">Withdrawal Period:</h4>
                        <p className="text-xs text-yellow-700">{product.withdrawalPeriod}</p>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <span className="text-xs text-gray-500">Reg: {product.registration}</span>
                        <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                          Product Info
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Need Veterinary Support or <span className="text-red-400">Technical Consultation</span>?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Contact our veterinary specialists for product guidance, dosage recommendations, and professional support.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact-us"
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors shadow-lg"
              >
                Contact Veterinary Team
              </Link>
              <Link
                href="/products/human"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-gray-900 transition-colors"
              >
                View Human Products
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}