import { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

export default function login() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });

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
    e.preventDefault();
    try {
      const res = await fetch(`/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.status == 201) {
        router.push("/dashboard");
      }
    } catch (error) {
      console.error(`LOG IN ERROR ${error}`);
    }
  };
  return (
    <div className="background colorText">
      <Head>
        <title>Login</title>
      </Head>
      <div className="flex w-full items-center justify-center">
        <div className="color1 flex flex-col px-48 py-8 text-center rounded-xl">
          <h1 className="text-4xl">Welcome to Toro Hospital</h1>
          <form onSubmit={handleFormSubmit} className="flex flex-col">
            <div className="flex flex-col items-start mt-6">
              <label>Email</label>
              <input
                className="w-full rounded-xl p-2 color2"
                name="email"
                onChange={handleFormChange}
                placeholder="Email"
                required
              />
            </div>
            <div className="flex flex-col items-start my-4">
              <label>Password</label>
              <input
                type="password"
                className="w-full rounded-xl p-2 color2"
                name="password"
                onChange={handleFormChange}
                placeholder="Password"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-purple-700 hover:bg-purple-800 rounded-xl p-4 my-2"
            >
              Login
            </button>
            <div className="flex justify-center">
              New on our platform?
              <a className="ml-4 cursor-pointer text-purple-700" href="/signup">
                Create an account
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
