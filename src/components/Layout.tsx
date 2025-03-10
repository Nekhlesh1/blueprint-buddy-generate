
import React from "react";
import Navbar from "./Navbar";
import { useToast } from "@/hooks/use-toast";

interface LayoutProps {
  children: React.ReactNode;
  userType?: "candidate" | "recruiter" | null;
  userName?: string;
}

const Layout = ({ children, userType, userName }: LayoutProps) => {
  // Toast can be used for notifications throughout the app
  const { toast } = useToast();
  
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar userType={userType} userName={userName} />
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {children}
      </main>
      <footer className="py-6 border-t bg-white">
        <div className="container mx-auto px-4 md:flex md:justify-between md:items-center">
          <div className="text-center md:text-left text-sm text-muted-foreground mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Tech Talent Connect. All rights reserved.
          </div>
          <div className="flex justify-center md:justify-end space-x-4">
            <a href="#" className="text-sm text-muted-foreground hover:text-primary">Privacy Policy</a>
            <a href="#" className="text-sm text-muted-foreground hover:text-primary">Terms of Service</a>
            <a href="#" className="text-sm text-muted-foreground hover:text-primary">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
