let express = require("express");
let router = express.Router();
let product_controller = require("../Controller/ProductController");

router.get('/read', product_controller.read);
router.post('/create', product_controller.create);
router.put('/update', product_controller.update);
router.delete('/delete', product_controller.delete);


module.exports = router;