
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Search, MessageCircle, UserCircle, Bell } from "lucide-react";

const RecruiterDashboard = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);

  // Mock search results
  const mockCandidates = [
    {
      id: 1,
      name: "Alex Johnson",
      skills: ["React", "TypeScript", "Node.js", "MongoDB"],
      experience: "5 years of full-stack development",
      hasCv: true
    },
    {
      id: 2,
      name: "Sam Wilson",
      skills: ["Python", "Django", "PostgreSQL", "Docker"],
      experience: "3 years of backend development",
      hasCv: true
    },
    {
      id: 3,
      name: "Taylor Smith",
      skills: ["React", "Redux", "JavaScript", "CSS"],
      experience: "4 years of frontend development",
      hasCv: false
    }
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!searchQuery.trim()) {
      toast({
        title: "Search Error",
        description: "Please enter a search query",
        variant: "destructive"
      });
      return;
    }
    
    setIsSearching(true);
    
    // Simulate NLP search with a delay
    setTimeout(() => {
      // Basic filtering (would be replaced with actual NLP search)
      const results = mockCandidates.filter(candidate => {
        const skillsMatch = candidate.skills.some(skill => 
          skill.toLowerCase().includes(searchQuery.toLowerCase())
        );
        const experienceMatch = candidate.experience
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
        
        return skillsMatch || experienceMatch;
      });
      
      setSearchResults(results);
      setIsSearching(false);
      
      toast({
        title: "Search Complete",
        description: `Found ${results.length} candidates matching your query`,
      });
    }, 1500);
  };

  const viewCandidateProfile = (candidateId: number) => {
    // This would navigate to the candidate profile in a real implementation
    console.log(`Viewing candidate ${candidateId}`);
    toast({
      title: "Profile Viewed",
      description: "The candidate has been notified of your interest",
    });
  };

  const messageCandiate = (candidateId: number) => {
    // This would open a messaging interface in a real implementation
    console.log(`Messaging candidate ${candidateId}`);
    toast({
      title: "Message Interface",
      description: "Starting a conversation with this candidate",
    });
  };

  return (
    <div className="container mx-auto py-6 px-4 max-w-6xl">
      <h1 className="text-3xl font-bold mb-6">Recruiter Dashboard</h1>
      
      <Tabs defaultValue="search" className="w-full">
        <TabsList className="grid grid-cols-4 mb-8">
          <TabsTrigger value="search" className="flex items-center gap-2">
            <Search className="h-4 w-4" />
            <span className="hidden sm:inline">Search</span>
          </TabsTrigger>
          <TabsTrigger value="messages" className="flex items-center gap-2">
            <MessageCircle className="h-4 w-4" />
            <span className="hidden sm:inline">Messages</span>
          </TabsTrigger>
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <UserCircle className="h-4 w-4" />
            <span className="hidden sm:inline">Profile</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            <span className="hidden sm:inline">Notifications</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="search">
          <Card>
            <CardHeader>
              <CardTitle>NLP-Powered Candidate Search</CardTitle>
              <CardDescription>
                Search for candidates by describing skills, experience, or roles
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSearch} className="mb-6">
                <div className="flex gap-2">
                  <Input
                    placeholder="e.g., 'React developers with 3+ years experience'"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1"
                  />
                  <Button type="submit" disabled={isSearching}>
                    {isSearching ? "Searching..." : "Search"}
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  Try natural language queries like "frontend developers who know React" or "Python backend engineers"
                </p>
              </form>
              
              {searchResults.length > 0 ? (
                <div className="space-y-4">
                  {searchResults.map((candidate) => (
                    <Card key={candidate.id}>
                      <CardContent className="pt-6">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                          <div>
                            <h3 className="font-semibold text-lg">{candidate.name}</h3>
                            <p className="text-sm text-muted-foreground">{candidate.experience}</p>
                            <div className="flex flex-wrap gap-1 mt-2">
                              {candidate.skills.map((skill: string, index: number) => (
                                <span key={index} className="bg-secondary text-secondary-foreground text-xs px-2 py-1 rounded">
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div className="flex gap-2 sm:flex-col">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => viewCandidateProfile(candidate.id)}
                              className="w-full"
                            >
                              View Profile
                            </Button>
                            <Button 
                              size="sm"
                              onClick={() => messageCandiate(candidate.id)}
                              className="w-full"
                            >
                              Message
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : searchQuery && !isSearching ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No candidates found matching your search</p>
                  <p className="text-sm mt-2">Try broadening your search terms</p>
                </div>
              ) : null}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="messages">
          <Card>
            <CardHeader>
              <CardTitle>Messages</CardTitle>
              <CardDescription>Communicate with candidates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <p className="text-muted-foreground mb-2">No active conversations</p>
                <p className="text-sm">Start by searching for candidates and messaging them</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Your Profile</CardTitle>
              <CardDescription>Manage your recruiter information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="r-name" className="text-sm font-medium">Full Name</label>
                  <Input id="r-name" defaultValue="Recruiter Name" />
                </div>
                <div>
                  <label htmlFor="r-email" className="text-sm font-medium">Email</label>
                  <Input id="r-email" defaultValue="recruiter@company.com" readOnly />
                </div>
              </div>
              
              <div>
                <label htmlFor="company" className="text-sm font-medium">Company</label>
                <Input id="company" defaultValue="Tech Recruitment Inc." />
              </div>
              
              <Button>Save Profile</Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>Stay updated on messages and candidate activity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <p className="text-muted-foreground mb-2">No notifications yet</p>
                <p className="text-sm">When candidates respond to your messages, you'll be notified here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RecruiterDashboard;
