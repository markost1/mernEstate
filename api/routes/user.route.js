import express from 'express';
import { test } from '../controllers/user.controller.js';

const router = express.Router();

//nastavak sjutra1,17 

router.get('/test',test)

export default router;