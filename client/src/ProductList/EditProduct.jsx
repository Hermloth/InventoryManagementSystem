import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./EditProduct.css"

function EditProduct() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        productname: "",
        productlength: "",
        productstyle: "",
        productcolor: "White",
        materialcost: "",
        retailprice: "",
        soh: "",
        sit: "",
        productreorderlevel: "",
        productreorderlink: "",
        productreorderlinktwo: ""
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
    async function fetchProduct() {
        try {
        const res = await fetch(`/api/products/${id}`);
        if (!res.ok) throw new Error("Failed to fetch product");

        const data = await res.json();
        setFormData({
            productname: data.product_name,
            productlength: data.size || "",
            productstyle: data.style || "",
            productcolor: data.color || "",
            materialcost: data.material_cost || 0.00,
            retailprice: data.retail_price || 0.00,
            soh: data.soh || 0,
            sit: data.sit || 0,
            productreorderlevel: data.reorder_level || 0,
            productreorderlink: data.reorder_link || "",
            productreorderlinktwo: data.reorder_link_two || ""
        });

        } catch (err) {
        console.error("Error loading product:", err);
        } finally {
            setLoading(false)
        }
    }

    fetchProduct();
    }, [id]);


    function handleChange(e) {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    }

    async function handleSubmit(e) {
    e.preventDefault();
    
    try {        
        const res = await fetch(`/api/products/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });

        if (res.status >= 200 && res.status < 300) {
            navigate("/products");
        } else {
            alert("Failed to update product.");
        }
    } catch (error) {
        console.error("ERROR in fetch:", error);
        alert("Error updating product: " + error.message);
    }
    }

    if (loading) return <p>Loading product...</p>;

    return (
        
        <form onSubmit={handleSubmit} className="EditProductForm">
        <h2>Edit Product</h2>
        <div className="FormFields">
            <label>
                Name:
                <input
                className="inputField"
                name="productname"
                value={formData.productname}
                onChange={handleChange}
                />
            </label>

            <label>
                Length:
                <input
                className="inputField"
                name="productlength"
                value={formData.productlength}
                onChange={handleChange}
                />
            </label>

            <label>
                Style: 
                <input
                className="inputField"
                name="productstyle"
                value={formData.productstyle}
                onChange={handleChange}
                />
            </label>

            <label>
                Color:
                <input
                className="inputField"
                name="productcolor"
                value={formData.productcolor}
                onChange={handleChange}
                />
            </label>

            <label>
                Material Cost:
                <input
                className="inputField"
                type="number"
                name="materialcost"
                value={formData.materialcost}
                onChange={handleChange}
                />
            </label>

            <label>
                Retail Price:
                <input
                className="inputField"
                type="number"
                name="retailprice"
                value={formData.retailprice}
                onChange={handleChange}
                />
            </label>

            <label>
                SOH:
                <input
                className="inputField"
                type="number"
                min="0" 
                step="1"
                name="soh"
                value={formData.soh}
                onChange={handleChange}
                />
            </label>

            <label>
                SIT:
                <input
                className="inputField"
                type="number"
                min="0" 
                step="1"
                name="sit"
                value={formData.sit}
                onChange={handleChange}
                />
            </label>

            <label>
                Reorder Level:
                <input
                className="inputField"
                type="number"
                min="0" 
                step="1"
                name="productreorderlevel"
                value={formData.productreorderlevel}
                onChange={handleChange}
                />
            </label>

            <label>
                Reorder Link:
                <input
                className="inputField"
                name="productreorderlink"
                value={formData.productreorderlink}
                onChange={handleChange}
                />
            </label>

            <label>
                Reorder Link Two:
                <input
                className="inputField"
                name="productreorderlinktwo"
                value={formData.productreorderlinktwo}
                onChange={handleChange}
                />
            </label>
            
            <button className="SubmitButton" type="submit">Update Product</button>
        </div>
        </form>
    );
    }

    export default EditProduct;
