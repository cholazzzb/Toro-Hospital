import { useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Patient from "@components/Dashboard/Patient";
import Admin from "@components/Dashboard/Admin";
import checkProfile from "utils/checkProfile";

export async function getServerSideProps(context) {
  const { profileId, username, role } = await checkProfile(context.req);
  return {
    props: {
      profileId: profileId,
      username: username,
      role: role,
    },
  };
}

export default function dashboard({ profileId, username, role }) {
  const router = useRouter();
  useEffect(() => {
    if (role == "") {
      router.push("/");
    }
  }, [role]);

  return (
    <div className="background colorText">
      <Head>
        <title>Toro Hospital</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {role == "Patient" ? (
        <Patient profileId={profileId} username={username} role={role} />
      ) : role == "Admin" ? (
        <Admin profileId={profileId} username={username} role={role} />
      ) : (
        <div className="flex w-full justify-center items-center text-4xl">
          You do not have access to this resource!
        </div>
      )}
    </div>
  );
}
