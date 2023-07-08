
import categoryModel from "../models/categoryModel.js";
import slugify from "slugify";

/** Create a category */
export const createCategoryController = async (req, res) => {

    try {
        const {name} = req.body;

        if (!name){
           return  res.status(401).send({message:'Name is required'})
        }
        //Check
        const existingCategory = await categoryModel.findOne({name})

        if (existingCategory) {
            return  res.status(200).send({
                success:true,
                message:'Category Already Exists !!'
            })
        }

        const category = await  new categoryModel({name,slug:slugify(name)}).save()
        res.status(200).send({
            success:true,
            message:"Created New Category ...",
            category
        })


    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Something went wrong in Category !!!",
            error,
        });
    }
}

/** Update a category */
export const updateCategoryController = async (req,res) => {
    try {
        const {name} = req.body;
        const {id} = req.params;
        const category = await categoryModel.findByIdAndUpdate(id,
            {name,slug:slugify(name)},
            {new: true}
        );
        res.status(200).send({
            success:true,
            message:'Category Updated Successfully',
            category,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            error,
            message:"Something went wrong in Update Category !!!",
        });
    }
}

/** Get all category */
export const categoryController = async (req,res) =>{
    try {
        const category = await  categoryModel.find({})
        res.status(200).send({
            success:true,
            message:'All Category List',
            category,
        })

    }catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Something went wrong in Getting Category !!!",
            error,
        });
    }
}

/** Get Single category */
export const singleCategoryController = async (req,res) =>{
    try {
        const category = await  categoryModel.findOne({slug:req.params.slug})
        res.status(200).send({
            success:true,
            message:'Get Single Category Successfully',
            category,
        })

    }catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Something went wrong in Getting Single Category !!!",
            error,
        });
    }
}

/**  Delete category */
export const deleteCategoryController = async (req,res) =>{
    try {
        const {id} = req.params;

        const category = await  categoryModel.findByIdAndDelete(id)
        res.status(200).send({
            success:true,
            message:'Category Deleted Successfully',
            category,
        })

    }catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Something went wrong in Delete Category !!!",
            error,
        });
    }
}