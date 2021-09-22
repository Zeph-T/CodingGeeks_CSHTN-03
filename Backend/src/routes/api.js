import * as userApi from '../api/controllers/user';
import * as itemApi from '../api/controllers/item'

module.exports = (router)=>{
    router.get('/',(req,res)=>{
        res.status(200);
        return res.json({status : "Up and Running"});
    });
    router.post('/getItemsForHomePage',userApi.signup);
    router.get('/convertArray',itemApi.filterStringsToArrays);
}