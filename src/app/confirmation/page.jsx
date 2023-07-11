// Note: Confirmation page for the scheduling app

export const metadata = {
  title: "Booked!",
  description: "Meeting confirmation for the scheduling app",
  keywords: "scheduling app",
};

export default function Confirmation() {
  return (
    <div className="container">
      <h1>Booked!</h1>
      <p>
        Thank you for booking a meeting. An invite has been sent to your google
        calendar with the Google Hangout link. Please confirm your attendance
        within the event.{" "}
      </p>
    </div>
  );
}
