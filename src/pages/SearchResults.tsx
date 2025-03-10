
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { 
  Search, 
  Filter, 
  Download, 
  Eye, 
  MessageSquare, 
  Bookmark, 
  BookmarkCheck,
  ChevronDown,
  FileText,
  MapPin,
  Calendar
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [query, setQuery] = useState(location.state?.query || "");
  const [sortOption, setSortOption] = useState("relevance");
  const [savedCandidates, setSavedCandidates] = useState<number[]>([1, 3]);
  
  // Mock search results
  const candidates = [
    {
      id: 1,
      name: "Jordan Lee",
      title: "Senior React Developer",
      location: "New York, NY (Remote)",
      experience: "5 years",
      skills: ["React", "TypeScript", "Node.js", "GraphQL", "AWS"],
      education: "B.S. Computer Science, NYU",
      availability: "Available immediately",
      lastActive: "2 days ago",
      matchScore: 95,
    },
    {
      id: 2,
      name: "Morgan Chen",
      title: "Frontend Engineer",
      location: "San Francisco, CA",
      experience: "3 years",
      skills: ["React", "JavaScript", "CSS", "Webpack", "Redux"],
      education: "B.S. Software Engineering, UC Berkeley",
      availability: "2 weeks notice",
      lastActive: "Just now",
      matchScore: 87,
    },
    {
      id: 3,
      name: "Taylor Wilson",
      title: "Full Stack Developer",
      location: "Chicago, IL (Remote)",
      experience: "4 years",
      skills: ["React", "Node.js", "Express", "MongoDB", "Docker"],
      education: "M.S. Computer Science, Stanford",
      availability: "Available immediately",
      lastActive: "3 days ago",
      matchScore: 82,
    },
    {
      id: 4,
      name: "Alex Rivera",
      title: "React Native Developer",
      location: "Austin, TX",
      experience: "6 years",
      skills: ["React Native", "React", "JavaScript", "iOS", "Android"],
      education: "B.S. Information Technology, UT Austin",
      availability: "1 month notice",
      lastActive: "1 week ago",
      matchScore: 78,
    },
  ];
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would trigger a new search
    console.log("Searching for:", query);
  };
  
  const toggleSaveCandidate = (id: number) => {
    if (savedCandidates.includes(id)) {
      setSavedCandidates(savedCandidates.filter(candidateId => candidateId !== id));
    } else {
      setSavedCandidates([...savedCandidates, id]);
    }
  };
  
  const handleSortChange = (value: string) => {
    setSortOption(value);
    // In a real app, this would re-sort the results
    console.log("Sorting by:", value);
  };
  
  const handleContactCandidate = (id: number) => {
    navigate("/recruiter/messages", { state: { candidateId: id } });
  };
  
  const handleSaveSearch = () => {
    // In a real app, this would save the current search query
    console.log("Saving search:", query);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Search Results</h1>
        <p className="text-muted-foreground">
          {candidates.length} candidates found matching your search criteria.
        </p>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-3/4">
          <form onSubmit={handleSearch} className="flex w-full space-x-2 mb-4">
            <Input
              type="text"
              placeholder="Search by skills, experience, location..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1"
            />
            <Button type="submit">
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </form>
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
            <Button variant="outline" size="sm" className="w-full sm:w-auto">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
            
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="w-full sm:w-auto">
                    Sort: {sortOption === "relevance" ? "Most Relevant" : 
                           sortOption === "recent" ? "Recently Active" : 
                           "Experience: High to Low"}
                    <ChevronDown className="h-4 w-4 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => handleSortChange("relevance")}>
                    Most Relevant
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleSortChange("recent")}>
                    Recently Active
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleSortChange("experience")}>
                    Experience: High to Low
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <Button variant="secondary" size="sm" className="w-full sm:w-auto" onClick={handleSaveSearch}>
                <Bookmark className="h-4 w-4 mr-2" />
                Save Search
              </Button>
            </div>
          </div>
          
          <Tabs defaultValue="matches" className="w-full">
            <TabsList className="w-full grid grid-cols-2">
              <TabsTrigger value="matches">Best Matches</TabsTrigger>
              <TabsTrigger value="saved">Saved Candidates</TabsTrigger>
            </TabsList>
            
            <TabsContent value="matches" className="mt-4 space-y-4">
              {candidates.map((candidate) => (
                <CandidateCard 
                  key={candidate.id}
                  candidate={candidate}
                  isSaved={savedCandidates.includes(candidate.id)}
                  onSave={() => toggleSaveCandidate(candidate.id)}
                  onContact={() => handleContactCandidate(candidate.id)}
                />
              ))}
            </TabsContent>
            
            <TabsContent value="saved" className="mt-4 space-y-4">
              {candidates
                .filter(candidate => savedCandidates.includes(candidate.id))
                .map((candidate) => (
                  <CandidateCard 
                    key={candidate.id}
                    candidate={candidate}
                    isSaved={true}
                    onSave={() => toggleSaveCandidate(candidate.id)}
                    onContact={() => handleContactCandidate(candidate.id)}
                  />
                ))}
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="w-full md:w-1/4 space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Search Tips</CardTitle>
            </CardHeader>
            <CardContent className="text-xs space-y-2">
              <p>
                <span className="font-medium">Use quotation marks</span> for exact phrase matching: "front end developer"
              </p>
              <p>
                <span className="font-medium">Combine terms</span> with AND/OR: React AND Node.js
              </p>
              <p>
                <span className="font-medium">Exclude terms</span> with minus sign: JavaScript -jQuery
              </p>
              <p>
                <span className="font-medium">Experience ranges</span>: "3+ years experience"
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Similar Searches</CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-2">
              <Button variant="link" className="p-0 h-auto text-xs text-left w-full justify-start">
                Full Stack JavaScript Developers
              </Button>
              <Button variant="link" className="p-0 h-auto text-xs text-left w-full justify-start">
                React Developers with TypeScript
              </Button>
              <Button variant="link" className="p-0 h-auto text-xs text-left w-full justify-start">
                Frontend Engineers with 3+ years experience
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

interface CandidateCardProps {
  candidate: {
    id: number;
    name: string;
    title: string;
    location: string;
    experience: string;
    skills: string[];
    education: string;
    availability: string;
    lastActive: string;
    matchScore: number;
  };
  isSaved: boolean;
  onSave: () => void;
  onContact: () => void;
}

const CandidateCard = ({ candidate, isSaved, onSave, onContact }: CandidateCardProps) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{candidate.name}</CardTitle>
            <CardDescription>{candidate.title}</CardDescription>
          </div>
          <Badge 
            variant={candidate.matchScore > 90 ? "default" : "secondary"}
            className="ml-2"
          >
            {candidate.matchScore}% Match
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 text-sm">
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-1 text-muted-foreground" />
            {candidate.location}
          </div>
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
            {candidate.experience} experience
          </div>
          <div className="flex items-center">
            <FileText className="h-4 w-4 mr-1 text-muted-foreground" />
            {candidate.education}
          </div>
          <div className="flex items-center">
            <Eye className="h-4 w-4 mr-1 text-muted-foreground" />
            Last active: {candidate.lastActive}
          </div>
        </div>
        
        <div className="mt-3">
          <p className="text-sm font-medium mb-1">Skills</p>
          <div className="flex flex-wrap gap-1">
            {candidate.skills.map((skill, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between pt-2">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onSave}
          className="text-xs"
        >
          {isSaved ? (
            <>
              <BookmarkCheck className="h-4 w-4 mr-1 fill-primary text-primary" />
              Saved
            </>
          ) : (
            <>
              <Bookmark className="h-4 w-4 mr-1" />
              Save
            </>
          )}
        </Button>
        
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm"
            className="text-xs"
          >
            <Download className="h-4 w-4 mr-1" />
            CV
          </Button>
          <Button 
            size="sm"
            onClick={onContact}
            className="text-xs"
          >
            <MessageSquare className="h-4 w-4 mr-1" />
            Contact
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default SearchResults;
