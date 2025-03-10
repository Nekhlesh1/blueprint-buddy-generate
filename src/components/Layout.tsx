
import React from "react";
import Navbar from "./Navbar";

interface LayoutProps {
  children: React.ReactNode;
  userType?: "candidate" | "recruiter" | null;
  userName?: string;
}

const Layout = ({ children, userType, userName }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar userType={userType} userName={userName} />
      <main className="flex-1">
        {children}
      </main>
      <footer className="py-6 border-t">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Tech Talent Connect. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Layout;
