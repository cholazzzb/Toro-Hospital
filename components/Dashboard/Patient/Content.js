import Appointment from "./Appointment";
import Dashboard from "./Dashboard";

export default function Content({ contentId }) {
  return <>{contentId == 0 ? <Dashboard /> : <Appointment />}</>;
}
