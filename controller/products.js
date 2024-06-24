
const fs =require("fs");
// const data = JSON.parse(fs.readFileSync('data.json', 'utf-8'))
// const products = data.products ;
 

// require means : i am using commonjs module
const mongoose =require("mongoose");

const model = require("../lib/model/item");
const Product = model.Product;

exports.createProduct = async (req,res)=> {
    try {
        const product = new Product(req.body);
        await product.save();
        res.status(201).json(product);
    } catch (err) {
        console.error('Error creating product:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
  //  const product = new Product(req.body);
  //   await product.save();
    // product.save((err,doc)=>{
    //     console.log(err,doc);
    //     res.status(201).json(doc);
    // })
  
}

 exports.getAllProduct = async (req,res)=> {
    const products = await Product.find();
    res.json(products);
}

exports.getProduct =(req,res)=> {
    const id = req.params.id;
    const product = products.find(product => product.id == id);
    res.json(product);
}

exports.updateProduct =  (req,res)=> {
    const id = req.params.id;
    const productInd = products.findIndex(product => product.id == id);
     const product = products[productInd];
    products.splice(productInd, 1, {...product, ...req.body, id:id});
    res.status(201).json({sucess : true});
}

exports.deleteProduct = (req,res)=> {
    const id = req.params.id;
    const productInd = products.findIndex(product => product.id == id);
     const product = products[productInd];
    products.splice(productInd, 1);
    res.status(201).json({sucess : true, product : product});   
}