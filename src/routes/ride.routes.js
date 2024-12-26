import express from 'express';
import { body, query } from 'express-validator';
import rideController from '../controllers/ride.controller.js';
import {verifyAuth} from '../middlewares/verifyAuth.js';

const router = express.Router();


router.post('/create',
    verifyAuth,
    body('pickup').isString().isLength({ min: 3 }).withMessage('Invalid pickup address'),
    body('destination').isString().isLength({ min: 3 }).withMessage('Invalid destination address'),
    body('vehicleType').isString().isIn([ 'auto', 'car', 'moto' ]).withMessage('Invalid vehicle type'),
    rideController.createRide
)

router.get('/get-fare',
    verifyAuth,
    query('pickup').isString().isLength({ min: 3 }).withMessage('Invalid pickup address'),
    query('destination').isString().isLength({ min: 3 }).withMessage('Invalid destination address'),
    rideController.getFare
)

router.post('/confirm',
    verifyAuth,
    body('rideId').isMongoId().withMessage('Invalid ride id'),
    rideController.confirmRide
)

router.get('/start-ride',
    verifyAuth,
    query('rideId').isMongoId().withMessage('Invalid ride id'),
    query('otp').isString().isLength({ min: 6, max: 6 }).withMessage('Invalid OTP'),
    rideController.startRide
)

router.post('/end-ride',
    verifyAuth,
    body('rideId').isMongoId().withMessage('Invalid ride id'),
    rideController.endRide
)



export default router