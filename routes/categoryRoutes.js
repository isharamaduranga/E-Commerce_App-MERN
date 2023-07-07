import express from "express";
import {isAdmin, requireSignIn} from "../middlewares/authMiddleware.js";
import {
    categoryController,
    createCategoryController,
    deleteCategoryController,
    singleCategoryController,
    updateCategoryController
} from "../controllers/categoryController.js";


//router object
const router = express.Router();

/**  Routes  */

/**  Create Category  */
router.post(
    "/create-category",
    requireSignIn,
    isAdmin,
    createCategoryController);


/**  Update Category  */
router.put('/update-category/:id' , requireSignIn , isAdmin , updateCategoryController);

/**  Get All Category  */
router.get('/get-category' , categoryController)

/**  Get Single Category  */
router.get('/single-category/:slug' , singleCategoryController)

/**  Delete Category  */
router.delete('/delete-category/:id', requireSignIn,isAdmin, deleteCategoryController)


export default router;
