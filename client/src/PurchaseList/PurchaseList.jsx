import { useEffect, useState } from "react";
import "./PurchaseList.css";
import PurchaseLine from "./PurchaseLine";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function PurchaseList(){
    const navigate = useNavigate();
    const [purchaseData, setPurchaseData] = useState([])
    const [products, setProducts] = useState({})
    const [loading, setLoading] = useState(true)


    /*
    useEffect(() => {
        async function fetchPurchaseData(){
            try{
                const response = await fetch(`/api/purchases`);
                const data = await response.json();
                setPurchaseData(data)
            } catch (error) {
                console.error("Error Fetching Purchase Data", error);
            } finally {
                setLoading(false)
            }
        }

        fetchPurchaseData();
    }, [])
*/

    useEffect(() => {
        async function fetchAllData(){
            try{
                // Fetch purchase data
                const purchaseResponse = await fetch(`/api/purchases`);
                const purchaseData = await purchaseResponse.json();
                
                // Fetch all products
                const productsResponse = await fetch(`/api/products`);
                const productsData = await productsResponse.json();
                
                // Convert products array to object keyed by ID for easy lookup
                const productsMap = {};
                productsData.forEach(product => {
                    productsMap[product.id] = product;
                });
                
                setPurchaseData(purchaseData);
                setProducts(productsMap);
            } catch (error) {
                console.error("Error Fetching Data", error);
                toast.error("Failed to load data");
            } finally {
                setLoading(false)
            }
        }

        fetchAllData();
    }, [])


    // Delete function
    const handleDelete = async (purchaseId) => {
        if (!window.confirm("Are you sure you want to delete this purchase?")) {
            return;
        }

        try {
            const response = await fetch(`/api/purchases/${purchaseId}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                // Remove the deleted purchase from state
                setPurchaseData(prev => prev.filter(purchase => purchase.id !== purchaseId));
                toast.success("Purchase deleted successfully");
            } else {
                toast.error("Failed to delete Purchase");
            }
        } catch (error) {
            console.error("Error deleting Purchase:", error);
            toast.error("Error deleting Purchase");
        }
    };

    if (loading) {
        return <div>Loading Purchase Data...</div>
    }

    return <>
        <div className="PageTitle">Purchase List page</div>
        <div className="PageControls">
            <button onClick={() => navigate("/purchases/new")} className="NewpurchaseButton">
                Add New Purchase
            </button>
        </div>
        {purchaseData.map((purchase) => 
            <PurchaseLine 
                key={purchase.id} 
                purchaseDat={purchase}
                product={products[purchase.product_id]}
                onDelete={handleDelete}
            />
        )}
    </>
}

export default PurchaseList;