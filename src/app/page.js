"use client";
import SearchBox from "@/components/SearchBox";
import { useQuery } from "@tanstack/react-query";
import Error from "next/error";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const {
    data: allProducts,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["products"],
    queryFn: () =>
      fetch("https://fakestoreapi.com/products").then((res) => res.json()),
  });

  const [searchQuery, setSearchQuery] = useState("");

  if (isLoading || !allProducts)
    return (
      <div className=" ml-2 spinner-border text-primary" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    );
  if (isError) return <Error />;

  const filteredProducts = allProducts.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container-fluid">
      <div className="row mt-3">
        <SearchBox
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {filteredProducts.map((product) => (
          <div className="col-md-4 mb-2 mt-2" key={product.id}>
            <div className="card">
              <Link href={`/${product.id}`}>
                <div className="d-flex justify-content-center">
                  <Image
                    className="mx-auto resimg img-fluid mt-2"
                    height={350}
                    width={350}
                    src={product.image}
                    alt={product.title}
                  />
                </div>
                <p className="h4 card-title mt-3 ml-2">{product.title}</p>
              </Link>
              <p className="h5 mt-2 ml-2">Price: {product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
