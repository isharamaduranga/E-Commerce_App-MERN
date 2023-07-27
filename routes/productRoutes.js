import express from "express";
import {isAdmin, requireSignIn} from "../middlewares/authMiddleware.js";
import {
    braintreePaymentController,
    braintreeTokenController,
    createProductController,
    deleteProductController,
    getProductController,
    getSingleProductController, productCategoryController,
    productCountController,
    productFilterController,
    productListController,
    productPhotoController, relatedProductController, searchProductController,
    updateProductController
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

/** Product Count */
router.get('/product-count', productCountController)

/** Product List on page */
router.get('/product-list/:page', productListController)

/** Search product */
router.get('/search/:keyword', searchProductController)

/** Similar product */
router.get('/related-product/:pid/:cid', relatedProductController)

/** Category vise product */
router.get('/product-category/:slug', productCategoryController)

/** Payment Route */
//token
router.get('/braintree/token', braintreeTokenController)

//payment
router.post('/braintree/payment', requireSignIn,braintreePaymentController)


export default router;