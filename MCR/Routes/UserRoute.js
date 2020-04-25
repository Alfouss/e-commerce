const express = require("express");
const router = express.Router()

const user_controller = require("../Controller/UserController");

router.get('/read',user_controller.read);
router.post('/create',user_controller.create);
router.put('/update',user_controller.update);
router.delete('/delete',user_controller.delete);
router.post('/verify',user_controller.verify);

module.exports = router;