const express = require('express');
const router = express.Router();
const {
  getAllProducts,
  getShowingProducts,
  getDiscountedProducts,
  getStockOutProducts,
  getProductById,
  getProductBySlug,
  addProduct,
  addAllProducts,
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
  getOrderByUserId,
  getDashboardOrderByUserId,
  saveCustomerInfo,
  //getDefaultDataCompany,
  cancelPromotionCode
} = require('../controller/productController');

//add a product
router.post('/add', addProduct);

//add multiple products
router.post('/all', addAllProducts);
//Get Address Data
router.post('/GetCountry', getCountry);
router.post('/GetStateProvince', getStateProvince);
router.post('/GetDistrict', getDistrict);
router.post('/GetCity', getCity);

//Get CoinPOSCart
router.post('/ApplyPromotionCode',applyPromotionCode);
router.post('/CancelPromotionCode',cancelPromotionCode);
router.post('/SendBankTransferPayment',sendBankTransferPayment);
router.post('/GetCoinPOSCoupon', getCoinPOSCoupons);
router.post('/GetQRPayment', getQRPayment);
router.post('/GetCoinPOSCart', getCoinPOSCart);
router.post('/AddToCoinPOSCart', addToCoinPOSCart);
router.post('/CloseBill', closeOrder);
router.post('/GetOrderById',getOrderById)
router.post('/GetOrderByUserId',getOrderByUserId)
router.post('/GetDashboardOrderByUserId',getDashboardOrderByUserId)
router.post('/GetPayOrderById',getPayOrderById)
router.post('/SaveCustomerInfo',saveCustomerInfo)
router.post('/UpdateCoinPOSCartDetail', updateCoinPOSCartDetail);
router.post('/RemoveCoinPOSCartDetail', removeCoinPOSCartDetail);

router.post('/coinpos_service', getCoinPOSProductsService);
router.post('/show1', getCoinPOSProductsService);
//router.post('/GetDefaultDataCompany', getDefaultDataCompany);
//get a product
router.post('/:id', getProductById);

//get showing products only
router.get('/show', getShowingProducts);



//CoinPOS Product
router.get('/coinpos', getCoinPOSProducts);


//get discounted products only
router.get('/discount', getDiscountedProducts);

//get all products
router.get('/', getAllProducts);

//get all stock out products
router.get('/stock-out', getStockOutProducts);

//get a product by slug
router.get('/:slug', getProductBySlug);

//update a product
router.put('/:id', updateProduct);

//update a product status
router.put('/status/:id', updateStatus);

//delete a product
router.delete('/:id', deleteProduct);



module.exports = router;
