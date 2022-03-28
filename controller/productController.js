const Product = require('../models/Product');

const Constant = require('../utils/constants');
const fetch = require('isomorphic-unfetch')
//const {fetch} = require('node-fetch');//import fetch from 'node-fetch';
//import Constant from '../utils.constants';
const serviceUrl = process.env.COINPOS_URL;

const addProduct = async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(200).send({
      message: 'Product Added Successfully!',
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const addAllProducts = async (req, res) => {
  try {
    await Product.deleteMany();
    await Product.insertMany(req.body);
    res.status(200).send({
      message: 'Product Added successfully!',
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};
const getCoinPOSCoupons = async (req, res) => {
  try
  {
    //res.send("Get CoinPOS Coupon");
    console.log(req.body);
    //return;
    await fetch(serviceUrl + 'GetLiffPromotion',//fetch('http://localhost:5002/simple-cors3', 
    { 
      method:'POST',
      //credentials:"include",
      headers: {'Content-Type': 'application/json','x-security-lock':'0241CCFF2D40AF7AF8A4FC02272C47A30D15DBDFB36E3266D1296212574F328E'},
      body:`{"CompanyId":${req.body.companyId}}`
      }).then(function(response) {
        return response.text();
      }).then(function(data) {

      //var obj = JSON.parse(data);
      //console.log("Obj = " + obj);
      console.log(data); // this will be a string
      productList = data;
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

const getShowingProducts = async (req, res) => {
  try {
    const products = await Product.find({ status: 'Show' }).sort({ _id: -1 });
    res.send(products);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};
const getStateProvince = async(req,res) => {
  try
  {
    var provinceData = ''
    //res.send("CoinPOS Cart");
    //console.log(req.body);
    //return;
    await fetch(serviceUrl + 'GetProvince',
    { 
      method:'POST',
      //credentials:"include",
      headers: {'Content-Type': 'application/json','x-security-lock':'0241CCFF2D40AF7AF8A4FC02272C47A30D15DBDFB36E3266D1296212574F328E'},
      body:``  
      }).then(function(response) {
        return response.text();
      }).then(function(data) {

      //var obj = JSON.parse(data);
      provinceData = (data);
    });
    
      res.send(provinceData);
  }
  catch (err) 
  {
    res.status(200).send({
      message: err.message,
    });
  }
};
const getCity = async(req,res) => {
  try
  {
    var cityData = ''
    //res.send("CoinPOS Cart");
    //console.log(req.body);
    //return;
    await fetch(serviceUrl + 'GetCity',
    { 
      method:'POST',
      //credentials:"include",
      headers: {'Content-Type': 'application/json','x-security-lock':'0241CCFF2D40AF7AF8A4FC02272C47A30D15DBDFB36E3266D1296212574F328E'},
      body: `{"StateId":"${req.body.stateId}"}`
      }).then(function(response) {
        return response.text();
      }).then(function(data) {

      var obj = JSON.parse(data);
      cityData = (obj.cityResponses);
    });
    
      res.send(cityData);
  }
  catch (err) 
  {
    res.status(200).send({
      message: err.message,
    });
  }
};
const getDistrict = async(req,res) => {
  try
  {
    var distrinctData = ''
    //res.send("CoinPOS Cart");
    //console.log(req.body);
    //return;
    await fetch(serviceUrl + 'GetDistrict',
    { 
      method:'POST',
      //credentials:"include",
      headers: {'Content-Type': 'application/json','x-security-lock':'0241CCFF2D40AF7AF8A4FC02272C47A30D15DBDFB36E3266D1296212574F328E'},
      body:`{"CityId": "${req.body.cityId}"}` 
      }).then(function(response) {
        return response.text();
      }).then(function(data) {

      var obj = JSON.parse(data);
      distrinctData = (obj.districtResponses);
    });
    
      res.send(distrinctData);
  }
  catch (err) 
  {
    res.status(200).send({
      message: err.message,
    });
  }
};
const getCountry = async(req,res) => {
  try
  {
    var countryData = ''
    //res.send("CoinPOS Country");
    //console.log(req.body);
    //return;
    await fetch(serviceUrl + 'GetCountry',
    { 
      method:'POST',
      //credentials:"include",
      headers: {'Content-Type': 'application/json','x-security-lock':'0241CCFF2D40AF7AF8A4FC02272C47A30D15DBDFB36E3266D1296212574F328E'},
      body:``  
      }).then(function(response) {
        return response.text();
      }).then(function(data) {

      //var obj = JSON.parse(data);
      //console.log("get country " + data);
      countryData = (data);
    });
    
      res.send(countryData);
  }
  catch (err) 
  {
    //console.log("Error " + err.message);
    res.status(200).send({
      message: err.message,
    });
  }
};
const applyPromotionCode = async(req,res) =>
{
  try
  {
    //res.send("Close Bill");
    //console.log(req.body);
    //return;
    await fetch(serviceUrl + 'ApplyPromotionCode',//fetch('http://localhost:5002/simple-cors3', 
    { 
      method:'POST',
      //credentials:"include",
      headers: {'Content-Type': 'application/json','x-security-lock':'0241CCFF2D40AF7AF8A4FC02272C47A30D15DBDFB36E3266D1296212574F328E'},
      body:`{"CompanyId":${req.body.companyId},"LocationId":${req.body.locationId},
      "OrderId":${req.body.orderId},
      "PromotionCode":"${req.body.qrPromotion}",
      "UserId":1,
      "LineUserId": "${req.body.lineUserId}",
      "LinePOSId":"${req.body.linePOSId}","LiffId":"${req.body.liffId}","PictureUrl":"${req.body.pictureUrl}",
      "CatalogName":"${req.body.catalogName}","OrderDetails":${req.body.orderDetails}}`
      }).then(function(response) {
        return response.text();
      }).then(function(data) {

      //var obj = JSON.parse(data);
      //console.log("Obj = " + obj);
      //console.log(data); // this will be a string
      productList = data;
    });
    
      res.send(productList);
  }
  catch (err) 
  {
    res.status(200).send({
      message: err.message,
    });
  }
};
const cancelPromotionCode = async(req,res) =>
{
  try
  {
    //res.send("Close Bill");
    //console.log(req.body);
    //return;
    await fetch(serviceUrl + 'ApplyPromotionCode',//fetch('http://localhost:5002/simple-cors3', 
    { 
      method:'POST',
      //credentials:"include",
      headers: {'Content-Type': 'application/json','x-security-lock':'0241CCFF2D40AF7AF8A4FC02272C47A30D15DBDFB36E3266D1296212574F328E'},
      body:`{"CompanyId":${req.body.companyId},"LocationId":${req.body.locationId},
      "OrderId":${req.body.orderId},
      "PromotionCode":"${req.body.qrPromotion}",
      "UserId":1,
      "LineUserId": "${req.body.lineUserId}",
      "LinePOSId":"${req.body.linePOSId}","LiffId":"${req.body.liffId}","PictureUrl":"${req.body.pictureUrl}",
      "CatalogName":"${req.body.catalogName}","OrderDetails":${req.body.orderDetails}}`
      }).then(function(response) {
        return response.text();
      }).then(function(data) {

      //var obj = JSON.parse(data);
      //console.log("Obj = " + obj);
      //console.log(data); // this will be a string
      productList = data;
    });
    
      res.send(productList);
  }
  catch (err) 
  {
    res.status(200).send({
      message: err.message,
    });
  }
};
const sendBankTransferPayment = async(req,res) =>
{
  try
  {
    //res.send("Close Bill");
    //console.log(req.body);
    //return;
    await fetch(serviceUrl + 'SendBankTransferPayment',//fetch('http://localhost:5002/simple-cors3', 
    { 
      method:'POST',
      //credentials:"include",
      headers: {'Content-Type': 'application/json','x-security-lock':'0241CCFF2D40AF7AF8A4FC02272C47A30D15DBDFB36E3266D1296212574F328E'},
      body:`{"OrderId": ${req.body.orderId},"LiffId":"${req.body.liffId}","LineUserId":"${req.body.lineUserId}","PictureUrl":"${req.body.pictureUrl}", "CompanyId":${req.body.companyId},"AccountName":"${req.body.accountName}","AccountNumber":"${req.body.accountNumber}", "TransferTime":"${req.body.transferTimeValue}"}`
      }).then(function(response) {
        return response.text();
      }).then(function(data) {

      //var obj = JSON.parse(data);
      //console.log("Obj = " + obj);
      //console.log(data); // this will be a string
      productList = data;
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
    //res.send("Close Bill");
    //console.log(req.body);
    //return;
    await fetch(serviceUrl + 'CloseBill',//fetch('http://localhost:5002/simple-cors3', 
    { 
      method:'POST',
      //credentials:"include",
      headers: {'Content-Type': 'application/json','x-security-lock':'0241CCFF2D40AF7AF8A4FC02272C47A30D15DBDFB36E3266D1296212574F328E'},
      body:`{"OrderId": ${req.body.orderId},"ShippingId":${req.body.shippingId},"ShippingName":"${req.body.shippingName}","ShippingFee":${req.body.shippingFee},"CompanyId":"${req.body.companyId}","LineUserId":"${req.body.linePOSId}","LiffId":"${req.body.liffId}","PictureUrl":"${req.body.pictureUrl}",
      "FirstName":"${req.body.firstName}","LastName":"${req.body.lastName}","Mobile":"${req.body.mobile}","Email":"${req.body.email}",
      "Address1":"${req.body.address1}","District":"${req.body.district}","Country":"${req.body.country}","City":"${req.body.city}","StateOrProvince":"${req.body.stateOrProvince}","PostalCode":"${req.body.postalCode}",
      "OrderDetails":${req.body.orderDetails},"CatalogName":"${req.body.catalogName}"}`
      }).then(function(response) {
        return response.text();
      }).then(function(data) {

      //var obj = JSON.parse(data);
      //console.log("Obj = " + obj);
      //console.log(data); // this will be a string
      productList = data;
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

const getOrderById = async (req, res) => {
  try {
    //console.log("Get Order = " + JSON.stringify(req.body));
    //res.send("Get Order = " + JSON.stringify(req.body));
    
    //return;
    await fetch(serviceUrl + 'GetShoppingCart',//fetch('http://localhost:5002/simple-cors3', 
    { 
      method:'POST',
      //credentials:"include",
      headers: {'Content-Type': 'application/json','x-security-lock':'0241CCFF2D40AF7AF8A4FC02272C47A30D15DBDFB36E3266D1296212574F328E'},
      body:`{"OrderId": ${req.body.orderId},"CompanyId":"${req.body.companyId}","LocationId":"${req.body.locationId}","UserId":"${req.body.lineUserId}","GroupId":"${req.body.groupId}","LinePOSId":"${req.body.linePOSId}","LiffId":"${req.body.liffId}","PictureUrl":"${req.body.pictureUrl}"}`
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
const getPayOrderById = async (req, res) => {
  try {
    //console.log("Get Order = " + JSON.stringify(req.body));
    //res.send("Get Order = " + JSON.stringify(req.body));
    
    //return;
    await fetch(serviceUrl + 'GetPayCart',//fetch('http://localhost:5002/simple-cors3', 
    { 
      method:'POST',
      //credentials:"include",
      headers: {'Content-Type': 'application/json','x-security-lock':'0241CCFF2D40AF7AF8A4FC02272C47A30D15DBDFB36E3266D1296212574F328E'},
      body:`{"OrderId": ${req.body.orderId},"CompanyId":"${req.body.companyId}","LocationId":"${req.body.locationId}","UserId":"${req.body.lineUserId}","GroupId":"${req.body.groupId}","LinePOSId":"${req.body.linePOSId}","LiffId":"${req.body.liffId}","PictureUrl":"${req.body.pictureUrl}","CatalogName":"${req.body.catalogName}"}`
      }).then(function(response) {
        return response.text();
      }).then(function(data) {

      //var obj = JSON.parse(data);
      console.log("Obj = " + data);
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
const getOrderByUserId = async (req, res) => {
  try {
    console.log("Get Order = " + JSON.stringify(req.body));
    //res.send("Get Order = " + JSON.stringify(req.body));
    
    //return;
    await fetch(serviceUrl + 'GetOrderByUserId',//fetch('http://localhost:5002/simple-cors3', 
    { 
      method:'POST',
      //credentials:"include",
      headers: {'Content-Type': 'application/json','x-security-lock':'0241CCFF2D40AF7AF8A4FC02272C47A30D15DBDFB36E3266D1296212574F328E'},
      body:`{"CompanyId":"${req.body.companyId}","LineUserId":"${req.body.lineUserId}","LinePOSId":"${req.body.linePOSId}","LiffId":"${req.body.liffId}","Page":${req.body.page},"RowPerPage":${req.body.rowPerPage},"CatalogName":"${req.body.catalogName}","Email":"${req.body.email}"}`
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
const getDashboardOrderByUserId = async (req, res) => {
  try {
    console.log("Get Order = " + JSON.stringify(req.body));
    //res.send("Get Order = " + JSON.stringify(req.body));
    
    //return;
    await fetch(serviceUrl + 'GetDashboardOrderByUserId',//fetch('http://localhost:5002/simple-cors3', 
    { 
      method:'POST',
      //credentials:"include",
      headers: {'Content-Type': 'application/json','x-security-lock':'0241CCFF2D40AF7AF8A4FC02272C47A30D15DBDFB36E3266D1296212574F328E'},
      body:`{"CompanyId":"${req.body.companyId}","LineUserId":"${req.body.lineUserId}","LinePOSId":"${req.body.linePOSId}","LiffId":"${req.body.liffId}","Page":0,"RowPerPage":0,"CatalogName":"${req.body.catalogName}","Email":"${req.body.email}"}`
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
const getCoinPOSCart = async(req,res) => {
  try
  {
    //res.send("CoinPOS Cart");
    //console.log(req.body);
    //return;
    await fetch(serviceUrl + 'GetLiffOrder',//fetch('http://localhost:5002/simple-cors3', 
    { 
      method:'POST',
      //credentials:"include",
      headers: {'Content-Type': 'application/json','x-security-lock':'0241CCFF2D40AF7AF8A4FC02272C47A30D15DBDFB36E3266D1296212574F328E'},
      body:`{"LiffId": "${req.body.liffId}","LineUserId":"${req.body.lineUserId}", "LinePOSId":"${req.body.linePOSId}", "GroupId":"${req.body.groupId}","OrderId":${req.body.orderId},"CompanyId":${req.body.companyId}
        ,"LocationId":${req.body.locationId},"CompanyName":"${req.body.companyName}","LocationName":"${req.body.locationName}"}`
        
      }).then(function(response) {
        return response.text();
      }).then(function(data) {

      //var obj = JSON.parse(data);
      var obj = JSON.parse(data);
        
      console.log("Obj = " + obj);
      console.log(data); // this will be a string
      var pvJson = obj.ProductVariantListJson
        productList = JSON.parse(pvJson)
    });
    
      res.send(productList);
  }
  catch (err) 
  {
    res.status(200).send({
      message: err.message,
    });
  }
};
const getQRPayment = async(req,res) => {
  try
  {
      await fetch(serviceUrl + 'GetQRPayment',//fetch('http://localhost:5002/simple-cors3', 
            { 
              method:'POST',
              //credentials:"include",
              headers: {'Content-Type': 'application/json','x-security-lock':'0241CCFF2D40AF7AF8A4FC02272C47A30D15DBDFB36E3266D1296212574F328E'},
              body:`{"OrderId": ${req.body.orderId},"LiffId":"${req.body.liffId}","LineUserId":"${req.body.lineUserId}", "CompanyId":${req.body.companyId}}`
              
            }).then(function(response) {
              return response.text();
            }).then(function(data) {
      
              var obj = JSON.parse(data);
              paymentData = obj
              
            });
            res.send(paymentData);
  }
  catch (err) 
  {
    res.status(200).send({
      message: err.message,
    });
  }
};
const removeCoinPOSCartDetail = async(req,res) => {
  try
  {
    await fetch(serviceUrl + 'DeleteOrderDetail', 
          { 
            method:'POST',
            headers: {'Content-Type': 'application/json','x-security-lock':'0241CCFF2D40AF7AF8A4FC02272C47A30D15DBDFB36E3266D1296212574F328E'},
            body:`{"OrderId": ${req.body.orderId}, "ProductVariantId":${req.body.pvId},"LineUserId":"${req.body.linePOSId}","LiffId":"${req.body.liffId}","PictureUrl":"${req.body.pictureUrl}"}`
            
          }).then(function(response) {
            return response.text();
          }).then(function(data) {
    
            
            try
            {
              obj = JSON.parse(data);
              

            }
            catch(ex)
            {
              
            }
            
          });

          res.send(obj);
  }
  catch (err) 
  {
    res.status(500).send({
      message: err.message,
    });
  }
}
const updateCoinPOSCartDetail = async(req,res) => {
  try
  {
    await fetch(serviceUrl + 'UpdateOrderDetail', 
          { 
            method:'POST',
            headers: {'Content-Type': 'application/json','x-security-lock':'0241CCFF2D40AF7AF8A4FC02272C47A30D15DBDFB36E3266D1296212574F328E'},
            body:`{"OrderDetailId":${req.body.orderDetailId},"UserId":${req.body.userId},"Quantity":${req.body.quantity},"CompanyId":${req.body.companyId},"OrderId": ${req.body.orderId},"ProductVariantId": ${req.body.pvId},"UpdateType":"${req.body.updateType}","LineUserId":"${req.body.linePOSId}","LiffId":"${req.body.liffId}","PictureUrl":"${req.body.pictureUrl}"}`
            
          }).then(function(response) {
            return response.text();
          }).then(function(data) {
    
            
            try
            {
              obj = JSON.parse(data);
              

            }
            catch(ex)
            {
              
            }
            
          });

          res.send(obj);
  }
  catch (err) 
  {
    res.status(500).send({
      message: err.message,
    });
  }
}
const addToCoinPOSCart = async(req,res) => {
  try
  {
    //var body = '';
    //body = req.body;//JSON.parse(req.body)
    //res.send(req.body);
    //console.log(req.body);
    //return;
     /*await fetch(serviceUrl + 'GetLiffProductList',//fetch('http://localhost:5002/simple-cors3', 
      { 
        method:'POST',
        //credentials:"include",
        headers: {'Content-Type': 'application/json','x-security-lock':'0241CCFF2D40AF7AF8A4FC02272C47A30D15DBDFB36E3266D1296212574F328E'},
        body:`{"LiffId": "${req.body.liffId}","LineUserId":"${req.body.lineUSerId}", "LinePOSId":"${req.body.linePOSId}", "GroupId":"${req.body.groupId}","OrderId":${req.body.orderId},"CompanyId":${req.body.companyId}
        ,"LocationId":${req.body.locationId},"CompanyName":"${req.body.companyName}","LocationName":"${req.body.locationName}","Page":${req.body.page},"RowPerPage":${req.body.itemPerPage},"Query":"${req.body.query}","Category":"${req.body.category}"}`
        
      }) */
      const products = await fetch(serviceUrl + 'AddToLiffOrder',//fetch('http://localhost:5002/simple-cors3', 
      { 
        method:'POST',
        //credentials:"include",
        headers: {'Content-Type': 'application/json','x-security-lock':'0241CCFF2D40AF7AF8A4FC02272C47A30D15DBDFB36E3266D1296212574F328E'},
        body:`{"OrderId": ${req.body.orderId},"ProductVariantId": ${req.body.pvId}, "CompanyId": ${req.body.companyId === null ? 0 : req.body.companyId}, "StockLocationId":${req.body.locationId === null ? 0 : req.body.locationId},"PromotionCode":"","TaxTypeId":2,"LineUserId":"${req.body.lineUserId}","LinePOSId":"${req.body.linePOSId}","GroupId":"${req.body.groupId}","LiffId":"${req.body.liffId}","PictureUrl":"${req.body.pictureUrl}","PromotionCode":"${req.body.promotionCode}"}`
        
      }).then(function(response) {
        return response.text();
      }).then(function(data) {

        
        var obj = JSON.parse(data);
        //var pvJson = obj.ProductVariantListJson
        productList = obj
        
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
const saveCustomerInfo = async(req,res) =>
{
  try
  {
    //var body = '';
    //body = JSON.stringify(req.body)
    //res.send(body);
    //console.log(body);
    //return;
    await fetch(serviceUrl + 'SocialCustomerSaveService',//fetch('http://localhost:5002/simple-cors3', 
      { 
        method:'POST',
        //credentials:"include",
        headers: {'Content-Type': 'application/json','x-security-lock':'0241CCFF2D40AF7AF8A4FC02272C47A30D15DBDFB36E3266D1296212574F328E'},
        body:`{"FirstName": "${req.body.firstName}","MiddleName": "${req.body.middleName}", "LastName": "${req.body.lastName}", "Gender":${req.body.gender},"Phone":"${req.body.phone}","Mobile":"${req.body.mobile}","Email":"${req.body.email}","Address1":"${req.body.address1}","District":"${req.body.district}","City":"${req.body.city}","StateOrProvince":"${req.body.stateOrProvince}","Postalcode":"${req.body.postalcode}","Country":"${req.body.country}","CountryId":"${req.body.countryId}","CustomerId":"${req.body.customerId}","CompanyId":"${req.body.companyId}","CatalogName":"${req.body.catalogName}","PictureUrl":"${req.body.imageUrl}"}`
        
      }).then(function(response) {
        return response.text();
      }).then(function(data) {

        
        var obj = JSON.parse(data);
        //var pvJson = obj.ProductVariantListJson
        productList = obj
        
      });
    
      res.send(productList);
  }
  catch (err) 
  {
    res.send({
      message: err.message,
    });
  }
};
const getCoinPOSProductsService = async(req,res) => 
{
  try
  {
    //var body = '';
    body = JSON.stringify(req.body)
    //res.send(req.body.liffId);
    //console.log(serviceUrl + 'GetLiffProductList');
    //return;
    //var countryData = await getCountry(req,res);
    //console.log("Counrty = " + JSON.stringify(countryData));
    console.log("body = " + body);
    //return;
    const products = await fetch(serviceUrl + 'GetLiffProductList',//fetch('http://localhost:5002/simple-cors3', 
      { 
        method:'POST',
        //credentials:"include",
        headers: {'Content-Type': 'application/json','x-security-lock':'0241CCFF2D40AF7AF8A4FC02272C47A30D15DBDFB36E3266D1296212574F328E'},
        body:`{"LiffId": "${req.body.liffId}","LineUserId":"${req.body.lineUserId}", "LinePOSId":"${req.body.linePOSId}", "GroupId":"${req.body.groupId}","OrderId":${req.body.orderId},"CompanyId":${req.body.companyId},
        "CatalogName":"${req.body.catalogName}","CompanyCode":"${req.body.companyCode}","PromotionId":${req.body.promotionId},"LocationId":${req.body.locationId},"CompanyName":"${req.body.companyName}","LocationName":"${req.body.locationName}","Page":${req.body.page},"RowPerPage":${req.body.itemPerPage},"Query":"${req.body.query}","Category":"${req.body.category}","Product":"${req.body.product}"}`
        
      }).then(function(response) {
        return response.text();
      }).then(function(data) {

        console.log("GetData = " + data)
        var obj = JSON.parse(data);
        var pvJson = obj.ProductVariantListJson
        productList = JSON.parse(pvJson)
        
        //closeNav(null);
      });
    
    /*res.status(200).send({
      message: 'http://localhost:41781/LineLiff/' + 'GetCountry',
    });

    return ;*/
    /* var countryData = "";
    await fetch('http://localhost:41781/LineLiff/' + 'GetCountry',//fetch('http://localhost:5002/simple-cors3', 
    { 
        method:'POST',
              //credentials:"include",
        headers: {'Content-Type': 'application/json','x-security-lock':'0241CCFF2D40AF7AF8A4FC02272C47A30D15DBDFB36E3266D1296212574F328E'},
        body:``
              
    }).then(function(response) {
            return response.text();
    }).then(function(data) {
      
            countryData = (data);
            //console.log(data); // this will be a string
            //countryData = obj.countryResponses;
            //loading.hidden = true;//document.getElementById("Liff-Loading").hidden = true;
            //root.hidden = false;
    }); */
    //return countryData

      res.send(productList);
  }
  catch(err) {
    res.status(500).send({
      //res.send({
      message: err.message,
    });
  }
}
const getDefaultDataCompany = async(req,res) => 
{
  try
  {
    //var body = '';
    body = JSON.stringify(req.body)
    //res.send(req.body.liffId);
    //console.log(serviceUrl + 'GetLiffProductList');
    //return;
    //var countryData = await getCountry(req,res);
    //console.log("Counrty = " + JSON.stringify(countryData));
    console.log("body = " + body);
    //return;
    const products = await fetch(serviceUrl + 'GetDefaultDataCompany',//fetch('http://localhost:5002/simple-cors3', 
      { 
        method:'POST',
        //credentials:"include",
        headers: {'Content-Type': 'application/json','x-security-lock':'0241CCFF2D40AF7AF8A4FC02272C47A30D15DBDFB36E3266D1296212574F328E'},
        body:`{"LiffId": "${req.body.liffId}","LineUserId":"${req.body.lineUserId}", "LinePOSId":"${req.body.linePOSId}", "GroupId":"${req.body.groupId}","OrderId":${req.body.orderId},"CompanyId":${req.body.companyId},
        "CatalogName":"${req.body.catalogName}","CompanyCode":"${req.body.companyCode}","PromotionId":${req.body.promotionId},"LocationId":${req.body.locationId},"CompanyName":"${req.body.companyName}","LocationName":"${req.body.locationName}","Page":${req.body.page},"RowPerPage":${req.body.itemPerPage},"Query":"${req.body.query}","Category":"${req.body.category}","Product":"${req.body.product}"}`
        
      }).then(function(response) {
        return response.text();
      }).then(function(data) {

        console.log("GetData = " + data)
        try
        {
          var obj = JSON.parse(data);
          var pvJson = obj.ProductVariantListJson
          productList = JSON.parse(pvJson)
        }
        catch(ex)
        {
          res.send({
            //res.send({
            message: data,
          });
        }
        
        
        //closeNav(null);
      });
    

      res.send(productList);
  }
  catch(err) {
    res.status(500).send({
      //res.send({
      message: err.message,
    });
  }
}
const getCoinPOSProducts = async(req,res) => {
  try
  {
    var sql = require("mssql");

    // config for your database
    var config = {
        user: 'CoinPOSUat',
        password: '!reimagine2018',
        server: 'prolifit.database.windows.net', 
        database: 'CoinPOSUAT' 
    };

    sql.connect(config, function (err) {
    
      if (err) console.log(err);

      // create Request object
      var request = new sql.Request();
         
      // query to the database and get the records
      request.query('select top(5) * from [Production].[ProductVariant]', function (err, recordset) {
          
          if (err) console.log(err)

          // send records as a response
          res.send(recordset);
          
      });
    });
  }
  catch(err) {
    res.status(500).send({
      message: err.message,
    });
  }

}

const getDiscountedProducts = async (req, res) => {
  try {
    const products = await Product.find({ discount: { $gt: 5 } }).sort({
      _id: -1,
    });
    res.send(products);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({}).sort({ _id: -1 });
    res.send(products);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const getStockOutProducts = async (req, res) => {
  try {
    const products = await Product.find({ quantity: { $lt: 1 } }).sort({
      _id: -1,
    });

    res.send(products);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const getProductBySlug = async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug });
    res.send(product);
  } catch (err) {
    res.status(500).send({
      message: `Slug problem, ${err.message}`,
    });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.send(product);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      product.sku = req.body.sku;
      product.title = req.body.title;
      product.slug = req.body.slug;
      product.description = req.body.description;
      product.parent = req.body.parent;
      product.children = req.body.children;
      product.type = req.body.type;
      product.unit = req.body.unit;
      product.quantity = req.body.quantity;
      product.originalPrice = req.body.originalPrice;
      product.price = req.body.price;
      product.discount = req.body.discount;
      product.image = req.body.image;
      product.tag = req.body.tag;
      await product.save();
      res.send({ data: product, message: 'Product updated successfully!' });
    }
    // handleProductStock(product);
  } catch (err) {
    res.status(404).send(err.message);
  }
};

const updateStatus = (req, res) => {
  const newStatus = req.body.status;
  Product.updateOne(
    { _id: req.params.id },
    {
      $set: {
        status: newStatus,
      },
    },
    (err) => {
      if (err) {
        res.status(500).send({
          message: err.message,
        });
      } else {
        res.status(200).send({
          message: `Product ${newStatus} Successfully!`,
        });
      }
    }
  );
};

const deleteProduct = (req, res) => {
  Product.deleteOne({ _id: req.params.id }, (err) => {
    if (err) {
      res.status(500).send({
        message: err.message,
      });
    } else {
      res.status(200).send({
        message: 'Product Deleted Successfully!',
      });
    }
  });
};

module.exports = {
  addProduct,
  addAllProducts,
  getAllProducts,
  getShowingProducts,
  getDiscountedProducts,
  getStockOutProducts,
  getProductById,
  getProductBySlug,
  updateProduct,
  updateStatus,
  deleteProduct,
  getCoinPOSProducts,
  getCoinPOSProductsService,
  getCoinPOSCart,
  addToCoinPOSCart,
  updateCoinPOSCartDetail,
  removeCoinPOSCartDetail,
  getCountry,
  getCity,
  getDistrict,
  getStateProvince,
  getQRPayment,
  closeOrder,
  getOrderById,
  getPayOrderById,
  getCoinPOSCoupons,
  sendBankTransferPayment,
  applyPromotionCode,
  cancelPromotionCode,
  getOrderByUserId,
  getDashboardOrderByUserId,
  saveCustomerInfo,
  getDefaultDataCompany
};
