import React, { useContext, useEffect, useState } from "react";
import { getProductList } from "../../../services/Product/Product";
import { Pagination } from "../../../components/Pagination/Pagination";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/authContext";

const imageBaseUrl = process.env.REACT_APP_API_IMAGE_CDN_URL;
const ProductList = () => {
  const { authToken, setAuthToken } = useContext(AuthContext);

  const [productList, setProductList] = useState([]);
  const navigate = useNavigate();

  const handleUpdateProductList = (response) => {
    if (response?.data && response.status === 200) {
      console.log(response)
      const data = response?.data;
      setProductList(data?.content);
      setPaginationContent({
        current: 1 + data?.pageable?.pageNumber,
        size: data?.size,
        totalPages: data?.totalPages,
        firstPage: data?.first,
        lastPage: data?.last,
        isEmpty: data?.empty
      }
      )
    } else {
      console.log(response, "failed");
    }
  }

  const handlePagination = async (newPage) => {
    const response = await getProductList(authToken, newPage - 1);
    handleUpdateProductList(response);
    console.log(response, 'calling handle paging')
  }

  const [paginationContent, setPaginationContent] = useState({
    current: null, size: null, totalPages: null, firstPage: false, lastPage: false, isEmpty: false

  })

  const handlePaginationState = (key, value) => {
    setPaginationContent(pre => ({
      ...pre,
      [key]: value
    }))
  }

  console.log(paginationContent, 'pageeee')

  const handleProductList = async () => {
    const response = await getProductList(authToken);
    handleUpdateProductList(response);
  };

  console.log(productList)

  useEffect(() => {
    handleProductList();
  }, [authToken]);

  const handlRedirectProductDetailpage = (id) => {
    console.log(id)
    // redirect to proudct detail page with prod id
    navigate(`/product/${id}`);
  }

  // ✅ Flexbox styles for row-wise wrapping layout
  const containerStyle = {
    display: "flex",
    flexWrap: "wrap", // allows wrapping to next row
    justifyContent: "center", // centers content horizontally
    gap: "20px", // space between cards
    padding: "20px",
    boxSizing: "border-box",
  };

  const cardStyle = {
    flex: "1 1 250px", // responsive width, minimum 250px
    maxWidth: "300px",
    border: "1px solid #ddd",
    borderRadius: "10px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    backgroundColor: "#fff",
    transition: "transform 0.2s ease-in-out",
    cursor: "pointer",
    padding: "0px 20px 20px",
    boxSizing: "border-box",
  };

  const imageStyle = {
    width: "100%",
    height: "200px",
    objectFit: "cover",
    borderRadius: "8px",
    marginBottom: "10px",
  };

  const nameStyle = { fontSize: "18px", fontWeight: "bold", marginBottom: "8px" };
  const descStyle = { fontSize: "14px", color: "#555", marginBottom: "8px" };
  const priceStyle = { fontSize: "16px", color: "#1a73e8", fontWeight: "bold" };
  const discountStyle = { fontSize: "13px", color: "green", marginLeft: "8px" };
  const metaStyle = { fontSize: "13px", color: "#777", marginTop: "5px" };

  const handleEdit = (id) => {
    navigate(`/product/form/${id}`);

  }
  const handlAddProduct = () => {
    navigate('/product/form/');

  }

  return (
    <>
      <div style={containerStyle}>
        <div onClick={() => handlAddProduct()}>ADD New Product</div>
       
        {productList && productList.length > 0 ? (
          productList.map((p) => (
            <>
            <div
              key={p.id}
              style={cardStyle}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
                          <div onClick={() => handleEdit(p.id)}>Edit</div>
              <div               onClick={() => handlRedirectProductDetailpage(p?.id)}>
              <img src={`${imageBaseUrl}${p.image_url}`} alt={p.name} style={imageStyle} />
              <div style={nameStyle}>{p.name}</div>
              <div style={descStyle}>{p.description}</div>
              <div style={priceStyle}>
                ₹{p.price?.toLocaleString()}
                {p.discount > 0 && <span style={discountStyle}> ({p.discount}% OFF)</span>}
              </div>
              <div style={metaStyle}>
                Brand: {p.brand} | Category: {p.category}
              </div>
</div>
              
            </div>
            </>
          ))
        ) : (
          <p style={{ textAlign: "center", width: "100%" }}>Loading products...</p>
        )}
      </div>
      <Pagination 
        current={paginationContent.current}
        totalPages={paginationContent.totalPages}
        firstPage={paginationContent.firstPage}
        lastPage={paginationContent.lastPage}
        handlePagination={handlePagination}
      />
    </>
  );
};

export default ProductList;
