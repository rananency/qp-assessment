const pool = require('../../database/connectionPool');

exports.addGroceryItem = (req, res) => {
    const { name, price, quantity } = req.body;

    if (!name || !price || !quantity) {
        res.status(400).json({ error: 'Please provide name, price, and quantity for the grocery item' });
        return;
    }
    
    const newItem = { name, price, quantity, isDeleted: false };
    pool.query('INSERT INTO item SET ?', newItem, (err, result) => {
        if (err) {
            console.error('Error creating order: ', err.stack);
            res.status(500).json({ error: 'Failed to create order' });
            return;
        }
        console.log('Order created successfully');
        newItem.orderId = result.insertId;
        res.status(201).json({ message: 'Order created successfully', data: newItem });
    });
};