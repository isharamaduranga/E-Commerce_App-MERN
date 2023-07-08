import productModel from "../models/productModel.js";
import fs from 'fs';
import slugify from "slugify";
import categoryModel from "../models/categoryModel.js";


/** Create a category */
export const createProductController = async (req, res) => {

    try {
        const{name,slug,description,price,category,quantity,shipping} = req.fields
        const{photo}= req.files


        //Validation
        switch (true) {

            case !name:
               return  res.status(500).send({error:'Name is Required !'})
            case !description:
               return  res.status(500).send({error:'Description is Required !'})
            case !price:
               return  res.status(500).send({error:'Price is Required !'})
            case !category:
               return  res.status(500).send({error:'Category is Required !'})
            case !quantity:
               return  res.status(500).send({error:'Quantity is Required !'})
            case !photo && photo.size > 1000000:
               return  res.status(500).
               send({error:'Photo is Required and should be less than 1mb !'});
        }

        const products = new productModel({...req.fields,slug:slugify(name)})

        if (photo) {
            products.photo.data = fs.readFileSync(photo.path)
            products.photo.contentType = photo.type
        }
        await products.save()
        res.status(200).send({
            success:true,
            message:'product added successfully ...',
            products
        })


    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Something went wrong in Product !!!",
            error,
        });
    }
}

/** Get all PRODUCTS */
export const getProductController = async (req,res) =>{
    try {
        const products = await  productModel
            .find({})
            .populate('category')
            .select("-photo")
            .limit(12)
            .sort({createdAt:-1})

        res.status(200).send({
            success:true,
            countTotal :products.length,
            message:'All Product List',
            products,
        });

    }catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Something went wrong in Getting Products !!!",
            error,
        });
    }
}

/** Get Single product */
export const getSingleProductController = async (req,res) =>{
    try {
        const product = await  productModel
            .findOne({slug:req.params.slug})
            .select("-photo")
            .populate('category');

        res.status(200).send({
            success:true,
            message:'Get Single Product Successfully',
            product,
        })

    }catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Something went wrong in Getting Single product !!!",
            error,
        });
    }
}

/** Get photo */
export const productPhotoController = async (req,res) => {
    try {
       const product = await  productModel.findById(req.params.pid).select("photo");
        if (product.photo.data) {
            res.set('Content-type',product.photo.contentType)
            res.status(200).send(
                product.photo.data
            );
        }

    }catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Something went wrong in Getting Photo !!!",
            error,
        });
    }
}

/**  Delete product */
export const deleteProductController = async (req,res) =>{
    try {
        const product = await  productModel.findByIdAndDelete(req.params.pid).select("-photo")
        res.status(200).send({
            success:true,
            message:'product Deleted Successfully',
            product,
        })

    }catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Something went wrong in Delete Product !!!",
            error,
        });
    }
}

/** Update a product */
export const updateProductController = async (req,res) => {
    try {
        const{name,slug,description,price,category,quantity,shipping} = req.fields
        const{photo}= req.files


        //Validation
        switch (true) {

            case !name:
                return  res.status(500).send({error:'Name is Required !'})
            case !description:
                return  res.status(500).send({error:'Description is Required !'})
            case !price:
                return  res.status(500).send({error:'Price is Required !'})
            case !category:
                return  res.status(500).send({error:'Category is Required !'})
            case !quantity:
                return  res.status(500).send({error:'Quantity is Required !'})
            case !photo && photo.size > 1000000:
                return  res.status(500).
                send({error:'Photo is Required and should be less than 1mb !'});
        }

        const products = await productModel.findByIdAndUpdate(req.params.pid,
            {...req.fields,slug:slugify(name)},{new:true})

        if (photo) {
            products.photo.data = fs.readFileSync(photo.path)
            products.photo.contentType = photo.type
        }
        await products.save()
        res.status(200).send({
            success:true,
            message:'product Updated successfully ...',
            products
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Something went wrong in Update Product !!!",
            error,
        });
    }
}