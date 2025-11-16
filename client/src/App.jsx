import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

//Component Imports
import './App.css'
import Navbar from './Navbar/Navbar';
import Home from './Home/Home';
import ProductList from './ProductList/ProductList';
import AddProduct from './ProductList/AddProduct';
import EditProduct from './ProductList/EditProduct';
import Footer from './Footer/Footer';
import Settings from './settings/settings.jsx';
import SalesList from './SalesList/SalesList.jsx';
import AddSale from './SalesList/AddSale.jsx';
import PurchaseList from './PurchaseList/PurchaseList.jsx';
import AddPurchase from './PurchaseList/AddPurchase.jsx';
import LinkProductList from './ProductList/LinkProductList.jsx';
import Login from './Login/Login.jsx';
import ProtectedRoute from './Login/ProtectedRoute.jsx';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/status', {
          credentials: 'include'
        });
        const data = await response.json();
        
        if (data.authenticated) {
          setUser(data.user);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include'
      });
      setUser(null);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }


  return (
    <>
    <Router>
<div className="AppLayout">
  <div className="PageContent">
    {user && <Navbar onLogout={handleLogout} user={user} />}
    <main className="MainContent">
      <Routes>
            <Route path="/login" element={<Login setUser={setUser} />} />

            <Route path="/" element={
              <ProtectedRoute user={user}>
                    <Home />
                  </ProtectedRoute>} />
            <Route path="/products" element={
              <ProtectedRoute user={user}>
                  <ProductList />
                </ProtectedRoute>} />
            <Route path="/products/new" element={
              <ProtectedRoute user={user}>
                  <AddProduct />
                </ProtectedRoute>} />
            <Route path="/products/:id/edit" element={
              <ProtectedRoute user={user}>
                  <EditProduct />
                </ProtectedRoute>} />
            <Route path="/settings" element={
              <ProtectedRoute user={user}>
                  <Settings />
                </ProtectedRoute>} />
            <Route path="/sales" element={
              <ProtectedRoute user={user}>
                  <SalesList />
                </ProtectedRoute>} />
            <Route path="/sales/new" element={
              <ProtectedRoute user={user}>
                  <AddSale />
                </ProtectedRoute>} />
            <Route path="/purchases" element={
              <ProtectedRoute user={user}>
                  <PurchaseList />
                </ProtectedRoute>} />
            <Route path="/purchases/new" element={
              <ProtectedRoute user={user}>
                  <AddPurchase />
                </ProtectedRoute>} />
            <Route path='/products/:id/link' element={
              <ProtectedRoute user={user}>
                  <LinkProductList />
                </ProtectedRoute>} />
            <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </main>
  </div>
        {user && <Footer />}
      </div>
    </Router>
    </>
  )
}

export default App
