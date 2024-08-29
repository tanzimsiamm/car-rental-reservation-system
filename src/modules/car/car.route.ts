import { Router } from 'express';
import { carControllers} from './car.controller';

const router = Router();

router.post('/', carControllers.createCar);
router.get('/', carControllers.getAllCars);
router.get('/:id', carControllers.getCarById);
router.put('/:id', carControllers.updateCar);
router.delete('/:id', carControllers.deleteCar);

export const carRoutes = router;
