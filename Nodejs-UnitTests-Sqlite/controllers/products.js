const Products = require('../models/products');

const controllers = {}


//add product
controllers.add_product = (req, res)=>{
    console.log("add product controller works")
    const {name, price, mrp, stock} = req.body
    const isPublished = false
    Products.create({name, price, mrp, stock, isPublished})
    .then(product=>{
        return res.status(201).send(product)
    })
    .catch(err=>{
        return res.status(500).json({error:err})
    })
}



//get products
controllers.get_products = (req, res)=>{
    console.log("product controller works")
    Products.findAll() 
    .then(products=>{
        return res.status(200).send(products)
    }).catch(err=>{
        return res.status(500).json({error:err})
    })
}

//patch product
controllers.patch_product = (req, res)=>{
    console.log("edit product works")
    const id  = req.params.id
    const {price} = req.body    

    Products.findByPk(id)
    .then(old_profile=>{
        
        //   validation
        val_errors = Array()  
        if(old_profile.mrp <= price){val_errors.push('MRP should be less than equal to Price')}
        if(old_profile.stock < 1){val_errors.push('product is out of stock')}
        if(val_errors.length){return res.status(422).send(val_errors)}
        
        isPublished = true 

        old_profile.update({isPublished})
        .then(_profile=>{
            console.log("updated")
            return res.status(204).send()
        })
        .catch(err=>{
            return res.status(500).json({error:err})
        })

    }).catch(err=>{
        return res.status(500).json({error:err})
    })
   
}

//put product 
controllers.edit_product = (req, res)=>{
    return res.status(405).json({error: "Api does not allow deleting or modifying any products"})
}


//delete or put product 
controllers.delete_product = (req, res)=>{
    return res.status(405).json({error: "Api does not allow deleting or modifying any products"})
}



// //edit product
// controllers.edit_product = (req, res)=>{
//     console.log("edit product works")
//     const id  = req.params.id
//     const profile = {}
//     const {name, price, mrp, stock} = req.body
//     if(name){profile.name =name}
//     if(price){profile.price = price}
//     if(mrp){profile.mrp = mrp}
//     if(stock){profile.stock = stock}
    



//     Products.findByPk(id)
//     .then(old_profile=>{
//         //   validation 
//         val_errors = Array()  
        
//         if(old_profile.mrp <= price){val_errors.push('MRP should be less than equal to Price')}
//         if(old_profile.stock < 1){val_errors.push('product is out of stock')}
//         // if(val_errors !=[]){return res.status(422).json({error: val_errors})}  
//         if(val_errors.length){return res.status(422).send(val_errors)}
        
//         profile.isPublished = true

//         old_profile.update(profile)
//         .then(_profile=>{
//             return res.status(204)
//         })
//         .catch(err=>{
//             return res.status(500).json({error:err})
//         })

//     }).catch(err=>{
//         return res.status(500).json({error:err})
//     })
   
// }



//delete product
// controllers.delete_product = (req, res)=>{
//     console.log("delete product route works")
//     const id = req.params.id
//     Products.destroy(id)
//     .then((success)=>{
//         return res.status(201).json({success:success})
//     }).catch((err)=>{return res.status(500).json({error:err})})
// }

//get one product
// controllers.get_product = (req, res)=>{
//     console.log("get one product route works")
//     const id = req.params.id
//     Products.findByPk(id)
//     .then(product=>{
//         return res.status(201).json(product)
//     }).catch((err)=>{return res.status(500).json({error:err})})
// }

module.exports = controllers
