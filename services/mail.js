const express = require('express');
const MailSlurp = require('mailslurp-client').default;
const { Router } = express;

// create a client
const apiKey = process.env.API_KEY ? process.env.API_KEY : '8011da84b839e3a54c703ec45eedfd1218bc8a8765dd0039aa65e86cb8bcb9f8';
const mailslurp = new MailSlurp({ apiKey });

const api = new Router();


api.get('/', async (req, res) => res.render('pages/emails'))
api.route('/emails')
   .post(async (req, res) => res.json(await mailslurp.createInboxWithOptions({ name: req.body.name })))
   .get(async (req, res) => {
     if (req.query.email) return res.json(await mailslurp.getEmail(req.query.email))
     if (req.query.id) return res.json(await mailslurp.getEmails(req.query.id))
     return res.json(await mailslurp.getInboxes())
    })
   .delete(async (req, res) => {
      if (req.query.id) return res.json(await mailslurp.deleteInbox(req.query.id))
      if (req.query.email) return res.json(await mailslurp.deleteEmail(req.query.email))
      res.sendSTatus(401);
   })

// ;(async() => {
//   console.log(await mailslurp.createInboxWithOptions({
//     name: 'email-name',
//     description: 'email-desc',
//   }))
// })()

module.exports = api;