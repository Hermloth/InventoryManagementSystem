import { useState } from 'react'
import './App.css'
import ProductList from './ProductList/ProductList'
import NewProduct from './NewProduct/NewProduct';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


// Placeholder Home component
function Home() {
  return (
    <div>
      <h1>Welcome to Inventory Management</h1>
      <a href="/products">View Products</a>
    </div>
  );
}


function App() {
  const [count, setCount] = useState(0)

  return (
<Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/new" element={<NewProduct />} />
      </Routes>
    </Router>
  )
}

export default App
