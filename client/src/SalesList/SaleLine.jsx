import "./SaleLine.css"
import deleteicon from "./assets/deleteicon.svg"

function SaleLine({saleDat, product, onDelete}){
    return<>
        <div className="SalesRow">
            <div className="SaleRowHeader">
                <div><b>Sale Id:</b> {saleDat.id}</div>
                <button 
                    onClick={() => onDelete(saleDat.id)} 
                    className="DeleteButton"
                >
                    <img src={deleteicon} alt="" />
                </button>
            </div>
            <div className="SaleRowContent">
                <div>
                    <b>Product:</b> 
                    {product ? (
                        ` ${product.product_name} - ${product.size} ${product.style}, ${product.color}`
                    ) : (
                        ` Product ID: ${saleDat.product_id}`
                    )}
                </div>
                <div><b>Sale Amount:</b> ${saleDat.sale_amount}</div>
            </div>
        </div>
    </>
}

export default SaleLine;