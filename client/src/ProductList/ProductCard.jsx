import { useEffect, useState } from "react";
import "./ProductCard.css";
import { useNavigate } from "react-router";

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


ADVANCED - WIX ID (Non-Editable)
*/


// make sure to change destructuring of number once changed to a data object input
function ProductCard({product, settings}){

    const navigate = useNavigate();

    const [advanced, setAdvanced] = useState(false)
    const [salesData, setSalesData] = useState(null);
    const [purchaseData, setPurchaseData] = useState(null);
    const [loading, setLoading] = useState(true);

    const [calculatedProperties, setCalculatedProperties] = useState({
        markup: null,
        COGS: null,
        margin: null,
        reorderflag: false,
        materialcost: null,
        packagingcost: null,
        totalsold: null,
        stripefees: null,
        busregfees: null,
        websitefees: null,
        labourcost: null,
        admincost: null,
        profitperunit: null
    });

    useEffect(() => {
        if (!product) return;

        async function fetchSpecificSalesData(){
            try {
                const response = await fetch(`/api/sales/${product.id}`);
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                const data = await response.json();
                setSalesData(data);

                calculateProperties(data);

            } catch (error) {
                console.error(`Error Fetching SalesData for product ${product.id}`, error);
            } finally {
                setLoading(false);
            }
        }

        async function fetchSpecificPurchaseData(){
            try {
                const response = await fetch(`/api/purchases/${product.id}`);
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                const data = await response.json();
                console.log('Purchase data:', JSON.stringify(data, null, 2));
                setPurchaseData(data);

            } catch (error) {
                console.error(`Error Fetching Purchase Data for product ${product.id}`, error);
            }
        }
        
/*
         {
    "id": 2,
    "product_id": 1,
    "purchase_amount": "20.00",
    "purchase_qty": "3"
  },
  {
    "id": 3,
    "product_id": 1,
    "purchase_amount": "10.00",
    "purchase_qty": "1"
  }
*/

        function calculateProperties(salesDataArray) {
            if (!product || !salesDataArray || !settings) return;

            // Calculate total sold from sales data
            const totalsold = salesDataArray.length;

            // Calculate average cost from sales data (if you have cost info in sales)
            // For now, using material cost from product if available
            //const averageCost = product.material_cost || 0;

            // BASIC - Markup (Retail - Cost AVG)
            //const markup = product.retail_price - averageCost;

            //Stripe Fees ((Retail Cost * 0.0175) + 0.3)
            const stripefees = (product.retail_price * 0.0175) + 0.3;

            // ADVANCED - Business Registration Calc (Business Fee in Settings / Total Units Sold)
            const busregfees = totalsold > 0 ? (settings.business_registration_calc || 0) / totalsold : 0;

            //Website Fee Calc (Website Fee in Settings / Total Units Sold)
            const websitefees = totalsold > 0 ? (settings.website_fee_calc || 0) / totalsold : 0;

            // ADVANCED - Domain Fee Calc (Domain Fee in Settings / Total Units Sold)
            //const domainfees = totalsold > 0 ? (settings.domain_fee || 0) / totalsold : 0;

            // ADVANCED - Labour Cost (from Settings)
            //const labourcost = settings.labour_cost || 0;

            // Material cost
            //const materialcost = product.material_cost || 0;

            // Packaging cost
            //const packagingcost = product.packaging_cost || 0;

            // ADVANCED - Admin Costs (Website Fee + Business Registration + Domain Fee + Stripe Fee + Packaging Cost)
            //const admincost = websitefees + busregfees + domainfees + stripefees + packagingcost;

            // BASIC - COGS [Cost of Goods Sold] (Admin Costs + Cost Actual)
            //const COGS = admincost + averageCost;

            // ADVANCED - Profit / Unit (Retail Price - COGS)
            //const profitperunit = product.retail_price - COGS;

            // BASIC - Margin ((Retail Price - COGS) / COGS)
            //const margin = COGS > 0 ? ((product.retail_price - COGS) / COGS) * 100 : 0;

            // BASIC - REORDER FLAG (TRUE IF (SOH + SIT) < Reorder Level)
            //const reorderflag = (product.soh + product.sit) < product.reorder_level;

            setCalculatedProperties({
                //markup,
                //COGS,
                //margin,
                //reorderflag,
                //materialcost,
                //packagingcost,
                totalsold,
                stripefees,
                busregfees,
                websitefees
                //labourcost,
                //admincost,
                //profitperunit
            }); 
        }
        fetchSpecificPurchaseData()
        fetchSpecificSalesData()
    }, [])

    function switchAdvanced(){
        setAdvanced(!advanced)
    }

    return <>
            {product? 
            <div className="ProductCard">
                <div className="CardControl">
                    <button 
                        className="editButton" 
                        onClick={() => navigate(`/products/${product.id}/edit`)}
                    >
                        Edit
                    </button>
                </div>
                <div>
                    <div>Name: {product.product_name}</div>
                    <div>Size: {product.size}</div>
                    <div>Style: {product.style}</div>
                    <div>Color: {product.color}</div>
                    <div>Retail Price: {product.retail_price}</div>
                    <div>SOH: {product.soh}</div>
                    <div>SIT: {product.sit}</div>
                    <div>Reorder Level: {product.reorder_level}</div>
                    <div>Test Markup WIP</div>
                    <div>Test COGS WIP</div>
                    <div>Test Margin WIP</div>
                    {(product.soh + product.sit)<product.reorder_level ? <div>REORDER</div> : <div></div>}
                    <button className="advancedButton" onClick={switchAdvanced}>Advanced</button>
                    {advanced?
                        <>
                        <div>Product Id: {product.id}</div>
                        <div>Test Material Cost WIP</div>
                        <div>Test Cost - Avg WIP</div>
                        <div>Total Sold: {loading ? "Loading..." : calculatedProperties?.totalsold || 'N/A'}</div>
                        <div>Stripe Fees: ${loading ? `Loading...` : calculatedProperties?.stripefees || 'N/A'}</div>
                        <div>Business Registration Fees: ${loading ? `Loading...` : calculatedProperties?.busregfees || `N/A`}</div>
                        <div>Website Fee Calc: ${loading ? `Loading...` : calculatedProperties?.websitefees || "N/A"}</div>
                        <div>Labour Cost: ${loading? `Loading...` : settings?.labour_cost || "N/A"}</div>
                        <div>Packaging Cost: ${loading? `Loading...` : settings?.packaging_cost || "N/A"}</div>
                        <div>Test Profit / Unit WIP</div>
                        <div>WixId: {product.wix_id}</div>
                        <div>Reorder Link: {product.reorder_link}</div>
                        <div>Reorder Link 2: {product.reorder_link_two}</div>
                    </>
                    
                    : null}
                </div>
        </div> 
        :<div className="ProductCard">
            <div className="CardControl">
                <button 
                    className="editButton" 
                    onClick={() => navigate(`/products/${product.id}/edit`)}
                    >
                        Edit
                </button>
            </div>
            <div>
                    <div>Test Name</div>
                    <div>Test Size</div>
                    <div>Test Style</div>
                    <div>Test Color</div>
                    <div>Test Retail Price</div>
                    <div>Test SOH</div>
                    <div>Test SIT</div>
                    <div>Test Reorder Level</div>
                    <div>Test Markup</div>
                    <div>Test COGS</div>
                    <div>Test Margin</div>
                    <div>Test ReorderFlag</div>
                    <button className="advancedButton" onClick={switchAdvanced}>Advanced</button>
                    {advanced?
                        <>
                        <div>Test Id</div>
                        <div>Test Material Cost</div>
                        <div>Test Packaging Cost</div>
                        <div>Test Cost - Avg</div>
                        <div>Test Total Sold</div>
                        <div>Test Stripe Fees</div>
                        <div>Test Business Registration Fees</div>
                        <div>Test Website Fee Calc</div>
                        <div>Test Labour Cost</div>
                        <div>Test Admin Cost</div>
                        <div>Test Profit / Unit</div>
                        <div>Test WixId</div>
                        <div>Test Reorder Link</div>
                        <div>Test Reorder Link2</div>
                        </>
                        
                        : null}
                    </div>
        </div>}
    </>
}

export default ProductCard;