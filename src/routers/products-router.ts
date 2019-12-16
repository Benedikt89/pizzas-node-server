import {productsRepository} from "../dal/products-repository";
import {upload} from "../dal/ImageHolder";
import express, {NextFunction, Request, Response} from "express";
import * as fs from "fs";

const checkAuth = require("./../middleware/check-auth");

const router = express.Router();

router.get('/',
    async (req: Request, res: Response) => {
    try {
        let products = await productsRepository.getProducts();
        res.send(products);
        console.log('get Products');
        console.log("Cookies :  ", req.cookies);
    } catch (e) {
        res.send(e.message)
    }
});
router.get('/:id',
    async (req: Request, res: Response) => {
    const productId = req.params.id;
    let product = await productsRepository.getProducts(productId);
    if (product) res.send(product);
    res.send(404)
});

router.put('/', checkAuth,
    async (req: Request, res: Response) => {
    let newProduct = req.body;
    await productsRepository.updateProduct(newProduct);
    res.send(204)
});

router.delete('/:id', checkAuth,
    async (req: Request, res: Response) => {
    try {
        const productId = req.params.id;
        let founded = await productsRepository.getProduct(productId);

        await fs.unlink(`${founded.photo}`, (err) => {
            if (err)
                throw err;
            console.log(`${founded.photo} was deleted`);
        });
        productsRepository.deleteProduct(productId);

        return res.status(204).send(founded)
    } catch (e) {
        return res.status(400).send(e);
    }
});

router.post('/', checkAuth, upload.single('image'),
    async (req: Request, res: Response, next: NextFunction) => {
    try {
        //checking file
        const file = req.file;
        if (!file) {
            const error: any = new Error('Please upload a file');
            error.status = 400;
            return next(error)
        }

        let product = {...req.body, photo: file.path};
        let result = await productsRepository.addProduct(product);
        return res.send(result);
    } catch (error) {
        console.log(error);
        return res.status(400).send(error);
    }
});

export default router;