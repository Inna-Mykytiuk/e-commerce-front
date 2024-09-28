import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <div className="flex min-h-screen w-full">
      <div className="hidden w-1/2 items-center justify-center bg-black bg-shop bg-cover bg-center bg-no-repeat px-12 lg:flex">
        <div className="flex h-full w-full flex-col items-center justify-center gap-4 text-center text-primary-foreground">
          <h1 className="relative px-[80px] py-[80px] text-4xl font-extrabold tracking-tight backdrop-blur-md">
            Welcome to ECommerce Shop
            <br />
            <span className="text-lg font-light text-white">
              `Your Style, Your Choice: Fashion for the Whole Family`
            </span>
          </h1>
        </div>
      </div>
      <div className="container flex flex-1 items-center justify-center bg-gradient md:bg-white">
        <Outlet />
      </div>
    </div>
  );
}

export default AuthLayout;
