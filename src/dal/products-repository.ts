import {I_ProductsResponse, IProductItem, IProductToCreate} from "../../../Core/products-types";
import Product, {IMongoose_Product} from "./models/Product"

export const productsRepository = {

    async getProducts(search?: string): Promise<I_ProductsResponse> {
        let result = await Product.find();
        if (search) {
            result = await Product.find({_id: new RegExp(search)});
        }
        return new Promise((resolve, reject) => {
            resolve(
                {
                count: +result.length,
                products: result.map((doc: IMongoose_Product) => {
                    return {
                        id: doc.id,
                        name: doc.name,
                        price: +doc.price,
                        photo: `http://localhost:8000/${doc.photo}`,
                        size: +doc.size,
                        text_long: doc.text_long,
                        text_short: doc.text_short,
                    }
                })
            }
            )
        })
    },

    async addProduct(product: IProductToCreate): Promise<I_ProductsResponse> {
        const newProduct = new Product({
            name: product.name,
            photo: product.photo,
            price: product.price,
            size: product.size,
            text_long: product.text_long,
            text_short: product.text_short
        });
        let doc = await newProduct.save();
        return new Promise((resolve => ({
                id: doc.id,
                name: doc.name,
                price: +doc.price,
                photo: `http://localhost:8000/${doc.photo}`,
                size: +doc.size,
                text_long: doc.text_long,
                text_short: doc.text_short,
        })))
    },
    async updateProduct(newProduct: IProductItem): Promise<IProductItem> {
        return await Product.update({_id: newProduct.id}, newProduct)
    },

    async deleteProduct(poroductId: string): Promise<any> {
        return Product.deleteOne({_id: poroductId});
    },


};
