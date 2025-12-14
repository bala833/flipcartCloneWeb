import react, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.scss';
import { getProductList } from '../../services/Product/Product';
import { AuthContext } from '../../context/authContext';
const imageBaseUrl = process.env.REACT_APP_API_IMAGE_CDN_URL;


const LandingPage = () => {
  const { authToken, setAuthToken } = useContext(AuthContext);
  

  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const handleProductList = async () => {
    const response = await getProductList(authToken);
    setProducts(response?.data?.content)
  };


  useEffect(() => {
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

  const banners = [
    "https://via.placeholder.com/1200x300?text=Big+Diwali+Sale",
    "https://via.placeholder.com/1200x300?text=Festive+Deals",
    "https://via.placeholder.com/1200x300?text=Top+Offers+on+Electronics",
  ];


  // ✅ Handler for navigating to Product Detail Page
  const handleRedirectProductDetailPage = (id) => {
    navigate(`/product/${id}`);
  };

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

      {/* BANNER CAROUSEL */}
      <div className="banner-carousel">
        {banners.map((banner, i) => (
          <img key={i} src={banner} alt={`banner-${i}`} className="banner-img" />
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