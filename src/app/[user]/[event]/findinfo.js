import clientPromise from '../../../../db/connection.ts';

export default async function GET(){
    // const db = clientPromise.db("accounts")
    try {
    const connection = await clientPromise; // this is a client connection not a db
    const db = connection.db();
    // const db = await clientPromise
    const userInfo = db.collection('accounts').find({}).toArray();
    // res.json(userInfo);
    console.log(userInfo)
  } catch (e) {
    console.error(e);
    JSON({ error: 'Not connected!' });
  }
}