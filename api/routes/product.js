var express = require("express");
var router = express.Router();
var mysql = require("mysql");
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "torob",
  });
con.connect(function (err) {
    if (err) throw err;
  });
  const jwt = require('jsonwebtoken');
  const dotenv = require('dotenv');
  dotenv.config();
  process.env.TOKEN_SECRET;
  function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
   
    if (token == null) return res.sendStatus(401);
  
      jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
 
  
      if (err) return res.sendStatus(403);
  
      req.user = user;
  
      next();
    });
  }

router.get("/getshop",(req,res)=>{
    var productid=req.body.productid;
    var type=req.body.type;
    if(type=="laptop"){
        var sql="SELECT gpu,cpu,ram,Page_dimensions,commodity.name as commodityname,shop_commodity.commodityid,shop.name as shopname ,shop.id as shopid,shop.city as shopcity,shop_commodity.price as shopprice,shop_commodity.link as shoplink  from commodity join shop_commodity on shop_commodity.commodityid=commodity.id join "+type+" on "+type+".commodityid=commodity.id join shop on shop.id=shop_commodity.shopid where shop_commodity.commodityid='"+productid+"'"
    }else{
        var sql="SELECT ram,weight,color,warranty,commodity.name as commodityname,shop_commodity.commodityid,shop.name as shopname ,shop.id as shopid,shop.city as shopcity,shop_commodity.price as shopprice,shop_commodity.link as shoplink  from commodity join shop_commodity on shop_commodity.commodityid=commodity.id join "+type+" on "+type+".commodityid=commodity.id join shop on shop.id=shop_commodity.shopid where shop_commodity.commodityid='"+productid+"'"
    }
    
    con.query(sql,function(err,result){
        if(err) throw err;
        if(type=="laptop"){
            res.send({
                productname:result[0].commodityname,
                product:result[0].commodityid,
                ram:result[0].ram,
                gpu:result[0].gpu,
                page_dimensions:result[0].Page_dimensions,
                cpu:result[0].cpu,
                shops:result.map((index)=>{
                    return{
                            shopname:index.shopname,
                            shopid:index.shopid,
                            shopcity:index.shopcity,
                            shopprice:index.shopprice,
                            shoplink:index.shoplink,

                    }
                })
            })
        }else{
            res.send({
                ram:result[0].color,
                gpu:result[0].ram,
                weight	:result[0].weight,
                warranty:result[0].warranty,
                shops:result.map((index)=>{
                    return{
                        shopname:index.shopname,
                        shopid:index.shopid,
                        shopcity:index.shopcity,
                        shopprice:index.shopprice,
                        shoplink:index.shop,
                    }
                })
            })
        }
    
    })
})
router.get("/get")
module.exports = router;