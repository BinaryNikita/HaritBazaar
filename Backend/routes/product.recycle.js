import express from "express";
import {recycleController} from "../controller/pro.recycle.controller.js";
const route = express.Router();
//User Routes
// route.post("/addRecycle",recycleController.createRecycle);
route.post("/addRecycle",recycleController);
// route.get("getAllRecycle/:id",recycleController.getAllRecycle);
route.get("getAllRecycle/:id",recycleController);
// route.delete('/:id', recycleController.removeRecycle);
route.delete('/:id', recycleController);

// Admin routes
// route.get('/getAllRecycle', recycleController.getRecycle);
route.get('/getAllRecycle', recycleController);
// route.put('/:id', recycleController.updateRecycle);
route.put('/:id', recycleController);


export default route;

