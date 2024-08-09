import PatientForm from "@/components/forms/PatientForm";
import { Link } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex h-screen max-h-screen">
{/*       
      OTP Verfication | PassKey Modal popup */}


      {/* Full/ page layout */}
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[496px]">
          <Image 
            src="/assets/icons/logo-full.svg"
            height={1000}
            width={1000}
            alt="patient"
            className="mb-12 h-10 w-fit"
          />

          {/* Patient Fill out form section  */}
      
          <PatientForm />

          <div className="text-14-regular mt-20 flex justify-between">
            <p className="justify-items-end text-dark-600 xl:text-left">
              © 2024 CarePulse
            </p>
            <Link href="/?admin=true" className="text-green-500">
              Admin
            </Link>
          </div>
        </div>
      </section>
{/* 
      Big image section */}

      <Image 
        src="/assets/images/hello-the-one.jpg"
        height={1000}
        width={1000}
        alt="patient"
        /** It takes 50% of the screen */
        className="side-img max-w-[50%]"
        />

    </div>
  );
}
