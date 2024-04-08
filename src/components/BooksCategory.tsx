"use client";

import fetchData from "@/lib/fetchDataFromApi";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Skeleton from "./loader/Skeleton";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";

const BooksCategory = () => {
  const [loading, setLoading] = useState(true);
  const [books, setBooks] = useState<BooksProduct[]>([]);

  useEffect(() => {
    setLoading(true);

    try {
      const getBooks = async () => {
        const res = await fetchData.get("/products/books", {
          limit: "10",
          rating: "5",
        });

        setBooks((res.data.products as BooksProduct[]) || []);
        setLoading(false);
      };

      getBooks();
    } catch (error) {
      console.log(error);
    }

    return () => {};
  }, []);

  return (
    <section className="books-category pt-20">
      <div className="container">
        <div className="flex justify-between items-center gap-4 flex-wrap mb-6">
          <h1 className="text-2xl md:text-4xl font-semibold">
            Best Sellers in Books
          </h1>
          <Link href={"/shops/books"} className="hover:underline text-primary">
            View Shop
          </Link>
        </div>
        <Carousel
          plugins={
            [
              // AutoPlay({
              //   delay: 5000,
              // }),
            ]
          }
        >
          <CarouselContent>
            {!loading &&
              books?.map((book, index) => (
                <CarouselItem
                  className="basis-1/2 sm:basis-1/3 md:basis-1/5 lg:basis-1/6"
                  key={index}
                >
                  <Link href={`/products/${book._id}`}>
                    <Image
                      width={400}
                      height={600}
                      alt={book.title}
                      src={book.image[0]}
                      className="rounded-lg"
                    />
                  </Link>
                </CarouselItem>
              ))}

            {loading &&
              [...Array(10)].map((_, index) => (
                <CarouselItem
                  className="basis-1/2 sm:basis-1/3 md:basis-1/5 lg:basis-1/6"
                  key={index}
                >
                  <Skeleton
                    key={index}
                    className="bg-secondary aspect-[1/1.5] rounded-lg"
                  ></Skeleton>
                </CarouselItem>
              ))}
          </CarouselContent>
          <CarouselPrevious className="left-0" />
          <CarouselNext className="right-0" />
        </Carousel>
      </div>
    </section>
  );
};

export default BooksCategory;
