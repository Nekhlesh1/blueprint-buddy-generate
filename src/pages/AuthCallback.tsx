
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
        console.log("Auth callback started");
        // Get the session data
        const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          throw new Error(sessionError.message || "Failed to get auth session");
        }

        if (!sessionData.session) {
          console.log("No session found");
          navigate("/login");
          return;
        }

        console.log("Session found, user ID:", sessionData.session.user.id);
        const userId = sessionData.session.user.id;
        
        // Check if this user already has a profile
        const { data: existingProfile, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', userId)
          .single();

        if (profileError && profileError.code !== 'PGRST116') {
          console.error("Profile fetch error:", profileError);
          throw new Error(profileError.message);
        }

        // If profile exists, redirect to the appropriate dashboard
        if (existingProfile) {
          console.log("Existing profile found, redirecting to:", existingProfile.user_type);
          const path = existingProfile.user_type === "candidate" ? "/candidate/dashboard" : "/recruiter/dashboard";
          navigate(path, { replace: true });
          return;
        }

        // If no profile exists, create one with user type from localStorage or user's metadata
        let userType = localStorage.getItem("userType");
        
        // Clear the stored user type
        localStorage.removeItem("userType");
        
        if (!userType) {
          // Try to get user type from URL if not in localStorage
          const params = new URLSearchParams(window.location.search);
          userType = params.get("user_type") || null;
          
          // If still not found, try to get from user metadata
          if (!userType && sessionData.session.user.user_metadata) {
            userType = sessionData.session.user.user_metadata.user_type;
          }
          
          // Default to candidate if still not specified
          if (!userType) {
            userType = "candidate";
          }
        }

        console.log("Creating new profile with user type:", userType);

        // Create a new profile for the user
        const { error: insertError } = await supabase
          .from('profiles')
          .insert([
            { 
              id: userId, 
              user_type: userType,
              created_at: new Date().toISOString(),
            }
          ]);

        if (insertError) {
          console.error("Profile creation error:", insertError);
          throw new Error(insertError.message);
        }

        // Redirect to the appropriate dashboard
        const path = userType === "candidate" ? "/candidate/dashboard" : "/recruiter/dashboard";
        console.log("Redirecting to:", path);
        navigate(path, { replace: true });
        
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
