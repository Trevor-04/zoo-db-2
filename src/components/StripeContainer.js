import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import React from "react"
import PaymentForm from "./PaymentForm"

const PUBLIC_KEY = 'pk_test_51QCZYkAVisrEXHQqWSgfJI7OcJeC7Cbvf61lCUsVssgdZn7ZMxaHmH03oQJPsi4fi8v4otUeEgmlfJq8tTc7dFTR00761dNRcu'

const stripeTestPromise = loadStripe(PUBLIC_KEY)

export default function StripeContainer() {
	return (
		<Elements stripe={stripeTestPromise}>
			<PaymentForm />
		</Elements>
	)
}