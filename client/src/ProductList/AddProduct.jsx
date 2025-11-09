import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { toast } from "react-toastify";
import "./AddProduct.css"


function AddProduct() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        productname: "",
        productlength: "",
        productstyle: "",
        productcolor: "White",
        materialcost: "",
        retailprice: "",
        SOH: "",
        SIT: "",
        productreorderlevel: "",
        productreorderlink: "",
        productreorderlinktwo: ""
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        
        // Clear error for this field when user starts typing
        if (errors[name]) {
            setErrors({ ...errors, [name]: "" });
        }
    };

    const validateForm = () => {
        const newErrors = {};

        // Product Name - required, varchar string
        if (!formData.productname || formData.productname.trim() === "") {
            newErrors.productname = "Product name is required";
        } else if (formData.productname.length > 255) {
            newErrors.productname = "Product name must be less than 255 characters";
        }

        // Length - numeric only, optional
        if (formData.productlength && isNaN(formData.productlength)) {
            newErrors.productlength = "Length must be a number";
        }

        // Style - varchar string, optional
        if (formData.productstyle && formData.productstyle.length > 255) {
            newErrors.productstyle = "Style must be less than 255 characters";
        }

        // Material Cost - number, optional but must be valid if provided
        if (formData.materialcost) {
            if (isNaN(formData.materialcost) || parseFloat(formData.materialcost) < 0) {
                newErrors.materialcost = "Material cost must be a positive number";
            }
        }

        // Retail Price - number, required
        if (!formData.retailprice || formData.retailprice === "") {
            newErrors.retailprice = "Retail price is required";
        } else if (isNaN(formData.retailprice) || parseFloat(formData.retailprice) < 0) {
            newErrors.retailprice = "Retail price must be a positive number";
        }

        // SOH - integer, optional but must be valid if provided
        if (formData.SOH) {
            if (!Number.isInteger(Number(formData.SOH)) || parseInt(formData.SOH) < 0) {
                newErrors.SOH = "SOH must be a positive integer";
            }
        }

        // SIT - integer, optional but must be valid if provided
        if (formData.SIT) {
            if (!Number.isInteger(Number(formData.SIT)) || parseInt(formData.SIT) < 0) {
                newErrors.SIT = "SIT must be a positive integer";
            }
        }

        // Reorder Level - integer, optional but must be valid if provided
        if (formData.productreorderlevel) {
            if (!Number.isInteger(Number(formData.productreorderlevel)) || parseInt(formData.productreorderlevel) < 0) {
                newErrors.productreorderlevel = "Reorder level must be a positive integer";
            }
        }

        // Reorder Link - varchar string, optional, validate URL format if provided
        if (formData.productreorderlink && formData.productreorderlink.trim() !== "") {
            try {
                new URL(formData.productreorderlink);
            } catch {
                newErrors.productreorderlink = "Please enter a valid URL";
            }
            if (formData.productreorderlink.length > 255) {
                newErrors.productreorderlink = "URL must be less than 255 characters";
            }
        }

        // Reorder Link Two - varchar string, optional, validate URL format if provided
        if (formData.productreorderlinktwo && formData.productreorderlinktwo.trim() !== "") {
            try {
                new URL(formData.productreorderlinktwo);
            } catch {
                newErrors.productreorderlinktwo = "Please enter a valid URL";
            }
            if (formData.productreorderlinktwo.length > 255) {
                newErrors.productreorderlinktwo = "URL must be less than 255 characters";
            }
        }

        return newErrors;
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Validate form
        const validationErrors = validateForm();
        
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            toast.error("Please fix the errors in the form");
            return;
        }

        fetch(`/api/products/new`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
        .then(res => {
            if (res.ok) {
                toast.success("Product updated!");
                setTimeout(() => navigate("/products"), 100); // ← slight delay
            } else {
                toast.error("Update failed");
            }
        })
        .catch(() => toast.error("Error updating product"));
        
    };

    return (
        <div className="NewProductForm">
            <h2>Add New Product</h2>
            <form onSubmit={handleSubmit}>

                <label>
                    Product Name:
                    <input 
                        type="text" 
                        name="productname" 
                        value={formData.productname} 
                        onChange={handleChange} 
                        className={errors.productname ? "error" : ""}
                    />
                    {errors.productname && <span className="error-message">{errors.productname}</span>}
                    

                </label>
                <label>
                    Length:
                    <input 
                        type="text" 
                        name="productlength" 
                        value={formData.productlength || ""} 
                        onChange={handleChange} 
                        className={errors.productlength ? "error" : ""}
                    />
                    {errors.productlength && <span className="error-message">{errors.productlength}</span>}
                </label>
                <label>
                    Style:
                    <input 
                        type="text" 
                        name="productstyle" 
                        value={formData.productstyle || ""} 
                        onChange={handleChange} 
                        className={errors.productstyle ? "error" : ""}
                    />
                    {errors.productstyle && <span className="error-message">{errors.productstyle}</span>}
                </label>
                <label for="productcolor">Color:
                    <select 
                    id="productcolor" 
                    name="productcolor" 
                    value={formData.productcolor} 
                    onChange={handleChange}>
                        <option className="WhiteSelection" value="White">White</option>
                        <option className="OffWhiteSelection" value="Off-White">Off-White</option>
                        <option className="IvorySelection" value="Ivory">Ivory</option>
                        <option className="OtherSelection" value="Other">Other</option>
                    </select>
                </label>
                <label for="materialcost">Material Cost: 
                    <input 
                        id="materialcost" 
                        name="materialcost" 
                        value={formData.materialcost} 
                        onChange={handleChange} 
                        type="number"
                        className={errors.materialcost ? "error" : ""}
                    />
                    {errors.materialcost && <span className="error-message">{errors.materialcost}</span>}
                </label>
                <label for="retailprice">Retail Price: 
                    <input 
                        id="retailprice" 
                        name="retailprice" 
                        value={formData.retailprice} 
                        onChange={handleChange} 
                        type="number"
                        className={errors.retailprice ? "error" : ""}
                    />
                    {errors.retailprice && <span className="error-message">{errors.retailprice}</span>}
                </label>
                <label for="SOH">SOH:
                    <input 
                        id="SOH" 
                        name="SOH" 
                        value={formData.SOH} 
                        onChange={handleChange} 
                        type="integer"
                        step = "1"
                        className={errors.SOH ? "error" : ""}
                    />
                    {errors.SOH && <span className="error-message">{errors.SOH}</span>}
                </label>
                <label for="SIT">SIT:
                    <input 
                        id="SIT" 
                        name="SIT" 
                        value={formData.SIT} 
                        onChange={handleChange} 
                        type="integer"
                        step ="1"
                        className={errors.SIT ? "error" : ""}
                    />
                {errors.SIT && <span className="error-message">{errors.SIT}</span>}
                </label>
                <label for="productreorderlevel">Reorder Level:
                    <input 
                        id="productreorderlevel" 
                        name="productreorderlevel" 
                        value={formData.productreorderlevel} 
                        onChange={handleChange} 
                        type="text"
                        step="1"
                        className={errors.productreorderlevel ? "error" : ""}
                    />
                    {errors.productreorderlevel && <span className="error-message">{errors.productreorderlevel}</span>}
                </label>
                <label for="productreorderlink">Reorder Link: 
                    <input 
                        id="productreorderlink" 
                        name="productreorderlink" 
                        value={formData.productreorderlink} 
                        onChange={handleChange} 
                        type="url"
                        className={errors.productreorderlink ? "error" : ""}
                    />
                    {errors.productreorderlink && <span className="error-message">{errors.productreorderlink}</span>}

                </label>
                <label for="productreorderlinktwo">Reorder Link: 
                    <input 
                        id="productreorderlinktwo" 
                        name="productreorderlinktwo" 
                        value={formData.productreorderlinktwo} 
                        onChange={handleChange} 
                        type="url"
                        className={errors.productreorderlinktwo ? "error" : ""}
                    />
                {errors.productreorderlinktwo && <span className="error-message">{errors.productreorderlinktwo}</span>}
                </label>

                <button 
                type="submit">Save Changes</button>
            </form>
        </div>
    );
}

export default AddProduct;
