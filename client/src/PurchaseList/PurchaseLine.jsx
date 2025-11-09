import "./PurchaseLine.css"
import deleteicon from "./assets/deleteicon.svg"

function PurchaseLine({purchaseDat, product, onDelete}){
    return<>
        <div className="purchaseRow">
            <div className="purchaseRowHeader">
                <div><b>Purchase Id:</b> {purchaseDat.id}</div>
                <button 
                    onClick={() => onDelete(purchaseDat.id)} 
                    className="DeleteButton"
                >
                    <img src={deleteicon} alt="" />
                </button>
            </div>
            <div className="purchaseRowContent">
                <div>
                    <b>Product:</b> 
                    {product ? (
                        ` ${product.product_name} - ${product.size} ${product.style}, ${product.color}`
                    ) : (
                        ` Product ID: ${purchaseDat.product_id}`
                    )}
                </div>
                <div><b>Total Cost:</b> ${purchaseDat.purchase_amount}</div>
                <div><b>Unit Cost:</b> ${(parseFloat(purchaseDat.purchase_amount / purchaseDat.purchase_qty).toFixed(2))}</div>
                <div><b>Purchase Qty:</b> {purchaseDat.purchase_qty}</div>
            </div>
        </div>
    </>
}

export default PurchaseLine;