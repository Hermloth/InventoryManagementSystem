import { useEffect, useState } from "react";
import "./ProductList.css";
import { Link, useLocation } from "react-router-dom";
import QRCode from "react-qr-code";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ConfirmModal from "./ConfirmModal";
import { createClient, OAuthStrategy } from '@wix/sdk';
import * as wixStores from '@wix/stores';
import ProductCard from "./ProductCard";
/*
TODO: "see deincrement"

const DEBUG_MODE = true;

const myWixClient = createClient({
    modules: {
        stores: wixStores,
    },
    auth: OAuthStrategy({
        clientId: import.meta.env.VITE_CLIENTID,

    }),
});
*/

function ProductList(){
// Expect to get an array of objects
/*
EDITABLE FIELDS
Size
Style
Color

ADVANCED - Material Cost (Actual)
BASIC - Retail Price
ADVANCED - Packaging Cost

BASIC - SOH
BASIC - SIT
BASIC  - Reorder Level

// CALCULATED FIELDS
ADVANCED - Cost (Average -- needs stock order history table)
BASIC - Markup (Retail - Cost AVG)
ADVANCED - Total Sold (-- needs Sales History Table)

ADVANCED - Stripe Fees (Retail Cost * 0.0175) + 0.3)
ADVANCED - Business Registartion Calc (Business Fee in Settings / Total Units Sold)
ADVANCED - Website Fee Calc (Business Fee in Settings / Total Units Sold)
ADVANCED - Labour Cost (Labor Cost in Settings)

ADVANCED - Admin Costs (Website Fee Calc + Business Registration Calc + Domain Fee Calc + Stripe Fee Calc + Packaging Cost)

BASIC - COGS [Cost of Goods Sold] (Admin Costs + Cost Actual)
ADVANCED - Profit / Unit (Retail Price - COGS)
BASIC - Margin ((Retail Price - COGS) / COGS)

BASIC - REORDER FLAG (TRUE IF (SOH + SIT) < Reorder Level))

*/

const test_cards = 5
// make sure that number is replaced with an input object when data is received.
return <>
        <div>Hello World</div>

            <div className="productCardContainer">
                {Array.from({ length: test_cards }, (_, i) => (
                    <ProductCard key={i} number={i}></ProductCard>
                ))}            
            </div>


    </>









    /* MAJOR REWORK START --- Multiple end comments added to fully comment out - remove if needed*/
/*    
    const location = useLocation();

    const [products, updateProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [confirmingDeleteId, setConfirmingDeleteId] = useState(null);


    // Delete All Products
const deleteAllProducts = async () => {
    if (!window.confirm("Are you sure you want to delete ALL products?")) return;

    try {
        const res = await fetch("/api/products", {
            method: "DELETE",
        });

        if (!res.ok) throw new Error("Failed to delete all products");

        updateProducts([]);
        toast.success("All products deleted!", { position: "bottom-right" });
    } catch (err) {
        console.error("Delete all error:", err);
        toast.error("Failed to delete all products", { position: "bottom-right" });
    }
};

// Delete Specific Product
const deleteProduct = (productId) => {
    fetch(`/api/products/${productId}`, {
        method: 'DELETE',
    })
    .then((res) => {
        if (res.ok) {
            updateProducts(prev => prev.filter(product => product.id !== productId));
            toast.success("Product deleted successfully", { position: "bottom-right" });
        } else {
            toast.error("Failed to delete product", { position: "bottom-right" });
        }
    })
    .catch(() => toast.error("Error deleting product", { position: "bottom-right" }));
};

// Add a Sale TODO:
async function handleAddSale(product) {
    const confirmSale = window.confirm(`Add a sale for "${product.producttitle}"? This will reduce its stock by 1.`);
    if (!confirmSale) return;

    try {
        const response = await fetch("https://www.wixapis.com/stores/v2/inventoryItems/decrement", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_STOCK_KEY}`,
        },
        body: JSON.stringify({
            decrementData: [
            {
                productId: product.wixProductId,  // You must store this when syncing TODO:
                variantId: product.wixVariantId, // or get from Wix TODO:
                decrementBy: 1,
            },
            ],
        }),
        });

        if (!response.ok) {
        throw new Error(`Wix API responded with ${response.status}`);
        }

        toast.success(`Stock updated for "${product.producttitle}"`);
    } catch (err) {
        console.error("Failed to update Wix inventory", err);
        toast.error("Failed to update inventory");
    }
    }

    // Sync Wix Products
const handleSyncWixProducts = async () => {
    try {
        const { items } = await myWixClient.stores.products.queryProducts().find();

        const wixDataRevised = []
        for (const item of items) {
            //console.log(item)
            if (item.variants && item.variants.length > 1) {
                // Multiple variants — create a record for each
                for (const variant of item.variants) {
                    const choices = variant.choices
                    const choiceKey = Object.keys(choices)[0]  
                    wixDataRevised.push({
                        localProductTitle: item.name,
                        productDescription: item.description,
                        wixProductId: item._id,
                        wixVariantId: variant._id,
                        variantName: variant.name,
                        priceExGst: variant.variant.priceData?.price || 0,
                        productcolor: choices[choiceKey],
                        productstock: variant.stock.quantity,
                    });
                    //console.log(item)
                }
            } else {
                // No variants — single record
                wixDataRevised.push({
                    localProductTitle: item.name,
                    productDescription: item.description,
                    wixProductId: item._id,
                    wixVariantId: null,
                    variantName: null,
                    priceExGst: item.priceData?.price || 0,
                    productcolor: "No Colour",
                    productstock: item.stock.quantity,
                });
            }
        }
        // DEPRECIATED - Remove from final cut.
        /*
        const wixData = items.map((item) => {
            const variant = item.variants?.[0];
            const colorMatch = variant?.name?.match(/"(.*?)"/);
            const color = colorMatch ? colorMatch[1] : null;
            console.log(item)
            return {
                localProductTitle: item.name,
                productDescription: item.description,
                wixProductId: item._id,
                wixVariantId: variant?._id,
                variantName: variant?.name,
                priceExGst: item?.priceData?.price || 0,
                productcolor: color,
            };
        });
*/
/*
        const res = await fetch("/api/products/update-wix-ids", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(wixDataRevised),
        });

        if (!res.ok) throw new Error("Failed to sync Wix products to backend");

        const updated = await fetch("/api/products");
        const data = await updated.json();
        updateProducts(data);

        toast.success("Wix products synced successfully!", { position: "bottom-right" });
    } catch (err) {
        console.error("Frontend sync error:", err);
        toast.error("Wix sync failed", { position: "bottom-right" });
    }
};

useEffect(() => {
    // Always fetch on mount
    async function fetchProducts() {
        setLoading(true);
        try {
            const res = await fetch("/api/products");
            const data = await res.json();
            updateProducts(data);
        } catch (error) {
            console.error("Error fetching products:", error);
        } finally {
            setLoading(false);
        }
    }

    fetchProducts();
    }, []);  

/*  
    useEffect(() => {

        if (location.state?.reload) {
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
            window.history.replaceState({}, document.title);
    }
    }, [location.state?.reload]);

*/
/*
function handleQRNavigation(link){
        if (link && typeof link === "string") {
            const isAbsolute = link.startsWith("http://") || link.startsWith("https://");
            const finalURL = isAbsolute ? link : `https://${link}`;
            window.open(finalURL, "_blank");
    }
}



        if (loading) return <p>Loading products...</p>;

        return (
            <div className="ProductListPage">
                <div className="ListTitle">Product List</div>
                <div className="ControlPanel">
                    <button onClick={handleSyncWixProducts} className="SyncButton">Sync Wix Products</button>
                </div>
                {DEBUG_MODE && (
                    <div className="ControlPanel">
                        <button onClick={deleteAllProducts} className="DeleteAllButton">Delete All Products (Debug)</button>
                    </div>
                )}
                <hr></hr>
                <div className="ControlPanel">
                        <Link to="/products/new" className="AddButton">Add Product</Link>
                </div>
                {products.length === 0 ? (
                <p>No products found.</p>
                ) : (
                    <ul className="ProductList">
                    {products.map((product, index) => (
                        <li key={product.id || index} className="ProductRecord">
                            <div className="QRWrapper" onClick={() => handleQRNavigation(product.reorderlink)} style={{cursor: "pointer"}}>
                                <QRCode value={product.reorderlink || "https://default.url"} size={64} />
                            </div>
                            <div className="DataWrapper">
                                <div className="ProductLine">
                                    <strong 
                                        className="ClickableTitle"
                                        onClick={() => handleAddSale(product)}
                                        style={{ cursor: "pointer", color: "blue" }}
                                        >
                                        {product.producttitle}
                                    </strong>
                                    <Link to={`/products/${product.id}/edit`} className="EditButton">Edit</Link>
                                    <button className="DeleteButton" onClick={() => setConfirmingDeleteId(product.id)}>delete</button>                                </div>
                                <div className="ProductProperties">
                                    <span><strong>Length: </strong>{product.length}</span>
                                    <span><strong>Style: </strong>{product.style}</span>
                                    <span><strong>Color: </strong>{product.color}</span>
                                </div>
                                <div className="Category">
                                    <span><strong>Category: </strong>{product.category}</span>
                                    <span><strong>Qty In Stock:</strong>{product.stocklevel}</span>
                                </div>
                                <div className="PriceProperties">
                                    <span><strong>Price Ex. GST: </strong>${product.priceexgst}</span>
                                    <span><strong>Price Inc. GST: </strong>${(product.priceexgst * 1.1).toFixed(2)}</span>
                                    <span><strong>Reorder Qty: </strong>{product.reorderlevel}</span>
                                    </div>
                                <div className="ProductLine">
                                    <span><strong>Reorder Link:</strong>
                                    <a href={product.reorderlink} target="_blank" rel="noopener noreferrer"> {product.reorderlink}</a></span>
                                    <span><strong>Reorder Link Two:</strong>
                                    <a href={product.reorderlinktwo} target="_blank" rel="noopener noreferrer"> {product.reorderlinktwo}</a></span>
                                </div>
                            </div>
                        </li>
                    ))}
                    </ul>
                )}
                {confirmingDeleteId !== null && (
    <ConfirmModal
        message="Are you sure you want to delete this product?"
        onConfirm={() => {
            deleteProduct(confirmingDeleteId);
            setConfirmingDeleteId(null);
        }}
        onCancel={() => setConfirmingDeleteId(null)}
    />
)}
<ToastContainer position="bottom-right" autoClose={3000} />
            </div>
        );
*/
/* MAJOR REWORK END*/
}

export default ProductList;