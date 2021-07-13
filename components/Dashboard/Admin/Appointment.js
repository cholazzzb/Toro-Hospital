import React from "react";
import { useState, useEffect } from "react";
import { TextField } from "@material-ui/core";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import CreateIcon from "@material-ui/icons/Create";
import DeleteIcon from "@material-ui/icons/Delete";
import VisibilityIcon from "@material-ui/icons/Visibility";
import CachedIcon from "@material-ui/icons/Cached";

const formDatas = ["doctor", "description", "registrants", "location", "time"];

const initialForm = {};
formDatas.forEach((formData) => {
  initialForm[formData] = null;
});

function AddAppointment() {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState(initialForm);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleFormChange = (e) => {
    let target = e.target;
    let name = target.name;
    let value = target.value;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFormSubmit = async () => {
    const res = await fetch("/api/appointment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    if (res.success) {
      setOpen(false);
    } else {
    }
  };

  return (
    <div>
      <div
        onClick={handleOpen}
        className="bg-purple-700 hover:bg-purple-800 cursor-pointer font-bold py-2 px-6 rounded-lg"
      >
        Add Appointment
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className="flex items-center justify-center"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className="color1 colorText rounded-sm">
            <h2 className="color2 p-4">New Appointment</h2>
            <form onSubmit={handleFormSubmit} className="flex w-full flex-col">
              {formDatas.map((formData, index) => (
                <div key={index} className="p-2 px-4">
                  <label className="text-sm">{formData}</label>
                  <input
                    placeholder={formData}
                    name={formData}
                    onChange={handleFormChange}
                    className="w-full color1 p-2 border-2 border-gray-600 rounded-md"
                  />
                </div>
              ))}

              <div className="m-2 mb-8 flex">
                <button
                  className="cursor-pointer mx-4 bg-purple-700 hover:bg-purple-800 p-2 px-4 rounded-xl font-bold"
                  type="submit"
                >
                  Submit
                </button>
                <button className="cursor-pointer border-2 rounded-xl p-2 px-4">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

export default function Appointment() {
  const [isLoading, setIsLoading] = useState(true);
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
  }, []);

  return (
    <div className="flex flex-col mx-8">
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
            <AddAppointment />
          </div>
        </div>
        <div className="flex color3 p-4 font-bold">
          <div className="w-3/5">DOCTOR</div>
          <div className="w-1/5 text-center">TOTAL APPOINTMENTS</div>
          <div className="w-1/5 text-center">ACTION</div>
        </div>
        <div className="flex flex-col p-4">
          {isLoading ? (
            <div className="flex justify-center">
              {errorMessage == "" ? <><CachedIcon />Loading...</> : errorMessage}
            </div>
          ) : (
            appointments.map((appointment, index) => (
              <div className="flex w-full" key={index}>
                <div className="w-3/5 p-2 flex items-center h-16">
                  {appointment.doctor}
                </div>
                <div className="w-1/5 p-2 flex items-center h-16 justify-center">
                  {appointment.registrants.length}
                </div>
                <div className="w-1/5 p-2 flex items-center h-16 justify-center">
                  {appointment.registrants.length == 0 ? null : (
                    <div className="ml-8 p-2 rounded-lg border-2 border-purple-700 text-purple-700 hover:bg-purple-900 cursor-pointer">
                      <VisibilityIcon />
                    </div>
                  )}
                  <div className="ml-8 p-2 rounded-lg border-2 border-green-700 text-green-700 hover:bg-green-900 cursor-pointer">
                    <CreateIcon />
                  </div>
                  <div className="ml-8 p-2 rounded-lg border-2 border-red-700 text-red-700 hover:bg-red-900 cursor-pointer">
                    <DeleteIcon />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
