import ProductModel from '../models/ProductModel.js';
import fs from 'fs';
import slugify from 'slugify';
import CategoryModel from '../models/CategoryModel.js';

// Create a new product
export const createProductController = async (req, res) => {
  try {
    const { name, description, price, quantity, shipping, category } = req.fields;
    const { photo } = req.files;

    // console.log(name, description, price, quantity, shipping, category);

    // Input data sanitization 
    switch (true) {
      case name:
        return res.status(400).send({ success: false, message: "Name is required" })
      case description:
        return res.status(400).send({ success: false, message: "description is required" })
      case price:
        return res.status(400).send({ success: false, message: "price is required" })
      case quantity:
        return res.status(400).send({ success: false, message: "quantity is required" })
      case shipping:
        return res.status(400).send({ success: false, message: "shipping is required" })
      case category:
        return res.status(400).send({ success: false, message: "category is required" })
      case photo && photo.size > 2000000:
        return res.status(400).send({ success: false, message: "photo is required and should be less than 1MB" })
    }

    const newProduct = new ProductModel({
      name,
      slug: slugify(name),
      description,
      price: parseFloat(price),
      quantity: parseInt(quantity),
      category,
      shipping: shipping === 'true',
    });

    // Read image data asynchronously
    const imageData = fs.readFileSync(photo.path);
    if (photo) {
      newProduct.photo.data = imageData, // Set image data
        newProduct.photo.contentType = photo.type // Set image content type
    }

    // Create new product instance
    // Save product to database
    const result = await newProduct.save();

    // Return success response
    return res.status(201).send({
      success: true,
      message: "Product created successfully",
      result
    });
  } catch (error) {
    // Handle errors
    console.error("Error creating product:", error);
    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
      error: error.message
    });
  }
}

// GET all products
export const getAllProductsController = async (req, res) => {
  try {
    const products = await ProductModel.find({}).select("-photo").populate("category").limit(3).sort({ createdAt: -1 });
    return res.send({
      success: true,
      Total: products.length,
      message: "All products",
      products
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Internal server error",
      error
    });
  }
}

// GET single product
export const getSingleProductController = async (req, res) => {
  const product = await ProductModel.findOne({ slug: req.params.slug }).select("-photo").populate("category");
  if (!product) {
    return res.send({
      success: false,
      message: "Product not found"
    })
  }

  res.send({
    success: true,
    product
  })
}

// GET image 
export const getPhotoController = async (req, res) => {
  const product = await ProductModel.findById({ _id: req.params.pid }).select("photo");
  if (product.photo.data) {
    res.set("Content-type", product.photo.contentType);
    res.send(product.photo.data)
  }
}

// DELETE product
export const delteProductController = async (req, res) => {
  const updatedResult = await ProductModel.findByIdAndDelete(req.params.id);
  res.send({
    success: true,
    message: "Product deleted succesfully",
    updatedResult
  })
}

// Update product
export const updateProductController = async (req, res) => {
  try {
    const { name, description, price, quantity, shipping, category } = req.fields;
    const { photo } = req.files;

    // if (!name || !description || !price || !category || !quantity || !shipping) {
    //   return res.status(422).send({
    //     success: false,
    //     message: "Insufficient information to create product",
    //   })
    // }

    // We can also use spread operator to create new record
    const newProduct = await ProductModel.findByIdAndUpdate(req.params.id, { ...req.fields, slug: slugify(name) }, { new: true });

    if (photo) {
      newProduct.photo.data = fs.readFileSync(photo.path);
      newProduct.photo.contentType = photo.type;
    }

    // console.log("After photo");
    const result = await newProduct.save();

    return res.status(201).send(result.select("-photo"))
  }
  catch (error) {
    return res.status(501).send({
      success: false,
      message: "Internal Server Error",
      error
    })
  }
}

// Filter product 
export const filterProductController = async (req, res) => {
  try {
    const { checked, radio } = req.body;
    if (checked.length) console.log(checked);
    if (radio.length) console.log(radio);
    let args = {};
    if (checked.length > 0) args.category = checked;
    if (radio.length) args.price = { $lte: radio[1], $gte: radio[0] };

    const products = await ProductModel.find(args);

    res.status(200).send({
      success: true,
      products
    })
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error while filtering",
      error
    })
  }

}

// Count total no. products
export const productCountController = async (req, res) => {
  try {
    const total = await ProductModel.find({}).estimatedDocumentCount();

    res.send({
      message: `Total Count ${total}`,
      total
    })
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error while counting",
      error
    })
  }
}

// Return per page products
export const productListController = async (req, res) => {
  try {
    const perPage = 3;
    const page = parseInt(req.params.page);

    const products = await ProductModel.find({})
      .select("-photo")
      .skip((page - 1) * perPage)
      .limit(perPage)  // 0 argument means no limit
      .sort({ createdAt: -1 });

    res.send({
      message: `products for page ${page}`,
      success: true,
      products
    })
  } catch (error) {
    console.log(error);
    res.send({
      message: "Error while fetching",
      error
    })
  }
}

// search product based on keywords
export const serachProducts = async (req, res) => {
  try {
    const { keywords } = req.params;

    const result = await ProductModel.find({
      $or: [
        { name: { $regex: keywords, $options: 'i' } },
        { description: { $regex: keywords, $options: 'i' } },
      ]
    });

    res.send({
      success: true,
      message: "Products fetched",
      result
    })
  } catch (error) {
    console.log(error);
    res.send({
      success: false,
      message: "Internal server error",
      error
    })
  }
}

// Similiar products
export const getRelatedProducts = async (req, res) => {
  try {
    const { pid, cid } = req.params;

    const products = await ProductModel.find({
      category: cid,
      _id: { $ne: pid }
    }).select("-photo").limit(3).populate("category")

    res.send({
      success: true,
      products
    })
  } catch (error) {
    console.log(error);
    res.send({
      success: false,
      error
    })
  }
}

// Category wise products 
export const getProductCategorywise = async (req, res) => {
  try {
    const category = await CategoryModel.find({ slug: req.params.slug })
    const products = await ProductModel.find({category}).select("-photo").populate("category");

    res.status(200).send({
      success: true,
      products
    })
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Internal server error",
      error
    })
  }
}