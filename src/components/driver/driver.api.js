const { signup, signin} = require("./deiver.services");

  const router = require("express").Router();
  
  router.post('/signup', signup)
  router.post('/signin', signin)

  module.exports = router;