const { Router } = require('express');
const router = new Router();
const { connectToDatabase } = require('../../modules/mongoconect');
const connect = require('../../modules/dbconect');
router.get('/:item_valueid', async (req, res) => {
    const { item_valueid } = req.params;
    let clientCount = 0;
    try {
        const db = await connectToDatabase();
        const countreserv = await db.collection("reservations").find({idclient: item_valueid}).toArray();

        const reservation = await db.collection("reservations")
            .find({idclient: item_valueid})
            .sort({ $natural: -1 })
            .limit(1)
            .toArray();
        if(reservation.length === 0){
            reservation.date = "NONE";
            reservation.hall = "NONE";
            reservation.time = "NONE"
        } 
        res.status(200).json({
            clientCount,
            "reservcount": countreserv.length,
            "datereserv": reservation[0].date,
            "hallreserv": reservation[0].hall,
            "hourreserv": reservation[0].time
        });
    } catch (error) {
        console.log("error " + error);
        res.status(500).json("error: " + error);
    }
});

module.exports = router;