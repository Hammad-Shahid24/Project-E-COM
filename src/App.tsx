import { FC } from "react";
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

const App: FC = () => {
  return (
    <ErrorBoundary>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/new-arrivals" element={<CollectionPage />} />
            <Route path="/best-sellers" element={<CollectionPage />} />
            <Route path="/skin-care" element={<CollectionPage />} />
            <Route path="/face-mask" element={<CollectionPage />} />
            <Route path="/texture-and-makeup" element={<CollectionPage />} />
            <Route path="/contact-us" element={<div>contact uadfs </div>} />
          </Routes>
          <ToastContainer />
        </Layout>
      </Router>
    </ErrorBoundary>
  );
};

export default App;
