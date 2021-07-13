const express = require('express');
const app = express();
app.use(express.static('.'));

//init stripe
require('dotenv').config()
const stripe = require('stripe')(process.env.STRIPE_KEY)

const DOMAIN = process.env.DOMAIN ||'http://localhost:3000';

app.post('/checkout/create-session', async (req, res) => {
  console.log("yeah")
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'cad',
          product_data: {
            name: 'Books',
            images: ['text-book.jpeg'],
          },
          unit_amount: 12000,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${DOMAIN}/success.html`,
    cancel_url: `${DOMAIN}/cancel.html`,
  });

  res.json({ id: session.id });
});

const PORT = 5000
app.listen(PORT, () => console.log(`Running on port ${5000}`));