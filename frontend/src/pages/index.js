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