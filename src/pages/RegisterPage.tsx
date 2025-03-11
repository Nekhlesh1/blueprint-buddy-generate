
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FaGoogle, FaGithub, FaLinkedin } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const RegisterPage = () => {
  const navigate = useNavigate();
  const { userType } = useParams();
  const [selectedType, setSelectedType] = useState<string>(userType || "");
  const [loading, setLoading] = useState<boolean>(false);
  const { toast } = useToast();

  // Check if user is already logged in
  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        // Redirect to appropriate dashboard based on user type
        const path = selectedType === "candidate" ? "/candidate/dashboard" : "/recruiter/dashboard";
        navigate(path);
      }
    };
    checkSession();
  }, [navigate, selectedType]);

  const handleOAuthRegister = async (provider: string) => {
    try {
      setLoading(true);
      
      // Store user type in localStorage so we can access it after the OAuth redirect
      localStorage.setItem("userType", selectedType);
      
      let { data, error } = await supabase.auth.signInWithOAuth({
        provider: provider.toLowerCase() as any,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams: {
            // Pass user type as query param for processing after auth
            user_type: selectedType,
          }
        }
      });

      if (error) {
        toast({
          title: "Authentication error",
          description: error.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
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
              disabled={loading}
            >
              I'm a Tech Professional
            </Button>
            
            <Button 
              className="w-full" 
              onClick={() => setSelectedType("recruiter")}
              disabled={loading}
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
                disabled={loading}
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
            onClick={() => handleOAuthRegister("google")}
            disabled={loading}
          >
            <FaGoogle className="h-4 w-4" />
            <span>Continue with Google</span>
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full flex items-center justify-center gap-2"
            onClick={() => handleOAuthRegister("github")}
            disabled={loading}
          >
            <FaGithub className="h-4 w-4" />
            <span>Continue with GitHub</span>
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full flex items-center justify-center gap-2"
            onClick={() => handleOAuthRegister("linkedin_oidc")}
            disabled={loading}
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
              disabled={loading}
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
