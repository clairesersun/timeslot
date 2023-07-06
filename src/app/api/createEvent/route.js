import { getToken } from "next-auth/jwt"


export default async function GET(req) {
  // if using `NEXTAUTH_SECRET` env variable, we detect it, and you won't actually need to `secret`
  // const token = await getToken({ req })
  const token = await getToken({ req })
  console.log("JSON Web Token", token)
  res.end()
}




// import axios from 'axios';
// import { getSession } from 'next-auth/client';
// import { getToken } from 'next-auth/jwt';

// const secret = process.env.SECRET;
// let accessToken;

// const createEvent = async (event) => {
//   const { data } = await axios.post(
//     `https://www.googleapis.com/calendar/v3/calendars/primary/events?conferenceDataVersion=1`,
//     {
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//       },
//       body: JSON.stringify(event),
//     }
//   );

// //   if (data?.nextPageToken) {
// //     return data.items.concat(await createEvent(data.nextPageToken));
// //   }

//   return data;
// };

// export default async function Create(req, res)  {
//   const session = await getSession({ req });

//   if (!session) {
//     return res.status(401).end();
//   }

//   const token = await getToken({ req, secret, encryption: true });

//   accessToken = token.accessToken;

//   const data = await createEvent();

//   res.status(200).json(data);
// };