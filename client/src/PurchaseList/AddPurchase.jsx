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


        /*
            TODO:
            Add total cost, make unit cost total cost / unit cost.
        */ 

return (
        <div className="NewPurchaseForm">
            <h2>Add New Purchase</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Product Id:
                    <input type="number" name="product_id" value={formData.product_id} onChange={handleChange} />
                </label>
                <label>
                    Total Cost:
                    <input type="number" name="purchase_amount" value={formData.purchase_amount || ""} onChange={handleChange} />
                </label>
                <label>
                    Purchase Qty:
                    <input type="number" name="purchase_qty" value={formData.purchase_qty || ""} onChange={handleChange} />
                </label>
                
                <button type="submit">Save Changes</button>
            </form>
        </div>
);

}

export default AddPurchase;