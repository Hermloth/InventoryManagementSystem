import { useEffect, useState } from "react";
import "./SalesList.css";
import SaleLine from "./SaleLine";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function SalesList(){
    const navigate = useNavigate();
    const [salesData, setSalesData] = useState([])
    const [loading, setLoading] = useState(true)
    const [products, setProducts] = useState({})

useEffect(() => {
        async function fetchAllData(){
            try{
                // Fetch sales data
                const salesResponse = await fetch(`/api/sales`);
                const salesData = await salesResponse.json();
                
                // Fetch all products
                const productsResponse = await fetch(`/api/products`);
                const productsData = await productsResponse.json();
                
                // Convert products array to object keyed by ID for easy lookup
                const productsMap = {};
                productsData.forEach(product => {
                    productsMap[product.id] = product;
                });

                setSalesData(salesData);
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
    const handleDelete = async (saleId) => {
        if (!window.confirm("Are you sure you want to delete this sale?")) {
            return;
        }

        try {
            const response = await fetch(`/api/sales/${saleId}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                // Remove the deleted sale from state
                setSalesData(prev => prev.filter(sale => sale.id !== saleId));
                toast.success("Sale deleted successfully");
            } else {
                toast.error("Failed to delete sale");
            }
        } catch (error) {
            console.error("Error deleting sale:", error);
            toast.error("Error deleting sale");
        }
    };

    if (loading) {
        return <div>Loading Sales Data...</div>
    }

    return <>
        <div className="PageTitle">Sales List page</div>
        <div className="PageControls">
            <button onClick={() => navigate("/sales/new")} className="NewsaleButton">
                Add New Sale
            </button>
        </div>
        {salesData.map((sale) => 
            <SaleLine 
                key={sale.id} 
                saleDat={sale}
                product={products[sale.product_id]}
                onDelete={handleDelete}
            />
        )}
    </>
}

export default SalesList;