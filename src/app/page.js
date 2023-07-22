"use client";
import SearchBox from "@/components/SearchBox";
import { useQuery } from "@tanstack/react-query";
import Error from "next/error";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "@/features/cart/cartSlice";

export default function Home() {
  const dispatch = useDispatch();

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

  function handleAddToCart(product) {
    dispatch(addToCart(product));
  }

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
            <div id="hovercart">
              <div className="card">
                <div className="d-flex justify-content-center">
                  <Image
                    className="mx-auto resimg img-fluid mt-2"
                    height="250"
                    width="250"
                    src={product.image}
                    alt={product.title}
                    priority
                  />
                </div>
                <p className="h4 card-title mt-3 ml-2">{product.title}</p>
                <div>
                  <Link href={`/${product.id}`}>
                    <button className=" btn btn-success float-left  ">
                      Detail
                    </button>
                  </Link>
                  <button
                    onClick={() => handleAddToCart(product)}
                    id="shopcart"
                    className=" btn btn-info float-right mb-2 "
                  >Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
