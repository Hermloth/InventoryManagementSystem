import { useEffect, useState } from "react";
import "./ProductList.css";
import { Link } from "react-router";

function ProductList(){
    const [products, updateProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
    // Fetch products from the Express backend
        fetch("/api/products")
            .then((res) => res.json())
            .then((data) => {
                updateProducts(data);
                setLoading(false);
            })
        .catch((error) => {
            console.error("Error fetching products:", error);
            setLoading(false);
        });
    }, []);

        if (loading) return <p>Loading products...</p>;

        return (
            <div className="ProductListPage">
                <h2>Product List</h2>
                <div><Link to="/products/new" className="AddButton">Add Product</Link></div>
                {products.length === 0 ? (
                <p>No products found.</p>
                ) : (
                    <ul className="ProductList">
                    {products.map((product, index) => (
                        <li key={product.id || index} className="ProductRecord">
                            <div className="ProductLine">
                                <strong>{product.producttitle}</strong>
                            </div>
                            <div className="ProductLine">
                                {product.productdescription}
                            </div>
                            <div className="ProductLine">
                                <span><strong>Length: </strong>{product.length}</span>
                            </div>
                            <div className="ProductLine">
                                <span><strong>Style: </strong>{product.style}</span>
                            </div>
                            <div className="ProductLine">
                                <span><strong>Color: </strong>{product.color}</span>
                            </div>
                            <div className="ProductLine">
                                <span><strong>Category: </strong>{product.category}</span>
                            </div>
                                                        <div className="ProductLine">
                                <span><strong>Price Ex. GST: </strong>${product.priceexgst}</span>
                            </div>
                            <div className="ProductLine">
                                <span><strong>Price Inc. GST: </strong>${(product.priceexgst * 1.1).toFixed(2)}</span>
                                </div>
                            <div className="ProductLine">
                                <span><strong>Reorder Qty: </strong>{product.reorderlevel}</span>
                            </div>
                            <div className="ProductLine">
                                <span><strong>Reorder Link:</strong>
                                <a href={product.reorderlink} target="_blank" rel="noopener noreferrer"> {product.reorderlink}</a></span>
                            </div>
                        </li>
                    ))}
                    </ul>
                )}
            </div>
        );
}

export default ProductList;