import User from './models/user'
import dbConnect from './connection'

export async function create(username, email, password) {
  if (!(username && email && password))
    throw new Error('Must include username, email, and password')

if (!(username && password))
    throw new Error('Must include username and password')

if (!(email && password))
    throw new Error('Must include email and password')

if (!(username && email))
    throw new Error('Must include username and email')

if (!(username))
    throw new Error('Must include username')

if (!(email))
    throw new Error('Must include email')

if (!(password))
    throw new Error('Must include password')

  await dbConnect()

  const user = await User.create({username, email, password})

  if (!user)
    throw new Error('Error inserting User')

  return user
}

// export async function update({add the rest of the stuff here}) {
//     //add your code here
// if (this thing exists) 
//     await dbConnect()
//     const requester = //find the user logged in
//     const user = await db.User.updateOne({requester, {$set: {stuff being set}}, function(err, res) {
//         if (err) throw err;
//         console.log("1 document updated")}})
//     return user
// }