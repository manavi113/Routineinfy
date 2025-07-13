 

 
const express = require('express');
const router = express.Router();
const Home = require('../model/Home');

 
router.get('/weather/:type', async (req, res) => {
    const { type } = req.params;
    try {
        const tips = await Home.find({ 
            $or: [
                { weatherType: type }, 
                { weatherType: 'any' }
            ] 
        });
        res.json(tips);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching tips' });
    }
});

module.exports = router;
