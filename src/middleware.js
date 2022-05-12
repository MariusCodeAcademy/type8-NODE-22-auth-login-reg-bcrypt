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
    email: Joi.string().trim().email().lowercase().required(),
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

module.exports = {
  showBody,
  validateUser,
};
