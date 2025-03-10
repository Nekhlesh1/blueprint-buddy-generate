
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Building, Save, Settings, Bell } from "lucide-react";
import { Switch } from "@/components/ui/switch";

const RecruiterProfile = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Recruiter Profile</h1>
        <p className="text-muted-foreground">
          Manage your account details and company information.
        </p>
      </div>

      <Tabs defaultValue="details" className="w-full">
        <TabsList className="grid w-full md:w-auto md:inline-grid grid-cols-3 md:grid-cols-none">
          <TabsTrigger value="details">Account Details</TabsTrigger>
          <TabsTrigger value="company">Company Info</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="details" className="mt-6 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>
                Update your contact details and personal information.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input id="fullName" defaultValue="Taylor Smith" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="jobTitle">Job Title</Label>
                  <Input id="jobTitle" defaultValue="Senior Technical Recruiter" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue="taylor.smith@techcorp.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" defaultValue="(555) 987-6543" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="bio">Professional Bio</Label>
                <Textarea 
                  id="bio" 
                  rows={4}
                  defaultValue="Technical recruiter with 6+ years of experience specializing in connecting top tech talent with innovative companies. Passionate about building diverse and effective engineering teams."
                />
              </div>
              
              <div className="flex justify-end">
                <Button>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="company" className="mt-6 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Company Information</CardTitle>
              <CardDescription>
                Update details about your organization to help candidates learn more.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Company Name</Label>
                    <Input id="companyName" defaultValue="TechCorp Solutions" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="website">Company Website</Label>
                    <Input id="website" defaultValue="https://techcorp.example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="industry">Industry</Label>
                    <Input id="industry" defaultValue="Software Development & IT Services" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="size">Company Size</Label>
                    <Input id="size" defaultValue="51-200 employees" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Company Description</Label>
                  <Textarea 
                    id="description" 
                    rows={4}
                    defaultValue="TechCorp Solutions is a leading provider of innovative software solutions for enterprise companies. Founded in 2010, we specialize in AI-powered business intelligence tools and custom software development."
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="location">Headquarters Location</Label>
                  <Input id="location" defaultValue="San Francisco, CA" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="benefits">Benefits & Perks</Label>
                  <Textarea 
                    id="benefits" 
                    rows={4}
                    defaultValue="- Competitive salary & equity options
- Flexible remote work policy
- Comprehensive health, dental, and vision insurance
- 401(k) matching program
- Professional development budget
- Regular team building events"
                  />
                </div>
                
                <div className="flex justify-end">
                  <Button>
                    <Building className="mr-2 h-4 w-4" />
                    Update Company Info
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="settings" className="mt-6 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Search Preferences</CardTitle>
              <CardDescription>
                Configure your default search settings and preferences.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">Save Search History</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically save your recent searches for quick access
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">AI-Enhanced Search</Label>
                    <p className="text-sm text-muted-foreground">
                      Use AI to improve search results by understanding synonyms and related skills
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">Fuzzy Matching</Label>
                    <p className="text-sm text-muted-foreground">
                      Match similar terms and account for typos in search queries
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>
                Configure how and when you receive notifications.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive updates and alerts via email
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">New Message Alerts</Label>
                    <p className="text-sm text-muted-foreground">
                      Get notified when candidates respond to your messages
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">Weekly Digest</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive a weekly summary of new candidates matching your saved searches
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex justify-end">
                  <Button>
                    <Bell className="mr-2 h-4 w-4" />
                    Update Notification Settings
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Account Security</CardTitle>
              <CardDescription>
                Manage your password and security settings.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input id="currentPassword" type="password" />
                  </div>
                  <div></div>
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input id="newPassword" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input id="confirmPassword" type="password" />
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button>
                    <Settings className="mr-2 h-4 w-4" />
                    Update Password
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RecruiterProfile;
