import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

//Component Imports
import './App.css'
import Navbar from './Navbar/Navbar';
import Home from './Home/Home';
import ProductList from './ProductList/ProductList';
import NewProduct from './NewProduct/NewProduct';
import EditProduct from './ProductList/EditProduct';
import Footer from './Footer/Footer';

function App() {

  return (
    <>
    <Router>
<div className="AppLayout">
  <div className="PageContent">
    <Navbar />
    <main className="MainContent">
      <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/products/new" element={<NewProduct />} />
            <Route path="/products/:id/edit" element={<EditProduct />} />
      </Routes>
    </main>
  </div>
  <Footer />
</div>
    </Router>
    </>
  )
}

export default App
