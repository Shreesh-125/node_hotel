const express=require('express');
const router = express.Router();

const MenuItem = require("./../models/MenuItem");



// post method for menu
router.post("/", async (req, res) => {
    try {
      const data = req.body;
  
      const newmenuItem = new MenuItem(data);
  
      const response = await newmenuItem.save();
      console.log("menuItem saved successfully");
      res.status(200).json(response);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal error in Db Server" });
    }
  });
  
  // get method for menu
  router.get("/", async (req, res) => {
    try {
      const data = await MenuItem.find();
      console.log("data fetched successfully");
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal error in Db Server" });
    }
  });

  router.get('/:taste',async (req,res)=>{
    try {
        const menuItemtaste=req.params.taste;

        if(menuItemtaste==="sweet" || menuItemtaste==="spicy" || menuItemtaste==="sour"){
        const data= await MenuItem.find({taste:menuItemtaste});
        console.log("data fetched");
        res.status(200).json(data);
        }
        else{
            return res.status(404).json({error:"taste tupe is Invalid"})
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Internal Server Error"})
    }
  })
  
  router.delete('/:id',async (req,res)=>{
    try {
      const menuItemId=req.params.id;

      const response= MenuItem.findByIdAndDelete(menuItemId);

      if(!response){
        return res.status(404).json({error:"MenuItem Not Found"});
    }
      console.log("Deleted Succesfully");
      res.status(200).json(response);
    } catch (error) {
      console.log("Not able to Delete");
      res.status(500).json({error:"Internal Sever Error"})
    }
  })
  module.exports=router