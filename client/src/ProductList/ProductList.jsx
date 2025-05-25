import { useEffect, useState } from "react";

function ProductList(){
    const [products, updateProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
    // Fetch products from the Express backend
        fetch("/api/products")
            .then((res) => res.json())
            .then((data) => {
                updateProducts(data);
                setLoading(false);
            })
        .catch((error) => {
            console.error("Error fetching products:", error);
            setLoading(false);
        });
    }, []);

        if (loading) return <p>Loading products...</p>;

        return (
            <div>
                <h2>Product List</h2>
                {products.length === 0 ? (
                <p>No products found.</p>
                ) : (
                    <ul>
                    {products.map((product, index) => (
                        <li key={product.id || index}>
                            <strong>{product.producttitle}</strong><br />
                            Description: {product.productdescription}<br />
                            Category: {product.category}<br />
                            Price: ${product.priceexgst}<br />
                            Color: {product.color}<br />
                            Length: {product.length}
                        </li>
                    ))}
                    </ul>
                )}
            </div>
        );
}

export default ProductList;