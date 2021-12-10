const postmodel =require('./../../db/models/post');
const likemodel = require("../../db/models/like");
const usermodel = require("../../db/models/user");
//const comment = require("../../db/models/comment");


const getallpost = (req, res) => {
    postmodel
    .find({ isDel: false })
    .populate("user")
    .sort ({"createdAt":-1})
    .then((result) => {
      if (result) {
        res.status(200).json({ result });
      } else {
        res.status(404).json("the post not fount");
      }
    })

    .catch((err) => {
      res.status(400).json(err);
    });
};

const createpost = (req, res) => {
  const newpost = new postmodel ({
  img:req.body.img,
  desc:req.body.desc,
  user: req.token.id,

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


  const addLike = async (req, res) => {
    const { id } = req.params;
    const { like } = req.body;
  
    if (like) {
      try {
        const like = await likemodel.findOne({
          post: id,
          user: req.token.id,
        });
  
        if (like) {
          likemodel
            .findOneAndUpdate(
              { post: id, user: req.token.id, like: false },
              { like: true },
              { new: true }
            )
            .then((result) => {
              if (result) {
                res
                  .status(200)
                  .json({ message:"like successfully" });
              } else {
                res
                  .status(404)
                  .json({ message: `not found: ${id}` });
              }
            })
            .catch((err) => {
              res.status(400).json(err);
            });
        } else {
          const newlike = new likemodel({
            post: id,
            user: req.token.id,
          });
              newlike
            .save()
            .then((result) => {
              res.status(201).json(result);
            })
            .catch((err) => {
              res.status(400).json(err);
            });
        }
      } catch (error) {
        res.status(400).json(error);
      }
    } else {
      likemodel
        .findOneAndUpdate(
          { post: id, user: req.token.id, like: true },
          { like: false },
          { new: true }
        )
        .then((result) => {
          if (result) {
            res
              .status(200)
              .json({ message: "unliked successfully" });
          } else {
            res
              .status(404)
              .json({ message: `not found${id}` });
          }
        })
        .catch((err) => {
          res.status(400).json(err);
        });
    }
  };
     
module.exports = {getallpost ,createpost , deletepost, addLike };