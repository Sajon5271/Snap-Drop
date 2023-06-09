const router = require('express').Router();

const countries = require('./utils/data/requirementsFromLab.json');
const authMiddleware = require('./middlewares/auth');
const userController = require('./controllers/user.controller');
const orderController = require('./controllers/order.controller');
const oauthController = require('./controllers/oauth.controller');
const cartController = require('./controllers/cart.controller');
const labController = require('./controllers/lab.controller');
const pathaoController = require('./controllers/pathao.controller');
const SslCommerzController = require('./controllers/sslcommerz.controller');
const cloudinaryController = require('./controllers/cloudinary.controller');
const sendMessageController = require('./controllers/sendMessageController');
const { uploadToOrder } = require('./controllers/cutoutpro.controller');
const { setASubscriber } = require('./controllers/notifications.controller');

//User Routes
router.post('/login', userController.login);
router.post('/register', userController.register);
router.post('/oauthLogin', oauthController.oauthLogin);
router.get(
  '/user',
  authMiddleware.authenticated,
  userController.getUserDetails
);
router.get(
  '/userType',
  authMiddleware.authenticated,
  userController.getUserRole
);
router.put('/user', authMiddleware.authenticated, userController.updateUser);
router.put('/newUserFalse', authMiddleware.customer, userController.setNewUser);

//Oauth Routes
router.post('/googleAccessCode', oauthController.googleAccessCode);
router.post('/fbAccessCode', oauthController.fbAccessCode);

// Order Routes
router.get(
  '/orderbyId/:id',
  authMiddleware.authenticated,
  orderController.getOrderById
);
router.get(
  '/order/latestOrder',
  authMiddleware.customer,
  orderController.getUserLastOrder
);
router.get(
  '/orderbyCustomer/',
  authMiddleware.customer,
  orderController.getOrderByCustomerId
);
router.get(
  '/orderforLab/',
  authMiddleware.lab,
  orderController.getOrderByLabId
);
router.get(
  '/orderOneWeek/',
  authMiddleware.lab,
  orderController.getOneWeekData
);
//These two routes needs to be before /order/:id to match
router.put(
  '/order/paid',
  authMiddleware.customer,
  orderController.setOrderPaid
);
router.delete(
  '/order/unpaid',
  authMiddleware.customer,
  orderController.cleanUnpaidOrders
);
router.get(
  '/order/:status',
  authMiddleware.lab,
  orderController.getOrdersbyStatus
);
router.post(
  '/generateOrderId',
  authMiddleware.customer,
  orderController.generateOrderId
);

//Keep these under /order/paid
router.post('/order', authMiddleware.customer, orderController.createOrder);
router.put('/order/:id', authMiddleware.lab, orderController.changeOrderStatus);
router.put(
  '/orderUpdate/:id',
  authMiddleware.authenticated,
  orderController.updatePassport
);

//Cart Routes
router.put('/cart', authMiddleware.customer, cartController.updateUserCart);
router.get('/cart', authMiddleware.customer, cartController.getUserCart);
router.delete('/cart', authMiddleware.customer, cartController.clearCart);

//Pathao Routes
router.get('/pathao/accessToken', pathaoController.pathaoAccessToken);
router.post('/pathao/zones', pathaoController.pathaoZones);
router.post('/pathao/areas', pathaoController.pathaoAreas);
router.post('/pathao/order', authMiddleware.lab, pathaoController.createOrder);
router.get(
  '/pathao/closest-studio',
  authMiddleware.customer,
  pathaoController.pathaoFindClosestStudio
);
router.post(
  '/pathao/price-calculation',
  authMiddleware.customer,
  pathaoController.patahaoPriceCalc
);

//SSLcommerz Routes
router.get(
  '/payment/:order_id/:amount',
  authMiddleware.customer,
  SslCommerzController.initPayment
);
router.post('/payment-success', SslCommerzController.success);
router.post('/payment-failure', SslCommerzController.failure);
router.post('/payment-cancel', SslCommerzController.cancel);
router.post('/payment-ipn', SslCommerzController.ipn);
// router.get('/validate', SslCommerzController.validate);

//Internal Route for lab
router.post('/lab', labController.createLab);

router.get('/dowloadOrder/:id', authMiddleware.lab, uploadToOrder);
router.get('/countries', (req, res) => {
  const countryNames = countries.map((el) => el.country);
  res.status(200).send(countryNames);
});

router.post(
  '/subscribeToNotification',
  authMiddleware.authenticated,
  setASubscriber
);

router.post('/sendMessage', sendMessageController);

router.post('/getLabName', labController.getLabName);

router.get(
  '/orderCountByProductCategory',
  authMiddleware.lab,
  orderController.getOrderCountByProductCategory
);

module.exports = router;
