//With this approach, you can eagerly fetch data, cache responses, and guarantee that this data fetching only happens on the server.


// import { cache } from 'react';
// import 'server-only';
 
// export const preload = (id) => {
//   void getUser(id);
// };
 
// export const getUser = cache(async (id) => {
//     const res = await fetch('...', { method: 'POST', body: '...' });
//   const user = await db.user.findUnique({ id });
//   return user;
// });

