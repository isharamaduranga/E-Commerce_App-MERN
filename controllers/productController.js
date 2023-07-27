import productModel from "../models/productModel.js";
import categoryModel from "../models/categoryModel.js";
import orderModel from "../models/orderModel.js";
import fs from 'fs';
import slugify from "slugify";
import braintree from 'braintree';

import dotenv from "dotenv";

dotenv.config();

/** payment gateway */
var gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: process.env.BRAINTREE_MERCHANT_ID,
    publicKey: process.env.BRAINTREE_PUBLIC_KEY,
    privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});


/** Create a category */
export const createProductController = async (req, res) => {

    try {
        const{name,description,price,category,quantity,shipping} = req.fields
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
            case photo && photo.size > 1000000:
               return  res.status(500).send({error:'Photo is Required and should be less than 1mb !'});
        }

        const products = new productModel({...req.fields,slug:slugify(name)})

        if (photo) {
            products.photo.data = fs.readFileSync(photo.path)
            products.photo.contentType = photo.type
        }
        await products.save();
        res.status(201).send({
            success:true,
            message:'product added successfully ...',
            products,
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
            error: error.message,
        });
    }
}

/** Get Single product */
export const getSingleProductController = async (req,res) =>{
    try {
        const product = await  productModel
            .findOne({slug:req.params.slug})
            .select("-photo")
            .populate("category");
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
            res.set('Content-type',product.photo.contentType);
            return res.status(200).send(product.photo.data);
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
        const {name,description,price,category,quantity,shipping} = req.fields;
        const {photo} = req.files;


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
            case photo && photo.size > 1000000:
                return  res
                    .status(500)
                    .send({error:'Photo is Required and should be less than 1mb !'});
        }

        const products = await productModel.findByIdAndUpdate(
            req.params.pid,
            {...req.fields,slug:slugify(name)},
            {new:true}
        );

        if (photo) {
            products.photo.data = fs.readFileSync(photo.path);
            products.photo.contentType = photo.type;
        }
        await products.save()
        res.status(201).send({
            success:true,
            message:'product Updated successfully ...',
            products,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Something went wrong in Update Product !!!",

        });
    }
}

/**  Product Filters */
export const productFilterController = async (req,res) => {
    try {
        const{checked,radio} = req.body;
        let args = {};
            if(checked.length > 0) args.category = checked;
            if(radio.length) args.price = {$gte: radio[0] , $lte: radio[1]};
            const products = await  productModel.find(args);

        res.status(200).send({
            success:true,
            products,
        });

    }catch (error) {
        console.log(error)
        res.status(400).send({
            success:false,
            message:"Something went wrong in Filtering Product !!!",
            error,
        });
    }
};

/** Product Count */
export const productCountController = async (req,res)=>{
    try {

        const total = await productModel.find({}).estimatedDocumentCount();
        res.status(200).send({
            success:true,
            total,
        });
    }catch (error) {
        console.log(error)
        res.status(400).send({
            success:false,
            message:"Something went wrong in Product Count !!!",
            error,
        });
    }
}
/** Product List on page */
export const productListController = async (req,res)=>{
    try {
    const perPage = 4
    const page = req.params.page ? req.params.page : 1;
    const products =
        await productModel.find({})
            .select("-photo")
            .skip((page - 1) * perPage)
            .limit(perPage)
            .sort({createdAt:-1})

        res.status(200).send({
            success:true,
            products,
        });

    }catch (error) {
        console.log(error)
        res.status(400).send({
            success:false,
            message:"Something went wrong in Product List !!!",
            error,
        });
    }
}

export const searchProductController = async (req,res) => {
    try {
        const { keyword } = req.params;
        const results = await productModel.find({
            $or:[
                {
                    name:{$regex:keyword , $options:"i" }
                },
                {
                    description:{$regex:keyword , $options:"i" }
                }
            ]
        }).select("-photo");
        res.json(results)

    }catch (error) {
        console.log(error)
        res.status(400).send({
            success:false,
            message:"Something went wrong in Product Search !!!",
            error,
        });
    }
}

export const relatedProductController = async (req,res) => {
    try {
        const { pid,cid } = req.params;

        const products = await productModel
            .find({category: cid, _id:{$ne:pid}})
            .select("-photo")
            .limit(3)
            .populate("category")

        res.status(200).send({
            success:true,
            products
        })

    }catch (error) {
        console.log(error)
        res.status(400).send({
            success:false,
            message:"Something went wrong in Related Product !!!",
            error,
        });
    }
}

export const productCategoryController = async (req,res) => {
    try {
        const category = await categoryModel.findOne({slug: req.params.slug})
        const products = await productModel.find({category}).populate('category')

        res.status(200).send({
            success:true,
            category,
            products,
        })

    }catch (error) {
        console.log(error)
        res.status(400).send({
            success:false,
            message:"Something went wrong in Product Category !!!",
            error,
        });
    }
}

/** payment gateway apis */

//token
export const braintreeTokenController = async (req,res) =>{
    try {
        gateway.clientToken.generate({}, function (err, response) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.send(response);
            }
        });
    } catch (error) {
        console.log(error);
    }
};

//payment
export const braintreePaymentController = async (req,res) =>{
    try {
        const { nonce, cart } = req.body;
        let total = 0;
        cart.map((i) => {
            total += i.price;
        });
        let newTransaction = gateway.transaction.sale(
            {
                amount: total,
                paymentMethodNonce: nonce,
                options: {
                    submitForSettlement: true,
                },
            },
            function (error, result) {
                if (result) {
                    const order = new orderModel({
                        products: cart,
                        payment: result,
                        buyer: req.user._id,
                    }).save();
                    res.json({ ok: true });
                } else {
                    res.status(500).send(error);
                }
            }
        );
    } catch (error) {
        console.log(error);
    }
}