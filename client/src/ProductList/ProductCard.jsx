import { useEffect, useState } from "react";
import "./ProductCard.css";
import { useNavigate } from "react-router";

// TODO: Add styling to Product Card Field Groups

function ProductCard({product, settings}){

    const navigate = useNavigate();

    const [advanced, setAdvanced] = useState(false)
    const [showMore, setshowMore] = useState(false)
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

        async function fetchAllData() {
            setLoading(true);
        try {
            const [salesResponse, purchaseResponse] = await Promise.all([
                fetch(`/api/sales/${product.id}`),
                fetch(`/api/purchases/${product.id}`)
            ]);

            if (!salesResponse.ok || !purchaseResponse.ok) {
                throw new Error('Failed to fetch data');
            }

            const salesData = await salesResponse.json();
            const purchaseData = await purchaseResponse.json();

            setSalesData(salesData);
            setPurchaseData(purchaseData);

            calculateProperties(salesData, purchaseData);

        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }

        }

        function calculateProperties(salesDataArray, purchaseData) {
            if (!product || !salesDataArray || !settings) return;

            // Calculate total sold from sales data
            const totalsold = salesDataArray.length;

            // Calculate most recent unit cost from purchase data
            let materialcost = 0;
            if (purchaseData && purchaseData.length > 0) {
                const mostRecentPurchase = purchaseData.reduce((prev, current) => {
                    return (current.id > prev.id) ? current : prev;
                });
                materialcost = parseFloat(mostRecentPurchase.unit_amount);
            }

            // BASIC - Markup (Retail - Cost AVG)
            const markup = parseFloat(product.retail_price - materialcost).toFixed(2)

            //Stripe Fees ((Retail Cost * 0.0175) + 0.3)
            const stripefees = (product.retail_price * 0.0175) + 0.3;

            // ADVANCED - Business Registration Calc (Business Fee in Settings / Total Units Sold)
            const busregfees = totalsold > 0 ? (settings.business_registration_calc || 0) / totalsold: 0;

            //Website Fee Calc (Website Fee in Settings / Total Units Sold)
            const websitefees = totalsold > 0 ? parseFloat(settings.website_fee_calc|| 0) / totalsold : 0;

            // Get labour and packaging costs
            const labourcost = parseFloat(settings?.labour_cost || 0);
            const packagingcost = parseFloat(settings?.packaging_cost || 0);

            // ADVANCED - Admin Costs (Website Fee + Business Registration + Domain Fee + Stripe Fee + Packaging Cost)
            const admincost = parseFloat(stripefees + busregfees + websitefees + labourcost + packagingcost).toFixed(2);

            // BASIC - COGS [Cost of Goods Sold] (Admin Costs + Cost Actual)
            const COGS = admincost + materialcost;

            // ADVANCED - Profit / Unit (Retail Price - COGS)
            const profitperunit = product?.retail_price - COGS;

            // BASIC - Margin ((Retail Price - COGS) / COGS)
            const margin = COGS > 0 ? ((product.retail_price - COGS) / COGS) * 100 : 0;


            setCalculatedProperties({
                markup,
                COGS: parseFloat(COGS).toFixed(2),
                margin: parseFloat(margin).toFixed(),
                materialcost,
                totalsold,
                stripefees: parseFloat(stripefees).toFixed(2),
                busregfees: parseFloat(busregfees).toFixed(2),
                websitefees: parseFloat(websitefees).toFixed(2),
                admincost,
                profitperunit: parseFloat(profitperunit).toFixed(2)
            }); 
        }

        fetchAllData();
    }, [product?.id, settings])

    function switchAdvanced(){
        setAdvanced(!advanced)
    }

    function switchShowMore(){
        setshowMore(!showMore)
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
                    {(product.soh + product.sit)<product.reorder_level ? <div className="ReorderBanner"><b>REORDER</b></div> : <div></div>}
                    <div><b>{product.product_name}</b> {product.size} {product.style}, {product.color}</div>
                    <div className="PricingContainer">
                        <div>Retail Price: {product.retail_price}</div>

                        <div>COGS: ${calculatedProperties?.COGS}</div>
                        <div>Profit per Unit: ${calculatedProperties?.profitperunit}</div>
                        <div>Margin: %{calculatedProperties?.margin}</div>
                    </div>
                    <div className="StockLevelContainer">
                        <div>SOH: {product.soh}</div>
                        <div>SIT: {product.sit}</div>
                        <div>Reorder Level: {product.reorder_level}</div>
                    </div>
                    
                    <button className="advancedButton" onClick={switchAdvanced}>Advanced</button>
                    {advanced?
                        <>
                            <div>Reorder Link: {product.reorder_link ? <a href={product.reorder_link} target="_blank" rel="noopener noreferrer">{product.reorder_link}</a> : 'N/A'}</div>
                            <div>Reorder Link 2: {product.reorder_link_two ? <a href={product.reorder_link_two} target="_blank" rel="noopener noreferrer">{product.reorder_link_two}</a> : 'N/A'}</div>
                            <div>Product Id: {product.id}</div>
                            <div>WixId: {product.wix_id}</div>
                            <div>Total Sold: {loading ? "Loading..." : calculatedProperties?.totalsold || 'N/A'}</div>

                            <div>Unit Cost: ${calculatedProperties?.materialcost || 'N/A'}</div>
                            <div>Markup: ${calculatedProperties?.markup}</div>

                            <div>Admin Cost: ${loading? `Loading...` : calculatedProperties?.admincost || "N/A"}</div>
                            <button className="advancedButton" onClick={switchShowMore}>Show More</button>
                            {showMore? 
                            <> 
                                <div>Stripe Fees: ${loading ? `Loading...` : calculatedProperties?.stripefees || 'N/A'}</div>
                                <div>Business Registration Fees: ${loading ? `Loading...` : calculatedProperties?.busregfees || `N/A`}</div>
                                <div>Website Fee Calc: ${loading ? `Loading...` : calculatedProperties?.websitefees || "N/A"}</div>
                                <div>Labour Cost: ${loading? `Loading...` : settings?.labour_cost || "N/A"}</div>
                                <div>Packaging Cost: ${loading? `Loading...` : settings?.packaging_cost || "N/A"}</div>
                            </>
                            : null}
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