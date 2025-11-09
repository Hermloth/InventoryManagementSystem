import "./AddPurchase.css"
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { toast } from "react-toastify";

function AddPurchase() {

        const navigate = useNavigate();

    const [formData, setFormData] = useState({
        product_id: "",
        purchase_amount: "",
        unit_amount: "",
        purchase_qty: ""
    });

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

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
    
            const calculatedUnitAmount = formData.purchase_amount / formData.purchase_qty;
    
            const dataToSubmit = {
                product_id: Number(formData.product_id),
                purchase_amount: Number(formData.purchase_amount),
                unit_amount: Number(calculatedUnitAmount),
                purchase_qty: Number(formData.purchase_qty)
            };
            
            fetch(`/api/purchases/new`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(dataToSubmit)
            })
            .then(res => {
                if (res.ok) {
                    toast.success("Purchase Added!");
                    setTimeout(() => navigate("/purchases"), 100); // ← slight delay
                } else {
                    toast.error("Update failed");
                }
            })
            .catch(() => toast.error("Error updating purchase"));
            
        };

    if (loading) {
        return <div>Loading products...</div>;
    }

return (
        <div className="NewPurchaseForm">
            <h2>Add New Purchase</h2>
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
                    Total Cost:
                    <input 
                        type="number" 
                        step="0.01"
                        name="purchase_amount" 
                        value={formData.purchase_amount || ""} 
                        onChange={handleChange}
                        required 
                    />
                </label>
                <label>
                    Purchase Qty:
                    <input 
                        type="number" 
                        name="purchase_qty" 
                        value={formData.purchase_qty || ""} 
                        onChange={handleChange}
                        required 
                    />
                </label>
                
                <button type="submit">Save Changes</button>
            </form>
        </div>
    );

}

export default AddPurchase;