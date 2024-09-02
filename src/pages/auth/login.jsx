import { useState } from "react";
import { Link } from "react-router-dom";
import { loginFormControls } from "@/config";
import CommonForm from "@/components/common/form";

const initialState = {
  email: "",
  password: "",
};

function AuthLogin() {

  const [formData, setFormData] = useState(initialState);

  function onSubmit(event) {
    event.preventDefault();
  }


  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Sign in to your account
        </h1>
        <p className="mt-2">
          Don&apos;t have any accouny?
          <Link
            className="font-medium ml-2 text-primary hover:underline"
            to="/auth/register"
          >
            Register
          </Link>
        </p>
      </div>
      <CommonForm
        formControls={loginFormControls}
        buttonText={"Sign Up"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  )
}

export default AuthLogin;