const express = require('express');
const router = express.Router();
const Places = require('../models/places');

module.exports = function() {

  /* Get places listings */
  router.get('/read', async (req, res) => {
    try {
      let directory_list = await Places.find({});
      res.send(directory_list);
    } catch ( err ) {
      return res.status(500).send(err);
    }
  });

  /* Create an place entry */
  router.post("/create", async ( req, res ) => {
    const { name, date, startTime, endTime, userId } = req.body;
      let places = new Places({
        name,
        date,
        startTime,
        endTime,
        userId,
      });
      try{
        await places.save();
        res.send({ response: 'success'});
      } catch (err){
        res.send({ response: err });
      }
  });

  /* Get a listing by a place id */
  router.get('/readbyid/', async ( req, res ) => {
     try {
       let record = await Places.findOne({ _id: req.query.id });
       res.send(record);
     } catch ( err ) {
       return res.status(500).send(err);
     }
  });
     
  /* Update an place entry */
  router.put('/update', async ( req, res ) => {
      try {
        let places = await Places.findOneAndUpdate({ _id: req.body.id }, req.body, { new: true });
        res.send({ response: 'success' });
      } catch (err) {
        res.send({ response: err });
      }
  });

  /* Delete place entry */
  router.delete('/delete', async (req, res) => {
      try {
        await Places.findOneAndRemove({ _id: req.query.entryid });
        return res.send({ response: 'success' });
      } catch (err) {
        return res.send({ response: err });
      }
  });

  return router;

};