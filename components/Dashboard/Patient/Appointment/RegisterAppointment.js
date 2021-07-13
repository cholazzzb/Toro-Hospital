import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import SubmitButton from "@components/utils/SubmitButton";
import CancelButton from "@components/utils/CancelButton";

const detailKeys = [
  "doctor",
  "description",
  "specialist",
  "location",
  "availableTime",
];

function RegisterAppointment({
  data,
  open,
  setOpen,
  currentAppointment,
  setCurrentAppointment,
}) {
  const handleClose = () => {
    setOpen(false);
  };

  const handleFormSubmit = async (e) => {
    try {
      e.preventDefault();
      const res = await fetch(
        `/api/appointments?profileId=${data.profileId}&appointmentId=${data._id}`,
        {
          method: "PUT",
        }
      );
      const resData = await res.json();
      if (resData.success) {
        handleClose();
        setCurrentAppointment(data);
      }
    } catch (error) {}
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
        <div className="w-2/5 color1 colorText rounded-sm">
          <div className="flex color2 w-full items-center justify-between">
            <h2 className="p-4 font-bold">Confimation</h2>
            <i
              onClick={handleClose}
              className="cursor-pointer hover:text-purple-700 mr-4 fas fa-times-circle"
            ></i>
          </div>

          {detailKeys.map((key, index) => (
            <div key={index} className="flex p-2">
              <div className="font-bold flex w-1/5">{key}</div>
              <div>: {data[key]}</div>
            </div>
          ))}
          {currentAppointment ? null : (
            <div className="p-2 border-t-2 border-purple-700 flex flex-col justify-center">
              <h1 className="flex justify-center font-bold text-xl">
                You will register this appointment. Are you sure?
              </h1>
              <form
                onSubmit={handleFormSubmit}
                className="m-2 flex justify-center"
              >
                <SubmitButton label="Register" />
                <CancelButton />
              </form>
            </div>
          )}
        </div>
      </Fade>
    </Modal>
  );
}
export default RegisterAppointment;
