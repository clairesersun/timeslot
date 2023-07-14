import { NextResponse } from "next/server"


export async function PATCH(request) {
    'use server'
    let data = await request.json()
    let booked = data.booked
    let event = data.event
    let bookings = data.bookings
    let googleEmail = data.googleEmail
    const { MongoClient } = require("mongodb");
    const client = new MongoClient(process.env.MONGODB_URI);
    try {
      const dbName = "users";
      await client.connect();
      console.log("Connected correctly to server");
      const db = client.db(dbName);
      bookings.push(booked)
      let collection = db.collection("users");
      collection = db.collection("savedInfo");
      // Insert a single document, wait for promise so we can read it back
      const updateInfo = await collection.updateOne(
        { googleEmail: googleEmail },
        {$set: {booked: bookings}});
        return NextResponse.json({ message: "updated info in database: ", bookings }) 
    } catch (error) {
        console.log(error)
    }
    finally {
        await client.close();
        const newURL = new URL('/confirmation', request.url)
        return NextResponse.redirect(newURL)
  }
    
 }
