import express from 'express';
import { deleteUser, getUserListings, test, updateUser , getUser} from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

//

router.get('/test',test)
router.post('/update/:id', verifyToken, updateUser) //importujemo verifyToken u rutu i ako je sve ok prelazimo na izvrsavanje funkcije update user
router.delete('/delete/:id',verifyToken, deleteUser)
router.get('/listings/:id',verifyToken, getUserListings);
router.get('/:id',verifyToken, getUser);

export default router;