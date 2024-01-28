import ProductModel from '../models/ProductModel.js';
import fs from 'fs';
import slugify from 'slugify';

// Create a new product
export const createProductController = async (req, res) => {
  console.log("in Controller");
  try {
    const { name, description, price, quantity, shipping, category } = req.fields;
    const { photo } = req.files;

    // if (!name || !description || !price || !category || !quantity || !shipping ) {
    //   return res.status(422).send({
    //     success: false,
    //     message: "Insufficient information to create product",
    //     req.fields
    //   })
    // }

    // We can also use spread operator to create new record
    const newProduct = await new ProductModel({
      name,
      slug: slugify(name),
      description,
      price: parseFloat(price),
      quantity: parseInt(quantity),
      category,
      shipping: shipping === 'true',
    });

    if (photo) {
      newProduct.photo.data = fs.readFileSync(photo.path);
      newProduct.photo.contentType = photo.type;
    }

    console.log("After photo");
    const result = await newProduct.save();

    return res.status(201).send({
      success: true,
      message: "Product created succesfully",
      result
    })
  }
  catch (error) {
    return res.status(501).send({
      success: false,
      message: "Internal Server Error",
      error
    })
  }
}
