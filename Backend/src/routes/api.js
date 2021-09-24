import * as userApi from '../api/controllers/user'
import * as itemApi from '../api/controllers/item'
import * as apiHelper from '../api/controllers/apiHelper';

module.exports = (router) => {
  router.use(function(req,res,next){
    apiHelper.isAuthenticatedUser(req).then(isValid=>{
        if(isValid){
            next();
        }else{
            res.status(200);
            return res.send({error:'Auth Token Expired'});
        }
    }).catch(err=>{
        res.status(400);
        return res.send({error : err});
    })
})
  router.get('/', (req, res) => {
    res.status(200)
    return res.json({ status: 'Up and Running' })
  })
  router.get('/checkForLoggedInUser',apiHelper.checkForLoggedInUser);
  router.get('/items', itemApi.getItems);
  router.get('/itemsForHome',itemApi.getItemsForHome);
  router.get('/category/:category',itemApi.viewAllCategoryItems);
  router.post('/getExtractedItems',itemApi.checkForItems);
  router.post('/addToCart',itemApi.addToCart);
  router.post('/addToWishlist',itemApi.addToWishList);
  router.get('/getCart',itemApi.getCartItems);
  router.get('/getWishList',itemApi.getWishList);
  router.get('/product/:id', itemApi.getProduct);
  router.get('/removeItemsFromCart/:id',itemApi.removeItemFromCart);
}
