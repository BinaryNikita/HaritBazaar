import { Product } from '../models/product.model.js';
import { Category } from '../models/category.model.js'
import multer from 'multer';
import path from 'path'
import fs from 'fs'

export class ProductServices {
  static async createBulk(data) {
    try {
      let status = await Product.insertMany(data);
      if (status) {
        console.log(status);
        return 'Products created succesfully';
      } else {
        return 'some error ocurred while inserting the products';
      }
    } catch (err) {
      console.log(err);
    }
  }

  static async getAllProductsOfVendor(vendorId) {
    try {
      const products = await Product.find({ vendor_id: vendorId, isActive: true }).populate('category_id');
      if (products) return products;
      else return false;
    } catch (err) {
      console.log(err);
    }
  }

  static async getAllProducts(filter = {}) {
    try {
      filter.isActive = true;
      const products = await Product.find(filter).populate("category_id");

      return { products, total: products.length };
    } catch (err) {
      console.error(err);
      throw new Error("Error while fetching products");
    }
  }


  // static async getAllProducts(page = 1, limit = 10, filter = {}) {
  //   try {
  //     const skip = (page - 1) * limit;

  //     const products = await Product.find(filter)
  //       .skip(skip)
  //       .limit(limit)
  //       .populate("category_id");

  //     const total = await Product.countDocuments(filter);

  //     return { products, total };
  //   } catch (err) {
  //     console.error(err);
  //     throw new Error("Error while fetching products");
  //   }
  // }


  static async addProduct(data) {
    try {
      const newProduct = await Product.create(data);
      if (newProduct) return true;
      else return false;
    } catch (err) {
      console.log(err);
    }
  }

  static async addProductByFile(workbook, worksheet, vendorId) {
    try {
      const data = [];
      const media = workbook.model.media;
      const images = worksheet.model.media;
      let temporaryIndex = 1;

      const categories = await Category.find({},{categoryName:1, _id:1});

      const x = worksheet.getSheetValues().map((row,index) =>row.map((cell, index) => { // Index = 0 (Maybe)
        if (cell != undefined)  return cell
      }));
      for (let i = 2; i < x.length; i++) {
        const [a, name, description, price, categoryName, carbonFootprint, isOrganic, isRecycled, type, quantity, discount] = x[i];
        // console.log(x[i]);
        // console.log("-------------------------")
        // console.log(vendor_id,name,description, price, category_id, carbonFootprint, isOrganic, isRecycled, type, quantity, discount);


        const categoryIndex = categories.findIndex(category=>category.categoryName.toLowerCase()==categoryName.toLowerCase());
        if(categoryIndex==-1) return {'operation':false, 'msg': `Category ${categoryName} does not exists`}


        data.push({
          vendor_id: vendorId, name, description, price, category_id: categories[i]._id, carbonFootprint, isOrganic, isRecycled, type, quantity, discount, image: []
        });
      }

      images.forEach(img => {
        const mediaItem = media.find(m => m.index === img.imageId);
        if (mediaItem && mediaItem.type === 'image') {
          const fileName = `${Date.now()}${mediaItem.name}.${mediaItem.extension}`;
          const filePath = path.join("./public/products", fileName);

          fs.writeFileSync(filePath, mediaItem.buffer);

          const rowIndex = img.range.tl.nativeRow - 1;
          data[rowIndex].image.push(`http://localhost:4000/products/${fileName}`);
        }
      });
      const result = await Product.insertMany(data);
      return result ? { "operation": true, "msg": "Products Inserted Successfully" } : { "operation": false, "msg": "Failed to Insert Products" };
    } catch (err) {
      console.error("Error processing Excel file:", err);
      return { "operation": false, "msg": "Internal Server Error" };
    }
  }



  // GET PRODUCT BY ID
  static async getProductById(productId) {
    try {
      const product = await Product.findOne({ _id: productId }).populate('category_id');
      if (product) return { product };
      else return false;
    } catch (err) {
      console.log(err);
    }
  }

  // UPDATE PRODUCT
  static async updateProduct(productId, data) {
    try {
      const isExist = await this.getProductById(productId);

      if (isExist) {
        const isUpdate = await Product.updateOne({ _id: productId }, data);
        if (isUpdate) return true;
        else false;
      } else {
        console.log('Product does not exist');
        return false;
      }
    } catch (err) {
      console.log(err);
    }
  }

  // DELETE PRODUCT
  static async deleteProduct(productId) {
    try {
      const isExist = await Product.findOne({ _id: productId });
      if (isExist) {
        const product = await Product.updateOne({ _id: productId }, { isActive: false });
        return product.modifiedCount != 0 ? true : false;
      } else {
        console.log('Product does not exist');
        return false;
      }
    } catch (err) {
      console.log(err);
    }
  }

  // SEARCH PRODUCT
  static async searchProduct(query) {
    try {
      const products = await Product.find({
        isActive: true,
        $or: [
          { name: { $regex: query, $options: 'i' } },
          { description: { $regex: query, $options: 'i' } },
        ],
      }).populate('category_id');

      if (products) return products;
      else return false;
    } catch (err) {
      console.log(err);
    }
  }

  // UPDATE STOCK
  static async updateStock(productId, quantity) {
    try {
      const product = await Product.findById(productId);
      if (product) {
        product.quantity += quantity;
        await product.save();
      } else {
        console.log('Unable to update stock');
        return false;
      }
    } catch (err) { }
  }

  // RECOMMENDATION
  static async getProductRecommendation(productId) {
    try {
      const product = await Product.findById(productId);
      if (!product) return false;

      const recommendations = await Product.find({
        _id: { $ne: productId },
        category_id: product.category_id,
        isActive: true
      }).limit(5);

      return recommendations;
    } catch (err) {
      console.log(err);
    }
  }
}