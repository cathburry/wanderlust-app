const express = require('express');
const router = express.Router();
const Shifts = require('../models/shifts');

module.exports = function() {

  /* Get shifts listings */
  router.get('/read', async (req, res) => {
    try {
      let directory_list = await Shifts.find({});
      res.send(directory_list);
    } catch ( err ) {
      return res.status(500).send(err);
    }
  });

  /* Create an shift entry */
  router.post("/create", async ( req, res ) => {
    const { name, date, startTime, endTime, userId, address } = req.body;
      let shifts = new Shifts({
        name,
        date,
        startTime,
        endTime,
        userId,
        address,
      });
      try{
        await shifts.save();
        res.send({ response: 'success'});
      } catch (err){
        res.send({ response: err });
      }
  });

  /* Get a listing by a shift id */
  router.get('/readbyid/', async ( req, res ) => {
     try {
       let record = await Shifts.findOne({ _id: req.query.id });
       res.send(record);
     } catch ( err ) {
       return res.status(500).send(err);
     }
  });
     
  /* Update an shift entry */
  router.put('/update', async ( req, res ) => {
      try {
        let shifts = await Shifts.findOneAndUpdate({ _id: req.body.id }, req.body, { new: true });
        res.send({ response: 'success' });
      } catch (err) {
        res.send({ response: err });
      }
  });

  /* Delete shift entry */
  router.delete('/delete', async (req, res) => {
      try {
        await Shifts.findOneAndRemove({ _id: req.query.entryid });
        return res.send({ response: 'success' });
      } catch (err) {
        return res.send({ response: err });
      }
  });

  return router;

};