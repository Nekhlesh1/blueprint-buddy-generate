
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FaGoogle, FaGithub, FaLinkedin } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";

const RegisterPage = () => {
  const navigate = useNavigate();
  const { userType } = useParams();
  const [selectedType, setSelectedType] = useState<string>(userType || "");

  const handleOAuthRegister = (provider: string) => {
    // This will be implemented with actual OAuth integration
    console.log(`Registering with ${provider} as ${selectedType}`);
  };

  // If no user type is selected yet, show the selection screen
  if (!selectedType) {
    return (
      <div className="container mx-auto py-12 px-4 flex justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Join Tech Talent Connect</CardTitle>
            <CardDescription>Select your account type to get started</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              className="w-full" 
              onClick={() => setSelectedType("candidate")}
            >
              I'm a Tech Professional
            </Button>
            
            <Button 
              className="w-full" 
              onClick={() => setSelectedType("recruiter")}
            >
              I'm a Recruiter
            </Button>

            <div className="text-center mt-6">
              <p className="text-sm text-muted-foreground mb-2">
                Already have an account?
              </p>
              <Button 
                variant="link" 
                onClick={() => navigate("/login")}
              >
                Login
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Show OAuth options once user type is selected
  return (
    <div className="container mx-auto py-12 px-4 flex justify-center">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">
            {selectedType === "candidate" ? "Join as a Tech Professional" : "Join as a Recruiter"}
          </CardTitle>
          <CardDescription>Create your account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button 
            variant="outline" 
            className="w-full flex items-center justify-center gap-2"
            onClick={() => handleOAuthRegister("Google")}
          >
            <FaGoogle className="h-4 w-4" />
            <span>Continue with Google</span>
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full flex items-center justify-center gap-2"
            onClick={() => handleOAuthRegister("GitHub")}
          >
            <FaGithub className="h-4 w-4" />
            <span>Continue with GitHub</span>
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full flex items-center justify-center gap-2"
            onClick={() => handleOAuthRegister("LinkedIn")}
          >
            <FaLinkedin className="h-4 w-4" />
            <span>Continue with LinkedIn</span>
          </Button>

          <div className="text-center mt-6">
            <p className="text-sm text-muted-foreground mb-2">
              Already have an account?
            </p>
            <Button 
              variant="link" 
              onClick={() => navigate("/login")}
            >
              Login
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterPage;
