module.exports = (req, res, next) => {
    res.send(JSON.stringify({res:req.body.login}) );
};