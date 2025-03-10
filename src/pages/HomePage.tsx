
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Tech Talent Connect</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          The intelligent platform connecting tech professionals with recruiters through NLP-powered matching
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>For Tech Professionals</CardTitle>
            <CardDescription>Build your profile and get discovered by top recruiters</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-4">
              <li>Create a comprehensive professional profile</li>
              <li>Upload your CV securely</li>
              <li>Receive messages from interested recruiters</li>
              <li>Get real-time notifications</li>
            </ul>
            <Button className="w-full" onClick={() => navigate("/register/candidate")}>
              Join as a Tech Professional
            </Button>
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>For Recruiters</CardTitle>
            <CardDescription>Find the perfect candidates using advanced search</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-4">
              <li>Search for candidates with NLP-powered tools</li>
              <li>View detailed profiles and CVs</li>
              <li>Connect with candidates in real-time</li>
              <li>Receive notifications for responses</li>
            </ul>
            <Button className="w-full" onClick={() => navigate("/register/recruiter")}>
              Join as a Recruiter
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="text-center">
        <p className="mb-4">Already have an account?</p>
        <Button variant="outline" onClick={() => navigate("/login")}>
          Login
        </Button>
      </div>
    </div>
  );
};

export default HomePage;
