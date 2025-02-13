import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../../api";
import toast from "react-hot-toast";

const ShopByType = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  // Fetch categories from the backend
  const getAllCategories = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/api/category/get-category`);
      if (data?.success) {
        setCategories(data.category);
      }
    } catch (error) {
      console.error(error);
      toast.error("Error loading categories");
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <section className="py-10">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
        OUR PRODUCTS
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-4">
        {categories.map((category) => (
          <div
            key={category._id}
            onClick={() => navigate(`/category/${category.slug}`)}
            className="relative overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-300 hover:shadow-2xl group cursor-pointer"
          >
            <div className="relative w-full h-64 overflow-hidden rounded-xl">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-contain transition-all duration-500 group-hover:scale-105 group-hover:rotate-[15deg] group-hover:translate-x-3 group-hover:translate-y-3 group-hover:opacity-100"
              />
            </div>

            <div className="absolute bottom-4 left-0 right-0 px-6 py-3 text-center z-10">
              <h3 className="text-lg font-semibold text-gray-800 group-hover:text-gray-600">
                {category.name}
              </h3>
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-30 transition-all duration-500 group-hover:opacity-60"></div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ShopByType;
