// Note: Confirmation page for the scheduling app

import Link from "next/link";

export const metadata = {
  title: "Booked!",
  description: "Meeting confirmation for the scheduling app",
  keywords: "scheduling app",
};

export default function Confirmation() {
  return (
    <div className="container">
      <h1 className="confirmation text-bold">Booked!</h1>
      <p className="text-regular">
        Thank you for booking a meeting. An invite has been sent to your google
        calendar with the Google Hangout link. Please confirm your attendance
        within the event.{" "}
      </p>
      {/* <Link href="clairesersun.com" className="confirmation-btn">
        Go to our website
      </Link> */}
    </div>
  );
}
