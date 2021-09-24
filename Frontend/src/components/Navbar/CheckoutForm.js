import React,{useState} from 'react'
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js'
import { api } from '../../utilities'

import CardSection from './CardSection'
import '../../App.css'
import httpService from '../../services/httpService'
import WrappedButton from '../common/WrappedButton'

const jwt = localStorage.getItem('token');
export default function CheckoutForm({ amount , ...props}) {
  const [progress , setProgress] = useState(false);
  const stripe = useStripe()
  const elements = useElements() 
  const handleSubmit = async (event) => {
    setProgress(true);
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault()

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make  sure to disable form submission until Stripe.js has loaded.
      return
    }

    function stripeTokenHandler(token) {
      httpService
        .post(
          api.BASE_URL + api.MAKE_PAYMENT,
          { token: token.id, amount: amount ,items : props.cart},
          { headers: { accesstoken: jwt } }
        )
        .then((response) => {
          if (response.data.success) {
            setProgress(false);
            props.setPaymentOpen(false);
            props.openSnackBar('Payment Successful')
          } else {
            props.openSnackBar('Error making payment')
          }
        })
        .catch((err) => {
          props.openSnackBar(err)
        })
    }

    const card = elements.getElement(CardElement)
    const result = await stripe.createToken(card)
    // TODO : make a backend call
    if (result.error) {
      // Show error to your customer.
      console.log(result.error.message)
    } else {
      stripeTokenHandler(result.token)
      // Send the token to your server.
      // This function does not exist yet; we will define it in the next step.
      //   stripeTokenHandler(result.token);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <CardSection />
      <WrappedButton className='pay-button' onClick={handleSubmit} disabled={!stripe || progress} color="primary" name='paynow' variant="outlined" style={{marginTop : '1rem',width : '100%'}}/> 
    </form>
  )
}
