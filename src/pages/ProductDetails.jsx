import React, { useMemo } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useProductsState, useProductsDispatch } from "../context/ProductsContext";
import { useAuth } from "../context/AuthContext";
import Loading from "../components/Loading";
import ErrorBox from "../components/ErrorBox";
import { ArrowLeft, Edit2, Trash2, ShoppingCart, Star } from "lucide-react";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, loading, error } = useProductsState();
  const dispatch = useProductsDispatch();
  const { isAdmin } = useAuth();

  // Get recommended products from same category
  const recommendedProducts = useMemo(() => {
    if (!products.length) return [];
    const product = products.find((p) => String(p.id) === String(id));
    if (!product) return [];
    
    return products
      .filter((p) => p.category === product.category && String(p.id) !== String(id))
      .slice(0, 4);
  }, [products, id]);

  if (loading) return <Loading />;
  if (error) return <ErrorBox message={error} />;

  const product = products.find((p) => String(p.id) === String(id));

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Product Not Found</h2>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  const handleDelete = () => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    dispatch({ type: "DELETE_PRODUCT", payload: product.id });
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link to="/" className="hover:text-blue-600 transition">Home</Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">{product.title}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Main Product Section */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-12">
          <div className="grid md:grid-cols-2 gap-8 p-8">
            {/* Product Image */}
            <div className="flex items-center justify-center bg-gray-50 rounded-xl p-8">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-96 object-contain hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Product Info */}
            <div className="flex flex-col justify-between">
              <div>
                {/* Category Badge */}
                <span className="inline-block px-4 py-1 bg-blue-100 text-blue-800 text-sm font-semibold rounded-full mb-4">
                  {product.category}
                </span>

                {/* Title */}
                <h1 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
                  {product.title}
                </h1>

                {/* Rating (Mock - you can add real ratings) */}
                <div className="flex items-center gap-2 mb-6">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-current" />
                    ))}
                  </div>
                  <span className="text-gray-600 text-sm">(4.5 / 128 reviews)</span>
                </div>

                {/* Price */}
                <div className="mb-6">
                  <span className="text-4xl font-bold text-gray-900">
                    ${product.price}
                  </span>
                  <span className="text-gray-500 ml-2 line-through">
                    ${(product.price * 1.2).toFixed(2)}
                  </span>
                </div>

                {/* Description */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
                  <p className="text-gray-600 leading-relaxed">{product.description}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4">
                <button className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition font-semibold shadow-lg hover:shadow-xl">
                  <ShoppingCart className="w-5 h-5" />
                  Add to Cart
                </button>

                <div className="flex gap-3">
                  {isAdmin() && (
                    <>
                      {/* <Link
                        to={`/edit/${product.id}`}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-amber-500 text-white rounded-xl hover:bg-amber-600 transition font-medium"
                      >
                        <Edit2 className="w-4 h-4" />
                        Edit
                      </Link> */}
                      {/* <button
                        onClick={handleDelete}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition font-medium"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </button> */}
                    </>
                  )}
                  <button
                    onClick={() => navigate(-1)}
                    className="flex items-center justify-center gap-2 px-6 py-3 border-2 border-gray-300 rounded-xl hover:bg-gray-50 transition font-medium"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recommended Products */}
        {recommendedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Similar Products You May Like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {recommendedProducts.map((rec) => (
                <Link
                  key={rec.id}
                  to={`/product/${rec.id}`}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="bg-gray-50 p-4 flex items-center justify-center h-48">
                    <img
                      src={rec.image}
                      alt={rec.title}
                      className="h-full object-contain group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <span className="text-xs text-blue-600 font-semibold uppercase">
                      {rec.category}
                    </span>
                    <h3 className="font-semibold text-gray-900 mt-2 line-clamp-2 group-hover:text-blue-600 transition">
                      {rec.title}
                    </h3>
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-xl font-bold text-gray-900">
                        ${rec.price}
                      </span>
                      <button className="p-2 bg-blue-100 rounded-lg hover:bg-blue-600 hover:text-white transition">
                        <ShoppingCart className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}