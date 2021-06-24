const yup = require('yup');
const User = require('../models/User');

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
    const user = await new User(req.body);
    res.send(await user.save());
  } catch (error) {
    res.status(406).send(error.message);
  }
};

module.exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.send(users);
  } catch (error) {
    res.status(404).send('NO USERS');
  }
};

module.exports.getUser = async (req, res) => {
  try {
    const {
      params: { id },
    } = req;
    const foundUser = await User.findOne(Number(id));
    res.send(foundUser);
  } catch (error) {
    res.status(404).send('NO USER');
  }
};

module.exports.updateUser = async (req, res) => {
  try {
    const {
      params: { id },
      body,
    } = req;

    const foundUser = await User.findOne(Number(id));

    const updatedUser = await foundUser.update(body);
    res.send(updatedUser);
  } catch (error) {
    res.status(400).send('Can`t update');
  }
};

module.exports.deleteUser = async (req, res) => {
  try {
    const {
      params: { id },
    } = req;
    const foundUser = await User.findOne(Number(id));
    const verdict = await foundUser.delete();
    res.send({ verdict });
  } catch (error) {
    res.status(400).send('Can`t delete');
  }
};
