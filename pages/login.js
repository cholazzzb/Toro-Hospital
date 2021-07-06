import { TextField } from "@material-ui/core";
import Head from "next/head";

export default function login() {
  return (
    <div className="background colorText">
      <Head>
        <title>Login</title>
      </Head>
      <div className="flex w-full items-center justify-center">
        <div className="color1 flex flex-col px-48 py-8 text-center rounded-xl">
          <h1 className="text-4xl">Welcome to Toro Hospital</h1>
          <form className="flex flex-col">
            <div className="flex flex-col items-start mt-6">
              <label>Email</label>
              <input className="w-full rounded-xl p-2 color2" />
            </div>
            <div className="flex flex-col items-start my-4">
              <label>Password</label>
              <input className="w-full rounded-xl p-2 color2" />
            </div>
            <button className="bg-purple-700 hover:bg-purple-800 rounded-xl p-4 my-2">
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
