import { resetTokenAndCredentials } from "@/store/auth-slice";
import { AlignJustify, LogOut } from "lucide-react";
import PropTypes from "prop-types";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Button } from "../ui/button";

function AdminHeader({ setOpen }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleLogout() {
    dispatch(resetTokenAndCredentials());
    sessionStorage.clear();
    navigate("/auth/login");
  }

  return (
    <header className="flex items-center justify-between border-b bg-background px-4 py-3">
      <Button onClick={() => setOpen(true)} className="sm:block lg:hidden">
        <AlignJustify />
        <span className="sr-only">Toggle Menu</span>
      </Button>
      <div className="flex flex-1 justify-end">
        <Button
          onClick={handleLogout}
          className="inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium shadow"
        >
          <LogOut />
          Logout
        </Button>
      </div>
    </header>
  );
}

AdminHeader.propTypes = {
  setOpen: PropTypes.func.isRequired,
};

export default AdminHeader;
