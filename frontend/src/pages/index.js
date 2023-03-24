import Head from "next/head";
import Login from "./Login";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("/login");
  }, []);

  return (
    <div>
      <Head>
        <title>My App - Login</title>
      </Head>
      <Login />
    </div>
  );
}
//Make sure to save your changes and restart the development server. The login page should now be displayed when you navigate to http://localhost:3000.
