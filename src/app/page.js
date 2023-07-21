"use client";
import { useQuery } from "@tanstack/react-query";
import Error from "next/error";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["products"],
    queryFn: () =>
      fetch("https://fakestoreapi.com/products").then((res) => res.json()),
  });

  if (isLoading || !data) return <div>Loading...</div>;
  if (isError) return <Error />;

  return (
    <div className="container-fluid">
      <div className="row mt-3 ">
        {data.map((product) => (
          <div className="col-md-4   mb-2 mt-2 " key={product.id}>
            <div className="card">
              <div className="d-flex justify-content-center">
                <Image
                  className="mx-auto  resimg img-fluid mt-2"
                  height={350}
                  width={350}
                  src={product.image}
                  alt={product.title}
                />
              </div>
              <Link href={`/${product.id}`}>
                <p className="h4 card-title  mt-3 ml-2 ">{product.title}</p>
              </Link>

              <p className="h5  mt-2 ml-2">Price: {product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
