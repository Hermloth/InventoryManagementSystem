import { useEffect, useState } from "react";
import "./ProductList.css";
import { Link } from "react-router";
import QRCode from "react-qr-code";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ConfirmModal from "./ConfirmModal";

function ProductList(){
    const [products, updateProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [confirmingDeleteId, setConfirmingDeleteId] = useState(null);



const deleteProduct = (productId) => {
    fetch(`/api/products/${productId}`, {
        method: 'DELETE',
    })
    .then((res) => {
        if (res.ok) {
            updateProducts(prev => prev.filter(product => product.id !== productId));
            toast.success("Product deleted successfully", { position: "bottom-right" });
        } else {
            toast.error("Failed to delete product", { position: "bottom-right" });
        }
    })
    .catch(() => toast.error("Error deleting product", { position: "bottom-right" }));
};

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
                <div className="ListTitle">Product List</div>
                <hr></hr>
                <div className="ControlPanel">
                        <Link to="/products/new" className="AddButton">Add Product</Link>
                </div>
                {products.length === 0 ? (
                <p>No products found.</p>
                ) : (
                    <ul className="ProductList">
                    {products.map((product, index) => (
                        <li key={product.id || index} className="ProductRecord">
                            <div className="QRWrapper">
                                <QRCode value={product.reorderlink || "https://default.url"} size={64} />
                            </div>
                            <div className="DataWrapper">
                                <div className="ProductLine">
                                    <strong>{product.producttitle}</strong>
                                    <button onClick={() => setConfirmingDeleteId(product.id)}>delete</button>                                </div>
                                <div className="ProductLine">
                                    {product.productdescription}
                                </div>
                                <div className="ProductProperties">
                                    <span><strong>Length: </strong>{product.length}</span>
                                    <span><strong>Style: </strong>{product.style}</span>
                                    <span><strong>Color: </strong>{product.color}</span>
                                </div>
                                <div className="Category">
                                    <span><strong>Category: </strong>{product.category}</span>
                                </div>
                                <div className="PriceProperties">
                                    <span><strong>Price Ex. GST: </strong>${product.priceexgst}</span>
                                    <span><strong>Price Inc. GST: </strong>${(product.priceexgst * 1.1).toFixed(2)}</span>
                                    <span><strong>Reorder Qty: </strong>{product.reorderlevel}</span>
                                    </div>
                                <div className="ProductLine">
                                    <span><strong>Reorder Link:</strong>
                                    <a href={product.reorderlink} target="_blank" rel="noopener noreferrer"> {product.reorderlink}</a></span>
                                </div>
                            </div>
                        </li>
                    ))}
                    </ul>
                )}
                {confirmingDeleteId !== null && (
    <ConfirmModal
        message="Are you sure you want to delete this product?"
        onConfirm={() => {
            deleteProduct(confirmingDeleteId);
            setConfirmingDeleteId(null);
        }}
        onCancel={() => setConfirmingDeleteId(null)}
    />
)}
<ToastContainer position="bottom-right" autoClose={3000} />
            </div>
        );
}

export default ProductList;