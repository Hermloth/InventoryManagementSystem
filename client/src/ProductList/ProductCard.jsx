import "./ProductCard.css";

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


// make sure to change destructuring of number once changed to a data object input
function ProductCard({number}){
    return <>
    <div className="ProductCard">Test Card {number+1}
        <div>Test Description</div>
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
    </div>
    </>
}

export default ProductCard;