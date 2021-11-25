const User = require("../models/mainModel");
const sequelize = require("../util/database");

exports.addUser = (req, res, next) => {
  const name = req.body.name;
  const phone = req.body.phone;
  User.create({
    name: name,
    phone: phone,
  })
    .then((result) => {
      res.status(201).json({
        user_id: result.id,
        operation_type: "add",
        operation_status: "success",
      });
    })
    .catch((err) => {
      res.status(404).json({
        user_id: "failed to adding user",
        operation_type: "add",
        operation_status: "fail",
      });
      console.log(err);
    });
};

exports.editUser = (req, res, next) => {
  const userId = req.params.userId;
  const name = req.body.name;
  const phone = req.body.phone;

  User.findOne({
    where: { id: userId },
  })
    .then((user) => {
      if (!user) {
        return res.status(404).json({
          error: "User could not be found.",
        });
      } else {
        user.name = name;
        user.phone = phone;
        return user.save();
      }
    })
    .then((result) => {
      return res.status(200).json({
        user_id: result.id,
        operation_type: "edit",
        operation_status: "success",
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(404).json({
        user_id: result.id,
        operation_type: "edit",
        operation_status: "fail",
      });
    });
};

exports.getUsers = (req, res, next) => {
  User.findAll({
    attributes: [["id", "user_id"], "name", "phone"],
    order: [["createdAt", "ASC"]],
  })
    .then((users) => {
      res.status(200).json({
        users,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.deleteUser = (req, res, next) => {
  const userId = req.params.userId;
  User.findOne({ where: { id: userId } })
    .then((user) => {
      if (!user) {
        res.status(404).json({
          error: "Could not find the user.",
        });
      } else {
        return User.destroy({
          where: {
            id: userId,
          },
        });
      }
    })
    .then((result) => {
      console.log(result);
      res.status(200).json({
        user_id: userId,
        operation_type: "delete",
        operation_status: "success",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json({
        user_id: userId,
        operation_type: "delete",
        operation_status: "fail",
      });
    });
};

exports.healthCheck = (req, res, next) => {
  sequelize
    .authenticate()
    .then(() => {
      console.log("Connection has been established successfully.");
      res.status(200).json({
        statusCode: 200,
        status: "OK",
      });
    })
    .catch((err) => {
      res.status(503).json({
        status: "Database connection error.",
      });
      console.error("Unable to connect to the database:", err);
    });
};
