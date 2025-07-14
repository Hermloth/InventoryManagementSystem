import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function EditProduct() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
    color: "",
    reorderlink: "",
    reorderlinktwo: "",
    length: "",
    style: "",
    category: "",
    reorderlevel: ""
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
    async function fetchProduct() {
        try {
        const res = await fetch(`/api/products/${id}`);
        if (!res.ok) throw new Error("Failed to fetch product");

        const data = await res.json();

        setFormData({
            producttitle: data.producttitle,
            color: data.color,
            reorderlink: data.reorderlink || "",
            reorderlinktwo: data.reorderlinktwo || "",
            length: data.length || "",
            style: data.style || "",
            category: data.category || "",
            reorderlevel: data.reorderlevel || 0,
        });

        setLoading(false);
        } catch (err) {
        console.error("Error loading product:", err);
        setLoading(false);
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

        const res = await fetch(`/api/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        });

        if (res.ok) {
            navigate("/products", { state: { reload: true } });
        } else {
            alert("Failed to update product.");
        }
    }

    if (loading) return <p>Loading product...</p>;

    return (
        <form onSubmit={handleSubmit} className="EditProductForm">
        <h2>Editing: {formData.producttitle}</h2>
        <p> <strong>Color: </strong>{formData.color}</p>

        <label>
            Reorder Link:
            <input
            name="reorderlink"
            value={formData.reorderlink}
            onChange={handleChange}
            />
        </label>

        <label>
            Reorder Link Two:
            <input
            name="reorderlinktwo"
            value={formData.reorderlinktwo}
            onChange={handleChange}
            />
        </label>

        <label>
            Length:
            <input
            name="length"
            value={formData.length}
            onChange={handleChange}
            />
        </label>

        <label>
            Style:
            <input
            name="style"
            value={formData.style}
            onChange={handleChange}
            />
        </label>

        <label>
            Category:
            <input
            name="category"
            value={formData.category}
            onChange={handleChange}
            />
        </label>

        <label>
            Reorder Level:
            <input
            type="number"
            name="reorderlevel"
            value={formData.reorderlevel}
            onChange={handleChange}
            />
        </label>

        <button type="submit">Update Product</button>
        </form>
    );
    }

    export default EditProduct;
