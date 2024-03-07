const express = require('express');
const router = express.Router();
const {addGroceryItem} = require("../controllers/admin/addAdmin");
const {getGroceryItem} = require("../controllers/admin/viewAllItem");
const {updateGroceryItem} = require("../controllers/admin/updateItem");
const {deleteGroceryItem} = require("../controllers/admin/deleteItem");
const {updateItemQuantity} = require("../controllers/admin/updateItemQuantity");

router.post('/items', addGroceryItem);

router.get('/', getGroceryItem);

router.put('/items/:itemId', updateGroceryItem);

router.delete('/items/:itemId', deleteGroceryItem);

router.patch('/items/:itemId/quantity', updateItemQuantity);

module.exports = router;
