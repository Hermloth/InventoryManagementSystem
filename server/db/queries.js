import pool from "./pool.js";


// GET all products in DB
async function getAllProducts() {
    const {rows} = await pool.query("SELECT * FROM products ORDER BY id");
    return rows;
}

// INSERT a single product into the DB
async function insertProduct(product) {
    try {
        var titlefield = product.producttitle;
        var descfield =  product.productdescription?? null;
        var catfield = product.productcategory?? null;
        var pricefield = product.productprice?? null;
        var colorfield = product.productcolor?? null;
        var lengthfield = product.productlength?? null;
        var stylefield = product.productstyle?? null;
        var reorderfield = product.productreorderlevel?? null;
        var reorderlink = product.productreorderlink?? null;
        var reorderlinktwo = product.productreorderlinktwo?? null;
        const result = await pool.query(`INSERT INTO products (productdescription, producttitle, category, priceexgst, color, length, style, reorderlevel, reorderlink, reorderlinktwo) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) 
            RETURNING *`, 
            [descfield, titlefield, catfield, pricefield, colorfield, lengthfield, stylefield, reorderfield, reorderlink, reorderlinktwo]
        );
        //console.log(result.rows[0]);
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
    //console.log("update called")
    const {
            category,
            color,
            length,
            style,
            reorderlevel,
            reorderlink,
            reorderlinktwo,
        } = data;

        //console.log(data)
        
        const result = await pool.query(
            `UPDATE products SET
                category = $1,
                color = $2,
                length = $3,
                style = $4,
                reorderlevel = $5,
                reorderlink = $6,
                reorderlinktwo = $7
            WHERE id = $8
            RETURNING *`,
            [
                category,
                color,
                length,
                style,
                reorderlevel,
                reorderlink,
                reorderlinktwo,
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


const dbQuery = {
    getAllProducts,
    insertProduct,
    deleteProduct,
    getProductById,
    updateProduct,
    upsertWixProduct,
    deleteAllProducts 
}

export default dbQuery;