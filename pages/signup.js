import { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Sliders from "@components/Sliders";

const iconList = [
  { icon: "fas fa-door-open", text: "Register" },
  { icon: "fas fa-address-book", text: "Fill Data" },
];

const initialFormData = {
  username: "",
  email: "",
  password: "",
  role: "Patient",
  profile: {},
};

const initialProfileData = {
  firstName: "",
  lastName: "",
  age: 0,
  gender: "",
};
export default function signup() {
  const router = useRouter();
  const [slide, setSlide] = useState(0);
  const [formData, setFormData] = useState(initialFormData);
  const [profileData, setProfileData] = useState(initialProfileData);
  const [selectedGender, setSelectedGender] = useState(null);
  const nextSlide = () => {
    setSlide((slide + 1) % iconList.length);
  };
  const prevSlide = () => {
    setSlide((slide - 1) % iconList.length);
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

  const handleFormProfileChange = (e) => {
    let target = e.target;
    let name = target.name;
    let value = target.value;
    setProfileData({
      ...profileData,
      [name]: value,
    });
  };

  const selectGender = (gender) => {
    setSelectedGender(gender);
    setProfileData({
      ...profileData,
      gender: gender,
    });
  };

  const submit = async () => {
    try {
      const res = await fetch(`/api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, profile: profileData }),
      });

      if (res.status == 201) {
        router.push("/login");
      }
    } catch (error) {
      console.error(`SIGN UP ERROR ${error}`);
    }
  };

  return (
    <div className="background colorText">
      <Head>
        <title>Signup</title>
      </Head>
      <div className="flex flex-col w-full items-center">
        <Sliders
          activeSlide={slide}
          iconList={iconList}
          slideButtons={[prevSlide, nextSlide]}
        />
        <div className="flex flex-col w-full items-center justify-center">
          {slide == 0 ? (
            <div className="color1 flex flex-col w-1/2 p-8 text-center rounded-xl">
              <h1 className="text-4xl">Welcome to Toro Hospital</h1>
              <div className={`flex flex-col`}>
                <div className="flex flex-col items-start mt-6">
                  <label>Username</label>
                  <input
                    name="username"
                    onChange={handleFormChange}
                    placeholder="Username"
                    required
                    className="w-full rounded-xl p-2 color2"
                  />
                </div>
                <div className="flex flex-col items-start mt-4">
                  <label>Email</label>
                  <input
                    name="email"
                    onChange={handleFormChange}
                    placeholder="Email"
                    required
                    className="w-full rounded-xl p-2 color2"
                  />
                </div>
                <div className="flex flex-col items-start my-4">
                  <label>Password</label>
                  <input
                    type="password"
                    name="password"
                    onChange={handleFormChange}
                    placeholder="Password (Min 7 Characters)"
                    required
                    className="w-full rounded-xl p-2 color2"
                  />
                </div>
              </div>
              <button
                onClick={() => nextSlide()}
                className="bg-purple-700 hover:bg-purple-800 rounded-xl p-4 my-2"
              >
                Next
              </button>
              <div className="flex justify-center">
                Already have an account?
                <a
                  className="ml-4 cursor-pointer text-purple-700"
                  href="/login"
                >
                  Log in instead
                </a>
              </div>
            </div>
          ) : (
            <div className="color1 flex flex-col w-1/2 p-8 text-center rounded-xl">
              <span
                onClick={() => {
                  prevSlide();
                }}
                className="flex justify-center items-center w-8 h-8 cursor-pointer border-2 hover:border-purple-700 hover:text-purple-700 rounded-full"
              >
                <i className="fas fa-chevron-circle-left"></i>
              </span>
              <h1 className="text-4xl">Fill your data</h1>
              <div className={`flex flex-col`}>
                <div className="flex flex-col items-start mt-6">
                  <label>First Name *</label>
                  <input
                    name="firstName"
                    onChange={handleFormProfileChange}
                    placeholder="First Name"
                    required
                    className="w-full rounded-xl p-2 color2"
                  />
                </div>
                <div className="flex flex-col items-start mt-4">
                  <label>Last Name *</label>
                  <input
                    name="lastName"
                    onChange={handleFormProfileChange}
                    placeholder="Last Name"
                    required
                    className="w-full rounded-xl p-2 color2"
                  />
                </div>
                <div className="flex flex-col items-start my-4">
                  <label>Age *</label>
                  <input
                    name="age"
                    onChange={handleFormProfileChange}
                    placeholder="Age"
                    required
                    className="w-full rounded-xl p-2 color2"
                  />
                </div>
                <div className="flex flex-col items-start my-4">
                  <label>Gender</label>
                  <div className="flex w-full justify-around">
                    <span
                      onClick={() => selectGender("male")}
                      className={`flex items-center rounded-xl justify-center bg-blue-900 hover:bg-blue-800 cursor-pointer p-4 text-4xl w-24 h-24 ${
                        selectedGender == "male"
                          ? "border-2 border-white"
                          : null
                      }`}
                    >
                      <i className="fas fa-mars"></i>
                    </span>
                    <span
                      onClick={() => selectGender("female")}
                      className={`flex items-center rounded-xl justify-center bg-pink-900 hover:bg-pink-800 cursor-pointer p-4 text-4xl w-24 h-24 ${
                        selectedGender == "female"
                          ? "border-2 border-white"
                          : null
                      }`}
                    >
                      <i className="fas fa-venus"></i>
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => submit()}
                className="bg-purple-700 hover:bg-purple-800 rounded-xl p-4 my-2"
              >
                Sign up
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
