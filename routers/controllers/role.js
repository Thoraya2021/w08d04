const rolemodel =require ("./../../db/models/role");
const create = (req, res) => { 
  const newRole = new rolemodel(req.body);
  newRole
    .save()
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};
const roles = (req, res) => {
    rolemodel
    .find({})
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};


module.exports = {
  create,
  roles,
};