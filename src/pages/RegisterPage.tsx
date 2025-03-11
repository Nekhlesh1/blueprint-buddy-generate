
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FaGoogle, FaGithub, FaLinkedin } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const RegisterPage = () => {
  const navigate = useNavigate();
  const { userType } = useParams();
  const [selectedType, setSelectedType] = useState<string>(userType || "");
  const [loading, setLoading] = useState<boolean>(false);
  const { toast } = useToast();
  
  // Email registration states
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [showEmailForm, setShowEmailForm] = useState<boolean>(false);

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

  const handleEmailRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      
      // Validate input
      if (!email || !password || !confirmPassword) {
        toast({
          title: "Missing fields",
          description: "Please fill in all fields.",
          variant: "destructive",
        });
        return;
      }
      
      if (password !== confirmPassword) {
        toast({
          title: "Password mismatch",
          description: "Passwords do not match.",
          variant: "destructive",
        });
        return;
      }
      
      if (password.length < 6) {
        toast({
          title: "Password too short",
          description: "Password must be at least 6 characters long.",
          variant: "destructive",
        });
        return;
      }
      
      // Store user type in localStorage so we can access it after the email verification
      localStorage.setItem("userType", selectedType);
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            user_type: selectedType,
          },
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        }
      });

      if (error) {
        toast({
          title: "Registration error",
          description: error.message,
          variant: "destructive",
        });
        return;
      }

      if (data?.user) {
        toast({
          title: "Registration successful",
          description: "Please check your email to confirm your account.",
        });
        
        // Create profile immediately for better user experience
        const { error: profileError } = await supabase
          .from('profiles')
          .insert([
            { 
              id: data.user.id, 
              user_type: selectedType,
              created_at: new Date().toISOString(),
            }
          ]);

        if (profileError) {
          console.error("Error creating profile:", profileError);
        }
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

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

  // Show registration options once user type is selected
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
          {showEmailForm ? (
            <form onSubmit={handleEmailRegister} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input 
                  id="password" 
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input 
                  id="confirmPassword" 
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  disabled={loading}
                />
              </div>
              
              <Button 
                type="submit"
                className="w-full"
                disabled={loading}
              >
                {loading ? "Loading..." : "Create Account"}
              </Button>
              
              <Button 
                type="button"
                variant="link" 
                className="w-full"
                onClick={() => setShowEmailForm(false)}
                disabled={loading}
              >
                Back to all signup options
              </Button>
            </form>
          ) : (
            <>
              <Button 
                className="w-full" 
                onClick={() => setShowEmailForm(true)}
                disabled={loading}
              >
                Sign up with Email
              </Button>
              
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-muted-foreground/20"></div>
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
                </div>
              </div>
          
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
            </>
          )}

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
