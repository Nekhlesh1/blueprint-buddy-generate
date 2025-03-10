
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { FileUp, Save, GitHub, Linkedin } from "lucide-react";

const CandidateProfile = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">My Profile</h1>
        <p className="text-muted-foreground">
          Manage your details, skills, and resume to attract the right opportunities.
        </p>
      </div>

      <Tabs defaultValue="details" className="w-full">
        <TabsList className="grid w-full md:w-auto md:inline-grid grid-cols-3 md:grid-cols-none">
          <TabsTrigger value="details">Personal Details</TabsTrigger>
          <TabsTrigger value="skills">Skills & Experience</TabsTrigger>
          <TabsTrigger value="resume">Resume</TabsTrigger>
        </TabsList>
        
        <TabsContent value="details" className="mt-6 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>
                Update your basic information visible to recruiters.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input id="fullName" defaultValue="Alex Johnson" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue="alex.johnson@example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" defaultValue="(555) 123-4567" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" defaultValue="San Francisco, CA" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="bio">Professional Bio</Label>
                <Textarea 
                  id="bio" 
                  rows={4}
                  defaultValue="Full stack developer with 4+ years of experience specializing in React and Node.js. Passionate about building intuitive user interfaces and scalable backend solutions."
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="github">GitHub Profile</Label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground">
                      <GitHub className="h-4 w-4" />
                    </span>
                    <Input id="github" className="rounded-l-none" defaultValue="github.com/alexjohnson" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="linkedin">LinkedIn Profile</Label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground">
                      <Linkedin className="h-4 w-4" />
                    </span>
                    <Input id="linkedin" className="rounded-l-none" defaultValue="linkedin.com/in/alexjohnson" />
                  </div>
                </div>
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
        
        <TabsContent value="skills" className="mt-6 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Skills & Technologies</CardTitle>
              <CardDescription>
                Highlight your technical expertise to match with relevant opportunities.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Current Skills</Label>
                  <div className="flex flex-wrap gap-2">
                    {["React", "JavaScript", "TypeScript", "Node.js", "Express", "MongoDB", 
                      "REST APIs", "GraphQL", "Git", "AWS", "Docker"].map((skill) => (
                      <Badge key={skill} variant="secondary" className="px-3 py-1">
                        {skill}
                        <button className="ml-1 text-muted-foreground hover:text-foreground">×</button>
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="newSkill">Add Skill</Label>
                  <div className="flex gap-2">
                    <Input id="newSkill" placeholder="Enter a skill..." />
                    <Button>Add</Button>
                  </div>
                </div>
                
                <div className="pt-4 space-y-2">
                  <Label htmlFor="experience">Years of Experience</Label>
                  <Input id="experience" type="number" defaultValue="4" min="0" max="50" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="workHistory">Work Experience</Label>
                  <Textarea 
                    id="workHistory" 
                    rows={6}
                    defaultValue="Senior Developer at TechCorp (2019-Present)
- Developed and maintained multiple React applications
- Led team of 3 junior developers
- Implemented CI/CD pipeline using GitHub Actions

Software Engineer at WebSolutions (2017-2019)
- Built RESTful APIs using Node.js and Express
- Worked with MongoDB and PostgreSQL databases"
                  />
                </div>
                
                <div className="flex justify-end">
                  <Button>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="resume" className="mt-6 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Resume Management</CardTitle>
              <CardDescription>
                Upload and manage your resume for recruiters to review.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="border rounded-lg p-6 bg-muted/50 flex flex-col items-center justify-center text-center">
                  <div className="mb-4">
                    <FileUp className="h-8 w-8 text-muted-foreground mb-2" />
                    <h3 className="font-medium">Current Resume</h3>
                    <p className="text-sm text-muted-foreground">AlexJohnson_Resume_2023.pdf</p>
                    <p className="text-xs text-muted-foreground">Uploaded on Oct 15, 2023</p>
                  </div>
                  <div className="flex gap-4">
                    <Button variant="outline" size="sm">Preview</Button>
                    <Button variant="outline" size="sm">Download</Button>
                    <Button variant="destructive" size="sm">Remove</Button>
                  </div>
                </div>
                
                <div className="border border-dashed rounded-lg p-6 flex flex-col items-center justify-center">
                  <FileUp className="h-8 w-8 text-muted-foreground mb-2" />
                  <h3 className="font-medium mb-1">Upload New Resume</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Drag and drop your resume file or click to browse
                  </p>
                  <Button>Select File</Button>
                  <p className="text-xs text-muted-foreground mt-4">
                    Supported formats: PDF, DOCX, RTF (Max size: 5MB)
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label className="text-base">Privacy Settings</Label>
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <div className="flex items-start space-x-2">
                      <input
                        type="checkbox"
                        id="allowDownload"
                        className="mt-1"
                        defaultChecked
                      />
                      <div>
                        <Label htmlFor="allowDownload" className="text-sm font-medium">
                          Allow recruiters to download my resume
                        </Label>
                        <p className="text-xs text-muted-foreground">
                          When enabled, recruiters can download a copy of your resume. When disabled, they can only view it online.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button>
                    <Save className="mr-2 h-4 w-4" />
                    Save Privacy Settings
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

export default CandidateProfile;
