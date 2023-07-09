import SignIn from "../components/signin";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { Suspense } from "react";
import ColorPicker from "../components/Color";

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
    const colorOne = data.get("colorOne")?.valueOf();

    if (typeof colorOne !== "string" || colorOne.length !== 6) {
      throw new Error("Color 1 is required and must be 6 characters long");
    }
    const colorTwo = data.get("colorTwo");
    if (typeof colorTwo !== "string" || colorTwo.length !== 6) {
      throw new Error("Color 2 is required and must be 6 characters long");
    }
    const colorThree = data.get("colorThree");
    if (typeof colorThree !== "string" || colorThree.length !== 6) {
      throw new Error("Color 3 is required and must be 6 characters long");
    }

    const colorFour = data.get("colorThree");
    if (typeof colorFour !== "string" || colorFour.length !== 6) {
      throw new Error("Color 4 is required and must be 6 characters long");
    }

    const website = data.get("website");

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
    await client.close();
  }
}

export default async function Profile() {
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
    googleEmail: session.user.email,
  });
  // console.log(currentUserInfo);
  let businessName = currentUserInfo.businessName;
  if (currentUserInfo.design) {
    let colorOne = currentUserInfo.design.colorOne;
    let colorTwo = currentUserInfo.design.colorTwo;
    let colorThree = currentUserInfo.design.colorThree;
    let colorFour = currentUserInfo.design.colorFour;
    let website = currentUserInfo.design.website;

    return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px]">
          <div className="mb-32 grid text-center lg:mb-0 lg:grid-cols-1 lg:text-left">
            <Suspense fallback={<div>Loading...</div>}>
              <h1 className={`mb-3 text-2xl font-semibold`}>
                {businessName}&apos;s Design
              </h1>

              {/* figure put how to update this when form is submitted */}
              <p className={`mb-3 text-lg font-semibold`}>
                Color 1: {colorOne}{" "}
              </p>
              <p className={`mb-3 text-lg font-semibold`}>
                Color 2: {colorTwo}{" "}
              </p>
              <p className={`mb-3 text-lg font-semibold`}>
                Color 3: {colorThree}{" "}
              </p>
              <p className={`mb-3 text-lg font-semibold`}>
                Color 4: {colorFour}{" "}
              </p>
              <p className={`mb-3 text-lg font-semibold`}>
                {" "}
                Website: {website}{" "}
              </p>
            </Suspense>
            {/* <ColorPicker /> */}
            <form
              action={createDesign}
              id="design-form"
              className="mb-32 grid text-center lg:mb-0 lg:grid-cols-2 lg:text-left"
            >
              <label htmlFor="colorOne">Color 1:</label>
              <input type="text" name="colorOne" id="colorOne" />
              <label htmlFor="colorTwo">Color 2:</label>
              <input type="text" name="colorTwo" id="colorTwo" />
              <label htmlFor="colorThree">Color 3:</label>
              <input type="text" name="colorThree" id="colorThree" />
              <label htmlFor="colorFour">Color 4:</label>
              <input type="text" name="colorFour" id="colorFour" />
              <label htmlFor="website"> Website:</label>
              <input type="text" name="website" id="website" />
              <button type="submit">Submit</button>
            </form>
            {/* {deleteAccount()} */}
            {/* figure out how to do a pop up delete btn */}
          </div>
        </div>
      </main>
    );
  } else {
    return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px]">
          <div className="mb-32 grid text-center lg:mb-0 lg:grid-cols-1 lg:text-left">
            <Suspense fallback={<div>Loading...</div>}>
              <h1 className={`mb-3 text-2xl font-semibold`}>
                {businessName}&apos;s Design
              </h1>

              {/* figure put how to update this when form is submitted */}
              <p className={`mb-3 text-lg font-semibold`}>Color 1: not set </p>
              <p className={`mb-3 text-lg font-semibold`}>Color 2: not set </p>
              <p className={`mb-3 text-lg font-semibold`}>Color 3: not set </p>
              <p className={`mb-3 text-lg font-semibold`}>Color 4: not set </p>
              <p className={`mb-3 text-lg font-semibold`}>Website not set </p>
            </Suspense>

            <form
              action={createDesign}
              id="profile-form"
              className="mb-32 grid text-center lg:mb-0 lg:grid-cols-2 lg:text-left"
            >
              <label htmlFor="colorOne">Color 1:</label>
              {/* <ColorPicker /> */}
              <input
                type="text"
                name="colorOne"
                id="colorOne"
                // hidden
                // value={document.getElementById("colorOnePicker").state}
              />
              <label htmlFor="colorTwo">Color 2:</label>
              <input type="text" name="colorTwo" id="colorTwo" />
              <label htmlFor="colorThree">Color 3:</label>
              <input type="text" name="colorThree" id="colorThree" />
              <label htmlFor="colorFour">Color 4:</label>
              <input type="text" name="colorFour" id="colorFour" />
              <label htmlFor="website"> Website:</label>
              <input type="text" name="website" id="website" />
              <button type="submit">Submit</button>
            </form>
            {/* {deleteAccount()} */}
            {/* figure out how to do a pop up delete btn */}
          </div>
        </div>
      </main>
    );
  }
}
