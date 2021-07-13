import { useState, useEffect } from "react";

import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { purple } from "@material-ui/core/colors";

import CachedIcon from "@material-ui/icons/Cached";
import RegisterAppointment from "./Appointment/RegisterAppointment";

export default function Appointment({ profileId }) {
  const [currentAppointment, setCurrentAppointment] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [appointments, setAppointments] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res1 = await fetch(
          `/api/appointments/${profileId}?type=patient`,
          {
            method: "GET",
          }
        );
        const resData1 = await res1.json();
        if (resData1.success) {
          setCurrentAppointment(resData1.data);
        }
      } catch (error) {}
      try {
        const res2 = await fetch(`/api/appointments`, {
          method: "GET",
        });
        const resData2 = await res2.json();
        if (resData2.success) {
          setAppointments(resData2.data);
          setIsLoading(false);
        } else {
          setErrorMessage("FAILED TO GET APPOINTMENTS DATA");
        }
      } catch (error) {
        setErrorMessage("FAILED TO GET APPOINTMENTS DATA");
      }
    })();
  }, []);

  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  const [registrationData, setRegistrationData] = useState({});

  const cancelAppointment = async (appointmentId) => {
    try {
      const res = await fetch(
        `/api/appointments/${appointmentId}?type=patient&profileId=${profileId}`,
        {
          method: "PUT",
        }
      );
      const resData = await res.json();
      if (resData.success) {
        setCurrentAppointment(null);
      }
    } catch (error) {}
  };

  return (
    <div className="flex flex-grow justify-between mx-8 pb-8">
      {currentAppointment ? (
        <>
          <div className="flex flex-col color1 p-4 rounded-xl w-1/4 h-7/8 text-center">
            <h1 className="font-bold py-4">YOUR APPOINTMENT</h1>
            <div className="">
              <AccountCircleIcon fontSize="large" />
            </div>
            <div>{currentAppointment?.doctor}</div>
            <div className="flex p-2 items-center">
              <div className="color3 p-2">
                <CalendarTodayIcon
                  style={{ color: purple[600] }}
                  className="cursor-pointer"
                />
              </div>
              <div className="text-left">
                <h1 className="ml-2 font-bold">Day</h1>
                <p className="ml-2">{currentAppointment?.availableTime}</p>
              </div>
            </div>
            <div className="flex p-2 items-center">
              <div className="color3 p-2">
                <LocationOnIcon
                  style={{ color: purple[600] }}
                  className="cursor-pointer"
                />
              </div>
              <div className="text-left">
                <h1 className="ml-2 font-bold">Location</h1>
                <p className="ml-2">{currentAppointment?.location}</p>
              </div>
            </div>

            <button
              onClick={() => cancelAppointment(currentAppointment._id)}
              className="border-2 border-red-500 active:bg-red-900 hover:bg-red-800 cursor-pointer p-2 rounded-md text-red-500"
            >
              CANCEL
            </button>
          </div>
        </>
      ) : null}
      <div className="color1 p-4 rounded-xl w-full h-7/8 ml-8 text-center">
        <h1 className="font-bold p-4">APPOINTMENTS LIST</h1>
        <div className="p-2 border-t-2 border-purple-700">
          SEARCH FILTER AND PAGE NAVIGATION
        </div>
        <div className="text-left flex flex-col flex-grow border-t-2 border-purple-700">
          <div className="flex font-bold p-2">
            <div className="w-3/5">DOCTOR NAME</div>
            <div className="w-1/5 flex justify-center">SPECIALIST</div>
            <div className="w-1/5 flex justify-center">ACTION</div>
          </div>

          {isLoading ? (
            <div className="flex">
              <CachedIcon /> Loading...
            </div>
          ) : null}
          {appointments.map((data, index) => (
            <div key={index} className="flex p-2">
              <div className="w-3/5 flex items-center">
                <AccountCircleIcon fontSize="large" />
                <p className="ml-2">{data.doctor}</p>
              </div>
              <div className="w-1/5 flex justify-center items-center">
                {data.specialist}
              </div>

              <div className="w-1/5 flex justify-center items-center">
                {data.registrants?.length == 5 ? (
                  <div className="cursor-not-allowed rounded-xl bg-gray-900 p-2 text-sm text-red-500 border-2 border-red-900">
                    FULL
                  </div>
                ) : (
                  <>
                    <div
                      onClick={() => {
                        setRegistrationData({ ...data, profileId });
                        setRegisterModalOpen(true);
                      }}
                      className={`rounded-xl bg-gray-900 p-2 text-sm cursor-pointer border-2 ${
                        currentAppointment?
                        "active:bg-yellow-700 text-yellow-500 border-yellow-900"
                        :
                        "active:bg-green-700 text-green-500 border-green-900"}`}
                    >
                      {currentAppointment?
                      <>DETAILS</>
                    :
                      <>REGISTER</>
                    }
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
          <RegisterAppointment
            data={registrationData}
            open={registerModalOpen}
            setOpen={setRegisterModalOpen}
            currentAppointment={currentAppointment}
            setCurrentAppointment={setCurrentAppointment}
          />
        </div>
      </div>
    </div>
  );
}
