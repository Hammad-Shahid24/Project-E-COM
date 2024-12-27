import { FC, useEffect } from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import Layout from "./components/Layout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { useSelector } from "react-redux";
// import { RootState } from "./app/store";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./config/i18next";
// pages
import Home from "./pages/Home";
import CollectionPage from "./pages/CollectionPages";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import CheckoutPage from "./pages/CheckoutPage";
import ContactUsPage from "./pages/ContactUsPage";
import AboutUsPage from "./pages/AboutUsPage";
import TermsOfService from "./pages/TermsOfService";
import ProfilePage from "./pages/ProfilePage"
import { useDispatch } from "react-redux";
import { AppDispatch } from "./app/store";
import { initializeAuth } from "./redux/auth/authSlice";

const App: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(initializeAuth());
  }, []);

  return (
    <ErrorBoundary>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/new-arrivals/*" element={<CollectionPage />} />
            <Route path="/best-sellers/*" element={<CollectionPage />} />
            <Route path="/skin-care/*" element={<CollectionPage />} />            
            <Route path="/face-mask/*" element={<CollectionPage />} />
            <Route path="/texture-makeup/*" element={<CollectionPage />} />
            <Route path="/checkout" element={<CheckoutPage/>} />
            <Route path="/product/*" element={<ProductDetailsPage/>} />
            <Route path="/aboutus" element={<AboutUsPage/>} />
            <Route path="/contactus" element={<ContactUsPage/>} />
            <Route path="/faqs" element={<ContactUsPage/>} />
            <Route path="/termsofservice" element={<TermsOfService/>} />
            <Route path="/privacypolicy" element={<TermsOfService/>} />
            <Route path="/refundpolicy" element={<TermsOfService/>} />
            <Route path="/profile" element={<ProfilePage/>} />
             

          </Routes>
          <ToastContainer />
        </Layout>
      </Router>
    </ErrorBoundary>
  );
};

export default App;
