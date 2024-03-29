// Note: Deletion confirmation page for the scheduling app

export const metadata = {
  title: "Deleted!",
  description: "Event deletion confirmation for the scheduling app",
  keywords: "scheduling app",
};

export default function Deletion() {
  return (
    <div className="container">
      <h1 className="deleted text-bold">Deleted!</h1>
      <p className="text-regular">Your event has successfully been deleted.</p>
    </div>
  );
}
