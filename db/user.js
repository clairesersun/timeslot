// import user from "./models/user";
// import dbConnect from './connection'

export async function POST(request) {
    try {
      const userInfo = await User.create(
        req.body
        //pull the current _id from the current user, match it with the userId in accounts to find the access token
      ) /* create a new model in the database */
      res.status(201).json({ success: true, data: userInfo })
    } catch (error) {
      res.status(400).json({ success: false })
    }}

// export async function create({username, password}) {
//   if (!(username && password))
//     throw new Error('Must include username and password')

//   await dbConnect()

//   const userInfo = await user.create({username, password})

//   if (!userInfo)
//     throw new Error('Error inserting User info')

//   return user
// }

// name: {
//     type: String,
//     required: true
//   },
//   visible_name: {
//     type: String,
//     required: true
//   },
//   google_email: {
//     type: String,
//     required: true,
//     minLength: 5,
//     maxLength: 20
//   },
//   email: {
//     type: String,
//     required: true,
//     minLength: 5,
//     maxLength: 20
//   },
//   business_name:{
//     type: String,
//     required: true,
//   },
//   profile_picture: {
//     type: String,
//   }, 
//   event_info: { 
//     length: { 
//         type: Number
//         },
//     title: { 
//       type: String },  
//     description: { type: String }
//   },
//   design: {
//     styling: {
//       primary_color: { type: String },
//       secondary_color: { type: String },
//       tertiary_color: { type: String },
//       quaternary_color: { type: String },
//       font: { type: String },}, 
//     logo: { 
//       type: String }, 
//     website_link: { 
//       type: String }
//   },
//   schedule: {
//     available: { type: Date },
//     booked: { type: Date }
//   }