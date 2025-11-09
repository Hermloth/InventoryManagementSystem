import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { createClient, OAuthStrategy } from '@wix/sdk';
import * as wixStores from '@wix/stores';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './LinkProductList.css';

const myWixClient = createClient({
    modules: {
        stores: wixStores,
    },
    auth: OAuthStrategy({
        clientId: import.meta.env.VITE_CLIENTID,
    }),
});

function LinkProductList(){
    const { id } = useParams();
    const navigate = useNavigate();
    
    const [localProduct, setLocalProduct] = useState(null);
    const [wixProducts, setWixProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [linking, setLinking] = useState(false);

    useEffect(() => {
            async function fetchData() {
                try {
                    // Fetch the local product
                    const productResponse = await fetch(`/api/products/${id}`);
                    const productData = await productResponse.json();
                    setLocalProduct(productData);

                    // Fetch Wix products
                    const { items: wixProductsList } = await myWixClient.stores.products.queryProducts().find();
                    
                    // Transform Wix products to include variants
                    const transformedProducts = [];
                    for (const item of wixProductsList) {
                        if (item.variants && item.variants.length > 1) {
                            // Product has variants
                            for (const variant of item.variants) {
                                const choices = variant.choices;
                                const choiceKey = Object.keys(choices)[0];
                                transformedProducts.push({
                                    wixProductName: item.name,
                                    wixProductId: item._id,
                                    wixVariantId: variant._id,
                                    wixVariantName: variant.name,
                                    wixProductColour: choices[choiceKey],
                                    wixProductStock: variant.stock.quantity,
                                    displayName: `${item.name} - ${choices[choiceKey]}`
                                });
                            }
                        } else {
                            // Product has no variants
                            transformedProducts.push({
                                wixProductName: item.name,
                                wixProductId: item._id,
                                wixVariantId: null,
                                wixVariantName: null,
                                wixProductColour: "No Colour",
                                wixProductStock: item.stock.quantity,
                                displayName: item.name
                            });
                        }
                    }
                    
                    setWixProducts(transformedProducts);
                } catch (error) {
                    console.error('Error fetching data:', error);
                    toast.error('Failed to load products');
                } finally {
                    setLoading(false);
                }
            }

            fetchData();
        }, [id]);

    async function handleLinkProduct(wixProductId) {
        setLinking(true);
        try {
            const response = await fetch(`/api/products/${id}/wix-id`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ wixId: wixProductId }),
            });

            if (!response.ok) {
                throw new Error('Failed to link product');
            }

            toast.success('Product linked successfully!');
            
            // Navigate back to product list after a short delay
            setTimeout(() => {
                navigate('/products');
            }, 1500);
            
        } catch (error) {
            console.error('Error linking product:', error);
            toast.error('Failed to link product');
        } finally {
            setLinking(false);
        }
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className="LinkProductContainer">
            <div className="Header">
                <h1>Link Product to Wix</h1>
                <button onClick={() => navigate('/products')} className="BackButton">
                    Back to Products
                </button>
            </div>

            <div className="LocalProductInfo">
                <h2>Local Product:</h2>
                <div className="ProductDetails">
                    <p><strong>{localProduct?.product_name}</strong></p>
                    <p>Size: {localProduct?.size}</p>
                    <p>Style: {localProduct?.style}</p>
                    <p>Color: {localProduct?.color}</p>
                    <p>Current Wix ID: {localProduct?.wix_id || 'Not linked'}</p>
                </div>
            </div>

            <div className="WixProductsList">
                <h2>Select Wix Product to Link:</h2>
                <div className="ProductGrid">
                    {wixProducts.map((wixProduct, index) => (
                        <div key={index} className="WixProductCard">
                            <div className="WixProductInfo">
                                <h3>{wixProduct.displayName}</h3>
                                <p>Stock: {wixProduct.wixProductStock}</p>
                                <p className="WixId">Wix ID: {wixProduct.wixProductId}</p>
                                {wixProduct.wixVariantId && (
                                    <p className="VariantId">Variant ID: {wixProduct.wixVariantId}</p>
                                )}
                            </div>
                            <button
                                onClick={() => handleLinkProduct(wixProduct.wixProductId)}
                                disabled={linking}
                                className="LinkButton"
                            >
                                {linking ? 'Linking...' : 'Link Now'}
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            <ToastContainer position="bottom-right" autoClose={3000} />
        </div>
        </>
    );
}

export default LinkProductList;