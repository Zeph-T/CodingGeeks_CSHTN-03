import Item from '../models/item';



export async function filterStringsToArrays(req,res){
    await Item.find({}).then(async oItems=>{
        await oItems.forEach(oItem=>{
            oItem.categories = oItem.category.split(",")
            oItem.save((err)=>{
                if(err){
                    console.log(err);
                }else{
                    console.log('Saved Successfully');
                }
            })
        })
    })
    return res.status(200).send({message : 'Success'});
}