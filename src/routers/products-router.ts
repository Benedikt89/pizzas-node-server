import {productsRepository} from "../dal/products-repository";
import {upload} from "../dal/ImageHolder";
import express from "express";
const checkAuth = require("./../middleware/check-auth");

const router = express.Router();

interface Error{
    status?: number;
}


router.get('/', async (req:any, res:any) =>{
    try {
        let products = await productsRepository.getProducts();
        res.send(products);
        console.log('get Products');
    }
    catch (e) {
        res.send(e.message)
    }
});
router.get('/:id', async (req:any, res:any)=>{
    const productId = req.params.id;
    let product = await productsRepository.getProducts(productId);
    if (product) res.send(product);
    res.send(404)
});

router.put('/', checkAuth, async (req:any, res:any)=>{
    let newProduct = req.body;
    await productsRepository.updateProduct(newProduct);
    res.send(204)
});

router.delete('/:id', checkAuth, async (req:any, res:any)=>{
    const productId = req.params.id;
    await productsRepository.deleteProduct(productId);
    res.send(204)
});

router.post('/', checkAuth, upload.single('image'), async (req:any, res:any, next:any)=>{
    const file = req.file;
    if( !file ){
        const error:any = new Error('Please upload a file');
        error.status = 400;
        return next(error)
    }
    try {
        let product = {...req.body, photo: file.path};
        let result = await productsRepository.addProduct(product);
        res.send(result);
    } catch(error) {
        console.log(error);
        res.send(400);
    }
});

export default router;