import DeadProduct from "../models/deadAndRecycle.model.js";

//Add New Recycle Product By User
 export async function createRecycle(data) {
    const recycle = new DeadProduct(data);
    return await recycle.save();
  }

  //Seeing All Recycle product for Admin
export async function getAllRecycle()
{
    return await DeadProduct.find();
}

//Seeing All Recycle Product by userId for User
export async function getRecycleById(id) {
    return await DeadProduct.findById(id);
  }

  //Update Recycle Status By Admin
 export  async function updateRecycleStatus(id, updateData) {
    return await DeadProduct.findByIdAndUpdate(id, updateData, { new: true });
  }

  //By USer Delete Donation
  export async function removeRecycle(id)
  {
    return await DeadProduct.findByIdAndDelete(id);
  }

  export const recycleService = ()=>{}