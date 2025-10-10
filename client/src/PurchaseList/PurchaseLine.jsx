import "./PurchaseLine.css"
import deleteicon from "./assets/deleteicon.svg"

function PurchaseLine({purchaseDat, onDelete}){
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
                <div><b>Product Id:</b> {purchaseDat.product_id}</div>
                <div><b>Unit Cost:</b> ${purchaseDat.purchase_amount}</div>
                <div><b>Purchase Qty:</b> ${purchaseDat.purchase_qty}</div>
            </div>

        </div>
    </>
}

export default PurchaseLine;