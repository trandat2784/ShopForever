import React, { useContext, useEffect, useState } from "react";
import Title from "../component/Title";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";

const Order = () => {
  const { backendUrl, token, products, currency } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);
  const loadOrderData = async () => {
    try {
      if (!token) {
        return null;
      }
      const response = await axios.post(
        backendUrl + "/api/order/userorders",
        {},
        { headers: { token } }
      );

      if (response.data.success) {
        setOrderData(response.data.orders.reverse());
      }
    } catch (error) {}
  };
  useEffect(() => {
    loadOrderData();
  }, [token]);
  return (
    <div className="border-t pt-16 ">
      <div className="text-2xl">
        <Title text1={"MY"} text2={"ORDERS"} />
      </div>
      <div>
        {orderData.map((order, index) => (
          <div key={index} className="border-t border-b py-6 text-gray-700">
            <div className="mb-2">
              <p className="font-semibold text-base">
                Order Date:{" "}
                <span className="text-gray-500">
                  {new Date(order.date).toLocaleString()}
                </span>
              </p>
              <p className="font-semibold text-base">
                Payment Method:{" "}
                <span className="text-gray-500">{order.paymentMethod}</span>
              </p>
              <p className="font-semibold text-base">
                Status: <span className="text-green-600">{order.status}</span>
              </p>
            </div>

            <div className="grid gap-4">
              {order.items.map((product, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-4 border p-3 rounded-md bg-gray-50"
                >
                  <img
                    src={product.image[0]}
                    className="w-16 h-16 object-cover rounded"
                    alt={product.name}
                  />
                  <div>
                    <p className="font-medium">{product.name}</p>
                    <p className="text-sm text-gray-600">
                      {currency}
                      {product.price} × {product.quantity}
                    </p>
                    <p className="text-sm text-gray-500">
                      Size: {product.size}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 text-right">
              <button className="border px-4 py-2 text-sm font-medium rounded-sm">
                Track Order
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Order;
