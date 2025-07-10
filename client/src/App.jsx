import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

//Component Imports
import './App.css'
import Navbar from './Navbar/Navbar';
import Home from './Home/Home';
import ProductList from './ProductList/ProductList';
import NewProduct from './NewProduct/NewProduct';

function App() {

  return (
    <>
    <Router>
      <div className="AppLayout">
        <Navbar/>
        <main className="PageContent">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/products/new" element={<NewProduct />} />
          </Routes>
        </main>
      </div>
    </Router>
    </>
  )
}

export default App
