import express from 'express'
import { getUser, storeRecentSearchCities } from '../controllers/userController.js';
import isUser from '../middlewares/authMiddleware.js';


const userRouter = express.Router();

userRouter.get("/", isUser, getUser)
userRouter.post("/recent-search-cities", isUser, storeRecentSearchCities)

export default userRouter;