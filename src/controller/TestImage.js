const image = require('../Model/image');

exports.createImage = async (req,res) => {
    let array = req.files;
    let imagesNameList = [];
    array.forEach(element => {
        imagesNameList.push(element.originalname);
    });
    console.log(imagesNameList);
    await new image({
        image:imagesNameList,
    }).save(err => {
        if (err){
            console.log(err);
        }else{
            res.send({status:true});
        }
     })
}