const mime = require('mime-types');
const fs = require('fs');
const data = require('../../config/config').data;
module.exports = (req,res,next)=>{
    console.log(req.file);
    if (req.file.size > 50 * 1024 * 1024) {

        return fs.unlink(req.file.path, err=>  {
            res.badRequest("File is too large");
        });
    }

    function base64_encode(file) {
        var bitmap = fs.readFileSync(file);
        return new Buffer(bitmap).toString('base64');
    }
    base64_encode(req.file.path);

    var base64Data;
    if (req.file.mimetype === "image/jpeg"){
        base64Data = req.body.base64default.replace(/^data:image\/jpeg;base64,/, "");
    } else
    if (req.file.mimetype === "image/png"){
        base64Data = req.body.base64default.replace(/^data:image\/png;base64,/, "");
    } else {
        return fs.unlink(req.file.path, err=>  {
            res.badRequest("type fail");
        });
    }

    fs.writeFile(`upload/${req.file.originalname}`, base64Data, 'base64', function(err) {
        fs.unlink(req.file.path,err=>{
            res.ok({
                url: `${data.auth.apiDomain}${req.file.originalname}`,
            });
        });
    });

    // return fs.unlink(req.file.path);
};