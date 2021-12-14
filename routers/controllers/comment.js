const commentmodel =require('./../../db/models/comment');
//const rolemodel =require('./../../db/models/role');
const postmodel =require('./../../db/models/post');




const getComments = (req, res) => {
  commentmodel.find({ post: req.body.postID, isDeleted:false }).populate('user')
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.send(err);
    });
};

const createcomment= (req, res) => {
 
  const { id } = req.params;

  const { text, isDel } = req.body;

  const newComment = new commentmodel({
    text,
    isDel,
    user: req.token.id,
    post: id,
  });
  newComment
    .save()
    .then((result) => {
      postmodel
        .findByIdAndUpdate(id, { $push: { text: result._id } })
        .then((result) => {
          console.log(result);
        });
      res.status(201).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

const deleteComment = async (req, res) => {
  const { id } = req.params;
 
    commentmodel
    .findByIdAndUpdate(id, { $set: { isDel: true } })
    .then((result) => {
      if (result) {
        res.status(200).json("the Comment has deleted");
      } else {
        res.status(404).json("the Comment not found");
      }
    })
    
    .catch((err) => {
      res.status(400).json(err);
    });
  }

const updateComment = (req, res) => {
  const { id } = req.params;
  const { text } = req.body;
  
  commentmodel

    .findByIdAndUpdate(id, { $set: { text: text} })
    .then((result) => {
      if (result) {
        res.status(200).json("the comment has updated Successfully");
      } else {
        res.status(404).json("you Don't have authorization");
      }
    })
    .catch((err) => {
      res.status(400).json("Comment dos not Exist");
    });
};

module.exports = {
  getComments ,
  createcomment,
  updateComment,
  deleteComment,
};



