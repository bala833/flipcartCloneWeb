import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/authContext";
import { getAllBanner } from "../../../services/Banners/Banners";
import "./BannersList.scss";

const BannerList = () => {
  const { authToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const [banners, setBanners] = useState([]);

  const fetchBanners = async () => {
    try {
      const res = await getAllBanner(authToken);
      setBanners(res?.data || []);
    } catch (err) {
      console.error("Error fetching banners", err);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  return (
    <div className="banner-list-container">
      <div className="header">
    <h2>Banner Management</h2>

        <button onClick={() => navigate("/banner/form")}>+ Add Banner</button>
      </div>

      <div className="banner-grid">
        {banners.map((banner) => (
          <div className="banner-card" key={banner.id}>
            <img
              src={`data:image/jpeg;base64,${banner.image_url}`}
              alt={`banner-${banner.id}`}
              className="banner-img"
            />

            <div className="banner-info">
              <h4>{banner.name}</h4>
              <p>{banner.description}</p>
            </div>

            <div className="banner-actions">
              <div className="banner-status-wrapper">
                <div className={`${banner.active ? 'banner-active' : 'banner-deactive'} banner-deactivated`} title={`${banner.active ? 'active' : 'deactive'}`}>
                </div>
              </div>

              <div className="">
                <button
                  className="edit-btn"
                  onClick={() => navigate(`/banner/form/${banner.id}`)}
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BannerList;
