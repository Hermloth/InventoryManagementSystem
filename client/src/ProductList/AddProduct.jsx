import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { toast } from "react-toastify";

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


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        
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
                    <input type="text" name="productname" value={formData.productname} onChange={handleChange} />
                </label>
                <label>
                    Length:
                    <input type="text" name="productlength" value={formData.productlength || ""} onChange={handleChange} />
                </label>
                <label>
                    Style:
                    <input type="text" name="productstyle" value={formData.productstyle || ""} onChange={handleChange} />
                </label>
                <label for="productcolor">Color:
                    <select id="productcolor" name="productcolor" value={formData.productcolor} onChange={handleChange}>
                        <option className="WhiteSelection" value="White">White</option>
                        <option className="OffWhiteSelection" value="Off-White">Off-White</option>
                        <option className="IvorySelection" value="Ivory">Ivory</option>
                        <option className="OtherSelection" value="Other">Other</option>
                    </select>
                </label>

                <label for="materialcost">Material Cost: 
                    <input id="materialcost" name="materialcost" value={formData.materialcost} onChange={handleChange} type="number"></input>
                </label>
                <label for="retailprice">Retail Price: 
                    <input id="retailprice" name="retailprice" value={formData.retailprice} onChange={handleChange} type="number"></input>
                </label>
                <label for="SOH">SOH:
                    <input id="SOH" name="SOH" value={formData.SOH} onChange={handleChange} type="integer"></input>
                </label>
                <label for="SIT">SIT:
                    <input id="SIT" name="SIT" value={formData.SIT} onChange={handleChange} type="integer"></input>
                </label>
                <label for="productreorderlevel">Reorder Level:
                    <input id="productreorderlevel" name="productreorderlevel" value={formData.productreorderlevel} onChange={handleChange} type="text"></input>
                </label>
                <label for="productreorderlink">Reorder Link: 
                    <input id="productreorderlink" name="productreorderlink" value={formData.productreorderlink} onChange={handleChange} type="text"></input>
                </label>
                <label for="productreorderlinktwo">Reorder Link: 
                    <input id="productreorderlinktwo" name="productreorderlinktwo" value={formData.productreorderlinktwo} onChange={handleChange} type="text"></input>
                </label>

                <button type="submit">Save Changes</button>
            </form>
        </div>
    );
}

export default AddProduct;
