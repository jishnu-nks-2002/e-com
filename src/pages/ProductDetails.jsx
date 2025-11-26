import React from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useProductsState, useProductsDispatch } from "../context/ProductsContext";
import { useAuth } from "../context/AuthContext";
import Loading from "../components/Loading";
import ErrorBox from "../components/ErrorBox";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, loading, error } = useProductsState();
  const dispatch = useProductsDispatch();
  const { isAdmin } = useAuth();

  if (loading) return <Loading />;
  if (error) return <ErrorBox message={error} />;

  const product = products.find((p) => String(p.id) === String(id));

  if (!product) return <div className="p-4">Product not found.</div>;

  const handleDelete = () => {
    if (!confirm("Delete this product?")) return;
    dispatch({ type: "DELETE_PRODUCT", payload: product.id });
    navigate("/");
  };

  return (
    <div className="bg-white p-6 rounded shadow">
      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={product.image}
          alt={product.title}
          className="w-full md:w-1/3 h-64 object-contain"
        />
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-2">{product.title}</h2>
          <p className="text-gray-600 mb-3">{product.category}</p>
          <p className="mb-4">{product.description}</p>
          <p className="text-2xl font-bold mb-4">${product.price}</p>
          
          <div className="space-x-3">
            {isAdmin() && (
              <>
                <Link
                  to={`/edit/${product.id}`}
                  className="px-4 py-2 bg-yellow-400 rounded hover:bg-yellow-500"
                >
                  Edit
                </Link>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </>
            )}
            <button
              onClick={() => navigate(-1)}
              className="px-4 py-2 border rounded hover:bg-gray-100"
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}