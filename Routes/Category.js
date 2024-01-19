import Express from "express";
import { fetchUser, isAdmin } from "../Middleware/authMiddleware";
import CategoryModel from "../models/CategoryModel";

const router = Express.Router();

router.post("/create-category", fetchUser, isAdmin, async(req,res) => {
    const {name} = req.body;

    if(!name){
        return res.send({success:false, message:"Provide the valid name for category"});
    }

    const existing  = await CategoryModel.findOne({name});
    if(existing){
        return res.send({success:false, message:"Category already exists"});
    }

    const category = new CategoryModel({name, slug:slugify(name)}).save();

    return res.send({success:true, message:"Category created succesfully"});
})

export default router;