import react from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductList from '../containers/Product/ProductList/ProductList';
import LandingPage from '../containers/LandingPage/LandingPage';
import ProductDetail from '../containers/Product/ProductDetail/ProductDetail';
import ProductForm from '../containers/Product/ProductForm/ProductForm';
import Login from '../containers/Authenticate/Login/Login';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import Signup from '../containers/Authenticate/Signup/Signup';



const Routing = () => {
    return (
        <Router>
            <div className="app-layout">
                <Header />
                <main className="app-content">
                    <Routes>
                        <Route path='/' element={<LandingPage />} />
                        <Route path='/login' element={<Login />} />
                        <Route path='/signup' element={<Signup />} />

                        <Route path='/productlist' element={<ProductList />} />
                        <Route path='/product/:id' element={<ProductDetail />} />
                        <Route path='/product/form' element={<ProductForm />} />
                        <Route path='/product/form/:id' element={<ProductForm />} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </Router>

    )
}

export default Routing;