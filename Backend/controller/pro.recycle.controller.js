import {recycleService} from "../services/product.recycle.service.js";
async function createRecycle(req, res) {
    try {
      const recycle = await recycleService.createRecycle(req.body);
      res.status(201).json({ message: 'Recycle request submitted. Awaiting review.', recycle });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

// Fetch all Recycle Product(admin only)
async function getAllRecycle(req, res) {
    try {
      const recycleProduct = await recycleService.getAllRecycle();
      res.status(200).json(recycleProduct);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  //Get Recycle Product By USerId
  async function  getRecycleById(req,res){
    try{
        const id = req.params;
    let recycle = recycleService.getRecycleById(id);
    if(!recycle)
    {
        return res.status(404).json({ message: 'Product not found' });
    }
         res.status(200).json(recycle);
    }catch (error) {
    res.status(500).json({ message: error.message });
    }
  }

   //Update Recycle Status By Admin
   async function  updateRecycleStatus(req,res)
   {
        try{
            let id = req.params;
            let Status = recycleService.updateRecycleStatus(id,req.body);
            res.status(200).json({ message: 'Recycle request updated successfully.', recycle: Status });
        }catch(error)
        {
            res.status(500).json({ message: error.message });
        }
   }

   //Remove Donation By User
   async function  removeRecycle(req,res)
   {
        try{
            let id = req.params;
           await recycleService.removeRecycle(id);
           res.status(200).json({message:"Successfully Delete"});
        }catch(error)
        {
            res.status(500).json({message:error.message});
        }
   }

   export const recycleController = ()=>{}