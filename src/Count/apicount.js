const { Router } = require('express');
const router = new Router();
const connect = require('../../modules/dbconect');
const { connectToDatabase } = require('../../modules/mongoconect');
router.get('/', async (req, res) => {
    let clientCount = 0;

    try {
        const db = await connectToDatabase();
        const countQuery = 'SELECT COUNT(*) AS count FROM clients WHERE role = ?';
        const countResults = await new Promise((resolve, reject) => {
            connect.query(countQuery, ['client'], (err, results) => {
                if (err) return reject(err);
                resolve(results[0].count);
            });
        });
        clientCount = countResults;
        const countreserv = await db.collection("reservations").find({}).toArray();

        const reservation = await db.collection("reservations")
            .find({})
            .sort({ $natural: -1 })
            .limit(1)
            .toArray();
        if(reservation.length === 0){
            reservation.date = "None";
            reservation.hall = "None" ;
        } 
        res.status(200).json({
            clientCount,
            "reservcount": countreserv.length,
            "datereserv": reservation.date,
            "hallreserv": reservation.hall
        });
    } catch (error) {
        res.status(500).json("error: " + error);
    }
});

module.exports = router;