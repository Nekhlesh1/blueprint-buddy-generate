
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const AuthCallback = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // Get the session data
        const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError || !sessionData.session) {
          throw new Error(sessionError?.message || "Failed to get auth session");
        }

        const userId = sessionData.session.user.id;
        
        // Check if this user already has a profile
        const { data: existingProfile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', userId)
          .single();

        // If profile exists, redirect to the appropriate dashboard
        if (existingProfile) {
          const path = existingProfile.user_type === "candidate" ? "/candidate/dashboard" : "/recruiter/dashboard";
          navigate(path);
          return;
        }

        // If no profile exists, create one with user type from localStorage
        let userType = localStorage.getItem("userType");
        
        // Clear the stored user type
        localStorage.removeItem("userType");
        
        if (!userType) {
          // Try to get user type from URL if not in localStorage
          const params = new URLSearchParams(window.location.search);
          userType = params.get("user_type") || "candidate"; // Default to candidate if not specified
        }

        // Create a new profile for the user
        const { error: profileError } = await supabase
          .from('profiles')
          .insert([
            { 
              id: userId, 
              user_type: userType,
              created_at: new Date().toISOString(),
            }
          ]);

        if (profileError) {
          throw new Error(profileError.message);
        }

        // Redirect to the appropriate dashboard
        const path = userType === "candidate" ? "/candidate/dashboard" : "/recruiter/dashboard";
        navigate(path);
        
        toast({
          title: "Successfully authenticated",
          description: "Your account has been created successfully.",
        });
      } catch (error: any) {
        console.error("Auth callback error:", error);
        toast({
          title: "Authentication Error",
          description: error.message || "Something went wrong during authentication.",
          variant: "destructive",
        });
        navigate("/login");
      } finally {
        setIsLoading(false);
      }
    };

    handleAuthCallback();
  }, [navigate, toast]);

  return (
    <div className="container mx-auto py-12 px-4 flex justify-center items-center min-h-[60vh]">
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-4">Processing your login...</h2>
        {isLoading && (
          <div className="flex justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthCallback;
