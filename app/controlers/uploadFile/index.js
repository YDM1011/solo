const mime = require('mime-types');
const fs = require('fs');
const data = require('../../config/config').data;
module.exports = (req,res,next)=>{
    if (req.file.size > 5 * 1024 * 1024) {
        res.badRequest("File is too large");
        return fs.unlink(req.file.path);
    }

    function base64_encode(file) {
        var bitmap = fs.readFileSync(file);
        return new Buffer(bitmap).toString('base64');
    }
    console.log(req.file);
    console.log(req.body.text);
    var base64str = base64_encode(req.file.path);


    var base64Data = req.body.text.replace(/^data:image\/jpeg;base64,/, "");
    fs.unlinkSync(req.file.path);

    fs.writeFile(`upload/${req.file.originalname}`, base64Data, 'base64', function(err) {
        return res.ok({
            image: `${data.auth.apiDomain}${req.file.originalname}`,
        });
    });

    // return fs.unlink(req.file.path);
};