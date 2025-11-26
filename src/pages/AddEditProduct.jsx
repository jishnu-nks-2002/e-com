import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useProductsState, useProductsDispatch } from "../context/ProductsContext";
import { validateProduct } from "../utils/validators";
import { createProductOnServer, updateProductOnServer } from "../api/productsApi";

export default function AddEditProduct({ editMode=false }){
  const { id } = useParams();
  const navigate = useNavigate();
  const { products } = useProductsState();
  const dispatch = useProductsDispatch();

  const empty = { title: "", price: "", description: "", image: "", category: "" };

  const [form, setForm] = useState(empty);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if(editMode){
      const p = products.find(x => String(x.id) === String(id));
      if(p) setForm({ title: p.title, price: p.price, description: p.description, image: p.image, category: p.category });
    }
  }, [editMode, id, products]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({...prev, [name]: value}));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validation = validateProduct(form);
    setErrors(validation);
    if(Object.keys(validation).length > 0) return;

    setSubmitting(true);
    try {
      if(editMode){
        // call mock server for demonstration (response ignored)
        await updateProductOnServer(id, form).catch(()=>{});
        const updated = { id: Number(id), ...form };
        dispatch({ type: "UPDATE_PRODUCT", payload: updated });
        navigate(`/product/${id}`);
      } else {
        // generate a client-side id to avoid collisions with server ids
        const clientId = Date.now();
        const newProduct = { id: clientId, ...form };
        // optional: call server (mock)
        await createProductOnServer(form).catch(()=>{});
        dispatch({ type: "ADD_PRODUCT", payload: newProduct });
        navigate(`/product/${clientId}`);
      }
    } catch(err){
      console.error(err);
      // show error toast - simple alert for now
      alert("Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">{editMode ? "Edit Product" : "Add Product"}</h2>
      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Title *</label>
          <input name="title" value={form.title} onChange={onChange} className="mt-1 block w-full border p-2 rounded" />
          {errors.title && <p className="text-red-600 text-sm mt-1">{errors.title}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium">Price *</label>
          <input name="price" value={form.price} onChange={onChange} className="mt-1 block w-full border p-2 rounded" />
          {errors.price && <p className="text-red-600 text-sm mt-1">{errors.price}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium">Category *</label>
          <input name="category" value={form.category} onChange={onChange} className="mt-1 block w-full border p-2 rounded" />
          {errors.category && <p className="text-red-600 text-sm mt-1">{errors.category}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium">Image URL *</label>
          <input name="image" value={form.image} onChange={onChange} className="mt-1 block w-full border p-2 rounded" />
          {errors.image && <p className="text-red-600 text-sm mt-1">{errors.image}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium">Description *</label>
          <textarea name="description" value={form.description} onChange={onChange} className="mt-1 block w-full border p-2 rounded" rows="4" />
          {errors.description && <p className="text-red-600 text-sm mt-1">{errors.description}</p>}
        </div>

        <div className="flex items-center space-x-3">
          <button disabled={submitting} type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
            {submitting ? "Saving..." : (editMode ? "Save Changes" : "Create Product")}
          </button>
          <button type="button" onClick={() => navigate(-1)} className="px-4 py-2 border rounded">Cancel</button>
        </div>
      </form>
    </div>
  );
}
