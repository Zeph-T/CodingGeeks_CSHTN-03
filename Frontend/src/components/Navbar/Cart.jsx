import React from 'react'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContentText from '@mui/material/DialogContentText'
import Button from '@mui/material/Button'
import CartItem from './CartItem'
import WrappedButton from '../common/WrappedButton'

import { Typography } from '@mui/material'
import http from '../../services/httpService'
import { api } from '../../utilities'

const Cart = ({
  cart,
  setCartOpen,
  cartOpen,
  onClick,
  onClickCheckout,
  setAmount,
}) => {
  const jwt = localStorage.getItem('token')
  const getTotal = () => {
    let total = 0
    for (let item in cart) {
      total += cart[item].item.cost * cart[item].qty
    }
    setAmount(total)
    return total
  }
  const handleRemove = async (id) => {
    const { data } = await http.put(
      api.BASE_URL + api.REMOVE_ITEM_FROM_CART + `/${id}`,
      { headers: { accesstoken: jwt } }
    )
    console.log(data)
  }
  return (
    <Dialog
      maxWidth='lg'
      open={cartOpen}
      onClose={() => setCartOpen(false)}
      fullWidth={true}
    >
      <DialogTitle style={{ textAlign: 'center' }}>Cart</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {cart.map((cart_item) => (
            <CartItem cart_item={cart_item} handleRemove={handleRemove} />
          ))}
        </DialogContentText>
        <div className='row d-flex justify-content-between'>
          {' '}
          <Typography
            component='h1'
            variant='h5'
            className='total-amount'
            style={{ textAlign: 'center' }}
          >
            Total Amount To Pay: {getTotal()} Only
          </Typography>
          <WrappedButton
            variant='contained'
            color='primary'
            name='Proceed To CheckOut'
            onClick={onClickCheckout}
            style={{ marginTop: '1.4rem', marginRight: '1rem' }}
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setCartOpen(false)}>Close</Button>
      </DialogActions>
    </Dialog>
  )
}

export default Cart
