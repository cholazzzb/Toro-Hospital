import Appointment from "./Appointment";
import Dashboard from "./Dashboard";

export default function Content({ contentId, profileId }) {
  return <>{contentId == 0 ? <Dashboard /> : <Appointment profileId={profileId} />}</>;
}
