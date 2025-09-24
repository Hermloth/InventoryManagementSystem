import { body, validationResult } from "express-validator";
import dbQueries from "../db/queries.js"
//import myWixClient from "../utils/wixClient.js";

function TestReturnFunction (req, res) {
    res.send("Test Return")
}

async function DeleteProduct(req, res) {
    const productId = req.params.id;
    console.log("Deleting Product ID:", productId);

    try {
        const deleted = await dbQueries.deleteProduct(productId);
        if (!deleted) {
            return res.status(404).json({ message: "Product not found" });
        } else {
            res.status(200).json({ message: "Product deleted successfully" });
        }
        
    } catch (err) {
        console.error("Error in delete controller:", err.message);
        res.status(500).json({ error: "Failed to delete product" });
    }
}

async function GetProductById(req, res) {
    //console.log("Get Product Called: " + parseInt(req.params.id))
    const id = parseInt(req.params.id);
    const product = await dbQueries.getProductById(id);
    if (!product) return res.status(404).json({ error: "Not found" });
    res.json(product);
}

async function UpdateProduct(req, res) {
    const id = parseInt(req.params.id);
    const updated = await dbQueries.updateProduct(id, req.body);
    if (!updated) return res.status(404).json({ error: "Product not found" });
    res.json({ message: "Updated successfully" });
}

async function AddNewProduct (req, res) {
    console.log(req.body)

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        console.log("Validation errors:", errors.array());
        return res.status(400).json({ errors: errors.array() });
    }

    await dbQueries.insertProduct(req.body);
        console.log("Item Added");
        res.redirect("/products")
}

async function ListProducts (req, res) {
    //console.log("GET /products called");
    const products = await dbQueries.getAllProducts();
    //console.log("Products Retreived")
    //console.log("RetreivalValue")
    //console.log(products)
    res.json(products);
}
/*
async function syncWixProductsToLocal(req, res) {
    try {
        const localProducts = await dbQueries.getAllProducts();

        try {
                const { items } = await myWixClient.stores.products.queryProducts().find();
                //console.log("Fetched items from Wix:", items);
                } catch (err) {
                console.error("Wix query failed:", JSON.stringify(err, null, 2));
            }

        const mappedProducts = items.flatMap(item => {
            return item.variants.map(variant => {
                const existing = localProducts.find(p => p.producttitle === item.name);
                //console.log("items from wix result")
                //console.log(variant)

                return {
                    producttitle: item.name,
                    productdescription: item.description,
                    wixproductid: item._id,
                    wixvariantid: variant._id,
                    productcolor: color,
                    priceexgst: variant.price.amount / 100,
                    reorderlink: existing?.reorderlink || null,
                    reorderlinktwo: existing?.reorderlinktwo || null,
                    length: existing?.length || null,
                    style: existing?.style || null,
                    category: existing?.category || null,
                    reorderlevel: existing?.reorderlevel || null,
                };
            });
        });

        // Bulk update or insert into DB
        for (const product of mappedProducts) {
            await dbQueries.upsertWixProduct(product);
        }

        res.status(200).json({ message: "Wix products synced to local database" });
    } catch (err) {
        console.error("Error syncing Wix products:", err);
        res.status(500).json({ error: "Sync failed" });
    }
}
*/
async function updateWixIdsFromFrontend(req, res) {
    try {
        const wixProducts = req.body;

        for (const product of wixProducts) {
            //console.log(product)
            const {
                localProductTitle,
                wixProductId,
                wixVariantId,
                productDescription,
                priceExGst,
                productcolor,
                productstock
            } = product;
            //console.log(product)
            await dbQueries.upsertWixProduct({
                producttitle: localProductTitle,
                productdescription: productDescription,
                wixproductid: wixProductId,
                wixvariantid: wixVariantId,
                productcolor: productcolor,
                priceexgst: priceExGst,
                stocklevel: productstock,
            });
        }

        res.status(200).json({ message: "Synced Wix product data from frontend" });
    } catch (err) {
        console.error("Backend sync error:", err);
        res.status(500).json({ error: "Backend failed to sync Wix data" });
    }
}


async function DeleteAllProducts(req, res) {
    try {
        await dbQueries.deleteAllProducts(); // You’ll define this next
        res.status(204).send();
    } catch (err) {
        console.error("Error deleting all products:", err);
        res.status(500).json({ error: "Failed to delete all products" });
    }
}

export default {
    TestReturnFunction,
    AddNewProduct,
    ListProducts,
    DeleteProduct,
    GetProductById,
    UpdateProduct,
    //syncWixProductsToLocal,
    updateWixIdsFromFrontend,
    DeleteAllProducts
};