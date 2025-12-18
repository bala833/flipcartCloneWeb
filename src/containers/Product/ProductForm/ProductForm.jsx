import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "./ProductForm.scss";
import { addProduct, getProduct, updateProduct } from "../../../services/Product/Product";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/authContext";

const ProductForm = () => {
  const {id } = useParams();
  const { authToken, setAuthToken } = useContext(AuthContext);
  const baseUrl = process.env.REACT_APP_API_URL;
  const imagebaseUrl = process.env.REACT_APP_API_IMAGE_CDN_URL;
  const isEdit = !!id;

  const navigate = useNavigate();


  const [formData, setFormData] = useState({
    sku: "",
    name: "",
    description: "",
    category: "",
    brand: "",
    price: "",
    cost_price: "",
    discount: "",
    quantity_in_stock: "",
    unit: "",
    status: "ACTIVE",
    created_by: "admin",
    updated_by: "admin",
    image_url: null
  });
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleGetProduct = async () => {
      const response = await getProduct(authToken, id);
      console.log(response, 'asdasdf')
      setFormData(response?.data);
      const imageUrl = imagebaseUrl+response?.data?.image_url
      setImageFile(response?.data?.image_url)
      setPreview(imageUrl);
  }

  // Fetch product if editing
  useEffect(() => {
    if (isEdit) {
      handleGetProduct()
    }
  }, [isEdit, id]);

  // Handle change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = new FormData();
    // payload.append("product", JSON.stringify(formData));
    formData.image_url = null;
 const blob = new Blob([JSON.stringify(formData)], { type: "application/json" });
  payload.append("product", blob)
    if (imageFile && imageFile instanceof File) payload.append("imageFile", imageFile
    );
    console.log(payload)

    try {
      if (isEdit) {
        const _response = await updateProduct(id, payload, authToken);
        console.log(_response)
        // alert("✅ Product updated successfully!");
        navigate('/productlist');

      } else {
        console.log('calling add fun')
        const _response = await addProduct(payload, authToken);
        console.log(_response)
        // alert("✅ Product added successfully!");
        navigate('/productlist');
      }

      //   if (onSuccess) onSuccess();
    } catch (err) {
      console.error("❌ Error saving product:", err);
      alert("Error saving product!");
    }
  };

  return (
    <div className="flipkart-form-container">
      <form className="flipkart-form" onSubmit={handleSubmit}>
        <h2>{isEdit ? "Update Product" : "Add New Product"}</h2>

        <div className="form-row">
          <label>SKU</label>
          <input name="sku" value={formData.sku} onChange={handleChange} required />
        </div>

        <div className="form-row">
          <label>Name</label>
          <input name="name" value={formData.name} onChange={handleChange} required />
        </div>

        <div className="form-row">
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
          ></textarea>
        </div>

        <div className="form-grid">
          <div>
            <label>Category</label>
            <input name="category" value={formData.category} onChange={handleChange} />
          </div>
          <div>
            <label>Brand</label>
            <input name="brand" value={formData.brand} onChange={handleChange} />
          </div>
        </div>

        <div className="form-grid">
          <div>
            <label>Price</label>
            <input
              name="price"
              type="number"
              step="0.01"
              value={formData.price}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Cost Price</label>
            <input
              name="cost_price"
              type="number"
              step="0.01"
              value={formData.cost_price}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Discount (%)</label>
            <input
              name="discount"
              type="number"
              step="0.01"
              value={formData.discount}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-grid">
          <div>
            <label>Quantity</label>
            <input
              name="quantity_in_stock"
              type="number"
              value={formData.quantity_in_stock}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Unit</label>
            <input name="unit" value={formData.unit} onChange={handleChange} />
          </div>
          <div>
            <label>Status</label>
            <select name="status" value={formData.status} onChange={handleChange}>
              <option value="ACTIVE">Active</option>
              <option value="DEACTIVATE">Inactive</option>
            </select>
          </div>
        </div>

        <div className="form-row">
          <label>Product Image</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
          {/* {preview && <img src={preview} alt="preview" className="image-preview" />} */}
             {preview &&  <img src={`data:image/jpeg;base64,${formData.image_url}`} alt={formData.name} className="image-preview" /> }

        </div>

        <button type="submit" className="submit-btn">
          {isEdit ? "Update Product" : "Add Product"}
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
