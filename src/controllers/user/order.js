const pool = require('../../database/connectionPool');

exports.order = (req, res) => {
    let orderId;
    const userId = parseInt(req.params.userId);

    pool.query('INSERT INTO `order` SET ?', { userId: userId }, (err, result) => {
        if (err) {
            console.error('Error inserting order: ', err.stack);
            res.status(500).json({ error: 'Failed to insert order' });
            return;
        }
        console.log('Order added successfully');
        orderId = result.insertId; 

        const orderDetail = req.body;
        const promises = orderDetail.map(order => {
            return new Promise((resolve, reject) => {
                const { itemId, quantity } = order;

                pool.query('SELECT * FROM item WHERE itemId = ? and isDeleted=0', itemId, (err, rows) => {
                    if (err) {
                        console.error('Error finding grocery item: ', err.stack);
                        reject('Failed to find grocery item');
                        return;
                    }

                    if (rows.length === 0) {
                        reject('Grocery item not found');
                        return;
                    }

                    const qty = rows[0].quantity - quantity;
                    const price = rows[0].price;

                    pool.query('UPDATE item SET quantity = ? WHERE Itemid = ?', [qty, itemId], (err, result) => {
                        if (err) {
                            console.error('Error updating quantity: ', err.stack);
                            reject('Failed to update quantity');
                            return;
                        }
                        console.log('Quantity updated successfully');
                        resolve(); 
                    });
                    pool.query('INSERT INTO `order_detail` SET ?', { orderId: orderId, itemId: itemId, quantity: quantity, totalAmount: price * quantity }, (err, result) => {
                        if (err) {
                            console.error('Error inserting order detail: ', err.stack);
                            reject('Failed to insert order detail');
                            return;
                        }
                        console.log('Order detail added successfully');
                        resolve();
                    });
                });
            });
        });
        
        Promise.all(promises)
            .then(() => {
                res.status(200).json({ message: 'Order added successfully' });
            })
            .catch(error => {
                res.status(500).json({ error: error });
            });
    });
};
