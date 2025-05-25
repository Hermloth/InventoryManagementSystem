import "./NewProduct.css"

function NewProduct( ){

    console.log("New Product Component Loaded")
    return (
        <div className="NewProductFormContainer">
        <h2>Add a new product:</h2>
        <form action="/api/products/new" method="POST" className="NewProductForm">

            <label for="producttitle">Product Title:</label>
            <input id="producttitle" name="producttitle" type="text" required></input>
            
            <label for="productdescription">Product Description:</label>
            <input id="productdescription" name="productdescription" type="text"></input>
            
            <label for="productcategory">Category:</label>
            <input id="productcategory" name="productcategory" type="text"></input>

            <label for="productprice">Price &#40;ex. GST.&#41;:</label>
            <input id="productprice" name="productprice" type="number"  min="0" step=".01" />

            <label for="productcolor">Color:</label>
            <select id="productcolor" name="productcolor" type="">
                <option value="White">White</option>
                <option value="Off-White">Off-White</option>
                <option value="Ivory">Ivory</option>
            </select>

            <label for="productlength">Length: </label>
            <input id="productlength" name="productlength" type="text"></input>

            <label for="productstyle">Style: </label>
            <input id="productstyle" name="productstyle" type="text"></input>

            <label for="productreorderlevel">Reorder Level: </label>
            <input id="productreorderlevel" name="productreorderlevel" type="text"></input>

            <label for="productreorderlink">Reorder Link: </label>
            <input id="productreorderlink" name="productreorderlink" type="text"></input>

            <button type="submit" className="ProductSubmitButton">Add Product</button>
        </form>

        <a href="/products"> Back to products</a>
        </div>
    )
}

export default NewProduct