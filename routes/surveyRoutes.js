const { Path } = require("path-parser");
const { URL } = require("url");
const _ = require("lodash");
const requireCredits = require("../middlewares/requireCredits");
const requireLogin = require("../middlewares/requireLogin");
const Mailer = require("../services/Mailer");
const surveyTemplate = require("../services/emailTemplates/surveyTemplate");

const mongoose = require("mongoose");
const Survey = mongoose.model("surveys"); //"surveys" is the name that you put in Survey.js when you used mongoose.model (bottom of the file)

module.exports = (app) => {
  app.get("/api/surveys/:surveyId/:choice", (req, res) => {
    res.send("Thanks for leaving feedback!");
  });

  app.post("/api/surveys/webhooks", (req, res) => {
    const parser = new Path("/api/surveys/:surveyId/:choice");

    const events = req.body.map((event) => {
      const match = parser.test(new URL(event.url).pathname);

      if (match) {
        return {
          email: event.email,
          surveyId: match.surveyId,
          choice: match.choice,
        };
      }
    });

    const remUndefEvents = events.filter(Boolean); //remove undefined entries
    const uniqueEvents = _.uniqBy(remUndefEvents, "email", "surveyId"); //deletes duplicates (if a person accidentally presses Yes or No more than once)

    uniqueEvents.forEach((event) => {
      console.log(event);

      Survey.updateOne(
        {
          _id: event.surveyId,
          recipients: {
            $elemMatch: { email: event.email, responded: false },
          },
        },
        {
          $inc: { [event.choice]: 1 },
          $set: { "recipients.$.responded": true },
          lastResponded: new Date(),
        }
      ).exec();
    });

    res.send({});
  });

  app.get("/api/surveys", requireLogin, async (req, res) => {
    const surveys = await Survey.find({ _user: req.user.id }).select({
      recipients: false, //send back everything EXCEPT recipients
    });

    res.send(surveys);
  });

  app.post("/api/surveys", requireLogin, requireCredits, async (req, res) => {
    const { title, subject, body, recipients } = req.body;

    const survey = new Survey({
      title,
      subject,
      body,
      recipients: recipients.split(",").map((recipient) => {
        return {
          email: recipient
            .toLowerCase()
            .trim() /* trim leading and trailing spaces */,
        };
      }),
      _user: req.user.id,
      dateSent: Date.now(),
    });

    const mailer = new Mailer(survey, surveyTemplate(survey));

    try {
      //actually sends the mail
      await mailer.send();
      //saves the survey if the mail got sent succesfully
      await survey.save();
      req.user.credits -= 1;
      const user = await req.user.save();

      res.send(user);
    } catch (error) {
      res.status(422).send(error);
    }
  });

  app.post("/api/surveydelete", requireLogin, async (req, res) => {
    console.log(req.body.id);
    const temp = await Survey.deleteOne({
      _id: req.body.id,
      _user: req.user.id,
    });

    console.log(temp);
    res.send("");
  });
};
