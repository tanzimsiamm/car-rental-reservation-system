

import express from 'express';
import auth from '../../middleware/auth';
import { userControllers } from './userController';
const router = express.Router();


// get /api/users
router.get('/', auth('admin'),  userControllers.getAllUsers)
router.get('/:email', auth('admin','user'), userControllers.getSingleUser)

router.put('/:id', auth('admin', 'user'), userControllers.updateUser)
router.delete('/:id', auth('admin'), userControllers.deleteUser)


export const userRoutes = router;