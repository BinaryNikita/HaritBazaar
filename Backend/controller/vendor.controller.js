import VendorService from '../services/vendor.service.js';
export const createVendor = async (request, response, next) => {
  try {
    request.body.user_id = request.user._id;
    // console.log("Request Body:", request.body);  

    let newVendor = await VendorService.createVendor(request.body);
    if (newVendor) {
      return response.status(201).json({ message: 'Vendor created successfully',operation: true });
    } else {
      return response.status(400).json({ message: 'Unable to create vendor',operation: true });
    }
  } catch (err) {
    console.error("Error creating vendor:", err);
    return response.status(500).json({ message: 'Internal Server Error' });
  }
};

