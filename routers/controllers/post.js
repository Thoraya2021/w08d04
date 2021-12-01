const postmodel =require('./../../db/models/post');

const getallpost = (req, res) => {
    postmodel
    .find({})
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.send(err);
    });
};

const createpost = (req, res) => {
  const {img,desc,date,like} = req.body;
  const newpost = new postmodel ({
  img:req.body.img,
  desc:req.body.desc,
  date:req.body.date,
  like:req.body.like
  });
  newpost
    .save()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.send(err);
    });
};
const deletepost = (req, res) => {
  const { id } = req.params;

  postmodel
    .findOneAndRemove({ _id: id }, { new: true })
    .exec()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
};
module.exports = { getallpost ,createpost , deletepost};