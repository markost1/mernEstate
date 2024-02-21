import express from 'express';
import { test, updateUser } from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

//

router.get('/test',test)
router.post('/update/:id', verifyToken, updateUser) //importujemo verifyToken u rutu i ako je sve ok prelazimo na izvrsavanje funkcije update user


export default router;