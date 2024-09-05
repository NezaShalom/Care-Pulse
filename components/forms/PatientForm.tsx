// SHADCN FORM INSTALLATION
"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form } from "@/components/ui/form"
import CustomFormField from "../CustomFormField"
import SubmitButton from "../SubmitButton"
import { useState } from "react"
import { UserFormValidation } from "@/lib/validation"
import { useRouter } from "next/navigation"
import { createUser } from "@/lib/actions/patient.actions"
 
export enum FormFieldType {
    INPUT = "input",
    TEXTAREA = "textarea",
    PHONE_INPUT = "phoneInput",
    CHECKBOX = "checkbox",
    DATE_PICKER = "datePicker",
    SELECT = "select",
    SKELETON = "skeleton",
}

 
export const PatientForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);


  // 1. Define your form AND validations. UserFormValidation is a validation from lib 
  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  })
 
 // 2. after knowing that we are propery collecting the information(values above) the next step is to submit the form, Define a submit handler.
  async function onSubmit({ name, email, phone }: z.infer<typeof UserFormValidation>) {
    // Do something with the form values.

    setIsLoading(true);


    try {
      //the data for the user that we are going to tke into the database
      const userData = { name, email, phone };

      //appwrite function to pass(CREATE) user data TO THE DATABASE (MORE ACTION IS DONE IN patient.actions)
      const user = await createUser(userData);
      if(user) router.push(`/patients/${user.$id}/register`)
       
    } catch (error) {
      console.log(error);
    }

      setIsLoading(false);
    // ✅ This will be type-safe and validated.
    
  }

  return (
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        <section className="mb-12 space-y-4">
            <h1 className="header">Hi there 👋</h1>
            <p className="text-dark-700">Schedule your first appointment</p>
        </section>



    <CustomFormField
        fieldType={FormFieldType.INPUT}
        control={form.control}
        name= "name"
        label="Full name"
        placeholder="Your Full name"
        iconSrc="/assets/icons/user.svg"
        iconAlt="user"
    />

    <CustomFormField
        fieldType={FormFieldType.INPUT}
        control={form.control}
        name= "email"
        label="Email"
        placeholder="Fill your email"
        iconSrc="/assets/icons/email.svg"
        iconAlt="email"
    />

      <CustomFormField
        fieldType={FormFieldType.PHONE_INPUT}
        control={form.control}
        name= "phone"
        label="Phone number"
        placeholder="(000) 000-0000"
    />

      <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
    </form>
  </Form>
  );
};
