module.exports = function (req, res) {
    res.serverError = function (data) {
        res.status(500).send({error:data});
    };
};
