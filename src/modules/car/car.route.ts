import { Router } from 'express';
import { carControllers} from './car.controller';
import { carValidations } from './car.validation';
import validateRequest from '../../middleware/validateRequest';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../users/user.constant';

const router = Router();

router.post('/', auth(USER_ROLE.user) , validateRequest(carValidations.createCarValidationSchema),  carControllers.createCar );

router.put('/return', auth(), validateRequest(carValidations.returnCarValidationSchema),  carControllers.returnCar );

router.put('/:id', auth() , validateRequest(carValidations.updateCarValidationSchema),  carControllers.updateCar );

router.delete('/:id', auth('admin') , carControllers.deleteCar);

router.get('/', auth('admin','user'),  carControllers.getAllCars);

router.get('/:id', auth('admin','user'), carControllers.getCarById);


export const carRoutes = router;
