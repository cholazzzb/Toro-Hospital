import { TextField } from "@material-ui/core";
import Head from "next/head";

export default function login() {
  return (
    <div className="background colorText">
      <Head>
        <title>Login</title>
      </Head>
      <div className="flex w-full items-center justify-center">
        <div className="color1 flex flex-col p-4 text-center rounded-lg">
          Welcome to Toro Hospital
          <form className="flex flex-col">
            <div className="mt-4">
              <TextField label="Email" variant="outlined" />
            </div>
            <div className="mt-4">
              <TextField label="Password" variant="outlined" />
            </div>
            <button className="bg-purple-700 hover:bg-purple-800 rounded-xl p-4 my-2">
              Login
            </button>
            New on our platform?
            <a className="cursor-pointer text-purple-700" href="/signup">
              Create an account
            </a>
          </form>
        </div>
      </div>
    </div>
  );
}
