import { useState, useEffect } from "react";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import SubmitButton from "@components/utils/SubmitButton";
import CancelButton from "@components/utils/CancelButton";
import TransferList from "@components/utils/TransferList";
import InlineDateTimePicker from "@components/utils/InlineDateTimePicker";

const formKeys = ["doctor", "description", "specialist", "location"];

function EditAppointment({ open, setOpen, editData }) {
  const [slide, setSlide] = useState(0);

  const handleClose = () => {
    setOpen(false);
    setSlide(0);
  };

  const [formData, setFormData] = useState({ ...editData });

  useEffect(() => {
    setFormData(editData);
  }, [editData]);

  const handleFormChange = (e) => {
    let target = e.target;
    let name = target.name;
    let value = target.value;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const [currentAvailableTime, setCurrentAvailableTime] = useState(
    editData.availableTime
  );
  const handleDateChange = (date) => {
    setCurrentAvailableTime(date);
  };

  const [registeredRegistrants, setRegisteredRegistrants] = useState([]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`/api/appointments/${editData._id}?type=doctor`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...formData,
        availableTime: currentAvailableTime,
        registrants: registeredRegistrants
      }),
    });

    const resData = await res.json();
    if (resData.success) {
      handleClose();
    } else {
    }
  };

  useEffect(() => {
    console.log("UPDATED?", registeredRegistrants)
  }, [registeredRegistrants])

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className="flex h-screen items-center justify-center overflow-scroll"
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
          <form onSubmit={handleFormSubmit}>
            {slide == 0 ? (
              <>
                <div className="color2 p-4 flex items-center justify-between">
                  <h2 className="">Edit Appointment</h2>
                  <i
                    onClick={handleClose}
                    className="hover:text-white cursor-pointer fas fa-times"
                  ></i>
                </div>
                <div className="flex w-full flex-col">
                  {formKeys.map((formKey, index) => (
                    <div key={index} className="p-2 px-4">
                      <label className="text-sm">{formKey}</label>
                      <input
                        value={
                          formData[formKey] == null ? "" : formData[formKey]
                        }
                        name={formKey}
                        onChange={handleFormChange}
                        className="w-full color1 p-2 border-2 border-gray-600 rounded-md"
                      />
                    </div>
                  ))}
                  <div className="p-2 px-4 flex flex-col">
                    <label className="text-sm">Available Times</label>
                    <InlineDateTimePicker
                      label=""
                      value={currentAvailableTime}
                      onChange={handleDateChange}
                    />
                  </div>
                  <div className="p-2 mb-2 flex flex-row-reverse items-center w-full">
                    <div
                      onClick={() => setSlide(1)}
                      className="bg-green-600 ml-4 rounded-full border-2 border-green-600 hover:border-green-300 cursor-pointer h-8 w-8 flex items-center justify-center"
                    >
                      <i className="hover: fas fa-chevron-right"></i>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div>
                <div className="flex items-center color2 p-4">
                  <h2 className="flex flex-grow ">Edit Registrants</h2>
                  <i
                    onClick={handleClose}
                    className="cursor-pointer hover:text-white fas fa-times"
                  ></i>
                </div>
                <TransferList
                  appointmentId={editData._id}
                  setRegisteredRegistrants={setRegisteredRegistrants}
                />
                <div className="m-2 mb-2 flex items-center">
                  <div className="cursor-pointer border-2 border-green-600 hover:border-green-300 h-8 w-8 rounded-full flex items-center justify-center bg-green-600">
                    <i
                      onClick={() => setSlide(0)}
                      className="cursor-pointer fas fa-chevron-left"
                    ></i>
                  </div>
                  <div className="flex flex-grow"></div>
                  <SubmitButton label="Edit" />
                  <CancelButton
                    onClick={(e) => {
                      e.preventDefault();
                      setOpen(false);
                      setSlide(0);
                    }}
                  />
                </div>
              </div>
            )}
          </form>
        </div>
      </Fade>
    </Modal>
  );
}

export default EditAppointment;
