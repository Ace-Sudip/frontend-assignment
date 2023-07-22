"use client";
import { useState, useEffect } from "react";

function SearchBox({ value, onChange }) {
  return (
    <div className="col-md-12">
      <div className="row justify-content-center mb-3">
        <div className="col-md-6 col-sm-12">
          <input
            placeholder="Search Items.."
            className="form-control"
            value={value}
            onChange={onChange}
          />
        </div>
      </div>
    </div>
  );
}

export default SearchBox;
