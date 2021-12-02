const commentmodel =require('./../../db/models/comment');
const rolemodel =require('./../../db/models/role');
//const postmodel =require('./../../db/models/post')
//const usermodel=require('./../../db/models/user')
const createcomment= (req, res) => {
  const { text, user, post } = req.body;
  const newcomment = new commentmodel({
    text,
    post,
   user
    //req.token.user,
  });
  newcomment
    .save()
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};


const deleteComment = async (req, res) => {
  const { id } = req.params;
  const comment = await commentmodel.findById(id);

  if (
    comment.user === req.token.user||
    req.token.role === "61a86bf6f1ba3e7e46aa41b7"
  ) {
    commentmodel
      .findByIdAndUpdate(id, { $set: { isDel: true } })
      .exec()
      .then((result) => {
        res.status(200).json("the comment has deleted");
      })
      .catch((err) => {
        res.status(400).json("you Don't have authorization");
      });
  } else {
    res.status(403).json({ message: "forbiden" });
  }
};


const updateComment = (req, res) => {
  const { text } = req.body;
  const { id } = req.params;
  commentmodel

    .findByIdAndUpdate(id, { $set: { text: text} })
    .then((result) => {
      if (result) {
        res.status(200).json("updated");
      } else {
        res.status(404).json("you Don't have authorization");
      }
    })
    .catch((err) => {
      res.status(400).json("Comment dosnot Exist");
    });
};

module.exports = {
  createcomment,
  updateComment,
  deleteComment,
};







/*
//user add comments
const createcomment = (req, res) => {
  const { id } = req.params;
  const { text , isDel } = req.body;

    const newcomment = new commentmodel({ text, isDel, user: req.token.id, post:id });

    newcomment
      .save()
      .then((result) => {
        res.status(201).json(result);
      })
      .catch((err) => {
        res.status(400).json(err);
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
module.exports = { createcomment  ,deletecomment ,updatecomment}; 
*/