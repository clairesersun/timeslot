"use client";

import { signIn } from "next-auth/react";
import "../globals.css";

export default function SignIn() {
  return (
    <>
      <div className={"container-not-signed-in"}>
        <div className={"big-container"}>
          <h1 className={"notSignedIn text-bold"}>
            Less bullshit. More me time.
          </h1>
          <p className={"notSignedIn"}>
            Discover what timeslot can do for you. Sign in to start exploring.
          </p>
          <button
            className={"notSignedIn text-bold"}
            onClick={() => signIn("google")}
          >
            Sign in
          </button>
        </div>
        <div className="oval-container">
          <div className={"ovals oval-1"}></div>
          <div className={" ovals oval-2"}></div>
          <div className={"ovals oval-3"}></div>
          <div className={" ovals oval-4"}></div>
        </div>
      </div>
    </>
  );
}
