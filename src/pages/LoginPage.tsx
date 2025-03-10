
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FaGoogle, FaGithub, FaLinkedin } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();

  const handleOAuthLogin = (provider: string) => {
    // This will be implemented with actual OAuth integration
    console.log(`Logging in with ${provider}`);
  };

  return (
    <div className="container mx-auto py-12 px-4 flex justify-center">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Welcome Back</CardTitle>
          <CardDescription>Login to your account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button 
            variant="outline" 
            className="w-full flex items-center justify-center gap-2"
            onClick={() => handleOAuthLogin("Google")}
          >
            <FaGoogle className="h-4 w-4" />
            <span>Continue with Google</span>
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full flex items-center justify-center gap-2"
            onClick={() => handleOAuthLogin("GitHub")}
          >
            <FaGithub className="h-4 w-4" />
            <span>Continue with GitHub</span>
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full flex items-center justify-center gap-2"
            onClick={() => handleOAuthLogin("LinkedIn")}
          >
            <FaLinkedin className="h-4 w-4" />
            <span>Continue with LinkedIn</span>
          </Button>

          <div className="text-center mt-6">
            <p className="text-sm text-muted-foreground mb-2">
              Don't have an account yet?
            </p>
            <Button 
              variant="link" 
              onClick={() => navigate("/register")}
            >
              Create an account
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
