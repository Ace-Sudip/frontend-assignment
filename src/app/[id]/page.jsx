"use client";
import { useQuery, useState, useEffect } from "@tanstack/react-query";
import Image from "next/image";
import { useParams } from "next/navigation";

function SingledataPage() {
  const { id } = useParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["data", id],
    queryFn: () =>
      fetch(`https://fakestoreapi.com/products/${id}`).then((res) =>
        res.json()
      ),
  });

  if (isLoading || !data) return <div>Loading...</div>;
  if (isError)
    return (
      <div>
        sth went wrong
      </div>
    );

  console.log(data);
  return (
    <div className="container-fluid">
      <div className="row mt-5 ">
        <div className="col-md-12 ">
          <div className="card shadow p-3 mb-5 bg-white rounded">
            <p className="h3">{data.title}</p>
            <hr />
            <div className="justify-content-center d-flex">
              <Image
                width={200}
                height={200}
                src={data.image}
                alt={data.title}
                className=" img-fluid resimg mt-3"
              />
            </div>
            <p className="h6 mt-4">Description: {data.description}</p>

            <p className="h5 font-weight-bold">Rating: {data.rating.rate}</p>
            <p className="h5 font-weight-bold">Price: Rs. {data.price}</p>

            <hr />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingledataPage;
