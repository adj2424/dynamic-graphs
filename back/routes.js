const express = require('express');
const router = express.Router();
const ObjectId = require('mongodb').ObjectId;
const Data = require('./model');

//get all data
router.get('/', async (req, res) => {
  try {
    const data = await Data.find();
    res.status(200).send(data);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

//creats new data if it doesn't exist
router.get('/new', async (req, res) => {
  try {
    const data = await Data.findOne({ _id: ObjectId('6391461e5929a669e30a0317') });
    if (data === null) {
      console.log('creating data');
      const newData = new Data({
        _id: ObjectId('6391461e5929a669e30a0317'),
        title: 'title',
        data: [1, 2, 3]
      });
      await Data.create(newData);
      res.status(200).send('200');
    } else {
      res.status(200).send('200');
    }
  } catch (e) {
    console.log(e);
  }
});

// update data with new data
router.patch('/update', async (req, res) => {
  try {
    await Data.updateOne(
      { _id: ObjectId('6391461e5929a669e30a0317') },
      { $set: { title: req.body.title, data: req.body.data } }
    );
    res.status(200).send('200');
  } catch (e) {
    console.log(e);
  }
});
module.exports = router;
