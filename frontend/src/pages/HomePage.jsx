import { useEffect, useState } from "react";
import CategoryItem from "../components/CategoryItem";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useProductStore } from "../stores/useProductStore";
import FeaturedProducts from "../components/FeaturedProducts";
import Slider from "react-slick";
import ProductCard from "../components/ProductCard";

const categories = [
  {
    href: "/caps",
    name: "CAPS & HATS",
    imageUrl: "./src/collections/all-cap.avif",
  },
  {
    href: "/skateboards",
    name: "SKATEBOARDS",
    imageUrl: "./src/collections/all-skateboards.avif",
  },
  {
    href: "/backpacks",
    name: "BACKPACKS",
    imageUrl: "./src/collections/all=backpack.avif",
  },
  {
    href: "/clothes",
    name: "CLOTHES",
    imageUrl: "./src/collections/clothes.avif",
  },
  {
    href: "/shirts",
    name: "SHIRTS",
    imageUrl: "./src/collections/all-shirts.avif",
  },
  {
    href: "/hoodie",
    name: "HOODIE",
    imageUrl: "./src/collections/all-hoodie.avif",
  },
  {
    href: "/bottoms",
    name: "BOTTOM",
    imageUrl: "./src/collections/all-bottom.avif",
  },
  {
    href: "/boxers",
    name: "BOXER",
    imageUrl: "./src/collections/all-boxers.avif",
  },
  {
    href: "/t-shirts",
    name: "T-SHIRT",
    imageUrl: "./src/collections/all-tshirt.webp",
  },
  {
    href: "/socks",
    name: "SOCKS",
    imageUrl: "./src/collections/all-socks.webp",
  },
  {
    href: "/eyewears",
    name: "EYEWEAR",
    imageUrl: "./src/collections/all-eyewear.webp",
  },
  {
    href: "/wallets",
    name: "WALLET",
    imageUrl: "./src/collections/all-acessories.webp",
  },
  {
    href: "/watches",
    name: "WATCH",
    imageUrl: "./src/collections/all-watch.svg",
  },
  {
    href: "/accessories",
    name: "ACCESSORIES",
    imageUrl: "./src/collections/all-wallet.svg",
  },
];

const HomePage = () => {
  const { fetchFeaturedProducts, fetchAllProducts, products, isLoading } =
    useProductStore();

  const [displayCount, setDisplayCount] = useState(12); // Initial display count

  useEffect(() => {
    fetchFeaturedProducts();
    fetchAllProducts();
  }, [fetchFeaturedProducts, fetchAllProducts]);

  const loadMoreProducts = () => {
    setDisplayCount((prevCount) => prevCount + 12); // Load 12 more products
  };

  const NextArrow = (props) => {
    const { onClick } = props;
    return (
      <div
        className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer z-10"
        onClick={onClick}
      >
        <ChevronRight size={32} className="text-white hover:text-emerald-400" />
      </div>
    );
  };

  const PrevArrow = (props) => {
    const { onClick } = props;
    return (
      <div
        className="absolute top-1/2 left-4 transform -translate-y-1/2 cursor-pointer z-10"
        onClick={onClick}
      >
        <ChevronLeft size={32} className="text-white hover:text-emerald-400" />
      </div>
    );
  };

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
          <div className="h-[33rem]">
            <a href="/category/clothes" rel="noopener noreferrer">
              <img
                src="/banner-3.jpg"
                alt="Slide 3"
                className="w-full h-full object-cover" // Make images responsive
              />
            </a>
          </div>
          <div className="h-[33rem]">
            <a href="/category/caps" rel="noopener noreferrer">
              <img
                src="/MENS-HAT.webp"
                alt="Slide 1"
                className="w-full h-full object-cover" // Make images responsive
              />
            </a>
          </div>
          <div className="h-[33rem]">
            <a href="/category/eyewears" rel="noopener noreferrer">
              <img
                src="/eyewear.webp"
                alt="Slide 2"
                className="w-full h-full object-cover" // Make images responsive
              />
            </a>
          </div>
        </Slider>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <h1 className="text-center text-5xl sm:text-6xl font-bold text-emerald-400 mb-4">
          Explore Our Categories
        </h1>
        <p className="text-center text-xl text-gray-300 mb-12">
          Discover the latest trends in eco-friendly fashion
        </p>

        <div className="flex flex-wrap gap-3.5 justify-center">
          {categories.map((category) => (
            <div key={category.name} className="flex flex-col items-center">
              <div className="bg-white p-1 rounded-md">
                <CategoryItem category={category} />
              </div>
              <p className="text-white text-xs mt-1 text-center">
                {category.name}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12">
          <hr className="border-emerald-400 mb-6 " />

          <h2 className="text-3xl font-bold text-emerald-400 mb-6 text-center">
            BESTSELLERS
          </h2>

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
