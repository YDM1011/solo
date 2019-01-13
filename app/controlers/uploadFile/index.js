const mime = require('mime-types');
const fs = require('fs');
const data = require('../../config/config').data;
module.exports = (req,res,next)=>{
    console.log(req.body.file);
    /*if (req.file.size > 50 * 1024 * 1024) {

        return fs.unlink(req.file.path, err=>  {
            res.badRequest("File is too large");
        });
    }

    function base64_encode(file) {
        var bitmap = fs.readFileSync(file);
        return new Buffer(bitmap).toString('base64');
    }
    base64_encode(req.file.path);
*/
    var base64Data;
    if (req.body.base64default.search("image/jpeg") >= 0){
        base64Data = req.body.base64default.replace(/^data:image\/jpeg;base64,/, "");
    } else
    if (req.body.base64default.search("image/png") >= 0){
        base64Data = req.body.base64default.replace(/^data:image\/png;base64,/, "");
    }
    var base64DataCrop;
    if (req.body.base64crop.search("image/jpeg") >= 0){
        base64DataCrop = req.body.base64crop.replace(/^data:image\/jpeg;base64,/, "");
    } else
    if (req.body.base64crop.search("image/png") >= 0){
        base64DataCrop = req.body.base64crop.replace(/^data:image\/png;base64,/, "");
    }

    fs.writeFile(`upload/Crop${req.body.file}`, base64DataCrop, 'base64', function(err) {
        fs.writeFile(`upload/${req.body.file}`, base64Data, 'base64', function(err) {
            res.ok({
                url: `${data.auth.apiDomain}Crop${req.body.file}`,
            });
        });
    });

    // return fs.unlink(req.file.path);
};