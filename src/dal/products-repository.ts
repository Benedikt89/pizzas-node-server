import {IProductItem, IProductToCreate} from "../../../Core/products-types";

const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {type:String, required: true},
    photo: {type:String, required: true},
    // price: {type: Number, required: true},
    // size: {type: Number, required: true},
    // text_long: {type:String, required: true},
    // text_short: {type:String, required: true},
});
const Product = mongoose.model('pizzas', productSchema);


export const productsRepository = {

    getProducts(search?:any): Promise<Array<IProductItem>> {
        if (!search) {
            return Product.find()
                .select('name price id photo')
                .exec()
                .then((docs: any) => {
                    return {
                        count: docs.length,
                        pizzas: docs.map((doc: any) => {
                            return {
                                id: doc.id,
                                name: doc.name,
                                price: doc.price,
                                photo: `http://localhost:8000/${doc.photo}`
                            }
                        })
                    }
                })
        }
        else return Product.find({_id: new RegExp(search)})
    },
    updateProduct(poroductId: string, newProduct: any): Promise<any> {
        return Product.update({_id: poroductId}, newProduct)
    },
    deleteProduct(poroductId: string): Promise<any> {
        return Product.deleteOne({_id: poroductId});
    },
    addProduct(poroduct: IProductToCreate): Promise<any> {
        debugger;
        const newProduct = new Product({
            id: new mongoose.Types.ObjectId(),
            name: poroduct.name,
            // price: poroduct.price,
            // size: poroduct.size,
            // text_long: poroduct.text_long,
            // text_short: poroduct.text_short
        });
        return newProduct.save()
    }
};
