const {model, Schema} = require('mongoose')

const UserSchema = new Schema(
  {
  name: {
    type: String,
    required: [true, 'Please provide your name'],
    min: 5,
    max: 255
  },
  email:{
    type: String, 
    required: true,
    unique: true,
    minlength: 3,
  }, 
  password:{
    type: String, 
    required: [true, 'Please provide a password'],
    minlength: 6,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date
 }
)


UserSchema.pre("save", async function(next){
 if(!this.isModified("password")){
   next()
 }
})

//Hides the password and __v (response)
UserSchema.methods.toJSON = function() {
  const { password, _id, __v, ...user} = this.toObject();
  //Changes _id to uid (response)
  user.uid = _id;
  return user
}

module.exports = model('User', UserSchema)