"use client";
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';

// Real pharmaceutical products for Sobek Pharma - Human Division
const humanPharmaceuticalProducts = [
  {
    id: 'cardiovascular',
    title: 'Cardiovascular',
    icon: '❤️',
    products: [
      {
        name: 'SOBEK-PRIL',
        genericName: 'Enalapril Maleate',
        strength: '5mg, 10mg, 20mg',
        form: 'Film-coated Tablets',
        indication: 'Hypertension, Heart failure, Asymptomatic left ventricular dysfunction',
        packSize: '30 tablets',
        registration: 'EDA-12345/2023',
        image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&h=200&fit=crop'
      },
      {
        name: 'SOBEK-STATIN',
        genericName: 'Atorvastatin Calcium',
        strength: '10mg, 20mg, 40mg',
        form: 'Film-coated Tablets',
        indication: 'Hypercholesterolemia, Mixed dyslipidemia, Prevention of cardiovascular disease',
        packSize: '30 tablets',
        registration: 'EDA-12346/2023',
        image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300&h=200&fit=crop'
      },
      {
        name: 'SOBEK-CARDIO',
        genericName: 'Metoprolol Succinate',
        strength: '25mg, 50mg, 100mg',
        form: 'Extended-release Tablets',
        indication: 'Hypertension, Angina pectoris, Heart failure',
        packSize: '28 tablets',
        registration: 'EDA-12347/2023',
        image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=300&h=200&fit=crop'
      }
    ]
  },
  {
    id: 'antibiotics',
    title: 'Anti-Infectives',
    icon: '🦠',
    products: [
      {
        name: 'SOBEK-CILLIN',
        genericName: 'Amoxicillin + Clavulanic Acid',
        strength: '625mg (500mg + 125mg)',
        form: 'Film-coated Tablets',
        indication: 'Respiratory tract infections, Urinary tract infections, Skin infections',
        packSize: '14 tablets',
        registration: 'EDA-12348/2023',
        image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=300&h=200&fit=crop'
      },
      {
        name: 'SOBEK-FLOX',
        genericName: 'Ciprofloxacin HCl',
        strength: '500mg, 750mg',
        form: 'Film-coated Tablets',
        indication: 'Urinary tract infections, Respiratory infections, Gastrointestinal infections',
        packSize: '10 tablets',
        registration: 'EDA-12349/2023',
        image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=300&h=200&fit=crop'
      },
      {
        name: 'SOBEK-MYCIN',
        genericName: 'Azithromycin',
        strength: '250mg, 500mg',
        form: 'Film-coated Tablets',
        indication: 'Respiratory infections, Sexually transmitted infections, Skin infections',
        packSize: '6 tablets',
        registration: 'EDA-12350/2023',
        image: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=300&h=200&fit=crop'
      }
    ]
  },
  {
    id: 'diabetes',
    title: 'Endocrinology & Diabetes',
    icon: '🩺',
    products: [
      {
        name: 'SOBEK-GLIP',
        genericName: 'Glimepiride',
        strength: '1mg, 2mg, 4mg',
        form: 'Tablets',
        indication: 'Type 2 diabetes mellitus',
        packSize: '30 tablets',
        registration: 'EDA-12351/2023',
        image: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=300&h=200&fit=crop'
      },
      {
        name: 'SOBEK-FORMIN',
        genericName: 'Metformin HCl',
        strength: '500mg, 850mg, 1000mg',
        form: 'Film-coated Tablets',
        indication: 'Type 2 diabetes mellitus, PCOS',
        packSize: '60 tablets',
        registration: 'EDA-12352/2023',
        image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300&h=200&fit=crop'
      }
    ]
  },
  {
    id: 'gastro',
    title: 'Gastroenterology',
    icon: '🫄',
    products: [
      {
        name: 'SOBEK-ZOLE',
        genericName: 'Omeprazole',
        strength: '20mg, 40mg',
        form: 'Enteric-coated Capsules',
        indication: 'GERD, Peptic ulcer, H. pylori eradication',
        packSize: '14 capsules',
        registration: 'EDA-12353/2023',
        image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=300&h=200&fit=crop'
      },
      {
        name: 'SOBEK-MOTIL',
        genericName: 'Domperidone',
        strength: '10mg',
        form: 'Film-coated Tablets',
        indication: 'Nausea, Vomiting, Gastric motility disorders',
        packSize: '30 tablets',
        registration: 'EDA-12354/2023',
        image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=300&h=200&fit=crop'
      }
    ]
  },
  {
    id: 'respiratory',
    title: 'Respiratory',
    icon: '🫁',
    products: [
      {
        name: 'SOBEK-VENT',
        genericName: 'Salbutamol Sulfate',
        strength: '2mg, 4mg',
        form: 'Tablets',
        indication: 'Asthma, COPD, Bronchospasm',
        packSize: '20 tablets',
        registration: 'EDA-12355/2023',
        image: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=300&h=200&fit=crop'
      },
      {
        name: 'SOBEK-COUGH',
        genericName: 'Dextromethorphan + Guaifenesin',
        strength: '15mg + 100mg/5ml',
        form: 'Oral Syrup',
        indication: 'Productive cough, Respiratory congestion',
        packSize: '120ml bottle',
        registration: 'EDA-12356/2023',
        image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=300&h=200&fit=crop'
      }
    ]
  },
  {
    id: 'pain',
    title: 'Pain Management',
    icon: '💊',
    products: [
      {
        name: 'SOBEK-PAIN',
        genericName: 'Diclofenac Sodium',
        strength: '50mg, 75mg',
        form: 'Film-coated Tablets',
        indication: 'Rheumatoid arthritis, Osteoarthritis, Acute pain',
        packSize: '20 tablets',
        registration: 'EDA-12357/2023',
        image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&h=200&fit=crop'
      },
      {
        name: 'SOBEK-FORTE',
        genericName: 'Paracetamol + Caffeine',
        strength: '500mg + 65mg',
        form: 'Film-coated Tablets',
        indication: 'Headache, Fever, Mild to moderate pain',
        packSize: '24 tablets',
        registration: 'EDA-12358/2023',
        image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300&h=200&fit=crop'
      }
    ]
  }
];

const companyStats = [
  { number: '25+', label: 'Years Experience', icon: '📅' },
  { number: '50+', label: 'Human Products', icon: '💊' },
  { number: '2,500+', label: 'Pharmacies Served', icon: '🏥' },
  { number: '95%', label: 'EDA Approval Rate', icon: '✅' }
];

export default function HumanHealthProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Filter products based on category and search
  const filteredProducts = humanPharmaceuticalProducts.filter(category => {
    if (selectedCategory !== 'all' && category.id !== selectedCategory) return false;
    if (searchTerm) {
      return category.products.some(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.genericName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.indication.toLowerCase().includes(searchTerm.toLowerCase())
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
            backgroundImage: `url(https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwxfHxtZWRpY2luZSUyMHBoYXJtYWN5JTIwaGVhbHRoY2FyZSUyMGRvY3RvcnxlbnwwfDB8fHwxNzYwNTIxMDI5fDA&ixlib=rb-4.1.0&q=85)`
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
                  Human Health <span className="text-red-400">Products</span>
                </h1>
                <p className="text-xl md:text-2xl text-gray-100 leading-relaxed mb-8">
                  Comprehensive pharmaceutical solutions for human healthcare
                </p>
                <p className="text-lg md:text-xl text-gray-200 leading-relaxed max-w-3xl">
                  Manufactured in our WHO-GMP certified facilities with EDA approval and insurance coverage across Egypt.
                </p>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Company Stats */}
        <div className="absolute bottom-8 left-8 right-8 hidden md:block">
          <div className="grid grid-cols-4 gap-4 max-w-4xl">
            {companyStats.map((stat, index) => (
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
                placeholder="Search products by name, generic name, or indication..."
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
              {humanPharmaceuticalProducts.map((category) => (
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
                    <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                      <div className="text-6xl opacity-20">💊</div>
                    </div>

                    {/* Product Info */}
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-red-600 transition-colors">
                          {product.name}
                        </h3>
                        <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                          EDA Approved
                        </span>
                      </div>

                      <p className="text-red-600 font-semibold mb-2">{product.genericName}</p>
                      
                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Strength:</span>
                          <span className="font-medium">{product.strength}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Form:</span>
                          <span className="font-medium">{product.form}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Pack Size:</span>
                          <span className="font-medium">{product.packSize}</span>
                        </div>
                      </div>

                      <div className="mb-4">
                        <h4 className="text-sm font-semibold text-gray-900 mb-2">Indications:</h4>
                        <p className="text-sm text-gray-600 leading-relaxed">{product.indication}</p>
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
              Need Product Information or <span className="text-red-400">Medical Samples</span>?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Contact our medical representatives for detailed product information, scientific data, and professional samples.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact-us"
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors shadow-lg"
              >
                Contact Medical Team
              </Link>
              <Link
                href="/products/veterinary"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-gray-900 transition-colors"
              >
                View Veterinary Products
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}