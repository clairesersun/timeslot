import User from '../../../../../db/models/user'

// export async function GET() {
//   try {
//     const users = await User.find({}) /* find all the data in our database */
//     res.status(200).json({ success: true, data: users })
//   } catch (error) {
//     res.status(400).json({ success: false })
//   }

// }

export async function POST({body: {visibleName, email, businessName, session}}) {
  fetch('/db/user', {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
body: JSON.stringify({
  name: visibleName,
  email: email,
  googleEmail: session.user.email,
  businessName: businessName,
})
})
const data = await res.json();
 
  return NextResponse.json(data);
      // try {
      //   const userInfo = await User.create(
      //     req.body
      //     //pull the current _id from the current user, match it with the userId in accounts to find the access token
      //   ) /* create a new model in the database */
      //   res.status(201).json({ success: true, data: userInfo })
      // } catch (error) {
      //   res.status(400).json({ success: false })
      }



// export default async function handler(req, res) {
//   const { method } = req

//   await dbConnect()

//   switch (method) {
//     case 'GET':
      
//       break
//     
//       break
//       case 'PUT':
//       try {
//         const user = await User.findByIdAndUpdate(id, req.body, {
//             new: true,
//             runValidators: true,
//           }) /* update the model by id in the database */
//           if (!user) {
//             return res.status(400).json({ success: false })
//           }
//         res.status(201).json({ success: true, data: user })
//       } catch (error) {
//         res.status(400).json({ success: false })
//       }
//       break
//       case 'DELETE':
//       try {
//         const deletedUser = await User.deleteOne(
//             {_id: id}
//         ) /* delete a model in the database */
//         if (!deletedUser) {
//             return res.status(400).json({ success: false })
//           }
//         res.status(201).json({ success: true, data: {} })
//       } catch (error) {
//         res.status(400).json({ success: false })
//       }
//       break
//     default:
//       res.status(400).json({ success: false })
//       break
//   }
// }