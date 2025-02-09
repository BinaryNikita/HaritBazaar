import { ProductServices } from "../services/product.service.js";
import path from 'path'
import exceljs from 'exceljs'
import fs from 'fs'

  //  BULK ADD PRODUCT
export const bulkAdd = async (request, response, next) => {
  try {
    const result = ProductServices.createBulk(request.body);
    if (result) {
      response.send("Data inserted succesfully");
    } else {
      response.send("Some error ocurred while sending the data");
    }
  } catch (err) {
    console.log(err);
  }
}

  //  GET PRODUCT BY ID 
export const getProductByID = async (request, response, next) => {
  try {
    const product = await ProductServices.getProductById(request.params.productId);

    if (product) {
      response.status(200).json(product);
    } else {
      response.status(400).json({ message: "Error while fetching product" });
    }
  } catch (err) {
    console.error(err);
    response.status(500).json({ message: "Internal server error" });
  }
}

  //  GET ALL PRODUCTS
export const getAllProduct = async (request, response, next) => {
  try {
    const { products, total } = await ProductServices.getAllProducts();

    if (products) {
      response.status(200).json({ products, total });
    } else {
      response.status(400).json({ message: "Error while fetching products" });
    }
  } catch (err) {
    console.error(err);
    response.status(500).json({ message: "Internal server error" });
  }
};

  // ALL PRODUCTS OF VENDOR
export const getAllProductOfVendor = async (request, response, next) => {
  try {
    const vendorId = request.user._id;
    const products = await ProductServices.getAllProductsOfVendor(vendorId);
    if (products) {
      response.status(200).json({ product: products });
    } else {
      response.send("error while fetching products");
    }

  } catch (err) {
    console.log(err);
  }
}

  // ADD A PRODUCT
export const addProduct = async (request, response, next) => {
  try {
    // EXTRACTING FILE URL  
    const data = JSON.parse(JSON.stringify(request.body))
    data.vendor_id = request.user._id
    data.image = [];
    request.files?.map(url => data.image.push("http://localhost:4000/products/" + url.filename))

    console.log(request.body);
    console.log(data);
    const isAdded = await ProductServices.addProduct(data);
    if (isAdded) {
      response.json({ message: "Product added succesfully", operation: true });
    } else {
      response.send({ msg: "error while adding products", operation: false });
    }

  } catch (err) {
    console.log(err);

  }
}

// ADD PRODUCT BY EXCEL
export const addProductByFile = async (req, res) => {
  try {
    const workbook = new exceljs.Workbook();
    await workbook.xlsx.load(req.file.buffer);
    const worksheet = workbook.worksheets[0]

    const result = await ProductServices.addProductByFile(workbook, worksheet, req.user._id);

    if(result.operation) res.send({'operation': true, 'msg':result.msg });
    else res.send({'operation': false, 'msg': result.msg});
  }
  catch (err) {
    console.log(err);
    res.send({ 'msg': 'Internal Server Error', 'operation': false })
  }
}


export const deleteProduct = async (request, response, next) => {
  try {
    const isDeleted = await ProductServices.deleteProduct(request.params.productId);

    if (isDeleted) {
      response.send({ msg: "product deleted successfully", operation: true });
    } else {
      response.send({ msg: "product deleted successfully", operation: false })
    }
  } catch (err) {
    console.log(err);

  }
}
export const updateProduct = async (request, response, next) => {
  try {
    const prodcutId = request.params.productId;
    const isUpdated = await ProductServices.updateProduct(prodcutId, request.body.product);

    if (isUpdated) {
      response.send({ msg: "product updated successfully", operation: true });
    } else {
      response.send({ msg: "product updated successfully", operation: false })
    }
  } catch (err) {
    console.log(err);

  }
}
export const productRecommendation = async (request, response, next) => {
  try {
    const prodcutId = request.params.productId;
    const recommendation = await ProductServices.getProductRecommendation(prodcutId);

    if (recommendation) {
      response.status(200).send({ "product": recommendation, "operation": true });
    } else {
      response.status(400).send({ "msg": "error while getting recommendation", operation: false })
    }
  } catch (err) {
    console.log(err);

    if (recommendation) {
      response.json({ product: recommendation });
    } else {
      response.send("error while getting recommendation")
    }
  }
}
export const searchProduct = async (request, response, next) => {
  try {
    const query = request.body.query;
    const searchResult = ProductServices.searchProduct(query);

    if (searchResult) {
      response.status(200).json({ result: searchResult });
    } else {
      response.status(400).send("No product found");
    }
  } catch (err) {
    console.log(err);

    if (searchResult) {
      response.json({ result: searchResult });
    } else {
      response.send("No product found");
    }
  }
}
