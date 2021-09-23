import Item from '../models/item'

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
  let text = req.query.search
  console.log(text)
  const namePromise = Item.find({ name: text })
  const categoryPromise = Item.find({ categories: text })
  Promise.all([namePromise, categoryPromise]).then((data, error) => {
    if (error) {
      res.status(400)
    } else {
      console.log(data)
      res.status(200).json({ byText: data[0], byCategory: data[1] })
    }
  })
}

/*
    let text = req.query.search;
    categoryPromise = function()
    namePromise = function()
    Promise.all([categoryPromise,namePromise]).then(data=>{
        [[{},{}],[{},{}]]
    })
*/

/*
    {
        category1 : [{},{},{},{},{}],
        category2 : [{},{},{},{},{}],
        category3 : [{},{},{},{},{}],
        category4 : [{},{},{},{},{}],
        category5 : [{},{},{},{},{}]
    }
*/
