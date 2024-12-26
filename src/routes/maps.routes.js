import express from 'express';
import { query } from 'express-validator';

import mapController from '../controllers/map.controller.js';
import { verifyAuth } from '../middlewares/verifyAuth.js';

const router = express.Router();


router.get('/get-coordinates',
    query('address').isString().isLength({ min: 3 }),
   verifyAuth,
    mapController.getCoordinates
);

router.get('/get-distance-time',
    query('origin').isString().isLength({ min: 3 }),
    query('destination').isString().isLength({ min: 3 }),
    verifyAuth,
    mapController.getDistanceTime
)

router.get('/get-suggestions',
    query('input').isString().isLength({ min: 3 }),
    verifyAuth,
    mapController.getAutoCompleteSuggestions
)



export default  router;