import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Package, Pill, Eye, ArrowRight, Activity, ShieldCheck } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  generic_name: string;
  strength: string;
  dosage_form: string;
  indication: string;
  pack_size: string | null;
  registration_number: string | null;
  category: string;
  image_url: string | null;
  price: number | null;
  is_active: boolean;
}

interface ProductCardProps {
  product: Product;
  index: number;
  onViewDetails?: (product: Product) => void;
}

export default function ProductCard({ product, index, onViewDetails }: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.05 * index, duration: 0.4 }}
      className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden flex flex-col h-full"
    >
      {/* Image Section */}
      <div className="relative h-56 bg-gradient-to-br from-slate-50 to-slate-100 overflow-hidden group-hover:from-blue-50 group-hover:to-indigo-50 transition-colors duration-500">
        {product.image_url ? (
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-400 blur-2xl opacity-20 rounded-full"></div>
              <Pill className="relative w-16 h-16 text-slate-300 group-hover:text-blue-500 transition-colors duration-300" />
            </div>
          </div>
        )}
        
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />

        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-slate-700 text-xs font-bold rounded-full shadow-sm border border-white/50">
            {product.category.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
          </span>
        </div>

        <div className="absolute top-4 right-4">
           <span className={`px-3 py-1 rounded-full text-xs font-bold shadow-sm backdrop-blur-md border border-white/20 ${
            product.is_active
              ? 'bg-emerald-500/90 text-white'
              : 'bg-slate-500/90 text-white'
          }`}>
            {product.is_active ? 'Active' : 'Inactive'}
          </span>
        </div>

        {/* Quick Info Overlay */}
        <div className="absolute bottom-4 left-4 right-4 text-white">
          <h3 className="text-xl font-bold mb-1 drop-shadow-md">{product.name}</h3>
          <p className="text-sm text-white/90 font-medium drop-shadow-sm flex items-center gap-2">
            <Activity className="w-3 h-3" />
            {product.generic_name}
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5 flex-1 flex flex-col">
        {/* Specs Grid */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 group-hover:border-blue-100 transition-colors">
            <span className="text-xs text-slate-500 font-medium block mb-1">Dosage Form</span>
            <span className="text-sm font-bold text-slate-800 line-clamp-1" title={product.dosage_form}>
              {product.dosage_form}
            </span>
          </div>
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 group-hover:border-blue-100 transition-colors">
            <span className="text-xs text-slate-500 font-medium block mb-1">Strength</span>
            <span className="text-sm font-bold text-slate-800 line-clamp-1" title={product.strength}>
              {product.strength}
            </span>
          </div>
        </div>

        {/* Indication Preview */}
        <div className="mb-6 flex-1">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1">
            <ShieldCheck className="w-3 h-3" /> Indication
          </h4>
          <p className="text-sm text-slate-600 leading-relaxed line-clamp-2">
            {product.indication}
          </p>
        </div>

        {/* Action Button */}
        <Link
          href={`/products/human-new/${product.category}/${product.id}`}
          className="w-full group/btn relative overflow-hidden rounded-xl bg-slate-900 text-white px-4 py-3.5 font-medium transition-all hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-500/30 active:scale-[0.98] block text-center"
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            View Full Details
            <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
          </span>
        </Link>
      </div>
    </motion.div>
  );
}
