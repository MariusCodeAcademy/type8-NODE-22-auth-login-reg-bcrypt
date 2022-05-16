const Joi = require('joi');

// first middlewere helper
function showBody(req, res, next) {
  // console.log(req.method);
  if (req.method === 'POST') {
    console.log('request body ===', req.body);
  }
  next();
}

async function validateUser(req, res, next) {
  // validuoti gauta email ir password
  const schema = Joi.object({
    // eslint-disable-next-line newline-per-chained-call
    email: Joi.string().trim().email().lowercase().required(),
    // eslint-disable-next-line newline-per-chained-call
    password: Joi.string().trim().min(5).max(10).required(),
  });

  try {
    // abortEarly default true - rodyti tik pirma rasta klaida
    await schema.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (error) {
    console.log('schema.validateAsync error ===', error);
    res.status(400).json(error.details);
  }
}

async function validateToken(req, res, next) {
  console.log('req.headers', req.headers);
  next();
}

module.exports = {
  showBody,
  validateUser,
  validateToken,
};
