import * as userApi from '../api/controllers/user';

module.exports = (router)=>{
    router.get('/',(req,res)=>{
        res.status(200);
        return res.json({status : "Up and Running"});
    });
    router.post('/signup',userApi.signup);
    router.post('/login',userApi.login);
    router.get('/activateUser/:activationToken',userApi.activateToken);
}