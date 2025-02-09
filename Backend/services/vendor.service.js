import { Vendor } from "../models/vendor.model.js";
import { User } from "../models/users.model.js"

class VendorService {
    static async createVendor(vendorData) {
        try {
            let result = await User.findOneAndUpdate({_id: vendorData.user_id},{$set:{role: "vendor"}}, {new: true});
            // result = JSON.parse(JSON.stringify(result));
            console.log(result);
            if(result){
              const newVendor = await Vendor.create(vendorData);
              console.log(result);
              return newVendor;
            }
            return null;
        } catch (error) {
          console.error("Error creating vendor:", error);  
          throw new Error('Error creating vendor: ' + error.message);
        }
      }
}

export default VendorService;
