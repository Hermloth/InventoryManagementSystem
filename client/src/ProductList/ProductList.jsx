import { useEffect, useState } from "react";
import "./ProductList.css";
import { Link, Navigate, useLocation } from "react-router-dom";
import QRCode from "react-qr-code";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ConfirmModal from "./ConfirmModal";
import { createClient, OAuthStrategy } from '@wix/sdk';
import * as wixStores from '@wix/stores';
import ProductCard from "./ProductCard";
import { useNavigate } from "react-router-dom";


const DEBUG_MODE = true;

const myWixClient = createClient({
    modules: {
        stores: wixStores,
    },
    auth: OAuthStrategy({
        clientId: import.meta.env.VITE_CLIENTID,
    }),
});


function ProductList(){
    //Navigation Helper
    const navigate = useNavigate();

    //Products Data (DB)
    const [offlineProducts, setOfflineProducts] = useState([]);
    const [settingsData, setSettingsData] = useState(null)
    const [salesData, setSalesData] = useState([])

    //Products Data (Online)
    const [onlineProducts, setOnlineProducts] = useState([])

    //State Controllers
    const [loading, setLoading] = useState(true);
    const [confirmDeleteId, setConfirmDeleteId] = useState(null)

    //Function for retreiving online inventory
    const SyncOnlineProducts = async () =>  {
        try {
            const {items: wixProducts} = await myWixClient.stores.products.queryProducts().find()
            const wixDataRevised = []
            for (const item of wixProducts){
                //IF statement handles the different object structures for products with variants vs without.
                if (item.variants && item.variants.length > 1){
                    for (const variant of item.variants){
                        const choices = variant.choices
                        const choiceKey = Object.keys(choices)[0]
                        const submissionObject = {
                            wixProductName: item.name,
                            wixProductId: item._id,
                            wixVariantId: variant._id,
                            wixVariantName: variant.name,
                            wixProductColour: choices[choiceKey],
                            wixProductStock: variant.stock.quantity,
                        }
                        wixDataRevised.push(submissionObject);
                    }
                } else {
                    const submissionObject = {
                            wixProductName: item.name,
                            wixProductId: item._id,
                            wixVariantId: null,
                            wixVariantName: null,
                            wixProductColour: "No Colour",
                            wixProductStock: item.stock.quantity,
                    }

                    wixDataRevised.push(submissionObject);
                }
            }
            toast.success("Wix Sync Complete", {position: "bottom-right"});
        }
        catch (error) {
            console.error(error);
            toast.error("Wix Sync Failed, See error logs", {position: "bottom-right"});
        }
    }

    useEffect(() => {
        async function fetchProducts() {
            try {
                const response = await fetch('/api/products');
                const data = await response.json();
                setOfflineProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        }

        async function fetchSettings() {
            try{
                const response = await fetch('/api/settings');
                const settdata = await response.json();
                setSettingsData(settdata);
            } catch (error) {
                console.error('Error fetching settings:', error);
            }
        }

        async function fetchAllData() {
        await Promise.all([fetchProducts(), fetchSettings()]);
        setLoading(false); // Only set loading to false after BOTH complete
    }

    fetchAllData();
    }, []);


// TEST Card Section
const test_cards = 5
// make sure that number is replaced with an input object when data is received.

if (loading || !settingsData) {
    return <div>Loading products...</div>;
}

return <>
        <div className="Header">
            <div className="PageTitle">
                Product List
            </div>
            <div className="PageControls">
                {/*<button onClick={SyncOnlineProducts} className="SyncButton">Sync Wix Products</button>*/}
                <button onClick={() => navigate("/products/new")} className="NewProductButton">Add New Product</button>
            </div>
        </div>
            <div className="productCardContainer">
                {offlineProducts.map ((product) => 
                    <ProductCard key={product.id} product={product} settings={settingsData}></ProductCard>
                )}            
            </div>            

        <ToastContainer position="bottom-right" autoClose={3000} />
    </>

}

export default ProductList;