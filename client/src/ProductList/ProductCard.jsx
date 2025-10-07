import { useState } from "react";
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
function ProductCard({product}){

    const navigate = useNavigate();

    const [advanced, setAdvanced] = useState(false)


    const ProductCalculatedProperties = {
        markup: null,
        COGS: null,
        margin: null,
        reorderflag: false,
        materialcost: null,
        packagingcost: null,
        //cost: null,
        totalsold: null,
        stripefees: null,
        busregfees: null,
        websitefees: null,
        labourcost: null,
        admincost: null,
        profitperunit: null
    }

    //console.log(product)
    //console.log(ProductCalculatedProperties)
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
                    <div>Test ReorderFlag WIP</div>
                    <button className="advancedButton" onClick={switchAdvanced}>Advanced</button>
                    {advanced?
                        <>
                        <div>Product Id: {product.id}</div>
                        <div>Test Material Cost WIP</div>
                        <div>Test Packaging Cost WIP</div>
                        <div>Test Cost - Avg WIP</div>
                        <div>Test Total Sold WIP</div>
                        <div>Test Stripe Fees WIP</div>
                        <div>Test Business Registration Fees WIP</div>
                        <div>Test Website Fee Calc WIP</div>
                        <div>Test Labour Cost WIP</div>
                        <div>Test Admin Cost WIP</div>
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