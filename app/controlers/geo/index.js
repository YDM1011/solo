const mongoose = require('mongoose');
module.exports.get = async (req,res,next)=>{
    // let chain = await getChain();
    // let est = await getEst(chain);
    let est = await getEsts();
    let ests = await parseEsts(req,est);
    res.ok(ests);
};
module.exports.get1 = async (req,res,next)=>{
    let chain = await r1();
    let r = await r2(chain);
    res.ok(r);
};

const getEst = chain => {
    return new Promise(async (resolv,reject)=> {
        let est = [];
        await asyncForEach(chain, async (ch) => {
            await asyncForEach(ch.myest, async (c) => {
                let oe = await getEstById(c);
                if (oe){
                    let oneEst = {
                        coordinates: oe.coordinates,
                        _id: oe._id,
                        name: oe.name
                    };
                    oneEst['av'] = ch.av;
                    oneEst['bg'] = ch.bg;
                    oneEst['nameCh'] = ch.name;
                    oneEst['subdomain'] = ch.subdomain;
                    oneEst['thebest'] = ch.thebest;
                    oneEst['favorite'] = ch.favorite;
                    est.push(oneEst);
                }
            });
        });
        resolv(est);
    })
};
async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}
const getChain =  () => {
    return new Promise((resolv,reject)=>{
        mongoose.model('establishment')
            .find({})
            .where("status==true")
            .populate({path:"bg av"})
            .select("subdomain name thebest favorite bg av myest")
            .exec((err,result)=>{
                if (result) {
                    resolv(result)
                }
            })
    });
};

const getEstById = id =>{
    return new Promise((resolv,reject)=>{
        mongoose.model('oneest')
            .findOne({_id:id})
            .exec((err,result)=>{
                if (result) {
                    resolv(result)
                }else{
                    resolv(null)
                }
            })
    });
};

const getEsts = () =>{
    return new Promise((resolv,reject)=>{
        mongoose.model('oneest')
            .find({})
            .populate({path:'ownerEst', populate:{path: "bg av"}})
            .populate({path:'worksTimeId'})
            .populate({path:'menus', select: "categories",
                populate:{path: "categories", select: "name maincategory",
                    populate:{path: "maincategory", select: "name status"}}
            })
            .exec((err,result)=>{
                if (result) {
                    resolv(result)
                }else{
                    resolv(null)
                }
            })
    });
};

const parseEsts = (req,ests) =>{
    return new Promise(async (resolv,reject)=>{
        let arr = [];
        let filter = req.query.filter ? req.query.filter.split(',') : null;
        console.log(req.filter);
        await asyncForEach(ests, async (est) => {
            let obj = {est, filter:[], filterString:''};
            await asyncForEach(est.menus, async (menu) => {
                await asyncForEach(menu.categories, async (cat) => {
                    if(cat.maincategory){
                        if(cat.maincategory.status === 'is'){
                            obj.filterString += '@'+cat.maincategory.name;
                            obj.filter.push({
                                value: cat.maincategory.name,
                                name: cat.name,
                            });
                        }
                    }
                });
            });
            let add = false;
            let err = false;
            console.log(filter);
            if (filter){
                for (let i = 0; i<filter.length-1; i++){
                    add = false;
                    await asyncForEach(obj.filter, async (no) => {
                        if (filter[i] == no.value){
                            add = true
                        }
                    });
                    if (!add){
                        err = true;
                    }
                }

            }else {
                add = true;
            }

            if (add && !err){
                arr.push(obj);
            }
        });
        resolv(arr)
    });
};

const uEstById = (id, ie) =>{
    return new Promise((resolv,reject)=>{
        mongoose.model('oneest')
            .findOneAndUpdate({_id:id},{ownerEst:ie})
            .exec((err,result)=>{
                if (result) {
                    resolv(result)
                }else{
                    resolv(null)
                }
            })
    });
};
const uEst = (id, arr) =>{
    return new Promise((resolv,reject)=>{
        mongoose.model('establishment')
            .findOneAndUpdate({_id:id},{myest:arr})
            .exec((err,result)=>{
                if (result) {
                    resolv(result)
                }else{
                    resolv(null)
                }
            })
    });
};

const r1 = ()=>{
    return new Promise((resolv,reject)=>{
        mongoose.model('establishment')
            .find({})
            .select("myest")
            .exec((err,result)=>{
                if (result) {
                    resolv(result)
                }
            })
    });
};

const r2 = chain =>{
    return new Promise(async (resolv,reject)=>{
        await asyncForEach(chain, async (ch) => {
            let newMyEst = [];
            await asyncForEach(ch.myest, async (c) => {

                let oe = await getEstById(c);
                if (oe){
                    await uEstById(oe._id, ch._id);
                    newMyEst.push(oe._id);
                }

            });
            uEst(ch._id, newMyEst)
        });
        resolv("ok!")
    });
};