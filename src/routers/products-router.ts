import {productsRepository} from "../dal/products-repository";
import cors from "cors";

const express = require("express");
const router = express.Router();

const multer = require("multer");

interface Error{
    status?: number;
}

const storage = multer.diskStorage({
    destination: (req:any, file:any, cb:any) => {
        let type = req.params.type;
        let path = `static/images/${type}`;
        //fs.mkdirsSync(path);
        cb(null, `static/images`);
    },
    filename: function (req:any, file:any, cb:any) {
        cb(null, Date.now()+ file.originalname)
    }
});

const fileFilter = (req:any, file:any, cb:any) => {
    if (file.mimetype === 'image/png'|| file.mimetype === 'image/jpg'){
        cb(null, true);
    } else {
        cb(new Error('message'), false);
    }
};
const upload = multer({
    storage: storage,
    limits: {fileSize: 1024 * 1024 * 5},
//    fileFilter: fileFilter
});

router.get('/', async (req:any, res:any) =>{
    try {
        let products = await productsRepository.getProducts(req.query.search);
        res.send(products);
        console.log('get Products');
    }
    catch (e) {
        res.send(e.message)
    }
});
router.get('/:id', async (req:any, res:any)=>{
    const productId = req.params.id;
    let user = await productsRepository.getProducts(productId);
    if (user) res.send(user);
    res.send(404)
});

router.put('/', async (req:any, res:any)=>{
    let newProductName = req.body.name;
    const userId = req.body.id;
    await productsRepository.updateProduct(userId, newProductName);
    res.send(204)
});
router.delete('/:id', async (req:any, res:any)=>{
    const userId = req.params.id;
    await productsRepository.deleteProduct(userId);
    res.send(204)
});
router.post('/', upload.single('image'), async (req:any, res:any, next:any)=>{
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