import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import {
  addBanner,
  getByIdBanner,
  updateBanner,
} from "../../services/Banners/Banners";
import "./Banners.scss";

const BannerForm = () => {
  const { id } = useParams();
  console.log(id);
  const { authToken } = useContext(AuthContext);
  const isEdit = !!id;
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image_url: null,
    active: true, // NEW

  });

  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleGetBanner = async () => {
    const response = await getByIdBanner(authToken, id);
    setFormData({...response?.data,
      active: response?.data?.active ?? false,
    });
    setImageFile(response?.data?.image_url);
    setPreview(response?.data?.image_url); // Assuming this is a full URL
  };

  useEffect(() => {
    if (isEdit) handleGetBanner();
  }, [isEdit, id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };

  console.log(imageFile);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = new FormData();
    console.log(formData);
    formData.image_url = null;
    const blob = new Blob([JSON.stringify(formData)], {
      type: "application/json",
    });
    payload.append("banner", blob);

    if (imageFile && imageFile instanceof File) {
      payload.append("imageFile", imageFile);
    }

    console.log(payload, "paylaod");
    try {
      if (isEdit) {
        await updateBanner(id, payload, authToken);
      } else {
        await addBanner(payload, authToken);
      }
      navigate("/banner/list");
    } catch (err) {
      console.error("Error saving banner:", err);
      alert("Error saving banner!");
    }
  };


  const handleToggleActive = () => {
  setFormData((prev) => ({
    ...prev,
    active: !prev.active,
  }));
};

  return (
    <div className="flipkart-form-container">

      <div className="flipkart-form">
          <div className="header-left">
    <button
      className="back-btn"
      onClick={() => navigate("/banner/list")}
    >
      ←
    </button>
        <h2>{isEdit ? "Update Banner" : "Add New Banner"}</h2>
    </div>

        <div className="form-row">
          <label>Name</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-row">
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
          />
        </div>


        <div className="form-row">
          <label>Banner Image</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
          {preview &&
            (isEdit ? (
              <img
                src={`data:image/jpeg;base64,${preview}`}
                alt={`banner-${formData.name}`}
                className="image-preview"
              />
            ) : (
              <img
                src={`${preview}`}
                alt={`banner-${formData.name}`}
                className="image-preview"
              />
            ))}
        </div>

                <div className="form-row switch-row">
  <label>Status</label>

  <div
    className={`switch ${formData.active ? "active" : ""}`}
    onClick={handleToggleActive}
  >
    <div className="switch-handle" />
  </div>

  <span className="switch-label">
    {formData.active ? "Active" : "Inactive"}
  </span>
</div>


        <button  className="submit-btn" onClick={handleSubmit}>
          {isEdit ? "Update Banner" : "Add Banner"}
        </button>
      </div>
    </div>
  );
};

export default BannerForm;
