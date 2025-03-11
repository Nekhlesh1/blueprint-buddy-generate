
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FaGoogle, FaGithub, FaLinkedin } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const LoginPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const { toast } = useToast();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showEmailForm, setShowEmailForm] = useState<boolean>(false);

  // Check if user is already logged in
  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        // Fetch user profile to determine user type
        const { data: profileData } = await supabase
          .from('profiles')
          .select('user_type')
          .eq('id', data.session.user.id)
          .single();
        
        // Redirect to appropriate dashboard based on user type
        if (profileData) {
          const path = profileData.user_type === "candidate" ? "/candidate/dashboard" : "/recruiter/dashboard";
          navigate(path);
        } else {
          // If user exists but no profile, redirect to register
          navigate("/register");
        }
      }
    };
    checkSession();
  }, [navigate]);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      
      if (!email || !password) {
        toast({
          title: "Missing fields",
          description: "Please enter both email and password.",
          variant: "destructive",
        });
        return;
      }
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        toast({
          title: "Authentication error",
          description: error.message,
          variant: "destructive",
        });
        return;
      }

      if (data?.user) {
        toast({
          title: "Login successful",
          description: "You have been logged in successfully.",
        });
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

  const handleOAuthLogin = async (provider: string) => {
    try {
      setLoading(true);
      
      let { data, error } = await supabase.auth.signInWithOAuth({
        provider: provider.toLowerCase() as any,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
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

  return (
    <div className="container mx-auto py-12 px-4 flex justify-center">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Welcome Back</CardTitle>
          <CardDescription>Login to your account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {showEmailForm ? (
            <form onSubmit={handleEmailLogin} className="space-y-4">
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
              
              <Button 
                type="submit"
                className="w-full"
                disabled={loading}
              >
                {loading ? "Loading..." : "Login"}
              </Button>
              
              <Button 
                type="button"
                variant="link" 
                className="w-full"
                onClick={() => setShowEmailForm(false)}
                disabled={loading}
              >
                Back to all login options
              </Button>
            </form>
          ) : (
            <>
              <Button 
                className="w-full" 
                onClick={() => setShowEmailForm(true)}
                disabled={loading}
              >
                Continue with Email
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
                onClick={() => handleOAuthLogin("google")}
                disabled={loading}
              >
                <FaGoogle className="h-4 w-4" />
                <span>Continue with Google</span>
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full flex items-center justify-center gap-2"
                onClick={() => handleOAuthLogin("github")}
                disabled={loading}
              >
                <FaGithub className="h-4 w-4" />
                <span>Continue with GitHub</span>
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full flex items-center justify-center gap-2"
                onClick={() => handleOAuthLogin("linkedin_oidc")}
                disabled={loading}
              >
                <FaLinkedin className="h-4 w-4" />
                <span>Continue with LinkedIn</span>
              </Button>
            </>
          )}

          <div className="text-center mt-6">
            <p className="text-sm text-muted-foreground mb-2">
              Don't have an account yet?
            </p>
            <Button 
              variant="link" 
              onClick={() => navigate("/register")}
              disabled={loading}
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
