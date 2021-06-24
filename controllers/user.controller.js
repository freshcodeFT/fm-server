const yup = require('yup');

const users = [];
let currentIndex = 0;

const validationSchema = yup.object({
  name: yup
    .string()
    .trim()
    .min(3)
    .required(),
  email: yup
    .string()
    .trim()
    .email()
    .required(),
  password: yup
    .string()
    .trim()
    .required(),
  gender: yup
    .string()
    .trim()
    .required(),
  isSubscribed: yup.boolean(),
});

module.exports.createUser = async (req, res) => {
  try {
    req.body = await validationSchema.validate(req.body);
    req.body.id = currentIndex++;
    req.body.createdAt = Date.now();
    users.push(req.body);
    res.send(req.body);
  } catch (error) {
    res.status(406).send(error.message);
  }
};

module.exports.getUsers = async (req, res) => {
  res.send(users);
};
