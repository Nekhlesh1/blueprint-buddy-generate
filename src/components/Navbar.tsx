
import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";

interface NavbarProps {
  userType?: "candidate" | "recruiter" | null;
  userName?: string;
}

const Navbar = ({ userType, userName }: NavbarProps) => {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    // This would handle actual logout in a real implementation
    navigate("/");
  };

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 flex justify-between items-center h-16">
        <div className="flex items-center">
          <h1 
            className="text-xl font-bold cursor-pointer" 
            onClick={() => navigate("/")}
          >
            Tech Talent Connect
          </h1>
        </div>
        
        <div className="flex items-center gap-4">
          {userType ? (
            <>
              <span className="text-sm hidden md:inline">
                Welcome, {userName || "User"}
              </span>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleLogout}
                className="flex items-center gap-2"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden md:inline">Logout</span>
              </Button>
            </>
          ) : (
            <>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => navigate("/login")}
              >
                Login
              </Button>
              <Button 
                size="sm" 
                onClick={() => navigate("/register")}
              >
                Register
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
