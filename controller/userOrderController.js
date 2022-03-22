const Order = require('../models/Order');

const fetch = require('isomorphic-unfetch')
const { handleProductQuantity } = require('../config/others');

const serviceUrl = process.env.COINPOS_URL;

const removeFromCoinPOSCart = async(req,res) => {
  try
  {
    
    await fetch(constants.serviceUrl + 'DeleteOrderDetail',//fetch('http://localhost:5002/simple-cors3', 
    { 
      method:'POST',
      //credentials:"include",
      headers: {'Content-Type': 'application/json','x-security-lock':'0241CCFF2D40AF7AF8A4FC02272C47A30D15DBDFB36E3266D1296212574F328E'},
      body:`{"OrderId": ${orderId}, "ProductVariantId":${productVariantId},"LineUserId":"${this.state.linePOSId}","LiffId":"${this.state.liffId}","PictureUrl":"${this.state.pictureUrl}"}`
      }).then(function(response) {
        return response.text();
      }).then(function(data) {

      var obj = JSON.parse(data);
      console.log("Obj = " + obj);
      console.log(data); // this will be a string
      
    });
    
      res.send(productList);
  }
  catch (err) 
  {
    res.status(500).send({
      message: err.message,
    });
  }
};
const closeOrder = async(req,res) => 
{
  try
  {
    res.send("Close Bill");
    console.log(req.body);
    return;
    await fetch(serviceUrl + 'CloseBill',//fetch('http://localhost:5002/simple-cors3', 
    { 
      method:'POST',
      //credentials:"include",
      headers: {'Content-Type': 'application/json','x-security-lock':'0241CCFF2D40AF7AF8A4FC02272C47A30D15DBDFB36E3266D1296212574F328E'},
      body:`{"OrderId": ${req.body.orderId},"ShippingId":${req.body.shippingId},"ShippingName":"${req.body.shippingName}","ShippingFee":${req.body.shippingFee},"CompanyId":"${req.body.companyId}","LineUserId":"${req.body.linePOSId}","LiffId":"${req.body.liffId}","PictureUrl":"${req.body.pictureUrl}"}`
      }).then(function(response) {
        return response.text();
      }).then(function(data) {

      var obj = JSON.parse(data);
      console.log("Obj = " + obj);
      console.log(data); // this will be a string
      productList = obj;
    });
    
      res.send(productList);
  }
  catch (err) 
  {
    res.status(500).send({
      message: err.message,
    });
  }
};


const addOrder = async (req, res) => {
  //res.status(200).send(req.body);
  //return
  try {
    const newOrder = new Order({
      ...req.body,
      user: req.user._id,
    });
    const order = await newOrder.save();
    res.status(201).send(order);
    handleProductQuantity(order.cart);
  } catch (err) {
    console.log('Add Order Error = ' + err.message)
    res.status(200).send({
      message: err.message,
    });
  }
};

const getOrderByUser = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ _id: -1 });
    res.send(orders);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const getOrderById = async (req, res) => {
  try {
    res.send("Get Order = " + JSON.stringify(req.body));
    return;
    await fetch(serviceUrl + 'GetLiffOrder',//fetch('http://localhost:5002/simple-cors3', 
    { 
      method:'POST',
      //credentials:"include",
      headers: {'Content-Type': 'application/json','x-security-lock':'0241CCFF2D40AF7AF8A4FC02272C47A30D15DBDFB36E3266D1296212574F328E'},
      body:`{"OrderId": ${req.body.orderId},"CompanyId":"${req.body.companyId}","LocationId":"${req.body.locationId}","LineUserId":"${req.body.linePOSId}","LiffId":"${req.body.liffId}","PictureUrl":"${req.body.pictureUrl}"}`
      }).then(function(response) {
        return response.text();
      }).then(function(data) {

      //var obj = JSON.parse(data);
      //console.log("Obj = " + obj);
      //console.log(data); // this will be a string
      productList = data;
    });
    
      res.send(productList);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

module.exports = {
  addOrder,
  getOrderById,
  getOrderByUser,
  removeFromCoinPOSCart,
  closeOrder
  
};
