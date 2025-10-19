import pool from "./pool.js";

// GET all purchases in DB
async function getAllPurchases() {
    const {rows} = await pool.query("SELECT * FROM purchases;");
    return rows;
}

// INSERT a single sale into the DB
async function insertPurchase(purchase) {
    try {
        var productID = purchase.product_id;
        var purchaseAmount = purchase.purchase_amount?? null;
        var unitAmount = purchase.unit_amount?? null;
        var purchaseQty = purchase.purchase_qty?? null;


        const result = await pool.query(`INSERT INTO purchases (product_id, purchase_amount, unit_amount, purchase_qty) 
            VALUES ($1, $2, $3, $4) 
            RETURNING *`, 
            [productID, purchaseAmount, unitAmount, purchaseQty]
        );

    } catch (err) {
        console.error("Error inserting purchase:", err.message);
        throw err;
    }
}

//Delete a single purchase item
async function deletePurchase(purchaseId) {
    try {
        const result = await pool.query(
            `DELETE FROM purchases WHERE id = $1 RETURNING *`, 
            [purchaseId]
        );
        
        if (result.rowCount === 0) {
            throw new Error("Purchase not found");
        }
        
        return result.rows[0];
    } catch (err) {
        console.error("Error deleting purchase:", err.message);
        throw err;
    }
}

async function GetSpecificPurchaseData(id) {
    try{
        const result = await pool.query(
            `SELECT * FROM purchases WHERE product_id = $1;`, [id]
        );
        return result.rows;
    } catch (error) {
        console.error(`Error getting purchase data for ${id}`, error.message)
        throw error
    }
}


const purchasedbQuery = {
    getAllPurchases,
    insertPurchase,
    deletePurchase,
    GetSpecificPurchaseData,
}

export default purchasedbQuery