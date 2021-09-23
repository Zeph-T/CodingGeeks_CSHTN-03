import Item from '../models/item'
import * as apiHelper from './apiHelper';
import Q from 'q';
export async function filterStringsToArrays(req, res) {
  await Item.find({}).then(async (oItems) => {
    await oItems.forEach((oItem) => {
      oItem.categories = oItem.category.split(',')
      oItem.categories = oItem.categories.map((oString) =>
        oString.replace(/\s+/g, '')
      )
      oItem.save((err) => {
        if (err) {
          console.log(err)
        } else {
          console.log('Saved Successfully')
        }
      })
    })
  })
  return res.status(200).send({ message: 'Success' })
}

export async function getItems(req, res) {
  let text = req.query.search;
  text = text.replace(' ','');
  const namePromise = Item.find({name : { $regex : text , $options : 'i'}});
  const categoryPromise = Item.find({categories : {$regex :text , $options  : 'i'}});
  Q.all([namePromise, categoryPromise]).then((data, error) => {
    if (error) {
      res.status(400)
    } else {
      console.log(data)
      res.status(200).json({ byText: data[0], byCategory: data[1] })
    }
  })
}

export async function getItemsForHome(req, res) {
  try{
    let categories = ['EyeCare', 'HealthFood', 'SkinCare', 'Ayurveda', 'ProteinSupplements']
    let final_data = [];
    await Q.all(categories.map(async(item) => {
      let data = await Item.find({ categories: { $regex: item, $options: 'i' } }).limit(5)
          final_data.push({ category: item, items: data });
      }));
      return res.status(200).send(final_data);
  }catch(err){
    return res.status(400).send({error : err.stack});
  }
}


export function viewAllCategoryItems(req,res){
  try{
    if(req.body && req.params.category){
      Item.find({ categories: { $regex: req.params.category, $options: 'i' } }).then(data=>{
        return res.status(200).send(data);
      }).catch(err=>{
        return res.status(400).send({error : err});
      })
    }else{
      throw 'Required Fields Error'
    }
  }catch(err){
    return res.status(400).send({error : err});
  }
}