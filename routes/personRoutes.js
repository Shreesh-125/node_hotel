const express= require('express');
const router= express.Router();

const Person = require("./../models/Person.js");


// post method for person data
router.post("/", async (req, res) => {
    try {
      const data = req.body; // the data send by client was first saved in http body but because we used bodyparser it connverted data to object and stored in re.body
  
      // create a new person document using mongoose model
      const newPerson = new Person(data);
  
      // to save newPerson in database
      const response = await newPerson.save();
      console.log("data saved");
      res.status(200).json(response);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  
  // get method to get the person
  router.get("/", async (req, res) => {
    try {
      const data = await Person.find();
      console.log("Data fetched");
      res.status(200).json(data);
    } catch (error) {
      console.log("Error while fetching data", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  // parameterized api means like if we searched localh../person/chef then there should be list of all people with profession chef so to create just like is below method
// down here we added : in url which made worktye a variable .while : will not be shown in url its just to indicate that worktype is variable so that we can get value from params
router.get("/:workType", async (req, res) => {
    try {
      const workType = req.params.workType;
  
    if (workType === "chef" || workType === "manager" || workType === "waiter") {
  
      const data = await Person.find({ work: workType });
      console.log("Data Fetched");
      res.status(200).json(data);
    }
    else{
      res.status(404).json({error:"Invalid Work type"})
    }
  }
    catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal Error of db Server" });
    }
  });

//put method
router.put('/:id',async (req,res)=>{

    try {
        const personId=req.params.id;
        const updatedPersonData= req.body;

        const response= await Person.findByIdAndUpdate(personId,updatedPersonData,{
            new:true,  //return the updated value
            runValidators:true  //runs mongoose valiadation
        })

        if(!response){
            return res.status(404).json({error:"Person not found"})
        }

        console.log("data updated");
        res.status(200).json(response)
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Internal Server Error"})
    }
})

// delete method
router.delete('/:id',async (req,res)=>{

    try {
        const personId=req.params.id;
        const response=await Person.findByIdAndDelete(personId);

        if(!response){
            return res.status(404).json({error:"Person Not Found"});
        }
        console.log("Person data deleted successfully");
        res.status(200).json(response);

    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Internal server Error"})
    }
})
   



  module.exports=router;
  