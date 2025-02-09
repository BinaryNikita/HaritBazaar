import {donationService} from "../services/product.donation.service.js";

//Add New Donation By User
async function createDonation(req, res) {
    try {
      const donation = await donationService.createDonation(req.body);
      res.status(201).json({ message: 'Donation request submitted. Awaiting review.', donation });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

// Fetch all donations (admin only)
async function getAllDonations(req, res) {
    try {
      const donations = await donationService.getAllDonations();
      res.status(200).json(donations);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  //Get Donations By USerId
  async function  getDonationById(req,res){
    try{
        const id = req.params;
    let donations = donationService.getDonationById(id);
    if(!donations)
    {
        return res.status(404).json({ message: 'Donation not found' });
    }
         res.status(200).json(donations);
    }catch (error) {
    res.status(500).json({ message: error.message });
    }
  }

   //Update Donation Status By Admin
   async function  updateDonationStatus(req,res)
   {
        try{
            let id = req.params;
            let Status = donationService.updateDonationStatus(id,req.body);
            res.status(200).json({ message: 'Donation request updated successfully.', donation: Status });
        }catch(error)
        {
            res.status(500).json({ message: error.message });
        }
   }

   //Remove Donation By User
   async function  removeDonation(req,res)
   {
        try{
            let id = req.params;
           await donationService.removeDonation(id);
           res.status(200).json({message:"Successfully Delete"});
        }catch(error)
        {
            res.status(500).json({message:error.message});
        }
   }

   export const donationController = ()=>{}