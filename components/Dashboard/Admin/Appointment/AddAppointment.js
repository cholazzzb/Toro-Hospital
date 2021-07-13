import { useState } from "react";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import InlineDateTimePicker from "@components/utils/InlineDateTimePicker";
import CancelButton from "@components/utils/CancelButton";
import SubmitButton from "@components/utils/SubmitButton";

const formDatas = ["doctor", "description", "specialist", "registrants", "location"];

const initialForm = {};
formDatas.forEach((formData) => {
  initialForm[formData] = "";
});

export default function AddAppointment() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [availableTime, setAvailableTime] = useState(new Date());

  const handleDateChange = (date) => {
    setAvailableTime(date);
  };

  const [formData, setFormData] = useState(initialForm);
  const handleFormChange = (e) => {
    let target = e.target;
    let name = target.name;
    let value = target.value;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    const res = await fetch("/api/appointments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...formData, availableTime: availableTime }),
    });
    const resData = await res.json()
    if (resData.success) {
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
              <div className="p-2 px-4 colorText flex flex-col">
                <div className="flex items-center justify-between">
                  <label>Select Available Time</label>
                </div>
                <InlineDateTimePicker
                  label=""
                  value={availableTime}
                  onChange={handleDateChange}
                />
              </div>

              <div className="m-2 mb-8 flex">
                <SubmitButton/>
                <CancelButton onClick={(e) => {
                    e.preventDefault();
                    setOpen(false);
                  }}/>
              </div>
            </form>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
