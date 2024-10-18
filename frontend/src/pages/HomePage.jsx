import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react"; // Remove Menu import
import CategoryItem from "../components/CategoryItem";
import { useProductStore } from "../stores/useProductStore";
import FeaturedProducts from "../components/FeaturedProducts";
import Slider from "react-slick";
import ProductCard from "../components/ProductCard";
import { motion } from "framer-motion"; 

const categories = [
  { href: "/caps", name: "CAPS & HATS", imageUrl: "https://res.cloudinary.com/daqetpo5k/image/upload/v1729232400/d7b7zjaxtmd9lzgpmmis.avif" },
  { href: "/skateboards", name: "SKATEBOARDS", imageUrl: "https://res.cloudinary.com/daqetpo5k/image/upload/v1729232401/gbsgwupb2ch8s6njc2f3.avif" },
  { href: "/backpacks", name: "BACKPACKS", imageUrl: "https://res.cloudinary.com/daqetpo5k/image/upload/v1729232400/bxdo5dlxtqypjzozvd8t.avif" },
  { href: "/clothes", name: "CLOTHES", imageUrl: "https://res.cloudinary.com/daqetpo5k/image/upload/v1729232403/xibuhiipfidh4bek8wrw.avif" },
  { href: "/shirts", name: "SHIRTS", imageUrl: "https://res.cloudinary.com/daqetpo5k/image/upload/v1729232401/yehrer4pnt4ubgevzmd5.avif" },
  { href: "/hoodie", name: "HOODIE", imageUrl: "https://res.cloudinary.com/daqetpo5k/image/upload/v1729232401/reudvi8uzwfne1fhska5.avif" },
  { href: "/bottoms", name: "BOTTOM", imageUrl: "https://res.cloudinary.com/daqetpo5k/image/upload/v1729232400/pvkvadfpyrrhaovikjyg.avif" },
  { href: "/boxers", name: "BOXER", imageUrl: "https://res.cloudinary.com/daqetpo5k/image/upload/v1729232400/zhnebnfjsdqbgpblljb9.avif" },
  { href: "/t-shirts", name: "T-SHIRT", imageUrl: "https://res.cloudinary.com/daqetpo5k/image/upload/v1729232402/aag6a9vi3ojy5opufmhv.webp" },
  { href: "/socks", name: "SOCKS", imageUrl: "https://res.cloudinary.com/daqetpo5k/image/upload/v1729232402/x1eecjvyomxl3krputqq.webp" },
  { href: "/eyewears", name: "EYEWEAR", imageUrl: "https://res.cloudinary.com/daqetpo5k/image/upload/v1729232400/gyovnjyzpxloujmddj1j.webp" },
  { href: "/wallets", name: "WALLET", imageUrl: "https://res.cloudinary.com/daqetpo5k/image/upload/v1729232400/yimamjz2dwj3genxsm0f.webp" },
  { href: "/watches", name: "WATCH", imageUrl: "https://res.cloudinary.com/daqetpo5k/image/upload/v1729232403/s9xer3eaexry8qnbgvsg.svg" },
  { href: "/accessories", name: "ACCESSORIES", imageUrl: "https://res.cloudinary.com/daqetpo5k/image/upload/v1729232403/wa0wrmrwlkwlk6h6xqyh.svg" },
];

const HomePage = () => {
  const { fetchFeaturedProducts, fetchAllProducts, products, isLoading } = useProductStore();
  const [displayCount, setDisplayCount] = useState(12); 

  useEffect(() => {
    fetchFeaturedProducts();
    fetchAllProducts();
  }, [fetchFeaturedProducts, fetchAllProducts]);

  const loadMoreProducts = () => {
    setDisplayCount((prevCount) => prevCount + 12); 
  };

  const NextArrow = ({ onClick }) => (
    <div className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer z-10" onClick={onClick}>
      <ChevronRight size={32} className="text-white hover:text-emerald-400" />
    </div>
  );

  const PrevArrow = ({ onClick }) => (
    <div className="absolute top-1/2 left-4 transform -translate-y-1/2 cursor-pointer z-10" onClick={onClick}>
      <ChevronLeft size={32} className="text-white hover:text-emerald-400" />
    </div>
  );

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <div className="relative min-h-screen text-white overflow-hidden">
      <div className="relative z-10 mx-auto my-4 max-w-full rounded-lg overflow-hidden shadow-lg">
        <Slider {...sliderSettings}>
          {[
            "https://res.cloudinary.com/daqetpo5k/image/upload/v1729255971/banner-3_dgnidg.jpg",
            "https://res.cloudinary.com/daqetpo5k/image/upload/v1729232464/hkzpskeofgzgoudasmr9.webp",
            "https://res.cloudinary.com/daqetpo5k/image/upload/v1729232447/pwkuy44huxrq63vqcxrn.webp",
          ].map((src, index) => (
            <div className="h-[33rem]" key={index}>
              <a href={`/category/${index === 0 ? 'clothes' : index === 1 ? 'caps' : 'eyewears'}`} rel="noopener noreferrer">
                <img src={src} alt={`Slide ${index + 1}`} className="w-full h-full object-cover" />
              </a>
            </div>
          ))}
        </Slider>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <motion.h1
          className="text-center text-5xl sm:text-6xl font-bold text-emerald-400 mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Explore Our Categories
        </motion.h1>
        <p className="text-center text-xl text-gray-300 mb-12">
          Discover the latest trends in eco-friendly fashion
        </p>

        <div className="flex flex-wrap gap-3.5 justify-center">
          {categories.map((category) => (
            <div key={category.name} className="flex flex-col items-center w-1/4 md:w-1/5 lg:w-1/6">
              <div className="bg-white p-1 rounded-md">
                <CategoryItem category={category} />
              </div>
              <p className="text-white text-xs mt-1 text-center">{category.name}</p>
            </div>
          ))}
        </div>

        <div className="mt-12">
          <hr className="border-emerald-400 mb-6" />

          <h2 className="text-3xl font-bold text-emerald-400 mb-6 text-center">BESTSELLERS</h2>

          <div className="bg-emerald p-6 rounded-lg">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {!isLoading && products.length > 0 ? (
                products.slice(0, displayCount).map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))
              ) : (
                <div className="text-center">Loading...</div>
              )}
            </div>
          </div>

          {products.length > displayCount && (
            <div className="mt-6 text-center">
              <button
                className="bg-emerald-500 text-white py-2 px-4 rounded hover:bg-emerald-600"
                onClick={loadMoreProducts}
              >
                Load More
              </button>
            </div>
          )}

          <hr className="border-emerald-400 mb-6 mt-12" />
        </div>

        {!isLoading && products.length > 0 && (
          <FeaturedProducts featuredProducts={products} />
        )}
      </div>
    </div>
  );
};

export default HomePage;
