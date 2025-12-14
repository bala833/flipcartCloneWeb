import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { getProduct } from "../../../services/Product/Product";
import './ProductDetail.scss';
import { AuthContext } from "../../../context/authContext";

const imageBaseUrl = process.env.REACT_APP_API_IMAGE_CDN_URL;


const ProductDetail = () => {
    const {id } = useParams();
    const { authToken, setAuthToken } = useContext(AuthContext);
    
    const [product, setProduct] = useState({});

    const fatchData = async () => {
        if (id) {
            const response = await getProduct(authToken, id);
            if (response?.status == 200) {
                setProduct(response?.data)
                console.log(response.data)
            }
        }
    }

    const discountedPrice = Math.round(
        product.price - (product.price * product.discount) / 100
    );

    useEffect( () => {
        fatchData();
    }, [id, authToken])

    return (
        <>
 <div className="product-detail-container">
      {/* LEFT SECTION - IMAGE & BUTTONS */}
      <div className="product-image-section">
        {/* <img src={`${imageBaseUrl}${product.image_url}`} alt={product.name} className="product-image" /> */}
              <img src={`data:image/jpeg;base64,${product.image_url}`} alt={product.name} className="product-image"  />

        <div className="button-group">
          <button className="btn add-to-cart">ADD TO CART</button>
          <button className="btn buy-now">BUY NOW</button>
        </div>
      </div>

      {/* RIGHT SECTION - PRODUCT INFO */}
      <div className="product-info-section">
        <h2 className="product-title">{product.name}</h2>
        <p className="product-brand">
          Brand: <strong>{product.brand}</strong>
        </p>

        <div className="rating-section">
          ⭐⭐⭐⭐☆ <span className="rating-count">(2,345 ratings)</span>
        </div>

        <div className="price-section">
          <span className="discounted-price">₹{discountedPrice}</span>
          <span className="original-price">₹{product.price}</span>
          <span className="discount">{product.discount}% off</span>
        </div>

        <p className="tax-text">Inclusive of all taxes</p>

        <div className="offers-section">
          <h4>Available Offers</h4>
          <ul>
            <li>
              <b>Bank Offer:</b> 10% Instant Discount on Axis Bank Cards
            </li>
            <li>
              <b>Partner Offer:</b> Buy 2 get 5% extra off
            </li>
            <li>
              <b>Special Price:</b> Get extra ₹
              {product.price - discountedPrice} off (inclusive of discount)
            </li>
          </ul>
        </div>

        <div className="product-description">
          <h4>Description</h4>
          <p>{product.description}</p>
        </div>

        <div className="product-meta">
          <p>Category: {product.category}</p>
          <p>
            Stock: <strong>{product.quantity_in_stock}</strong> {product.unit}
          </p>
          <p>Status: <strong>{product.status}</strong></p>
        </div>
      </div>
    </div>
        </>
    )
}

export default ProductDetail;