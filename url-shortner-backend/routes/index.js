import express from 'express';
import userRoutes from './user.routes.js';
import urlRoutes from './url.routes.js';

const router = express.Router();

router.use('/users', userRoutes);
router.use('/urls', urlRoutes);

export default router;
