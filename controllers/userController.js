var mongoose = require('mongoose');
var utils = require('../utils/utils.js');
var User = mongoose.model("User");

var UserController = {};

UserController.list = async function (req, res) {
  try {
    var page = parseInt(req.query.page);
    var size = parseInt(req.query.size);
    if (isNaN(page) || isNaN(size)) { throw new Error("Pagination must be numeric"); }
    await User.find({}).skip(page - 1).limit(size).exec()
      .then(data => res.json(data))
      .catch(err => res.json(err));
  } catch (error) {
    res.status(400).send(error.message);
  }
};

UserController.find = async function (req, res) {
  try {
    await User.findOne({ 'authId': req.query.id }).exec()
      .then(data => {
        if (data) {
          res.json(data);
        }
        if (!data) {
          res.json({});
        }
      })
      .catch(err => res.json(err));
  } catch (error) {
    res.status(400).send(error.message);
  }
};

UserController.save = async function (req, res) {
  var user = new User(validateData(req.body));
  await user.save()
    .then(x => res.json({}))
    .catch(err => res.json(err));
};

UserController.update = function (req, res) {
  User.updateOne({ '_id': req.body._id }, req.body)
    .then(x => res.json({}))
    .catch(err => res.json(err));
};

UserController.delete = function (req, res) {
  User.deleteOne({ '_id': req.query.id })
    .then(x => { res.json({}) })
    .catch(err => res.json(err));
};

function validateData(data) {
  var transform = data.marriageStatus.replace(/[`~!@#$%^&*()_|+\-=÷¿?;:'",.<>\{\}\[\]\\\/]/gi, '');
  data.marriageStatus = transform;
  return data;
}

module.exports = UserController;