'use client';

import Link from "next/link";
import MainLayout from "@/components/MainLayout";
import { ShoppingBag, Star, Users, Award, Heart, Quote } from "lucide-react";
import "./animation.css";

export default function HleoPage() {
  return (
    <MainLayout>
      <div className="font-sans w-full min-h-screen bg-white text-black">
        {/* Hero Section - HLEO */}
        <section className="w-full bg-white px-4 sm:px-6 lg:px-8 pb-7 md:pb-12">
          <div className="max-w-7xl mx-auto">
            <div className="w-full min-h-[900px] lg:min-h-[1000px] relative overflow-hidden rounded-3xl shadow-2xl bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200">
              {/* Hero Background - Just the image, clean and simple */}
              <div className="absolute inset-0 flex items-center justify-center p-4">
                <img
                  src="/images/brands/helo-hero.png"
                  alt="HLEO hero"
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Brand Story Section */}
        <section className="w-full py-20 bg-gradient-to-br from-gray-50 to-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl lg:text-5xl font-bold mb-8 text-gray-900 leading-tight">
                  About <span className="text-red-600">HLEO</span>
                </h2>
                <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                  <p>
                    HLEO represents the future of fashion, where comfort meets style in perfect harmony.
                    We believe that great fashion shouldn't compromise on comfort, and exceptional comfort
                    shouldn't mean sacrificing style.
                  </p>
                  <p>
                    Founded with a vision to revolutionize everyday wear, HLEO creates premium oversized
                    clothing that adapts to your lifestyle. Every piece is thoughtfully designed using
                    the finest materials and innovative techniques.
                  </p>
                  <p>
                    From urban explorers to home comfort seekers, our collections cater to diverse
                    lifestyles while maintaining the perfect balance of functionality, aesthetics,
                    and uncompromising quality.
                  </p>
                </div>

                <div className="mt-10 grid grid-cols-3 gap-6">
                  <div className="text-center p-4 bg-white rounded-xl shadow-lg">
                    <Users className="w-8 h-8 text-red-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900">50K+</div>
                    <div className="text-sm text-gray-600">Happy Customers</div>
                  </div>
                  <div className="text-center p-4 bg-white rounded-xl shadow-lg">
                    <Award className="w-8 h-8 text-red-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900">100%</div>
                    <div className="text-sm text-gray-600">Premium Quality</div>
                  </div>
                  <div className="text-center p-4 bg-white rounded-xl shadow-lg">
                    <Heart className="w-8 h-8 text-red-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900">5★</div>
                    <div className="text-sm text-gray-600">Customer Rating</div>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    src="/images/brands/hleo-hoodie.jpg"
                    alt="HLEO Lifestyle"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-red-600 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white text-2xl font-bold">HLEO</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Animated Images Gallery */}
        <section className="w-full py-16 bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Featured Collection
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Discover our latest pieces in motion
              </p>
              <div className="w-24 h-1 bg-red-600 mx-auto rounded-full mt-4"></div>
            </div>

            {/* Animated Images Container */}
            <div className="relative">
              {/* Single Row - Moving Left to Right (11 images only) */}
              <div className="flex animate-scroll-left space-x-8">
                {[
                  "/images/brands/hleo-hoodie.jpg",
                  "/images/brands/hleo-pants.jpg",
                  "/images/brands/hleo-tee.jpg",
                  "/images/brands/hleo-product-1.jpg",
                  "/images/brands/80c53e72415723e9872f8c1a78f7002f.jpg",
                  "/images/brands/96e62379d274f1085419f41343df8772.jpg",
                  "/images/brands/a196767cbfcebae97ac2138d6467f608.jpg",
                  "/images/brands/ad01e1c13e50d78f64d215353cee5b49.jpg",
                  "/images/brands/d8be5ac6a9480ee5fa81e6ade2b608bc.jpg",
                  "/images/brands/f7a35797a91ed554269dff56654b3f7b.jpg",
                  "/images/brands/over.jpg",
                ].map((src, idx) => (
                  <div key={idx} className="flex-shrink-0 w-80 h-96 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <img
                      src={src}
                      alt={`HLEO Product ${idx + 1}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Product Categories Section */}
        <section className="w-full py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Our Collections
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Discover our carefully curated collections designed for modern lifestyles
              </p>
              <div className="w-24 h-1 bg-red-600 mx-auto rounded-full mt-6"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Hoodies Collection */}
              <div className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-2xl shadow-lg group-hover:shadow-2xl transition-all duration-300">
                  <div className="aspect-[4/5] bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-8">
                    <img
                      src="/images/brands/hleo-hoodie.jpg"
                      alt="Premium Hoodies"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />
                </div>
                <div className="mt-6 text-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Premium Hoodies</h3>
                  <p className="text-gray-600 mb-4">Ultra-soft, oversized comfort for every occasion</p>
                  <Link href="/catalog?brand=hleo&category=hoodies" className="text-red-600 font-semibold hover:text-red-700">
                    Shop Hoodies →
                  </Link>
                </div>
              </div>

              {/* Tees Collection */}
              <div className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-2xl shadow-lg group-hover:shadow-2xl transition-all duration-300">
                  <div className="aspect-[4/5] bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center p-8">
                    <img
                      src="/images/brands/hleo-tee.jpg"
                      alt="Essential Tees"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />
                </div>
                <div className="mt-6 text-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Essential Tees</h3>
                  <p className="text-gray-600 mb-4">Versatile, comfortable basics for everyday wear</p>
                  <Link href="/catalog?brand=hleo&category=tees" className="text-red-600 font-semibold hover:text-red-700">
                    Shop Tees →
                  </Link>
                </div>
              </div>

              {/* Pants Collection */}
              <div className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-2xl shadow-lg group-hover:shadow-2xl transition-all duration-300">
                  <div className="aspect-[4/5] bg-gradient-to-br from-purple-50 to-purple-100 flex items-center justify-center p-8">
                    <img
                      src="/images/brands/hleo-pants.jpg"
                      alt="Designer Pants"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />
                </div>
                <div className="mt-6 text-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Designer Pants</h3>
                  <p className="text-gray-600 mb-4">Perfect fit and ultimate comfort combined</p>
                  <Link href="/catalog?brand=hleo&category=pants" className="text-red-600 font-semibold hover:text-red-700">
                    Shop Pants →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Customer Reviews Section */}
        <section className="w-full py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                What Our Customers Say
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Don't just take our word for it - hear from our satisfied customers
              </p>
              <div className="w-24 h-1 bg-red-500 mx-auto rounded-full mt-6"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  name: "Ahmed Hassan",
                  location: "Cairo, Egypt",
                  rating: 5,
                  text: "The quality is outstanding! HLEO hoodies are incredibly comfortable and the fit is perfect. Will definitely be buying more!",
                  image: "/images/brands/hleo-product-1.jpg"
                },
                {
                  name: "Sarah Mohamed",
                  location: "Alexandria, Egypt",
                  rating: 5,
                  text: "Absolutely love my HLEO pants! The fabric is so soft and the design is modern. Fast delivery and great customer service too!",
                  image: "/images/brands/hleo-pants.jpg"
                },
                {
                  name: "Omar Khalil",
                  location: "Giza, Egypt",
                  rating: 5,
                  text: "HLEO has become my go-to brand for casual wear. The oversized tees are perfect for my style and extremely comfortable.",
                  image: "/images/brands/hleo-tee.jpg"
                }
              ].map((review, idx) => (
                <div key={idx} className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                      <img src={review.image} alt={review.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">{review.name}</h4>
                      <p className="text-gray-300 text-sm">{review.location}</p>
                    </div>
                  </div>
                  <div className="flex mb-4">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <Quote className="w-8 h-8 text-red-400 mb-3 opacity-50" />
                  <p className="text-gray-300 leading-relaxed italic">"{review.text}"</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section - Clean and professional */}
        <section className="w-full py-20 bg-gradient-to-br from-red-50 to-white">
          <div className="max-w-5xl mx-auto px-6 text-center">
            <div className="mb-8">
              <h2 className="text-4xl lg:text-6xl font-bold mb-6 text-gray-900 leading-tight">
                Ready to Experience <span className="text-red-600">HLEO</span>?
              </h2>
              <div className="w-32 h-1 bg-red-600 mx-auto rounded-full mb-6"></div>
            </div>
            <p className="text-xl lg:text-2xl mb-12 text-gray-700 leading-relaxed max-w-3xl mx-auto">
              Join thousands of fashion enthusiasts who have discovered the perfect blend of comfort, style, and quality with HLEO
            </p>
            <Link
              href="/catalog?brand=wonderwink"
              className="inline-flex items-center justify-center px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <ShoppingBag className="w-5 h-5 mr-2" />
              Shop HLEO Collection
            </Link>
          </div>
        </section>
      </div>
    </MainLayout>
  )}
