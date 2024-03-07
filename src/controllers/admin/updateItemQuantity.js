const pool = require('../../database/connectionPool');
exports.updateItemQuantity = (req, res)=>{
    const itemId = parseInt(req.params.itemId);
    const { action, quantity } = req.body;

    pool.query('SELECT * FROM item WHERE itemId = ? and isDeleted=0', itemId, (err, rows) => {
        if (err) {
            console.error('Error finding grocery item: ', err.stack);
            res.status(500).json({ error: 'Failed to find grocery item' });
            return;
        }

        if (rows.length === 0) {
            res.status(404).json({ error: 'Grocery item not found' });
            return;
        }

        let currentQuantity = rows[0].quantity;

        if (action === 'increase') {
            currentQuantity += quantity;
        } else if (action === 'decrease') {
            if (currentQuantity >= quantity) {
                currentQuantity -= quantity;
            } else {
                res.status(400).json({ error: 'Insufficient quantity to decrease' });
                return;
            }
        } else {
            res.status(400).json({ error: 'Invalid action' });
            return;
        }

        pool.query('UPDATE item SET quantity = ? WHERE Itemid = ?', [currentQuantity, itemId], (err, result) => {
            if (err) {
                console.error('Error updating quantity: ', err.stack);
                res.status(500).json({ error: 'Failed to update quantity' });
                return;
            }

            console.log('Quantity updated successfully');
            res.status(200).json({ message: 'Quantity updated successfully', data: { itemId, quantity: currentQuantity } });
        });
    });

};