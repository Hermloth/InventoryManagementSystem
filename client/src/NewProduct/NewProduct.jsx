function NewProduct( ){

    console.log("New Product Component Loaded")
    return (
        <>
        <form action="/products/api/new" method="POST" >
            <label for="producttitle">Product Title</label>
            <input id="producttitle" name="producttitle" type="text"></input>
            <label for="productdescription">Product Description</label>
            <input id="productdescription" name="productdescription" type="text"></input>
            <button type="submit">SUBMIT TEST</button>
        </form>

        <a href="/">Back to home</a>
        </>
    )
}

export default NewProduct