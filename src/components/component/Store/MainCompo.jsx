import React, { useEffect, useState } from "react";
import FilterComponent from "./Filter";
import ProductGrid from "./ProductGrid";
import styles from "./MainComponent.module.css";
import axios from "axios";
import { API_URL } from "../../../api";
import  toast  from "react-hot-toast";

const MainComponent = () => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [product, setProduct] = useState([]);
  const [products, setProducts] = useState([]);
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/api/product/get-product`);
      if (data.success) {
        setProduct(data.products);
        console.log(data.products);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error fetching products");
    }
  };
  useEffect(() => {
    getAllProducts();
    setProducts(product);
    // setFilteredProducts(product);
    setIsLoading(false);
  }, []);

  const handleFilterChange = (selectedFilters) => {
    const updatedFilteredProducts = products.filter((product) =>
      selectedFilters.includes(product.category)
    );
    setFilteredProducts(updatedFilteredProducts);
  };

  return (
    <div className={styles.mainContainer}>
      <FilterComponent onFilterChange={handleFilterChange} />
      <ProductGrid products={product} isLoading={isLoading} error={error} />
    </div>
  );
};

export default MainComponent;
