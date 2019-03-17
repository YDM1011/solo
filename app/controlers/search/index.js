const mongoose = require('mongoose');
module.exports.get = async (req,res,next)=>{
    let search = req.query.search;
    let users = await getUsers(search);
    let est = await getEst(search);
    res.ok({users, est});
};
module.exports.getUser = async (req,res,next)=>{
    let search = req.query.search;
    let users = await getUsers(search);
    res.ok(users);
};
module.exports.getEst = async (req,res,next)=>{
    let search = req.query.search;
    let est = await getEst(search);
    res.ok(est);
};

const getUsers =  search => {
    return new Promise((resolv,reject)=>{
        let s = JSON.parse(search);
        mongoose.model('user')
            .find({$or: [{firstName: new RegExp( s, 'gi' )},
                    {lastName: new RegExp( s, 'gi' )}]})
            .where('login').ne('admin')
            .populate({path:"photo"})
            .populate({path:"myEstablishment"})
            .select("_id photo firstName lastName myEstablishment")
            .exec((err,result)=>{
                if (result) {
                    return resolv(result)
                }
            })
    });
};
const getEst =  search => {
    return new Promise((resolv,reject)=>{
        let s = JSON.parse(search);
        mongoose.model('establishment')
            .find({$or: [{name: new RegExp( s, 'gi' )},
                    {subdomain: new RegExp( s, 'gi' )}]})
            .where('login').ne('admin')
            .populate({path:"av"})
            .select("_id name subdomain")
            .exec((err,result)=>{
                if (result) {
                    return resolv(result)
                }
            })
    });
};

// new RegExp(`/${search}/`, 'gi')