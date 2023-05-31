import { Schema, model, models } from 'mongoose'
import bcrypt from 'bcrypt'

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  visible_name: {
    type: String,
    required: true
  },
  google_email: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 20
  },
  email: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 20
  },
  business_name:{
    type: String,
    required: true,
  },
  profile_picture: {
    type: String,
  }, 
  event_info: { 
    length: { 
        type: Number
        },
    title: { 
      type: String },  
    description: { type: String }
  },
  design: {
    styling: {
      primary_color: { type: String },
      secondary_color: { type: String },
      tertiary_color: { type: String },
      quaternary_color: { type: String },
      font: { type: String },}, 
    logo: { 
      type: String }, 
    website_link: { 
      type: String }
  },
  schedule: {
    available: { type: Date },
    booked: { type: Date }
  }
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