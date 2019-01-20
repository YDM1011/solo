const mongoose = require('mongoose');
module.exports.get = async (req,res,next)=>{
    let search = req.query.search;
    let users = await getUsers(search);
    let est = await getEst(search);
    res.ok({users, est});
};

const getUsers =  search => {
    return new Promise((resolv,reject)=>{
        let s = JSON.parse(search);
        mongoose.model('user')
            .find({$or: [{firstName: new RegExp( s, 'gi' )},
                    {lastName: new RegExp( s, 'gi' )}]})
            .where('login').ne('admin')
            .exec((err,result)=>{
                if (result) {
                    console.log(result);
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
            .exec((err,result)=>{
                if (result) {
                    console.log(result);
                    return resolv(result)
                }
            })
    });
};

// new RegExp(`/${search}/`, 'gi')