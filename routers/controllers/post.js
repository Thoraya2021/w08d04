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
  const newpost = new postmodel ({
  img:req.body.img,
  desc:req.body.desc,
  like:req.body.like,
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
       .findByIdAndUpdate(id, { $set: { isDel: true } })
      .then((result) => {
        if (result) {
          res.status(200).json("the post has deleted");
        } else {
          res.status(404).json("the post not found");
        }
      })
      
      .catch((err) => {
        res.status(400).json(err);
      });
  };
module.exports = { getallpost ,createpost , deletepost};