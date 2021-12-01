const commentmodel =require('./../../db/models/comment');

const getallcomment = (req, res) => {
    commentmodel


    .find({ isDel: false, user: req.token.id })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};


const getcommentById = (req, res) => {
  const { id } = req.params;

  commentmodel
    .find({ _id: id, user: req.token.id })
    .then((result) => {
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(404).json("the comment not found");
      }
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};
//user add comments
const createcomment = (req, res) => {
    const newcomment = new commentmodel ({
  text:req.body.text,
  date:req.body.date,
  user: req.token.id
  });
  newcomment
    .save()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.send(err);
    });
};
const deletecomment = (req, res) => {
  const { id } = req.params;
  commentmodel
     .findByIdAndUpdate(id, { $set: { isDel: true } })
    .then((result) => {
      if (result) {
        res.status(200).json("the comment has deleted");
      } else {
        res.status(404).json("the comment not found");
      }
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

const updatecomment = (req, res) => {
    const { text } = req.body;
    const { id } = req.params;
    todoModel
      .findByIdAndUpdate(id, { $set: { text: text } })
      .then((result) => {
        if (result) {
          res.status(200).json("comment has updated");
        } else {
          res.status(404).json("not found");
        }
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  };


module.exports = {  getallcomment, getcommentById ,createcomment  ,deletecomment ,updatecomment};