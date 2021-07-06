import Head from "next/head";
import Header from "@components/Header";
import Footer from "@components/Footer";

export default function Home() {
  return (
    <div className="background">
      <Head>
        <title>Toro Hospital</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex w-full justify-center items-center colorText">
        <div className="p-16 font-bold rounded-xl bg-gray-900 flex flex-col justify-center items-center">
          <h1 className="text-4xl">Welcome to Toro Hospital!</h1>
          <div className="flex p-4">
            <a
              href="/signup"
              className="m-2 bg-blue-700 hover:bg-blue-800 cursor-pointer p-4 rounded-xl"
            >
              Signup
            </a>
            <a
              href="/login"
              className="m-2 bg-purple-700 hover:bg-purple-800 cursor-pointer p-4 rounded-xl"
            >
              Login
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
