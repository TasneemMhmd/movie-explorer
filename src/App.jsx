import { Route, Routes, useLocation } from "react-router-dom";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Header from "./components/header/Header";
import Home from "./components/home/Home";
import ShowsList from "./components/list/ShowsList";
import Details from "./components/Details/Details";
import { useEffect, useState } from "react";

function App() {
 const location = useLocation();
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.pageYOffset > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/all" element={<ShowsList />} />
        <Route path="/series" element={<ShowsList />} />
        <Route path="/reality" element={<ShowsList />} />
        <Route path="/animation" element={<ShowsList />} />
        <Route path="/documentary" element={<ShowsList />} />
        <Route path="/talkshow" element={<ShowsList />} />
        <Route path="/show/:id" element={<Details />} />
      </Routes>
  {showScrollTop && (
        <button
          onClick={scrollToTop}
          style={{
            position: 'fixed',
            bottom: '30px',
            right: '30px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '50%',
            width: '50px',
            height: '50px',
            cursor: 'pointer',
            fontSize: '18px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
            zIndex: 1000,
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#0056b3';
            e.target.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = '#007bff';
            e.target.style.transform = 'translateY(0)';
          }}
        >
          ↑
        </button>
      )}
    </>
  );
}

export default App;