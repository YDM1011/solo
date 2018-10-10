const mime = require('mime-types');
const fs = require('fs');
module.exports = (req,res,next)=>{
    if (req.file.size > 5 * 1024 * 1024) {
        res.badRequest("File is too large");
        return fs.unlink(req.file.path);
    }

    function base64_encode(file) {
        var bitmap = fs.readFileSync(file);
        return new Buffer(bitmap).toString('base64');
    }

    var base64str = base64_encode(req.file.path);
    res.ok({
        image: base64str,
    });

    return fs.unlink(req.file.path);
};