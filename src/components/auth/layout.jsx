import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <div className="flex min-h-screen w-full">
      <div className="hidden lg:flex items-center justify-center bg-black w-1/2 px-12 bg-shop bg-cover bg-no-repeat bg-center">
        <div className="text-center text-primary-foreground h-full w-full flex flex-col gap-4 items-center justify-center">
          <h1 className="text-4xl font-extrabold tracking-tight relative py-[80px] px-[80px] backdrop-blur-md">
            Welcome to ECommerce Shopping
            <br />
            <span className="text-white font-light text-lg">`Your Style, Your Choice: Fashion for the Whole Family`</span>
          </h1>
        </div>
      </div>
      <div className="container flex flex-1 items-center justify-center bg-background">
        <Outlet />
      </div>
    </div>
  );
}

export default AuthLayout;
