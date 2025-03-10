
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { MessageCircle, UserCircle, FileText, Bell } from "lucide-react";

const CandidateDashboard = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("profile");

  // This would be fetched from your backend in a real implementation
  const mockProfile = {
    name: "Alex Johnson",
    email: "alex@example.com",
    skills: ["React", "TypeScript", "Node.js", "MongoDB"],
    experience: "5 years of full-stack development",
    cvUrl: null // No CV uploaded yet
  };

  const handleCvUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    // This will be implemented with actual file upload to S3
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      toast({
        title: "CV Upload Started",
        description: `Uploading ${file.name} (${Math.round(file.size / 1024)}KB)`,
      });
      
      // Mock successful upload after 2 seconds
      setTimeout(() => {
        toast({
          title: "CV Uploaded Successfully",
          description: "Recruiters can now view your CV",
        });
      }, 2000);
    }
  };

  return (
    <div className="container mx-auto py-6 px-4 max-w-6xl">
      <h1 className="text-3xl font-bold mb-6">Candidate Dashboard</h1>
      
      <Tabs defaultValue="profile" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-4 mb-8">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <UserCircle className="h-4 w-4" />
            <span className="hidden sm:inline">Profile</span>
          </TabsTrigger>
          <TabsTrigger value="cv" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span className="hidden sm:inline">CV</span>
          </TabsTrigger>
          <TabsTrigger value="messages" className="flex items-center gap-2">
            <MessageCircle className="h-4 w-4" />
            <span className="hidden sm:inline">Messages</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            <span className="hidden sm:inline">Notifications</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Your Profile</CardTitle>
              <CardDescription>Manage your professional information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="text-sm font-medium">Full Name</label>
                  <Input id="name" defaultValue={mockProfile.name} />
                </div>
                <div>
                  <label htmlFor="email" className="text-sm font-medium">Email</label>
                  <Input id="email" defaultValue={mockProfile.email} readOnly />
                </div>
              </div>
              
              <div>
                <label htmlFor="skills" className="text-sm font-medium">Skills (comma separated)</label>
                <Input id="skills" defaultValue={mockProfile.skills.join(", ")} />
              </div>
              
              <div>
                <label htmlFor="experience" className="text-sm font-medium">Experience</label>
                <Input id="experience" defaultValue={mockProfile.experience} />
              </div>
              
              <Button>Save Profile</Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="cv">
          <Card>
            <CardHeader>
              <CardTitle>CV Management</CardTitle>
              <CardDescription>Upload or update your CV</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockProfile.cvUrl ? (
                <div className="border rounded p-4 flex justify-between items-center">
                  <div>
                    <p className="font-medium">Current CV</p>
                    <p className="text-sm text-muted-foreground">Last updated: Today</p>
                  </div>
                  <Button variant="outline">Preview</Button>
                </div>
              ) : (
                <div className="border rounded p-4 border-dashed text-center">
                  <p className="text-muted-foreground mb-2">No CV uploaded yet</p>
                </div>
              )}
              
              <div className="mt-4">
                <label htmlFor="cv-upload" className="block text-sm font-medium mb-2">
                  Upload New CV (PDF, DOC, DOCX)
                </label>
                <Input 
                  id="cv-upload" 
                  type="file" 
                  accept=".pdf,.doc,.docx" 
                  onChange={handleCvUpload}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="messages">
          <Card>
            <CardHeader>
              <CardTitle>Messages</CardTitle>
              <CardDescription>Communicate with recruiters</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <p className="text-muted-foreground mb-2">No messages yet</p>
                <p className="text-sm">When recruiters contact you, conversations will appear here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>Stay updated on profile views and messages</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <p className="text-muted-foreground mb-2">No notifications yet</p>
                <p className="text-sm">When your profile is viewed or you receive messages, we'll notify you here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CandidateDashboard;
