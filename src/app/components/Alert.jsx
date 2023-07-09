"use client";
// import { useRouter } from "next/router";

export default function AddAlert(
  eventName,
  eventnameParams,
  description,
  length
) {
  //   const router = useRouter();
  // router.replace(router.asPath)
  return (
    alert(
      "added info in database: " +
        eventName +
        ", " +
        eventnameParams +
        ", " +
        description +
        ", " +
        length
    ) && router.replace(router.asPath)
  );
}
