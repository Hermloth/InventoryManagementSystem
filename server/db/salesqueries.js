import pool from "./pool.js";



// GET all sales in DB
async function getAllSales() {
    const {rows} = await pool.query("SELECT * FROM sales;");
    return rows;
}

// INSERT a single sale into the DB
async function insertSale(sale) {
    try {
        
        var productID = sale.product_id;
        var saleAmount = sale.sale_amount?? null;

        const result = await pool.query(`INSERT INTO sales (product_id, sale_amount) 
            VALUES ($1, $2) 
            RETURNING *`, 
            [productID, saleAmount]
        );
    } catch (err) {
        console.error("Error inserting sale:", err.message);
        throw err;
    }
}

//Delete a single sale item
async function deleteSale(saleId) {
    try {
        const result = await pool.query(
            `DELETE FROM sales WHERE id = $1 RETURNING *`, 
            [saleId]
        );
        
        if (result.rowCount === 0) {
            throw new Error("Sale not found");
        }
        
        return result.rows[0];
    } catch (err) {
        console.error("Error deleting sale:", err.message);
        throw err;
    }
}


const salesdbQuery = {
    getAllSales,
    insertSale,
    deleteSale,
}

export default salesdbQuery