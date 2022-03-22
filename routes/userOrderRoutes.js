const express = require('express');
const router = express.Router();
const {
  getOrderById,
  getOrderByUser,
  addOrder,
  closeOrder
  
} = require('../controller/userOrderController');

//closr a order
router.post('/closebill', closeOrder);
//add a order
router.post('/add', addOrder);

//get a order by id
router.get('/:id', getOrderById);

//get all order by a user
router.get('/', getOrderByUser);

module.exports = router;
