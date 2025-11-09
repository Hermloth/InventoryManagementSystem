import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

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
            <Route path="/products/new" element={<AddProduct />} />
            <Route path="/products/:id/edit" element={<EditProduct />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/sales" element={<SalesList />} />
            <Route path="/sales/new" element={<AddSale />} />
            <Route path="/purchases" element={<PurchaseList />} />
            <Route path="/purchases/new" element={<AddPurchase />} />
            <Route path='/products/:id/link' element={<LinkProductList/>} />
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
