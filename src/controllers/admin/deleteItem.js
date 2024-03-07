const pool = require('../../database/connectionPool');
exports.deleteGroceryItem = (req, res) => {
    const itemId = parseInt(req.params.itemId);

    pool.query('UPDATE item SET isDeleted = true WHERE itemId = ?',  itemId, (err, result) => {
        if (err) {
            console.error('Error updating grocery item: ', err.stack);
            res.status(500).json({ error: 'Failed to deleted grocery item' });
            return;
        }

        if (result.affectedRows === 0) {
            res.status(404).json({ error: 'Grocery item not found' });
            return;
        }

        console.log('Grocery item deleted successfully');
        res.status(200).json({ message: 'Grocery item deleted successfully', data: { id: itemId} });
    });
};
