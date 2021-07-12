export default function Sliders({ activeSlide, iconList, slideButtons }) {
  return (
    <div className="flex flex-col items-center p-4">
      <div className="flex">
        {iconList.map((icon, iconIndex) => (
          <div key={iconIndex} className="flex">
            <div className="flex flex-col items-center">
              <span
                className={`flex items-center justify-center cursor-pointer rounded-full w-12 h-12 ${
                  iconIndex == activeSlide
                    ? "bg-purple-500 "
                    : "bg-white text-purple-700 "
                }`}
              >
                <i className={icon.icon}></i>
              </span>
              <h1 className="text-white">{icon.text}</h1>
            </div>
            {iconIndex != iconList.length - 1 ? 
            <div className="flex items-center h-12 w-24">
            <div className="bg-indigo-800 w-full h-1"></div></div>: null}
          </div>
        ))}
      </div>
    </div>
  );
}
