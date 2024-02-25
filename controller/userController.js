const moment = require("moment");
const userSchema = require("../models/user");

const index = (req, res) => {
  userSchema
    .find()
    .then((result) => {
      const msg = req.session.message;

      res.render("index", { users: result, i: 1, moment: moment, msg: msg });
    })
    .catch((err) => {
      console.log(err);
      res.send({ msg: err.message });
    });
};

// get add page
const getAdd = (req, res) => {
  res.render("user/add");
};

// create user
const create = (req, res) => {
  userSchema
    .create(req.body)
    .then(() => {
      req.session.message = "User Added successfully";
      res.redirect("/user");
    })
    .catch((err) => {
      console.log(err);
      res.send({ msg: err.message });
    });
};

// view user by id
const view = (req, res) => {
  userSchema
    .findById(req.params.id)
    .then((result) => {
      res.render("user/view", { user: result, moment: moment });
    })
    .catch((err) => {
      console.log(err);
      res.send({ msg: err.message });
    });
};

// delete user by id
const deleteUser = (req, res) => {
  userSchema
    .deleteOne({ _id: req.params.id })
    .then(() => {
      req.session.message = "User deleted successfully";
      res.redirect("/user");
    })
    .catch((err) => {
      console.log(err);
      res.send({ msg: err.message });
    });
};

// edit user by id
const edit = (req, res) => {
  userSchema
    .findById(req.params.id)
    .then((result) => {
      res.render("user/edit", { user: result });
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
      res.send({ msg: err.message });
    });
};

// update user by id
const updateUser = (req, res) => {
  userSchema
    .updateOne({ _id: req.params.id }, req.body)
    .then(() => {
      req.session.message = "User Updated successfully";
      res.redirect("/user");
    })
    .catch((err) => {
      console.log(err);
      res.send({ msg: err.message });
    });
};

// search user by id
const search = (req, res) => {
  userSchema
    .find({
      $or: [
        { firstname: { $regex: req.body.searchInput } },
        { lastname: { $regex: req.body.searchInput } },
      ],
    })
    .then((result) => {
      res.render("user/search", { users: result });
    })
    .catch((err) => {
      console.log(err);
      res.send({ msg: err.message });
    });
};

module.exports = {
  index,
  getAdd,
  create,
  view,
  deleteUser,
  edit,
  updateUser,
  search,
};
