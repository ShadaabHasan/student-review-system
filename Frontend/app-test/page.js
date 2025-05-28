import Image from "next/image";
import Homepage from "./components/Homepage";
import Login from "./Login/page";
import Signup from "./SignUp/page";
import Navbar from "./components/Navbar";

export default function Home() {
  return (
    <>
      {/* <Navbar /> */}
      <Homepage />
    </>
  );
}
