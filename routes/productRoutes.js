import express from "express";
import {isAdmin, requireSignIn} from "../middlewares/authMiddleware.js";
import {
    createProductController,
    deleteProductController,
    getProductController,
    getSingleProductController, productFilterController,
    productPhotoController, updateProductController
} from "../controllers/productController.js";
import formidable from 'express-formidable'

//router object
const router = express.Router();

/**  Routes  */

/**  Create Product  */
router.post(
    "/create-product",
    requireSignIn,
    isAdmin,
    formidable(),
    createProductController
);

/**  Update Product  */
router.put(
    "/update-product/:pid",
    requireSignIn,
    isAdmin,
    formidable(),
    updateProductController
);

/**  Get All products  */
router.get('/get-product', getProductController)

/**  Get Single products  */
router.get('/get-product/:slug', getSingleProductController)

/** get photo */
router.get('/product-photo/:pid', productPhotoController);

/**  Delete Category  */
router.delete('/delete-product/:pid', deleteProductController)

/** Filter Product */
router.post('/product-filters', productFilterController)

export default router;