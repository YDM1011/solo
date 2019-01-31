module.exports = (req,res,next) =>{
    const allowedOrigins = [
        'http://localhost:4300',
        'http://localhost:4200',
        'http://*.localhost:5000',
        'http://*.*.localhost:5000',
        'http://localhost:5000',
        'https://*.tasteol1.com',
        'https://tasteol1.com',
        'https://*.tasteol.com',
        'https://tasteol.com',];
    const origin = req.headers.origin;
    if(allowedOrigins.indexOf(origin) > -1){
        res.setHeader('Access-Control-Allow-Origin', origin);
        res.setHeader('AMP-Access-Control-Allow-Source-Origin', origin);
    }
    res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', true);
    next();
};
