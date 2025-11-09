import pool from "./pool.js";


// GET all products in DB
async function getAllProducts() {
    const {rows} = await pool.query("SELECT * FROM products ORDER BY id");
    return rows;
}


// INSERT a single product into the DB
async function insertProduct(product) {
    try {
        var wixidfield = null;
        
        var namefield = product.productname;
        var lengthfield = product.productlength?? null;
        var stylefield = product.productstyle?? null;
        var colorfield = product.productcolor?? null;

        var materialcostfield = product.materialcost?? null;
        var retailpricefield = product.retailprice?? null;
        var sohfield = product.SOH?? null;
        var sitfield = product.SIT?? null;
        var reorderlevelfield = product.productreorderlevel?? null;
        var reorderlink = product.productreorderlink?? null;
        var reorderlinktwo = product.productreorderlinktwo?? null;

        const result = await pool.query(`INSERT INTO products (wix_id, product_name, size, style, color, material_cost, retail_price, SOH, SIT, reorder_level, reorder_link, reorder_link_two) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) 
            RETURNING *`, 
            [wixidfield, namefield, lengthfield, stylefield, colorfield, materialcostfield, retailpricefield, sohfield, sitfield, reorderlevelfield, reorderlink, reorderlinktwo]
        );
    } catch (err) {
        console.error("Error inserting product:", err.message);
        throw err;
    }
}


// GET Specific Product Details
async function getProductById(id) {
    const result = await pool.query("SELECT * FROM products WHERE id = $1", [id]);
    //console.log(result.rows[0]);
    return result.rows[0] || null;
}

// UPDATE Local Product Record
async function updateProduct(id, data) {
    console.log("update called")
    const {
            productname,
            productlength,
            productstyle,
            productcolor,
            materialcost,
            retailprice,
            soh,
            sit,
            productreorderlevel,
            productreorderlink,
            productreorderlinktwo
        } = data;

        console.log(data)
        
        const result = await pool.query(
            `UPDATE products SET
                product_name = $1,
                size = $2,
                style = $3,
                color = $4,
                material_cost = $5,
                retail_price = $6,
                SOH = $7,
                SIT = $8,
                reorder_level = $9,
                reorder_link = $10,
                reorder_link_two = $11
            WHERE id = $12
            RETURNING *`,
            [
                productname,
                productlength,
                productstyle,
                productcolor,
                materialcost,
                retailprice,
                soh,
                sit,
                productreorderlevel,
                productreorderlink,
                productreorderlinktwo,
                id
            ]
    );

    return result.rowCount ? result.rows[0] : null;
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

        //console.log("Deleted product:", result.rows[0]);
        return result.rows[0];

    } catch (err) {
        console.error("Error deleting item from database", err.message);
        throw err;
    }
}

async function updateProductWixId(productId, wixId) {
    try {
        const result = await pool.query(
            `UPDATE products SET wix_id = $1 WHERE id = $2 RETURNING *`,
            [wixId, productId]
        );
        return result.rowCount ? result.rows[0] : null;
    } catch (err) {
        console.error("Error updating wix_id:", err.message);
        throw err;
    }
}


//Refresh Data for WIX Site
async function upsertWixProduct(product) {

    const {
        producttitle,
        productdescription,
        wixproductid,
        wixvariantid,
        productcolor,
        priceexgst,
        length,
        style,
        category,
        reorderlevel,
        stocklevel
    } = product;
    console.log(product)
    const existing = await pool.query(
        "SELECT id FROM products WHERE producttitle = $1",
        [producttitle]
    );
    if (existing.rows.length > 0) {
        // UPDATE
        await pool.query(`
            UPDATE products SET
                productdescription = $1,
                wixproductid = $2,
                wixvariantid = $3,
                color = $4,
                priceexgst = $5,
                length = $6,
                style = $7,
                category = $8,
                reorderlevel = $9,
                stocklevel = $10
            WHERE producttitle = $11
        `, [
            productdescription,
            wixproductid,
            wixvariantid,
            productcolor,
            priceexgst,
            length,
            style,
            category,
            reorderlevel,
            stocklevel,
            producttitle,
        ]);
    } else {
        // INSERT
        await pool.query(`
            INSERT INTO products (
                producttitle,
                productdescription,
                wixproductid,
                wixvariantid,
                color,
                priceexgst,
                reorderlink,
                reorderlinktwo,
                length,
                style,
                category,
                reorderlevel,
                stocklevel
            )
            VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)
        `, [
            producttitle,
            productdescription,
            wixproductid,
            wixvariantid,
            productcolor,
            priceexgst,
            reorderlink,
            reorderlinktwo,
            length,
            style,
            category,
            reorderlevel,
            stocklevel
        ]);
    }
}

async function deleteAllProducts() {
    return pool.query("DELETE FROM products");
}


async function reduceProductSOH(productId, quantity = 1) {
    try {
        const result = await pool.query(
            `UPDATE products 
            SET soh = soh - $1 
            WHERE id = $2 
            RETURNING *`,
            [quantity, productId]
        );
        return result.rowCount ? result.rows[0] : null;
    } catch (err) {
        console.error("Error reducing product SOH:", err.message);
        throw err;
    }
}

const dbQuery = {
    getAllProducts,
    insertProduct,
    //deleteProduct,
    getProductById,
    updateProduct,
    //upsertWixProduct,
    //deleteAllProducts
    updateProductWixId,
    reduceProductSOH, 
}

export default dbQuery;