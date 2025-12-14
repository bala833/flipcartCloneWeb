import React, { StrictMode, Suspense } from "react";
import Loader from "../Loader/Loader";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import './App.scss'
import {  AuthContextProvider } from "../../context/authContext";

function App() {
  const Routing = React.lazy(() => import('../../routes/routing'))
  return (
    <StrictMode>
      <div className="App">
        <AuthContextProvider>
          <Suspense fallback={<Loader />}>
            {/* <div className="app-layout">
              <Header />
              <main className="app-content"> */}
                <Routing />
              {/* </main>
              <Footer />
            </div> */}
          </Suspense>
        </AuthContextProvider>
      </div>
    </StrictMode>
  );
}

export default App;
