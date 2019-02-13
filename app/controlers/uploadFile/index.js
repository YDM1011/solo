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

const getPic = (idPic, res) => {
    return new Promise((resolve, reject)=>{
        mongoose.model('galery')
            .findOne({_id: idPic})
            .exec((err, result) =>{
                if (err) return res.badRequest(err);
                if (!result) resolve();
                if (result) {
                    resolve(result);
                }
            })
    })
};
const checkPicInPost = (idPic, res) => {
    return new Promise((resolve, reject)=>{
        mongoose.model('post')
            .count({img:{$in: idPic}})
            .exec((err, result) =>{
                if (err) return res.badRequest(err);
                if (!result) return resolve(false);
                if (result) {
                    resolve(result);
                }
            })
    })
};
const delPic = (idPic, res) => {
    return new Promise((resolve, reject)=>{
        mongoose.model('galery')
            .findOneAndRemove({_id: idPic}, (err, result) =>{
                if (err) reject(err);
                resolve()
            })
    })
};

const checkPic = (reqBody, res) => {
    let obj = Object.assign({},reqBody);
    let noResObj = {};
        noResObj[reqBody.field] = false;
    let query = {};
    let protectField = getFieldOfProtect(reqBody.model);
    if (protectField){
        query[protectField] = reqBody.owner;
        query['_id'] = reqBody.id;
    } else {
        query['_id'] = reqBody.owner;
    }
    return new Promise((resolve, reject)=>{
        mongoose.model(reqBody.model)
            .findOne(query)
            .select(reqBody.field)
            .exec(obj, (err, result) =>{
                if (err) return res.badRequest(err);
                if (!result) resolve(noResObj);
                if (result) {
                    mongoose.model('galery')
                        .findOne({_id: result[reqBody.field]})
                        .exec((err,resPic)=>{
                            if (err) return res.badRequest(err);
                            if (!resPic) resolve(noResObj);
                            if (resPic) resolve(result);
                        });
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
        query[protectField] = toObjectId(reqBody.owner);
        query['_id'] = toObjectId(reqBody.id);
    } else {
        query['_id'] = toObjectId(reqBody.owner);
    }

    return new Promise((resolve, reject)=>{
        mongoose.model(reqBody.model)
            .findOneAndUpdate(query, obj, {new: true}, async (err, result) =>{
                if (err) return res.badRequest(err);
                if (!result){
                    await delFile(reqBody);
                    return res.notFound();
                }
                if (result) {
                    resolve(result);
                }
            })
    })
};
function toObjectId(ids) {
    if (ids.constructor === Array) {
        return ids.map(mongoose.Types.ObjectId);
    }
    return mongoose.Types.ObjectId(ids).toString();
    // mongoose.Types.ObjectId(info.userId).toString();
}
const updatePic = (picData, reqBody, res) => {
    let obj = Object.assign({},reqBody);

    let query = {
        _id: picData._id
    };
    return new Promise((resolve, reject)=>{
        mongoose.model('galery')
            .findOneAndUpdate(query, obj, {new: true}, (err, result) =>{
                if (err) return res.badRequest(err);
                if (!result) return res.notFound();
                if (result) {
                    resolve(result);
                }
            })
    })
};

const delFile = (reqBody)=>{
    return new Promise((resolve, reject)=>{
        fs.unlink("upload/"+reqBody.picCrop.split(data.auth.apiDomain)[1], fsCallbeack=>{
        // fs.unlink("upload/"+reqBody.picDefault.split(data.auth.apiDomain)[1], fsCallbeack=>{
            resolve(fsCallbeack)
        // })
        })
    })
};

const getFieldOfProtect = (model) => {
    const obj = {
      dish: "owneruser",
      establishment: "owner",
    };
    return obj[model];
};

const sendRes = async (req,res) => {
    let id = req.body.id; //optional if null then use req.userId
    let model = req.body.model;
    let field = req.body.field;
    let fileName = req.body.fileName;
    let reqBody = {
        id : id ? id : req.userId,
        owner : req.userId,
        model : model,
        field : field,
        fileName: fileName,
        picCrop : req.body.picCrop
    };

    if (model && field){

        let pic = await checkPic(reqBody,res);
        if (pic[reqBody.field]){
            let picData = await getPic(pic[reqBody.field], res);
            await delFile(picData);
            let result = await updatePic(picData, reqBody, res);
            let url = {url: result.picCrop};
            return res.ok({url,result});
        }else{
            let result = await createPic(reqBody,res);
            if(result){
                let status = await sendPicToModel(reqBody, res, result._id); //id model of image
                if (status){
                    let url = {url: reqBody.picCrop};
                    return res.ok({url,result});
                }
            }
        }
    }

    return res.badRequest();
};

module.exports.upload = (req,res,next)=>{

    let base64Data;

    if (req.body.base64crop.search("image/jpeg") >= 0){
        base64Data = req.body.base64crop.replace(/^data:image\/jpeg;base64,/, "");
    } else
    if (req.body.base64crop.search("image/png") >= 0){
        base64Data = req.body.base64crop.replace(/^data:image\/png;base64,/, "");
    }
    let prefics = new Date().getTime();
    fs.writeFile(`upload/${prefics}${req.body.fileName}`, base64Data, 'base64', function(err) {

        req.body.picCrop = `/${prefics}${req.body.fileName}`;
        sendRes(req,res);
    });

};
const delFileById = async (picId,res,next)=>{
    let picData = await getPic(picId, res);
    let isPic = await checkPicInPost(picId, res);
    if (picData && !isPic){
        await delPic(picId);
        await delFile(picData);
        next()
    }else{
        next()
    }
};

module.exports.delFileById = delFileById;