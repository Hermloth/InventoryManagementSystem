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
                    toast.error("Update failed");
                }
            })
            .catch(() => toast.error("Error updating sale"));
            
        };

return (
        <div className="NewSaleForm">
            <h2>Add New Sale</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Product Id:
                    <input type="number" name="product_id" value={formData.product_id} onChange={handleChange} />
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