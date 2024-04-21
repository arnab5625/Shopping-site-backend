const ProductModel = require("../models/product");

exports.create_product = async (req, res) => {
  try {
    const { title, description, price, imgUrl } = req.body;

    let newProduct = new ProductModel({
      title,
      description,
      price,
      imgUrl,
    });

    newProduct = await newProduct.save();
    res.status(200).json(newProduct); // 200 means ok (successful)//
  } 
  catch (error) {
    res.status(500).json({ error: error.message }); //500 for server error//
  }
};

exports.products = async (req, res) => {
  try {
    const products = await ProductModel.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.singleProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const singleProduct = await ProductModel.findById(productId);
    if (!singleProduct) {
      return res.status(404).json({ message: `no such product found` });
    }
    res.status(200).json(singleProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    await ProductModel.findByIdAndRemove(productId);

    res
      .status(200)
      .json({ message: `Product with id ${productId} deleted successfully!` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    // Create an update object containing only the provided fields (if present)
    const update = {};
    if (req.body.title) {
      update.title = req.body.title;
    }
    if (req.body.description) {
      update.description = req.body.description;
    }
    if (req.body.price) {
      update.price = req.body.price;
    }
    if (req.body.imgUrl) {
      update.imgUrl = req.body.imgUrl;
    }

    // Perform the update using findByIdAndUpdate
    await ProductModel.findByIdAndUpdate(productId, update);

    // Check if the product was updated successfully
    const updatedProduct = await ProductModel.findById(productId);
    if (!updatedProduct) {
      return res
        .status(404)
        .json({ message: `Product with ID ${productId} not found.` });
    }

    res.status(200).json({
      message: `Product with ID ${productId} updated successfully`,
      product: updatedProduct, // Include the updated product data in the response
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
