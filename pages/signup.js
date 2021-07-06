import { TextField } from "@material-ui/core";
import Head from "next/head";

export default function signup() {
  return (
    <div className="background colorText">
      <Head>
        <title>Signup</title>
      </Head>
      <div className="flex w-full items-center justify-center">
        <div className="color1 flex flex-col p-4 text-center rounded-lg">
          Welcome to Toro Hospital
          <form className="flex flex-col">
            <div className="mt-4">
              <TextField label="Username" variant="outlined" />
            </div>
            <div className="mt-4">
              <TextField label="Email" variant="outlined" />
            </div>
            <div className="mt-4">
              <TextField label="Password" variant="outlined" />
            </div>
            <button className="bg-purple-700 hover:bg-purple-800 rounded-xl p-4 my-2">
              Sign up
            </button>
            Already have an account?
            <a className="cursor-pointer text-purple-700" href="/login">
              Log in instead
            </a>
          </form>
        </div>
      </div>
    </div>
  );
}
