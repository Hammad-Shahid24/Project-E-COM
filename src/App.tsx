import { FC } from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import Layout from "./components/Layout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { useSelector } from "react-redux";
// import { RootState } from "./app/store";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// pages
import ThemeSwitcher from "./components/ThemeSwitcher";

const App: FC = () => {
  return (
    <ErrorBoundary>
      <Layout>
        <Router>
          <Routes>
            <Route path="/" element={<ThemeSwitcher />} />
            <Route path="/about" element={<div>About</div>} />
          </Routes>
        </Router>
        <ToastContainer />
      </Layout>
    </ErrorBoundary>
  );
};

export default App;
