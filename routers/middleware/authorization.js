const rolemodel=require('./../../db/models/role');

const authorization=async(req,res,next)=>{
    try {
const roleId =req.token.role;
const result=await rolemodel.findById(roleId);
if (result.role==="admin"){

    next();
} else{

    return res.status(403).json({message:"forbidden"});

    
}}
catch (err) {
    res.status(403).json(err);
  }
};

module.exports =authorization ;