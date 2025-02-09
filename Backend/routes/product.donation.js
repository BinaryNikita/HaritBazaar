import express from "express";
import {donationController} from "../controller/pro.donation.controller.js";
const route = express.Router();
//User Routes
// route.post("/addDonation",donationController.createDonation);
route.post("/addDonation",donationController);
// route.get("getAllDonation/:id",donationController.getAllDonations);
route.get("getAllDonation/:id",donationController);
// route.delete('/:id', donationController.removeDonation);
route.delete('/:id', donationController);

// Admin routes
// route.get('/getAllDonation', donationController.getAllDonations);
route.get('/getAllDonation', donationController);
// route.put('/:id', donationController.updateDonation);
route.put('/:id', donationController);

export default route ;