import { Category } from '../models/category.model.js';
import { Product } from '../models/product.model.js';

export class CategoryServices {
  static async createBulk(data) {
    try {
      let result = await Category.insertMany(data);
      if (result) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      console.log(err);
    }
  }

  static async createCategory(categoryName, data) {
    try {
      const category = await Category.findOne({
        categoryName: { $regex: `^${categoryName}$`, $options: 'i' },
      });
      if (!category) {
        const newCategory = await Category.create(data);
        if (newCategory) {
          return true;
        } else {
          return false;
        }
      } else {
        console.log('Category already exist');
        return false;
      }
    } catch (err) {
      console.log(err);
    }
  }

  static async deleteCategory(categoryId) {
    try {
      const category = await Category.findByIdAndDelete(categoryId);
      return category
      // if (category) {
      //   const deleteCategory = await Category.updateOne(
      //     { _id: categoryId },
      //     { isActive: false }
      //   );
      //   await Product.updateMany(
      //     { category_id: categoryId },
      //     { isActive: false }
      //   );

      //   if (deleteCategory) {
      //     return true;
      //   } else {
      //     return false;
      //   }
      // } else {
      //   return "Category doesn't exist";
      // }
    } catch (err) {
      return false
      console.log(err);
    }
  }

  static async updateCategory(categoryId, data) {
    try {
      const category = await Category.updateOne({ _id: categoryId }, { data });
      if (category) return true;
      else return false;
    } catch (err) {
      console.log(err);
    }
  }

  static async getCategoryById(categoryId) {
    try {
      const category = await Category.findById(categoryId);
      if (category) return category;
      else return false;
    } catch (err) {
      console.log(err);
    }
  }
  static async getAllCategoriesByVendor(vendorId) {
    try {
      const category = await Category.find({ vendor_id: vendorId });
      if (category) return category;
      else return false;
    } catch (err) {
      console.log(err);
    }
  }
  static async getAllCategories() {
    try {
      const category = await Category.find();
      if (category) return category;
      else return false;
    } catch (err) {
      console.log(err);
    }
  }

  static async getAllProductsOfCategoryById(categoryId) {
    try {
      const product = await Product.find({ category_id: categoryId });
      if (product) return product;
      else false;
    } catch (err) {
      console.log(err);
    }
  }
}
