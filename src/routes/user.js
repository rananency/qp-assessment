const express = require('express');
const router = express.Router();
const {getGroceryAvailableItem} = require("../controllers/user/viewAvailableItems");
const {order} = require("../controllers/user/order");

router.get('/items', getGroceryAvailableItem);
router.post('/order/:userId', order);

module.exports = router;
