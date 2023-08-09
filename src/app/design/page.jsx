import SignIn from "../components/signin";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { Suspense } from "react";
import { revalidatePath } from "next/cache";
import Link from "next/link";

export const metadata = {
  title: "Profile",
  description: "Profile page for the scheduling app",
  keywords: "scheduling app",
};

async function createDesign(data) {
  "use server";
  const { MongoClient } = require("mongodb");
  const client = new MongoClient(process.env.MONGODB_URI);
  try {
    let colorOne = data.get("colorOne")?.valueOf();

    // console.log(colorOne);
    if (typeof colorOne !== "string" || colorOne.length !== 7) {
      throw new Error("Color 1 is required and must be 6 characters long");
    }
    let colorTwo = data.get("colorTwo");
    if (typeof colorTwo !== "string" || colorTwo.length !== 7) {
      throw new Error("Color 2 is required and must be 6 characters long");
    }
    let colorThree = data.get("colorThree");
    if (typeof colorThree !== "string" || colorThree.length !== 7) {
      throw new Error("Color 3 is required and must be 6 characters long");
    }

    let colorFour = data.get("colorThree");
    if (typeof colorFour !== "string" || colorFour.length !== 7) {
      throw new Error("Color 4 is required and must be 6 characters long");
    }

    let website = data.get("website");

    // does this work?
    const original = data.get("original");
    if (original) {
      const originalColors = original.split(",");
      colorOne = originalColors[0];
      colorTwo = originalColors[1];
      colorThree = originalColors[2];
      colorFour = originalColors[3];
    }

    const session = await getServerSession(authOptions);
    const googleEmail = session.user.email;

    const dbName = "users";
    await client.connect();
    console.log("Connected correctly to server");
    const db = client.db(dbName);
    let collection = db.collection("users");
    const users = await collection.findOne({ email: googleEmail });
    // console.log(users._id)
    const userId = users._id;
    //this allows me to take the userId to find the access_token from sessions later down the road
    collection = db.collection("savedInfo");
    // Insert a single document, wait for promise so we can read it back
    const myDoc = await collection.findOne({ googleEmail: googleEmail });
    //check if user already exists in database, if so you will update the info, if not you will add the info to the database
    if (myDoc) {
      const updateInfo = await collection.updateOne(
        { googleEmail: googleEmail },
        {
          $set: {
            design: { colorOne, colorTwo, colorThree, colorFour, website },
          },
        }
      );
      return console.log(
        "updated info in database: ",
        colorOne,
        colorTwo,
        colorThree,
        colorFour,
        website
      );
    }
    const newInfo = await collection.insertOne({
      design: { colorOne, colorTwo, colorThree, colorFour, website },
      googleEmail,
      userId,
    });
    return alert(
      "added info in database: ",
      colorOne,
      colorTwo,
      colorThree,
      colorFour,
      website,
      googleEmail,
      userId
    );
  } catch (error) {
    console.log(error);
  } finally {
    revalidatePath("/design");
    revalidatePath("/");
    revalidatePath("/[user]/[event]");
    await client.close();
  }
}

export default async function Design() {
  const dbName = "users";
  const session = await getServerSession(authOptions);
  if (!session) {
    return <SignIn />;
  }
  const { MongoClient } = require("mongodb");
  const client = new MongoClient(process.env.MONGODB_URI);
  await client.connect();
  console.log("Connected correctly to server");
  const db = client.db(dbName);
  //this allows me to take the userId to find the access_token from sessions later down the road
  let collection = db.collection("savedInfo");
  // Insert a single document, wait for promise so we can read it back
  const currentUserInfo = await collection.findOne({
    googleEmail: session["user"].email,
  });
  if (currentUserInfo === null) {
    return (
      <>
        <div className="grid-1>">
          <h1 className="text-bold">
            Please finish setting up your profile first
          </h1>
          <Link href="/profile" className="text-regular underline">
            Click here
          </Link>
        </div>
      </>
    );
  }
  let businessName = currentUserInfo.businessName;
  if (currentUserInfo.design) {
    let colorOne = currentUserInfo.design.colorOne;
    let colorTwo = currentUserInfo.design.colorTwo;
    let colorThree = currentUserInfo.design.colorThree;
    let colorFour = currentUserInfo.design.colorFour;
    let website = currentUserInfo.design.website;

    return (
      <main className="design-main-container">
        <Suspense fallback={<div>Loading...</div>}>
          <div className="current-design-container">
            <h1 className={`text-bold design-title`}>Design</h1>

            {/* figure put how to update this when form is submitted */}
            <div className="current-design">
              <p className={`text-regular color-text`}>{colorOne}</p>
              <p
                className={`text-regular current-colors color-text`}
                style={{ backgroundColor: colorOne }}
              ></p>

              <p className={`text-regular color-text`}>{colorTwo}</p>
              <p
                className={`text-regular current-colors color-text`}
                style={{ backgroundColor: colorTwo }}
              ></p>

              <p className={`text-regular color-text`}>{colorThree}</p>
              <p
                className={`text-regular current-colors color-text`}
                style={{ backgroundColor: colorThree }}
              ></p>

              <p className={`text-regular color-text`}>{colorFour}</p>
              <p
                className={`text-regular current-colors color-text`}
                style={{ backgroundColor: colorFour }}
              ></p>
            </div>
            <div className="grid-2">
              <p className={`text-bold`}> Website:</p>
              <p className={`text-regular italic`}> {website} </p>
            </div>
          </div>
        </Suspense>
        <div className="bottom-of-page"></div>
        <form action={createDesign} id="design-form" className="design-form">
          <label htmlFor="colorOne" className="text-bold">
            Pick a new design:
          </label>
          <input
            type="color"
            name="colorOne"
            id="colorOne"
            className="pick-color"
            style={{ backgroundColor: colorOne }}
          />
          <label htmlFor="colorTwo" className="text-bold"></label>
          <input
            type="color"
            name="colorTwo"
            id="colorTwo"
            className="pick-color"
            style={{ backgroundColor: colorTwo }}
          />
          <label htmlFor="colorThree" className="text-bold"></label>
          <input
            type="color"
            name="colorThree"
            id="colorThree"
            className="pick-color"
            style={{ backgroundColor: colorThree }}
          />
          <label htmlFor="colorFour" className="text-bold"></label>
          <input
            type="color"
            name="colorFour"
            id="colorFour"
            className="pick-color"
            style={{ backgroundColor: colorFour }}
          />
          <label htmlFor="website" className="text-regular">
            Website:
          </label>
          <input
            type="text"
            name="website"
            id="website"
            className="color-input-box"
          />
          <label htmlFor="original" className="text-regular color-reset">
            <input
              type="checkbox"
              id="original"
              name="original"
              value="#2b536a,#52a288,#a4cca9,#c4dedf"
              className="color-reset-box"
            />
            reset to original design
          </label>
          <button type="submit" className="text-bold new-color-submit-btn">
            Submit
          </button>
        </form>
        <div className="bottom-of-page"></div>
      </main>
    );
  } else {
    return (
      <main className="design-main-container">
        <Suspense fallback={<div>Loading...</div>}>
          <div className="current-design-container">
            <h1 className={`text-bold design-title`}>Design</h1>

            {/* figure put how to update this when form is submitted */}
            <div className="current-design">
              <p className={`text-regular`}>Color 1: not set </p>
              <p className={`text-regular`}>Color 2: not set </p>
              <p className={`text-regular`}>Color 3: not set </p>
              <p className={`text-regular`}>Color 4: not set </p>
              <p className={`text-regular`}>Website not set </p>
            </div>
          </div>
        </Suspense>
        <div className="bottom-of-page"></div>
        <form action={createDesign} id="design-form" className="design-form">
          <label htmlFor="colorOne" className="text-bold">
            Pick a new design:
          </label>
          <input
            type="color"
            name="colorOne"
            id="colorOne"
            className="pick-color"
          />
          <label htmlFor="colorTwo" className="text-bold"></label>
          <input
            type="color"
            name="colorTwo"
            id="colorTwo"
            className="pick-color"
          />
          <label htmlFor="colorThree" className="text-bold"></label>
          <input
            type="color"
            name="colorThree"
            id="colorThree"
            className="pick-color"
          />
          <label htmlFor="colorFour" className="text-bold"></label>
          <input
            type="color"
            name="colorFour"
            id="colorFour"
            className="pick-color"
          />
          <label htmlFor="website" className="text-regular">
            Website:
          </label>
          <input
            type="text"
            name="website"
            id="website"
            className="color-input-box"
          />
          <label htmlFor="original" className="text-regular color-reset">
            <input
              type="checkbox"
              id="original"
              name="original"
              value="#2b536a,#52a288,#a4cca9,#c4dedf"
              className="color-reset-box"
            />
            reset to original design
          </label>
          <button type="submit" className="text-bold new-color-submit-btn">
            Submit
          </button>
        </form>
        <div className="bottom-of-page"></div>
      </main>
    );
  }
}
