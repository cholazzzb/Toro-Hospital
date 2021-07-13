import { useState, useEffect } from "react";
import { Button, TextField } from "@material-ui/core";
import CreateIcon from "@material-ui/icons/Create";
import DeleteIcon from "@material-ui/icons/Delete";
import VisibilityIcon from "@material-ui/icons/Visibility";
import CachedIcon from "@material-ui/icons/Cached";

import AddAppointment from "./Appointment/AddAppointment";
import SeeRegistrants from "./Appointment/SeeRegistrants";
import EditAppointment from "./Appointment/EditAppointment";

export default function Appointment() {
  const [isLoading, setIsLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`/api/appointments`, { method: "GET" });
        const resData = await res.json();
        if (resData.success) {
          setAppointments(resData.data);
          setIsLoading(false);
        } else {
          setErrorMessage("Failed to get Appointment Data");
        }
      } catch (error) {
        setErrorMessage("Failed to get Appointment Data");
      }
    })();
    setRefresh(false);
  }, [refresh]);

  const deleteAppointment = async (appointmentId, index) => {
    try {
      const res = await fetch(
        `/api/appointments?appointmentId=${appointmentId}`,
        {
          method: "DELETE",
        }
      );
      const resData = await res.json();
      if (resData.success) {
        const newAppointment = [...appointments];
        newAppointment.splice(index, 1);
        setAppointments(newAppointment);
      } else {
        setErrorMessage("Failed to delete Appointment");
      }
    } catch (error) {
      setErrorMessage("Failed to delete Appointment");
    }
  };

  const [registrantModalOpen, setRegistrantModalOpen] = useState(false);
  const [seeData, setSeeData] = useState({ doctor: "", appointmentId: "" });

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editData, setEditData] = useState({});

  return (
    <div className="flex flex-col mx-8 mb-8">
      <div className="flex flex-col color1 my-2 rounded-lg">
        <div className="p-4 flex justify-between">
          <div>Show X Entries</div>
          <div className="flex items-center">
            <div className="mx-4">
              <TextField
                className="colorText"
                id="outlined-basic"
                label="Search"
                variant="outlined"
              />
            </div>
            <button
              onClick={() => {
                setIsLoading(true);
                setRefresh(true);
              }}
              className="bg-yellow-700 hover:bg-yellow-900 active:bg-yellow-800 rounded-xl cursor-pointer mx-4 p-2 px-4"
            >
              Refresh
            </button>
            <AddAppointment />
          </div>
        </div>
        <div className="flex color3 p-4 font-bold">
          <div className="w-2/5">DOCTOR</div>
          <div className="w-1/5 text-center">SPECIALIST</div>
          <div className="w-1/5 text-center">TOTAL REGISTRANTS</div>
          <div className="w-1/5 text-center">ACTION</div>
        </div>
        <div className="flex flex-col p-4">
          {isLoading ? (
            <div className="flex justify-center">
              {errorMessage == "" ? (
                <>
                  <CachedIcon />
                  Loading...
                </>
              ) : (
                errorMessage
              )}
            </div>
          ) : (
            appointments.map((appointment, index) => (
              <div className="flex w-full" key={index}>
                <div className="w-2/5 p-2 flex items-center h-16">
                  {appointment.doctor}
                </div>
                <div className="w-1/5 p-2 flex items-center h-16 justify-center">
                  {appointment.specialist}
                </div>
                <div className="w-1/5 p-2 flex items-center h-16 justify-center">
                  {appointment.registrants ? appointment.registrants.length : 0}
                </div>
                <div className="w-1/5 p-2 flex items-center h-16 justify-center">
                  {appointment?.registrants.length == 0 ? null : (
                    <div
                      onClick={() => {
                        setSeeData({
                          doctor: appointment.doctor,
                          registrants: appointment.registrants,
                        });
                        setRegistrantModalOpen(true);
                      }}
                      className="ml-8 p-2 rounded-lg border-2 border-purple-700 text-purple-700 hover:bg-purple-900 active:bg-purple-800 cursor-pointer"
                    >
                      <VisibilityIcon />
                    </div>
                  )}
                  <div
                    onClick={() => {
                      setEditData(appointment);
                      setEditModalOpen(true);
                    }}
                    className="ml-8 p-2 rounded-lg border-2 border-green-700 text-green-700 hover:bg-green-900 active:bg-green-800 cursor-pointer"
                  >
                    <CreateIcon />
                  </div>
                  <div
                    onClick={() => deleteAppointment(appointment._id, index)}
                    className="ml-8 p-2 rounded-lg border-2 border-red-700 text-red-700 hover:bg-red-900 active:bg-red-800 cursor-pointer"
                  >
                    <DeleteIcon />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        <SeeRegistrants
          open={registrantModalOpen}
          setOpen={setRegistrantModalOpen}
          seeData={seeData}
        />
        <EditAppointment
          open={editModalOpen}
          setOpen={setEditModalOpen}
          editData={editData}
        />
      </div>
    </div>
  );
}
