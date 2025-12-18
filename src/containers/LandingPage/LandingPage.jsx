import react, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.scss';
import { getProductList } from '../../services/Product/Product';
import { AuthContext } from '../../context/authContext';

import {getAllBanner} from '../../services/Banners/Banners'
const imageBaseUrl = process.env.REACT_APP_API_IMAGE_CDN_URL;


const LandingPage = () => {
  const { authToken, setAuthToken } = useContext(AuthContext);
  

  const [products, setProducts] = useState([]);
  const [banners, setBanners] = useState([]);
  const navigate = useNavigate();

  const handleProductList = async () => {
    const response = await getProductList(authToken);
    setProducts(response?.data?.content)
  };


  const getBanner = async () => {
    const response = await getAllBanner();

    if (response?.status === 200) {
      setBanners(response.data)
    } else {
      console.log("banner endpoint has some issue")
    }

    console.log(response)
  }


  useEffect(() => {
    getBanner();
    handleProductList();
  }, [authToken]);

  const categories = [
    "Mobiles",
    "Electronics",
    "Appliances",
    "Fashion",
    "Beauty",
    "Home",
    "Sports",
    "Toys",
  ];

  const redirectToListpage = () => {
    navigate('productlist')
  }
  const redirectToform = () => {
    navigate('banner/list')
  }


  // ✅ Handler for navigating to Product Detail Page
  const handleRedirectProductDetailPage = (id) => {
    navigate(`/product/${id}`);
  };

  console.log(banners)

  const bannerDisplay = () => {
    return banners.filter(bn => bn.active)
  }

  return (
    <div className="landing-page">

      {/* CATEGORY BAR */}
      <div className="category-bar">
        {categories.map((cat, i) => (
          <div className="category-item" key={i}>
            {cat}
          </div>
        ))}
      </div>
      <span onClick={() => redirectToform()}>Go to Banner List page</span>

      {/* BANNER CAROUSEL */}
      <div className="banner-carousel">
        {banners.filter(bn => bn.active).map((banner, i) => (
          <img key={i} src={`data:image/jpeg;base64,${banner.image_url}`} alt={`banner-${i}`} className="banner-img" />
        ))}
      </div>

      {/* PRODUCT CAROUSELS */}
      {products && <div className="product-section">
        <h3 className="section-title">Top Deals of the Day <span className="section-redirect-list" onClick={() => redirectToListpage()}>Go to List page</span></h3>
        <div className="product-list">
          {products?.map((p) => (
            <div
              className="product-card"
              key={p.id}
              onClick={() => handleRedirectProductDetailPage(p.id)}
            >
              {/* <img src={`${imageBaseUrl}${p.image_url}`} alt={p.name} /> */}
              <img src={`data:image/jpeg;base64,${p.image_url}`} alt={p.name} />

              <p className="product-name">{p.name}</p>
              <p className="product-price">₹{p.price}</p>
            </div>
          ))}
        </div>
      </div>}

      {products && <div className="product-section">
        <h3 className="section-title">Trending Products</h3>
        <div className="product-list">
          {products?.map((p) => (
            <div
              className="product-card"
              key={p.id}
              onClick={() => handleRedirectProductDetailPage(p.id)}
            >
              {/* <img src={`${imageBaseUrl}${p.image_url}`} alt={p.name} /> */}
              <img src={`data:image/jpeg;base64,${p.image_url}`} alt={p.name} />

              <p className="product-name">{p.name}</p>
              <p className="product-price">₹{p.price}</p>
            </div>
          ))}
        </div>
      </div>}
    </div>
    )
}

export default LandingPage;