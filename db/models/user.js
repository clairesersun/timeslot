import { Schema, model, models } from 'mongoose'
import bcrypt from 'bcrypt'

const UserSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 20
  },
})

//add the rest of the schema here
  // {
  //   Username, 
  //   Password,
  //   E-mail, 
  //   Name, 
  //   business name,
  //   Google information, 
  //   event info: 
  //   { length, 
  //   name,
  //   description},
  //   design info: 
  //   {styling, 
  //   logo, 
  //   website link},
  //   schedule info:
  //   {times available,
  //   booked time}
  //   }
    


// hashes the password before it's stored in mongo
UserSchema.pre('save', async function(next) {
  this.password = await bcrypt.hash(this.password, 10)
  next()
})

export default models.User || model('User', UserSchema)