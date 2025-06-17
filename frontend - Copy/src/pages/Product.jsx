import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/frontend_assets/assets";
import RelatedProducts from "../component/RelatedProducts";
import axios from "axios";
import { toast } from "react-toastify";
const Product = () => {
  const { ProductId } = useParams();
  const { products, addToCart,userId,token } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [replyContent, setReplyContent] = useState("");
  const [currentState, setCurrentState] = useState("description");
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");
  const fetchProductData = async () => {
    console.log("Fetching product data", products);
    products?.map((item) => {
      if (item._id === ProductId) {
        console.log(item);
        setProductData(item);
        setImage(item.image[0]);
        return null;
      }
    }); 
    const handleReply = async (commentId) => {
      try {
        console.log(commentId,replyContent,userId)
            const data = {
              userId: userId,
              commentId: commentId,
              replyContent: replyContent
            };
            console.log(data)
        const result = await axios.post(
          "http://localhost:3005/api/comment/reply",
           data ,
          { headers: { token } },
        );
        console.log("Reply result:", result);
        setComments((prevComments) =>
          prevComments.map((comment) =>
            comment._id === commentId
              ? {
                  ...comment,
                  replies: [
                    ...comment.replies,
                    { ...result.data, content: replyContent ,userId: userId},
                  ],
                }
              : comment
          )
        );
        setReplyContent(""); // Clear input
        toast.success("Phản hồi được thêm thành công!");
      } catch (error) {
        console.error(error);
      }
    };
  };  const fetchComments = async () => {
    try {
      const response = await axios.post(
        `http://localhost:3005/api/comment/list`,{ProductId}
      );
      setComments(response.data.comments);
      console.log(comments);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment) return; // Không gửi bình luận rỗng

    try {
      const response = await axios.post(
        "http://localhost:3005/api/comment/create",
        {
          ProductId: ProductId,
          userId,
          content: newComment,
        },
        { headers: { token } }
      );
      setComments([...comments, response.data]); // Thêm bình luận mới vào danh sách
      fetchComments()
      setNewComment(""); // Reset input
      toast.success("Comment added successfully!");
    } catch (error) {
      console.error("Error adding comment:", error);
      toast.error("Failed to add comment.");
    }
  };
  useEffect(() => {
    fetchProductData();
    console.log("Fetching product data", productData);
  }, [ProductId, products]);
  useEffect(() => {
    fetchComments();
  }, []);
  console.log(ProductId);
  return productData ? (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {productData.image?.map((item, index) => (
              <img
                onClick={() => setImage(item)}
                src={item}
                key={index}
                className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
                alt=""
              />
            ))}
          </div>
          <div className="w-full sm:w-[80%]">
            <img className="w-full h-auto" src={image} alt="" />
          </div>
        </div>
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>
          <div className=" flex items-center gap-1 mt-2">
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_dull_icon} alt="" className="w-3 5" />
            <p className="pl-2">(122)</p>
          </div>
          <p className="mt-5 text-gray-500 md:w-4/5">{productData.price}</p>
          <p className="mt-5 text-gray-500 md:w-4/5">
            {productData.description}
          </p>
          <div className="flex flex-col gap-4 my-8">
            <p>Select size</p>
            <div className="flex gap-2">
              {productData?.sizes.map((item, index) => (
                <button
                  onClick={() => setSize(item)}
                  className={`border py-2 px-4 bg-gray-100 ${
                    item === size ? "border-orange-500" : ""
                  }`}
                  key={index}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => addToCart(productData._id, size)}
            className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700"
          >
            Add To Cart
          </button>

          <hr className="mt-8 sm:w-4/5" />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% Original product.</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>
      <div className="mt-20">
        <div className="flex">
          <b
            className="border px-5 py-3 text-sm"
            onClick={() => {
              setCurrentState("description");
            }}
          >
            Description
          </b>
          <b
            className="border px-5 py-3 text-sm cursor-pointer"
            onClick={() => {
              setCurrentState("comment");
            }}
          >
            Comment
          </b>
          {/* <p className="border px-5 py-3 text-sm">Reviews (122)</p> */}
        </div>
        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
          {currentState === "description" ? (
            <>
              <p>
                An e-commerce website is an online platform that facilitates the
                buying and selling of products or services over the internet. It
                serves as a virtual marketplace where businesses and individuals
                can showcase their products, interact with customers, and
                conduct transactions without the need for a physical presence.
                E-commerce websites have gained immense popularity due to their
                convenience, accessibility, and the global reach they offer.
              </p>
              <p>
                E-commerce websites typically display products or services along
                with detailed descriptions, images, prices, and any available
                variations (e.g., sizes, colors). Each product usually has its
                own dedicated page with relevant information.
              </p>
            </>
          ) : (
            ""
          )} {currentState === "comment" ? (
            //comment here
            <div className="mt-1">
              <form
                onSubmit={handleCommentSubmit}
                className="flex flex-col mt-2"
              >
                <textarea
                  className="border p-2 rounded-md"
                  rows="4"
                  placeholder="Write your comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                />
                <button
                  type="submit"
                  className="mt-2 bg-blue-500 text-white py-2 px-4  hover:bg-blue-600 transition duration-200"
                >
                  Submit Comment
                </button>
              </form>
              <div className="mt-4">
                {comments.map((comment) => (
                  <div key={comment._id} className=" py-2">
                    <p className="font-semibold">{comment.userId}</p>
                    <p>{comment.content}</p>
                    <div className="mt-3 ml-6 flex gap-2">
                      <input
                        type="text"
                        placeholder="Write a reply..."
                        className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm"
                        onChange={(e) => setReplyContent(e.target.value)}
                      />
                      <button
                        // onClick={() => handleReply(comment._id)}
                        className="bg-blue-500 text-white px-4 py-2 text-sm rounded-md hover:bg-blue-600"
                      >
                        Reply
                      </button>
                    </div>
                    <div className="ml-6 mt-2">
                      {comment.replies?.map((reply, index) => (
                        <div
                          key={index}
                          className="py-2 border-l-2 border-main-color pl-4 mb-2 bg-gray-50 rounded"
                        >
                          <p className="font-medium text-gray-700">
                            {reply.userId}
                          </p>
                          <p className="text-gray-600">{reply.content}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
      <RelatedProducts
        category={productData.category}
        subCategory={productData.subCategory}
      />
    </div>
  ) : (
    <div className="opacity-0"> </div>
  );
};

export default Product;
