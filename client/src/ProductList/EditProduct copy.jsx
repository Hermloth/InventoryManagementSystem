import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { toast } from "react-toastify";

function EditProduct() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
    fetch(`/api/products/${id}`)
        .then(res => res.json())
        .then(data => {
            const mapped = {
                producttitle: data.producttitle || "",
                productdescription: data.productdescription || "",
                productcategory: data.category || "",
                productprice: data.priceexgst || "",
                productcolor: data.color || "",
                productlength: data.length || "",
                productstyle: data.style || "",
                productreorderlevel: data.reorderlevel || "",
                productreorderlink: data.reorderlink || "",
                productreorderlinktwo: data.reorderlinktwo || "",
            };
            setFormData(mapped);
            setLoading(false);
        })
        .catch(() => {
            toast.error("Failed to load product");
            setLoading(false);
        });
}, [id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`/api/products/${id}`, {
            method: "PUT",
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

    if (loading) return <p>Loading product...</p>;
    if (!formData) return <p>No product found.</p>;

    return (
        <div className="EditProductForm">
            <h2>Edit Product</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Title:
                    <input type="text" name="producttitle" value={formData.producttitle} onChange={handleChange} />
                </label>
                <label>
                    Description:
                    <input type="text" name="productdescription" value={formData.productdescription || ""} onChange={handleChange} />
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
                <label for="productreorderlevel">Reorder Level:
                    <input id="productreorderlevel" name="productreorderlevel" value={formData.productreorderlevel} onChange={handleChange} type="text"></input>
                </label>
                <label for="productreorderlink">Reorder Link: 
                    <input id="productreorderlink" name="productreorderlink" value={formData.productreorderlink} onChange={handleChange} type="text"></input>
                </label>
                <label for="productreorderlinktwo">Reorder Link: 
                    <input id="productreorderlinktwo" name="productreorderlinktwo" value={formData.productreorderlinktwo} onChange={handleChange} type="text"></input>
                </label>
                <label for="productcategory">Category:
                    <input id="productcategory" name="productcategory" value={formData.productcategory} onChange={handleChange} type="text"></input>
                </label>
                <label for="productprice">Price &#40;ex. GST.&#41;:
                    <input id="productprice" name="productprice" value={formData.productprice} onChange={handleChange}/>
                </label>
                <button type="submit">Save Changes</button>
            </form>
        </div>
    );
}

export default EditProduct;
