import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import {  useNavigate } from "react-router-dom";
const AdminContext = (props) => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate()
  const [token,setToken]=useState("");
  const getProductsData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/product/list"
      );

      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getProductsData();
  }, []);
 
  const value = {  products, navigate };
  return (
    <AdminContextKey.Provider value={value}>
      {props.children}
    </AdminContextKey.Provider>
  );
};

export const AdminContextKey = createContext();
export default AdminContext;
