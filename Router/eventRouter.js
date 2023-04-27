import express from "express"
import { createEvent, getAllEvent, getEventByCity, getEventByDate, getEventBycityAndDate, getEvent, updateEvent, deleteEvent, getMyevent } from '../controller/event.js'
import authMiddleware from "../middleware/auth.js";
authMiddleware;

const eventRouter = express.Router();

eventRouter.post('/create', authMiddleware, createEvent);
eventRouter.get('/allevent', getAllEvent);
eventRouter.post('/city', getEventByCity);

export default eventRouter;