"use client";

import fetchData from "@/lib/fetchDataFromApi";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ProductCard from "./cards/ProductCard";
import Skeleton from "./loader/Skeleton";
import { Button } from "./ui/button";

const shops = [
  { title: "gadgets", icon: "/icons/gadgets.png" },
  { title: "grocery", icon: "/icons/grocery.png" },
  { title: "bakery", icon: "/icons/bakery.png" },
  { title: "clothing", icon: "/icons/clothing.png" },
  { title: "makeup", icon: "/icons/makeup.png" },
  //   { title: "bags", icon: "/icons/bag.png" },
  //   { title: "furniture", icon: "/icons/furniture.png" },
  //   { title: "books", icon: "/icons/books.png" },
  //   { title: "medicine", icon: "/icons/medicine.png" },
];

const FeaturedProducts = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [activeShop, setActiveShop] = useState("gadgets");
  const [products, setProducts] = useState<AllProduct[]>([]);
  const shop = shops.find((shop) => shop.title === activeShop);

  useEffect(() => {
    setIsLoading(true);

    try {
      const fetching = async () => {
        const res = await fetchData.get(`/products/${activeShop}`, {
          limit: "8",
        });

        setProducts((res.data.products as AllProduct[]) || []);
        setIsLoading(false);
      };

      fetching();
    } catch (error) {
      console.log(false);
    }

    return () => {};
  }, [activeShop]);

  return (
    <section className="featured-products py-10 w-full">
      <div className="container">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-5">
          Best sellers in{" "}
          <Link
            href={`/shops/${shop?.title}`}
            className="text-primary hover:underline"
          >
            {shop?.title}
          </Link>{" "}
          products
        </h1>
        <div className="flex gap-4 items-center flex-wrap">
          <AnimatePresence>
            {shops.map((shop) => (
              <button
                type="button"
                key={shop.title}
                className={`${
                  shop.title === activeShop ? "text-primary" : ""
                } flex items-center px-2 py-1 hover:text-primary transition-colors duration-150 capitalize relative`}
                onClick={() => setActiveShop(shop.title)}
              >
                <Image
                  src={shop.icon}
                  height={40}
                  width={40}
                  alt={shop.title}
                />
                <span>{shop.title}</span>

                {shop.title === activeShop && (
                  <motion.div
                    layout
                    layoutId="underline"
                    className="absolute left-0 bottom-0 w-full h-0.5 bg-primary rounded-lg"
                  />
                )}
              </button>
            ))}
          </AnimatePresence>
        </div>

        {isLoading ? (
          <div className="grid gap-4 grid-cols-1 min-[360px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mt-6">
            {[...Array(8)].map((_, index) => (
              <div className="p-2.5 md:p-4 rounded-lg bg-secondary" key={index}>
                <Skeleton className="aspect-square rounded-lg" />
                <Skeleton className="h-4 w-4/5 rounded-3xl mt-3" />
                <div className="flex justify-between items-center">
                  <Skeleton className="h-3 w-16 rounded-3xl mt-3" />
                  <Skeleton className="h-7 w-20 rounded-3xl mt-3" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid gap-4 grid-cols-1 min-[360px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mt-6">
            {products.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                variants="style-2"
              />
            ))}
          </div>
        )}

        <div className="mt-7 flex justify-center w-full">
          <Button
            type="button"
            onClick={() => router.push(`/shops/${activeShop}`)}
          >
            View More
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
