const mime = require('mime-types');
const fs = require('fs');
const mongoose = require('mongoose');
// const Post = mongoose.model('post');
const data = require('../../config/config').data;

/**
 * *
 * @param req
 * @param res
 * @returns {Promise}
 */

const createPic = (reqBody, res) => {
    let obj = Object.assign({},reqBody);
    return new Promise((resolve, reject)=>{
        mongoose.model('galery')
            .create(obj, (err, result) =>{
                if (err) return res.badRequest(err);
                if (!result) return res.notFound();
                if (result) {
                    resolve(result);
                }
            })
    })
};
const checkPic = (req, res) => {
    let obj = Object.assign({},req.body);
    let query = {};
    query[req.body.field] = req.body.id;

    return new Promise((resolve, reject)=>{
        mongoose.model(req.body.model)
            .findOne(query)
            .select(req.body.field)
            .exec(obj, (err, result) =>{
                if (err) return res.badRequest(err);
                if (!result) return res.notFound();
                if (result) {
                    resolve(result);
                }
            })
    })
};
const sendPicToModel = (reqBody, res, imgId) => {
    let obj = {};
        obj[reqBody.field] = imgId;
    let query = {};
    let protectField = getFieldOfProtect(reqBody.model);
    if (protectField){
        query[protectField] = reqBody.owner;
        query['_id'] = reqBody.id;
    } else {
        query['_id'] = reqBody.owner;
    }
    console.log(query, obj);

    return new Promise((resolve, reject)=>{
        mongoose.model(reqBody.model)
            .findOneAndUpdate(query, obj, {new: true}, (err, result) =>{
                if (err) return res.badRequest(err);
                if (!result) return res.notFound();
                if (result) {
                    resolve(result);
                }
            })
    })
};
const updatePic = (req, res) => {
    let obj = Object.assign({},req.body);

    delete obj.owner;

    let query = {
        _id: req.body.id
    };
    query[req.body.field] = req.body.id;
    return new Promise((resolve, reject)=>{
        mongoose.model(req.body.model)
            .findOneAndUpdate(query, obj, {new: true}, (err, result) =>{
                if (err) return res.badRequest(err);
                if (!result) return res.notFound();
                if (result) {
                    resolve(result);
                }
            })
    })
};

const getFieldOfProtect = (model) => {
    const obj = {
      dish: "owner"
    };
    return obj[model];
};

const sendRes = async (req,res) => {
    let id = req.body.id; //optional if null then use req.userId
    let model = req.body.model;
    let field = req.body.field;
    let reqBody = {
        id : id ? id : req.userId,
        owner : req.userId,
        model : model,
        field : field,
        picCrop : req.body.picCrop,
        picDefault : req.body.picDefault
    };

    if (!id && model && field){
        let result = await createPic(reqBody,res);
        if(result){
            let status = await sendPicToModel(reqBody, res, result._id); //id model of image
            if (status){
                let url = {url: reqBody.picCrop};
                return res.ok({url,result});
            }
        }
    }

    if(id && model && field){
        let checkPic = await checkPic(req,res);
        if (checkPic){
            let result = await updatePic(req,res);
            if(result){
                let url = {url: reqBody.picCrop};
                return res.ok({url,result});
            }
        }
    }

    return res.badRequest();
};

module.exports = (req,res,next)=>{
    console.log(req.body.file);

    let base64Data, base64DataCrop;

    if (req.body.base64default.search("image/jpeg") >= 0){
        base64Data = req.body.base64default.replace(/^data:image\/jpeg;base64,/, "");
    } else
    if (req.body.base64default.search("image/png") >= 0){
        base64Data = req.body.base64default.replace(/^data:image\/png;base64,/, "");
    }
    if (req.body.base64crop.search("image/jpeg") >= 0){
        base64DataCrop = req.body.base64crop.replace(/^data:image\/jpeg;base64,/, "");
    } else
    if (req.body.base64crop.search("image/png") >= 0){
        base64DataCrop = req.body.base64crop.replace(/^data:image\/png;base64,/, "");
    }
    let prefics = new Date().getTime();
    fs.writeFile(`upload/${prefics}Crop${req.body.file}`, base64DataCrop, 'base64', function(err) {
        fs.writeFile(`upload/${prefics}${req.body.file}`, base64Data, 'base64', function(err) {

            req.body.picCrop = `${data.auth.apiDomain}${prefics}Crop${req.body.file}`;
            req.body.picDefault = `${data.auth.apiDomain}${prefics}${req.body.file}`;
            sendRes(req,res);
        });
    });

};

