const mongoose = require('mongoose');
const Oneest = mongoose.model('oneest');
const Menu = mongoose.model('menu');
const Category = mongoose.model('category');

module.exports = async (req,res,next) =>{
    let estsId = await findAllEstSelectId().catch(err=>{return res.badRequest(err)});
    let categ = await getCatFromMenu(estsId).catch(err=>{return res.badRequest(err)});
    res.ok(categ)
};

const findAllEstSelectId = ()=>{
    return new Promise((resolve,reject)=>{
        Oneest.find({}).select('_id menus categoriInUse').exec((e,r)=>{
            if (r){
                resolve(r)
            }else{
                let err = e || '';
                reject(err)
            }
        })
    })
};

const getCatFromMenu = (estsId)=>{
    return new Promise(async (resolve,reject)=>{
        if (estsId)
        await asyncForEach(estsId, async (est)=>{
            await asyncForEach(est.menus, async (menu)=>{
                Menu.findOne({_id:menu._id})
                    .populate({path: "categories", select:"maincategory"})
                    .select('_id categories').exec((e,r)=>{
                    if (r){
                        let cat = [];
                        r.categories.map(it=>{
                            if (it.maincategory)
                            cat.push(it.maincategory);
                        });
                        Oneest.findOneAndUpdate({_id:est._id, categoriInUse:{$nin:cat}},
                            {$push:{categoriInUse:cat}}, {newm: true})
                            .select('_id menus categoriInUse').exec((e,r)=>{
                            if (r){
                                resolve(r)
                            }else{
                                let err = e || '';
                                reject(err)
                            }
                        })
                    }else{
                        let err = e || '';
                        reject(err)
                    }
                })

            });
        });

        resolve(estsId)
    })
};

const pushPull = (req,res,info)=>{
    const Oneest = mongoose.model('oneest');
    const Menu = mongoose.model('menu');
    console.log(info._id);
    Oneest.find({menus:{$in:info._id}})
        .exec(async (e,ests)=>{
            if(e) return null;
            if(ests){
                await asyncForEach(ests, async est=>{
                    let catArr = [];
                    await new Promise(async (resolve,reject)=> {
                        await asyncForEach(est.menus, async menu=>{
                            await new Promise(async (resolve,reject)=> {
                                Menu.findOne({_id: menu})
                                    .populate({path: "categories", select:"maincategory"})
                                    .select('_id categories').exec((e, r) => {
                                    if (r) {
                                        let cat = [];
                                        r.categories.map(it=>{
                                            if (it.maincategory)
                                                cat.push(it.maincategory);
                                        });
                                        catArr = catArr.concat(cat)
                                    }
                                    resolve()
                                })
                            })
                        });
                        resolve()
                    });

                    Oneest.findOneAndUpdate({_id:est._id},
                        {categoriInUse:catArr}, {newm: true})
                        .select('_id menus categoriInUse').exec((e,r)=>{})
                });

            }
        });
};

module.exports.pushPull = pushPull;

async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}