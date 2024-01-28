import CategoryModel from "../models/CategoryModel.js";
import slugify from "slugify";

// Create
export const CreateCategory = async (req, res) => {
    const { name } = req.body;

    if (!name) {
        return res.send({ success: false, message: "Provide the valid name for category" });
    }

    const existing = await CategoryModel.findOne({ name });
    if (existing) {
        return res.send({ success: false, message: "Category already exists" });
    }

    const category = new CategoryModel({ name, slug: slugify(name) }).save();

    return res.send({ success: true, message: "Category created succesfully" });
}

// Read - All Categories
export const getCategoriesController = async (req, res) => {
    const categories = await CategoryModel.find();
    return res.send(categories);
}

// Get Single category
export const singleCategory = async(req, res) => {
    const category = await CategoryModel.findOne({slug:req.params.slug});
    return res.status(200).send({success:true, category});
    
}

// Update
export const modifyCategoryController = async (req, res) => {
    try {
        const { name } = req.body;
        const { id } = req.params;

        if (!name) {
            return res.send({ success: false, message: "Provide Valid category name" });
        }
        const category = await CategoryModel.findById({ _id: id });

        // If category does not exists
        if (!category) {
            return res.send({ success: false, message: "No category exist with this name" });
        }

        const updatedCategory = await CategoryModel.findByIdAndUpdate({ _id: category._id }, { name, slug: slugify(name) }, { new: true });
        return res.send({ success: true, updatedCategory });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ success: false, message: "Some Internal error" });
    }
}

// Delete
export const deleteCategoryController = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await CategoryModel.findOne({ _id: id });

        // If category does not exists
        if (!category) {
            return res.send({ success: false, message: "No category exist with this name" });
        }

        const updatedCategory = await CategoryModel.findByIdAndDelete({ _id: category._id }, { new: true });
        return res.send({ success: true, updatedCategory });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ success: false, message: "Some Internal error" });
    }
}