const express = require('express');

const router = express.Router();
const userController = require('../controllers/userController');

router.post('/enroll', userController.enroll);
router.put('/chname', userController.chname);
router.put('/tutorial', userController.tutorial);
router.get('/position', userController.position);
router.get('/mypage', userController.mypage);
router.put('/faucet', userController.faucet);
router.get('/ethbalance', userController.ethbalance);
router.get('/personaldividend', userController.personalDividend);

module.exports = router;