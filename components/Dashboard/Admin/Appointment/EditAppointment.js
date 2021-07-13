import { useState } from "react";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import SubmitButton from "@components/utils/SubmitButton";
import CancelButton from "@components/utils/CancelButton";

const formKeys = [
  "doctor",
  "description",
  "specialist",
  "registrants",
  "location",
  "availableTime",
];

function EditAppointment({ open, setOpen, editData }) {
  const handleClose = () => {
    setOpen(false);
  };

  console.log("editData", editData)
  const [formData, setFormData] = useState(editData);

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
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    if (res.success) {
      setOpen(false);
    } else {
    }
  };

  return (
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
          <h2 className="color2 p-4">Edit Appointment</h2>
          <form onSubmit={handleFormSubmit} className="flex w-full flex-col">
            {formKeys.map((formKey, index) => (
              <div key={index} className="p-2 px-4">
                <label className="text-sm">{formKey}</label>
                <input
                  value={formData[formKey]}
                  name={formKey}
                  onChange={handleFormChange}
                  className="w-full color1 p-2 border-2 border-gray-600 rounded-md"
                />
              </div>
            ))}

            <div className="m-2 mb-8 flex">
              <SubmitButton />
              <CancelButton
                onClick={(e) => {
                  e.preventDefault();
                  setOpen(false);
                }}
              />
            </div>
          </form>
        </div>
      </Fade>
    </Modal>
  );
}

export default EditAppointment;
