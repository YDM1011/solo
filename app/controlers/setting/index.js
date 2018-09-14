module.exports = (req, res, next) => {
    res.ok({
        userId: req.userId,
        avatar: req.avatar
    })
};