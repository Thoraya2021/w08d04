const usermodel = require("./../../db/models/user");
const bcrypt = require("bcrypt");
const passport = require("passport");
const LocalStrategy  = require("passport-local").Strategy;


module.exports = passportConfig = ( passport)=> {

    passport.use(new LocalStrategy({},(username ,password, done)=>{
    const user=User.findBy ('username ',username )
    if (!user) return done(null,false,{message:'user not found'});

    if (user.password !== password) return done(null,false,{message:'Worng password'});

return done (null, user)

    }
 ))
}
passport.serializeUser((user, done) =>done  (null, user.id));
passport.deserializeUser((id, done) =>  User.findById('id',id ));