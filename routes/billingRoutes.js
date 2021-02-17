const passport = require("passport");
const requireLogin = require("../middlewares/requireLogin");

const keys = require("../config/keys");
const stripe = require("stripe")(keys.stripeSecretKey);

module.exports = (app) => {
  app.post("/api/stripe", requireLogin, async (req, res, next) => {
    const payment = await stripe.charges.create({
      amount: 500,
      currency: "usd",
      source: req.body.id,
      description: "Survey",
    });

    req.user.credits += 5;
    const user = await req.user.save();

    res.send(user);
  });
};
