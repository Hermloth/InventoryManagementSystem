import pool from "./pool.js";


// GET all products in DB
async function getAllProducts() {
    const {rows} = await pool.query("SELECT * FROM products");
    return rows;
}

// INSERT a single product into the DB
async function insertProduct(product) {
    try {
        var titlefield = product.producttitle;
        var descfield =  product.productdescription?? null;
        var catfield = product.category?? null;
        var pricefield = product.price?? null;
        var colorfield = product.color?? null;
        var lengthfield = product.length?? null;
        const result = await pool.query(`INSERT INTO products (productdescription, producttitle, category, priceexgst, color, length) 
            VALUES ($1, $2, $3, $4, $5, $6) 
            RETURNING *`, 
            [descfield, titlefield, catfield, pricefield, colorfield, lengthfield]
        );
        console.log(result.rows[0]);
    } catch (err) {
        console.error("Error inserting product:", err.message);
        throw err;
    }
}

//DELETE a product from the DB
async function deleteProduct(productid) {
    try{
        const result = await pool.query(`DELETE FROM products WHERE id = $1 RETURNING *`, 
            [productid]
        );
        
        if (result.rowCount === 0) {
            console.log("No product found with that ID.");
            return null;
        }

        console.log("Deleted product:", result.rows[0]);
        console.log(result.rows[0]);

    } catch (err) {
        console.error("Error deleting item from database", err.message);
        throw err;
    }
}

const dbQuery = {
    getAllProducts,
    insertProduct,
    deleteProduct
}

export default dbQuery;