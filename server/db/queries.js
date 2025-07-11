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
        return result.rows[0];

    } catch (err) {
        console.error("Error deleting item from database", err.message);
        throw err;
    }
}

async function getProductById(id) {
    const result = await pool.query("SELECT * FROM products WHERE id = $1", [id]);
    return result.rows[0] || null;
}

async function updateProduct(id, data) {
    const {
            producttitle,
            productdescription,
            productcategory,
            productprice,
            productcolor,
            productlength,
            productstyle,
            productreorderlevel,
            productreorderlink,
            productreorderlinktwo,
        } = data;
        
        const result = await pool.query(
            `UPDATE products SET
                producttitle = $1,
                productdescription = $2,
                category = $3,
                priceexgst = $4,
                color = $5,
                length = $6,
                style = $7,
                reorderlevel = $8,
                reorderlink = $9,
                reorderlinktwo = $10
            WHERE id = $11
            RETURNING *`,
            [
                producttitle,
                productdescription,
                productcategory,
                productprice,
                productcolor,
                productlength,
                productstyle,
                productreorderlevel,
                productreorderlink,
                productreorderlinktwo,
                id
            ]
    );

    return result.rowCount ? result.rows[0] : null;
}


const dbQuery = {
    getAllProducts,
    insertProduct,
    deleteProduct,
    getProductById,
    updateProduct
}

export default dbQuery;