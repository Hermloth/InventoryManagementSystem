import "./AddSale.css"
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { toast } from "react-toastify";

function AddSale() {

        const navigate = useNavigate();

    const [formData, setFormData] = useState({
        product_id: "",
        sale_amount: ""
    });

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch products on component mount
    useEffect(() => {
        async function fetchProducts() {
            try {
                const response = await fetch('/api/products');
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
                toast.error('Failed to load products');
            } finally {
                setLoading(false);
            }
        }

        fetchProducts();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
            e.preventDefault();
    
            
            fetch(`/api/sales/new`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            })
            .then(res => {
                if (res.ok) {
                    toast.success("Sale Added!");
                    setTimeout(() => navigate("/sales"), 100); // ← slight delay
                } else {
                return res.json().then(data => {
                    console.error("Error response:", data);
                    toast.error("Update failed: " + (data.error || "Unknown error"));
            });
                }
            })
                .catch((error) => {console.error("Fetch error:", error);
                toast.error("Error updating sale");
            });
            
        };

return (
        <div className="NewSaleForm">
            <h2>Add New Sale</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Product:
                    <select 
                        name="product_id" 
                        value={formData.product_id} 
                        onChange={handleChange}
                        required
                    >
                        <option value="">-- Select a Product --</option>
                        {products.map((product) => (
                            <option key={product.id} value={product.id}>
                                {product.product_name} - {product.size} {product.style}, {product.color}
                            </option>
                        ))}
                    </select>
                </label>
                <label>
                    Sale Amount:
                    <input type="number" name="sale_amount" value={formData.sale_amount || ""} onChange={handleChange} />
                </label>
                
                <button type="submit">Save Changes</button>
            </form>
        </div>
);

}

export default AddSale;