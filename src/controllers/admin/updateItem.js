const pool = require('../../database/connectionPool');
exports.updateGroceryItem = (req, res) => {
    const itemId = parseInt(req.params.itemId);
    const { name, price, quantity } = req.body;

    pool.query('UPDATE item SET name = ?, price = ?, quantity = ? WHERE itemId = ?', [name, price, quantity, itemId], (err, result) => {
        if (err) {
            console.error('Error updating grocery item: ', err.stack);
            res.status(500).json({ error: 'Failed to update grocery item' });
            return;
        }

        if (result.affectedRows === 0) {
            res.status(404).json({ error: 'Grocery item not found' });
            return;
        }

        console.log('Grocery item updated successfully');
        res.status(200).json({ message: 'Grocery item updated successfully', data: { id: itemId, name, price, quantity } });
    });
};