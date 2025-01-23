import { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import axios from "axios";
import { API_URL } from "../../api";
import toast from "react-hot-toast";
import { NavLink } from "react-router-dom";

const Products = () => {
  const [product, setProduct] = useState([]);

  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/api/product/get-product`);
      if (data.success) {
        setProduct(data.products);
        console.log(data);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error fetching products");
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Layout title="Products" description="Products">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/4 bg-gray-100 p-4">
          <AdminMenu />
        </div>
        <div className="md:w-3/4 p-6">
          <h2 className="text-2xl font-bold text-center mb-6">All Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {product?.map((prod) => (
              <NavLink
                to={`/dashboard/admin/product/${prod.slug}`}
                key={prod._id}
                className="shadow-lg rounded-lg hover:scale-105 transition-transform"
              >
                <div className="bg-white rounded-lg overflow-hidden">
                  <img
                    src={prod.image}
                    alt={prod.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h5 className="text-lg font-semibold mb-2">{prod.name}</h5>
                    <p className="text-gray-700 text-sm mb-2">
                      {prod.description}
                    </p>
                    <p className="text-blue-600 font-bold">${prod.price}</p>
                  </div>
                </div>
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
