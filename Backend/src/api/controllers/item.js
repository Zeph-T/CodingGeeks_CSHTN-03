import Item from '../models/item'
import * as apiHelper from './apiHelper'
import mongoose from 'mongoose'
import Q, { async } from 'q'
import User from '../models/user'
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
  text = text.replace(' ', '')
  const namePromise = Item.find({ name: { $regex: text, $options: 'i' } })
  const categoryPromise = Item.find({
    categories: { $regex: text, $options: 'i' },
  })
  Q.all([namePromise, categoryPromise]).then((data, error) => {
    if (error) {
      res.status(400)
    } else {
      res.status(200).json({ byText: data[0], byCategory: data[1] })
    }
  })
}
export async function getProduct(req, res) {
  try {
    const product = await Item.findById(req.params.id)
    if (product) res.send(product)
  } catch (ex) {
    res.status(400).send({ error: err })
  }
}
export async function getItemsForHome(req, res) {
  try {
    let categories = [
      'EyeCare',
      'HealthFood',
      'SkinCare',
      'Ayurveda',
      'ProteinSupplements',
    ]
    let final_data = []
    await Q.all(
      categories.map(async (item) => {
        let data = await Item.find({
          categories: { $regex: item, $options: 'i' },
        }).limit(5)
        final_data.push({ category: item, items: data })
      })
    )
    return res.status(200).send(final_data)
  } catch (err) {
    return res.status(400).send({ error: err.stack })
  }
}

export function viewAllCategoryItems(req, res) {
  try {
    if (req.body && req.params.category) {
      Item.find({ categories: { $regex: req.params.category, $options: 'i' } })
        .then((data) => {
          return res.status(200).send(data)
        })
        .catch((err) => {
          return res.status(400).send({ error: err })
        })
    } else {
      throw 'Required Fields Error'
    }
  } catch (err) {
    return res.status(400).send({ error: err })
  }
}

export async function checkForItems(req, res) {
  const words = req.body.words
  let items = []
  await Q.all(
    words.map((word) => {
      Item.findOne(
        { $text: { $search: word } },
        { score: { $meta: 'textScore' } }
      )
        .sort({ score: { $meta: 'textScore' } })
        .then((oItem) => {
          items.push(oItem)
        })
        .catch((error) => {
          res.status(400).json({ message: error.message })
        })
    })
  )
  return res.status(200).send(items)
}

export function addToCart(req, res) {
  try {
    if (req.body && req.body.itemId && req.body.qty) {
      User.findOne({ _id: req.user._id })
        .then((oUser) => {
          if (oUser) {
            let present = oUser.cart.filter(
              (oItem) =>
                mongoose.Types.ObjectId(oItem.item).toString() ===
                mongoose.Types.ObjectId(req.body.itemId).toString()
            )
            if (present.length > 0) {
              User.findOneAndUpdate(
                { _id: req.user._id },
                { $pull: { cart: { _id: present[0]._id } } },
                (err, doc) => {
                  if (err) {
                    return res.status(400).send(err)
                  } else {
                    User.findOneAndUpdate(
                      { _id: req.user._id },
                      {
                        $push: {
                          cart: {
                            item: mongoose.Types.ObjectId(req.body.itemId),
                            qty: parseInt(req.body.qty),
                          },
                        },
                      },
                      (err, doc) => {
                        if (err) {
                          return res.status(400).send(err)
                        } else {
                          return res.status(200).send({ success: true })
                        }
                      }
                    )
                  }
                }
              )
            } else {
              User.findOneAndUpdate(
                { _id: req.user._id },
                {
                  $push: {
                    cart: {
                      item: mongoose.Types.ObjectId(req.body.itemId),
                      qty: parseInt(req.body.qty),
                    },
                  },
                },
                (err, doc) => {
                  if (err) {
                    return res.status(400).send(err)
                  } else {
                    return res.status(200).send({ success: true })
                  }
                }
              )
            }
          }
        })
        .catch((err) => {
          return res.status(400).send({ success: false })
        })
    } else {
      throw 'required fields error'
    }
  } catch (err) {
    return res.status(400).send({ success: false })
  }
}

export function addToWishList(req, res) {
  try {
    if (req.body && req.body.itemId) {
      User.findOneAndUpdate(
        { _id: req.user._id },
        { $push: { wishlist: mongoose.Types.ObjectId(req.body.itemId) } },
        (err, user) => {
          if (err) {
            return res.status(400).send({ success: false })
          } else {
            return res.status(200).send({ success: true })
          }
        }
      )
    } else {
      throw 'required fields error'
    }
  } catch (err) {
    return res.status(400).send({ success: false })
  }
}

export function getCartItems(req, res) {
  try {
    if (req.user) {
      User.findById(req.user._id)
        .populate({ path: 'cart.item', model: 'Medicine' })
        .then((oUser) => {
          return res.status(200).send(oUser.cart)
        })
        .catch((err) => {
          return res.status(400).send({ error: err })
        })
    } else {
      throw 'No User found!'
    }
  } catch (err) {
    return res.status(400).send({ error: err })
  }
}

export function getWishList(req, res) {
  try {
    if (req.user) {
      User.findById(req.user._id)
        .populate({ path: 'wishlist', model: 'Medicine' })
        .then((oUser) => {
          return res.status(200).send(oUser.wishlist)
        })
        .catch((err) => {
          return res.status(400).send({ error: err })
        })
    } else {
      throw 'No User found!'
    }
  } catch (err) {
    return res.status(400).send({ error: err })
  }
}
export function removeItemFromCart(req, res) {
  try {
    if (req.user) {
      User.findOneAndUpdate(
        { _id: req.user._id },
        { $pull: { cart: { _id: mongoose.Types.ObjectId(req.params.id) } } },
        (err, docs) => {
          if (err) {
            return res.status(300).send({ error: err })
          } else {
            return res.status(200).send({ status: 'removed Item from Cart' })
          }
        }
      )
    } else {
      throw 'No user found'
    }
  } catch (err) {
    return res.status(400).send({ error: err })
  }
}
