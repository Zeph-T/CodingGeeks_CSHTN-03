import React from 'react'
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js'
import { api } from '../../utilities'

import CardSection from './CardSection'
import '../../App.css'
export default function CheckoutForm({ amount }) {
  const stripe = useStripe()
  const elements = useElements()

  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault()

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make  sure to disable form submission until Stripe.js has loaded.
      return
    }

    function stripeTokenHandler(token) {
      http
        .post(
          api.BASE_URL + api.MAKE_PAYMENT,
          { token: token, amount: amount },
          { headers: { accesstoken: jwt } }
        )
        .then((response) => {
          if (response.data.success) {
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
      <button className='pay-button' disabled={!stripe}>
        Confirm order
      </button>
    </form>
  )
}
