import React from "react";
import { useState, useEffect } from "react";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

function SeeRegistrants({ open, setOpen, seeData }) {
  const [registrantList, setRegistrantList] = useState([]);

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    (async () => {
      const res = await fetch(
        `/api/registrants?appointmentId=${seeData.appointmentId}`,
        { method: "GET" }
      );
      const resData = await res.json();
      if (resData.success) {
        setRegistrantList(resData.data);
      }
    })();
  }, [open]);

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
        <div className="flex w-5/6 flex-col color1 colorText rounded-sm">
          <div className="flex justify-between items-center color2 p-4">
            <h2 className="">List of Registrants - Doctor {seeData.doctor}</h2>
            <i
              onClick={handleClose}
              className="cursor-pointer ml-8 hover:text-purple-700 fas fa-times-circle"
            ></i>
          </div>
          <div className="m-2 mb-8 flex flex-col">
            <div className="flex w-full p-2 font-bold">
              <div className="flex w-2/6 mr-4">Name </div>
              <div className="flex w-1/6 text-centre mx-4">Age</div>
              <div className="flex w-1/6 text-centre mx-4">Gender</div>
              <div className="flex w-2/6 text-centre ml-4">E-mail</div>
            </div>
            {registrantList?.map((registrant, index) => (
              <React.Fragment key={index}>
                {registrant.hasOwnProperty("userProfile") ? (
                  <div className="flex w-full p-2 font-bold">
                    <div className="flex w-2/6 mr-4 ">
                      {registrant?.userProfile.profile.firstName}{" "}
                      {registrant?.userProfile.profile.lastName}
                    </div>
                    <div className="flex w-1/6 text-centre mx-4">
                      {registrant?.userProfile.profile.age}
                    </div>
                    <div className="flex w-1/6 text-centre mx-4">
                      {registrant?.userProfile.profile.gender}
                    </div>
                    <div className="flex w-2/6 text-centre ml-4">
                      {registrant?.userProfile.email}
                    </div>
                  </div>
                ) : null}
              </React.Fragment>
            ))}
          </div>
        </div>
      </Fade>
    </Modal>
  );
}

export default SeeRegistrants;
