
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { 
  LogOut, 
  Menu, 
  X, 
  Bell, 
  User, 
  Search, 
  Bookmark
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface NavbarProps {
  userType?: "candidate" | "recruiter" | null;
  userName?: string;
}

const Navbar = ({ userType, userName }: NavbarProps) => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const handleLogout = () => {
    // This would handle actual logout in a real implementation
    navigate("/");
  };

  return (
    <header className="bg-white border-b sticky top-0 z-10">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 
              className="text-xl font-bold cursor-pointer text-primary" 
              onClick={() => navigate("/")}
            >
              Tech Talent Connect
            </h1>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:flex items-center gap-6">
            {userType === "recruiter" && (
              <>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => navigate("/recruiter/dashboard")}
                  className="flex items-center gap-2"
                >
                  <Search className="h-4 w-4" />
                  Search Candidates
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => navigate("/recruiter/saved")}
                  className="flex items-center gap-2"
                >
                  <Bookmark className="h-4 w-4" />
                  Saved Searches
                </Button>
              </>
            )}
            
            {userType === "candidate" && (
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate("/candidate/dashboard")}
                className="flex items-center gap-2"
              >
                <User className="h-4 w-4" />
                My Profile
              </Button>
            )}
            
            {userType ? (
              <div className="flex items-center gap-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Bell className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>No new notifications</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center gap-2">
                      <span className="hidden sm:inline">{userName || "User"}</span>
                      <User className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => 
                      navigate(userType === "candidate" ? "/candidate/dashboard" : "/recruiter/dashboard")
                    }>
                      Dashboard
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => 
                      navigate(userType === "candidate" ? "/candidate/profile" : "/recruiter/profile")
                    }>
                      Profile Settings
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <div className="flex items-center gap-4">
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
              </div>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
        
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            {userType === "recruiter" && (
              <div className="space-y-2">
                <Button 
                  variant="ghost" 
                  className="w-full justify-start"
                  onClick={() => {
                    navigate("/recruiter/dashboard");
                    setMobileMenuOpen(false);
                  }}
                >
                  <Search className="h-4 w-4 mr-2" />
                  Search Candidates
                </Button>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start"
                  onClick={() => {
                    navigate("/recruiter/saved");
                    setMobileMenuOpen(false);
                  }}
                >
                  <Bookmark className="h-4 w-4 mr-2" />
                  Saved Searches
                </Button>
              </div>
            )}
            
            {userType === "candidate" && (
              <Button 
                variant="ghost" 
                className="w-full justify-start"
                onClick={() => {
                  navigate("/candidate/dashboard");
                  setMobileMenuOpen(false);
                }}
              >
                <User className="h-4 w-4 mr-2" />
                My Profile
              </Button>
            )}
            
            {userType ? (
              <div className="space-y-2 pt-2">
                <Button 
                  variant="ghost" 
                  className="w-full justify-start"
                  onClick={() => {
                    navigate(userType === "candidate" ? "/candidate/dashboard" : "/recruiter/dashboard");
                    setMobileMenuOpen(false);
                  }}
                >
                  Dashboard
                </Button>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start"
                  onClick={() => {
                    navigate(userType === "candidate" ? "/candidate/profile" : "/recruiter/profile");
                    setMobileMenuOpen(false);
                  }}
                >
                  Profile Settings
                </Button>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start"
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex flex-col space-y-2 pt-2">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    navigate("/login");
                    setMobileMenuOpen(false);
                  }}
                >
                  Login
                </Button>
                <Button 
                  onClick={() => {
                    navigate("/register");
                    setMobileMenuOpen(false);
                  }}
                >
                  Register
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
