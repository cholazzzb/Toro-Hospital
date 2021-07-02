import Head from "next/head";
import Patient from "@components/Dashboard/Patient";

export default function dashboard() {
  return (
    <div className="background colorText">
      <Head>
        <title>Toro Hospital</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Patient />
    </div>
  );
}
