import { AdminServices } from "../services/admin.services.js"

export const getUserById = async(req,res)=>{
    try {
        const result = await AdminServices.getUserById(req.params.userId);
        return result ? res.send({"msg":"Success", result}) : res.send({"msg":"Failed to get Uers",result})
    } catch (err) {
        console.log(err)
        res.send("internale server error")
    }
}

export const getUserOrders = async(req,res)=>{
    try {
        const result = await AdminServices.getUserOrder(req.params.userId);
        return result ? res.send({"msg":"Success", result}) : res.send({"msg":"Failed to get Uers Orders",result})
    } catch (err) {
        console.log(err)
        res.send("internale server error")
    }
}

export const getUserCart = async(req,res)=>{
    try {
        const result = await AdminServices.getUserCart(req.params.userId);
        return result ? res.send({"msg":"Success", result}) : res.send({"msg":"Failed to get Uers Cart",result})
    } catch (err) {
        console.log(err)
        res.send("internale server error")
    }
}

export const getUserWishlist = async(req,res)=>{
    try {
        const result = await AdminServices.getUserWishlist(req.params.userId);
        return result ? res.send({"msg":"Success", result}) : res.send({"msg":"Failed to get Wishlist",result})
    } catch (err) {
        console.log(err)
        res.send("internale server error")
    }
}

export const getVendorById = async(req,res)=>{
    try {
        const result = await AdminServices.getVendorById(req.params.vendorId);
        return result ? res.send({"msg":"Success", result}) : res.send({"msg":"Failed to get vendor",result})
    } catch (err) {
        console.log(err)
        res.send("internale server error")
    }
}

export const getVendorOrders = async(req,res)=>{
    try {
        const result = await AdminServices.getVendorOrder(req.params.vendorId);
        return result ? res.send({"msg":"Success", result}) : res.send({"msg":"Failed to get Orders of vendor",result})
    } catch (err) {
        console.log(err)
        res.send("internale server error")
    }
}

export const getVendorProducts = async(req,res)=>{
    try {
        const result = await AdminServices.getVendorProducts(req.params.vendorId);
        return result ? res.send({"msg":"Success", result}) : res.send({"msg":"Failed to get products of vendor",result})
    } catch (err) {
        console.log(err)
        res.send("internale server error")
    }
}