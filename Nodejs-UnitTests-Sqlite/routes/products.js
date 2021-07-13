const router = require('express').Router();
const controller = require('../controllers/products');


router.get("/api/products", controller.get_products)
router.post("/api/products", controller.add_product)
router.patch("/api/products/:id", controller.patch_product)
router.put("/api/products/:id", controller.edit_product)
router.delete("/api/products/:id", controller.delete_product)
// router.get("/api/products/:id", controller.get_product)

module.exports = router;
router.get("/recipes/shoppinglist?ids", controller.list)
