import { useState } from "react";
import MenuIcon from "@material-ui/icons/Menu";

const styleSelected = (isSelected) => {
  let style;
  if (isSelected) {
    style = "color2";
  } else {
    style = "";
  }
  return style;
};

export default function Navbar({ content, contentId, setContentId }) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div
      className={`color1 p-4 text-gray-300 h-full ${isOpen ? "w-3/8" : null}`}
    >
      <div className={`mb-4 flex items-center`}>
        <MenuIcon
          fontSize="large"
          className="p-2 bg-purple-700 rounded-md cursor-pointer"
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        />
        {isOpen ? (
          <h1 className=" ml-2 text-xl text-purple-700 mr-4">Menu</h1>
        ) : null}
      </div>
      {content.map((elem, id) => (
        <div
          key={id}
          className={`flex items-center p-2 my-2 rounded-lg cursor-pointer ${styleSelected(
            contentId == id
          )}`}
          onClick={() => {
            setContentId(id);
          }}
        >
          {elem.icon}
          {isOpen ? <p className="ml-4 text-sm">{elem.name}</p> : null}
        </div>
      ))}
    </div>
  );
}
