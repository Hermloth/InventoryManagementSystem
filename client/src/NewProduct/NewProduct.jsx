import "./NewProduct.css"
import { useState } from "react";

function NewProduct( ){
    const [formData, setFormData] = useState({
        producttitle: "",
        productdescription: "",
        productcategory: "",
        productprice: 0,
        productcolor: "White",
        productlength: "",
        productstyle: "",
        productreorderlevel: 0,
        productreorderlink: "",
    });

    const [messages, setMessages] = useState([]);

    const handleChange = (e) => {
        setFormData((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
        }));
    };

const handleSubmit = async (e) => {
    e.preventDefault();
    setMessages([]);
    const formattedData = {
        ...formData,
        productprice: parseFloat(formData.productprice).toFixed(2),
    };
    try {
        const res = await fetch("/api/products/new", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedData),
        });

        if (res.ok) {
        window.location.href = "/products";
        } else {
        const contentType = res.headers.get("content-type");

        if (contentType && contentType.includes("application/json")) {
            const data = await res.json();
            setMessages(data.errors.map((err) => err.msg));
        } else {
            const text = await res.text(); // For debugging non-JSON errors
            setMessages([`Unexpected server response: ${text}`]);
        }
        }
    } catch (err) {
        console.error("Network or server error:", err);
        setMessages(["Something went wrong. Please try again."]);
    }
};


    console.log("New Product Component Loaded")
    return (
        <div className="NewProductFormContainer">
        <h2>Add a new product:</h2>

        
        {messages.length > 0 && (
        <div className="FormErrors">
            <ul>
            {messages.map((msg, key) => (
                <li key={key}>{msg}</li>
            ))}
            </ul>
        </div>
        )}
        <form onSubmit={handleSubmit} className="NewProductForm">

            <label for="producttitle">Product Title:</label>
            <input id="producttitle" name="producttitle" value={formData.producttitle} onChange={handleChange} type="text" required></input>
            
            <label for="productdescription">Product Description:</label>
            <input id="productdescription" name="productdescription" value={formData.productdescription} onChange={handleChange} type="text"></input>
            
            <label for="productcategory">Category:</label>
            <input id="productcategory" name="productcategory" value={formData.productcategory} onChange={handleChange} type="text"></input>

            <label for="productprice">Price &#40;ex. GST.&#41;:</label>
            <input id="productprice" name="productprice" value={formData.productprice} onChange={handleChange}/>

            <label for="productcolor">Color:</label>
            <select id="productcolor" name="productcolor" value={formData.productcolor} onChange={handleChange}>
                <option className="WhiteSelection" value="White">White</option>
                <option className="OffWhiteSelection" value="Off-White">Off-White</option>
                <option className="IvorySelection" value="Ivory">Ivory</option>
                <option className="OtherSelection" value="Other">Other</option>
            </select>

            <label for="productlength">Length: </label>
            <input id="productlength" name="productlength" value={formData.productlength} onChange={handleChange} type="text"></input>

            <label for="productstyle">Style: </label>
            <input id="productstyle" name="productstyle" value={formData.productstyle} onChange={handleChange} type="text"></input>

            <label for="productreorderlevel">Reorder Level: </label>
            <input id="productreorderlevel" name="productreorderlevel" value={formData.productreorderlevel} onChange={handleChange} type="text"></input>

            <label for="productreorderlink">Reorder Link: </label>
            <input id="productreorderlink" name="productreorderlink" value={formData.productreorderlink} onChange={handleChange} type="text"></input>

            <button type="submit" className="ProductSubmitButton">Add Product</button>
        </form>

        <a className="backLink" href="/products"> Back to products</a>
        </div>
    )
}

export default NewProduct