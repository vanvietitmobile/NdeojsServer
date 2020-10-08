const postusModel = require("../Model/Postus");
const userModel = require("../Model/Users");

exports.create_product = async (req, res) => {
  new postusModel({
    email: req.body.email,
    fullname: req.body.fullname,
    title: req.body.title,
    content: req.body.content,
    address: req.body.address,
    date: req.body.date,
    image: req.body.image, // cai nays no nhan ten name @part moi na ne ong 
    active: false,
  }).save((err) => {
    if (err) {
      console.log(err);
    } else {
      res.send({
        status: true,
        message: "Success",
      });
    }
  });
};
exports.get_product = async (req, res) => {
  await postusModel
    .find()
    .lean()
    .exec((err, data) => {
      if (err) {
        console.log(err);
      } else {
        data.reverse();
        res.send({ status: true, message: "Succesfully", PostusModel: data });
      }
    });
};

exports.get_product_check_unapproved = async (req, res) => {
  try {
     await postusModel.find({email: req.body.email},(err, data)=>{
      if (err) {
        console.log(err);
      }else{
         res.send({
           status: true,
           message: "Succesfully",
           PostusModel: data,
         });
      }
    })
  
  } catch (error) {
    console.log(error);
  }
};  
exports.delete_product = async (req, res) => {
  const deletes = await postusModel.findByIdAndDelete({_id:req.body._id});
  if (deletes) {
    res.send({status:true, message: 'Product deleted'});
  } else {
    res.send({ status: false, message: "Product deleted fail" });
    
  }
};
exports.edit_product = async (req, res) => {
  await postusModel.findByIdAndUpdate({_id:req.body._id},
    {
      title:req.body.title,
      content: req.body.content,
      address: req.body.address,
      date: req.body.date,
      image: req.body.image,
      active: false,
    },(err, data) =>{
      if (err) {
      }else{
        res.send({status:true,message:"Update Succesfully"})
      }
    })
};
exports.get_product_id = async (req, res) => {
  await postusModel.findOne({_id: req.body._id},(err, data)=>{
    if (err) {
      console.log(err);
    }else{
      console.log(data);
        res.send(data);
    
    }
  });
};

exports.change_Active = async (req, res) => {
  await postusModel.findByIdAndUpdate(
    {
      _id: req.body._id,
    },
    {
      active: req.body.active,
    },
    (err, data) => {
      if (err) {
        console.log(err);
      } else {
        res.send({
          status: true,
          message: "Success",
        });
      }
    }
  );
};
