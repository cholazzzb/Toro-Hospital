import { useState, useEffect } from "react";
import CustomResponsivePie from "@components/utils/Chart/CustomResponsivePie";
import dataEx from "@components/utils/Chart/dataEx";

const colors = ["green", "yellow", "red", "pink", "indigo", "purple"];
const colorsHSL = ["hsl(320, 70%, 50%)", "hsl(136, 70%, 50%)", "hsl(332, 70%, 50%)", "hsl(324, 70%, 50%)", "hsl(204, 70%, 50%)"] 

export default function Dashboard() {
  const [appointmentsData, setAppointmentsData] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`/api/appointments`, {
          method: "GET",
        });
        const resData = await res.json();
        if (resData.success) {
          let pieDatas = []
          resData.data.forEach(appointment => {
            let randomIndex = Math.round(Math.random() * colorsHSL.length);
            pieDatas.push({
              id: appointment.doctor,
              label: appointment.doctor,
              value: 5 - appointment.registrants.length,
              color: colorsHSL[randomIndex]
            })
          });
          setAppointmentsData(pieDatas)
        }
      } catch (error) {}
    })();
  }, []);

  const [magicColor, setMagicColor] = useState("text-green-700");
  useEffect(() => {
    setInterval(() => {
      let randomColorIndex = Math.round(Math.random() * colors.length);
      setMagicColor(`${colors[randomColorIndex]}-700`);
    }, 1000);
  }, []);

  return (
    <div className="flex mb-8 p-8 rounded-xl h-full justify-between">
      <div className="color1 w-3/5 mr-4 p-2 flex flex-col items-center rounded-xl">
        <div>NUMBER OF AVAILABLE APPOINTMENTS</div>
        <div className="w-full h-full">
          <CustomResponsivePie data={appointmentsData} />
        </div>
      </div>
      <div className="color1 w-1/3 p-2 flex flex-col items-center rounded-xl">
        <h1 className="font-bold w-full text-center">
          Appointments History (Under Development)
        </h1>
        <div className="flex flex-grow items-center">
          <div className="flex flex-col">
            <div className={`flex w-full justify-center text-${magicColor}`}>
              WAIT US FOR DEVELOPING MAGIC
            </div>
            <div className="flex w-full justify-center">
              <i
                className={`text-4xl fas fa-hat-wizard text-${magicColor}`}
              ></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
