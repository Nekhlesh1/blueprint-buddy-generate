
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Search, Star, Clock, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const RecruiterSavedSearches = () => {
  const navigate = useNavigate();

  const savedSearches = [
    {
      id: 1,
      query: "React developers with 3+ years experience",
      lastRun: "2 days ago",
      results: 24,
      isFavorite: true,
    },
    {
      id: 2,
      query: "Full stack developers Node.js Python",
      lastRun: "1 week ago",
      results: 18,
      isFavorite: false,
    },
    {
      id: 3,
      query: "AI machine learning specialists with NLP experience",
      lastRun: "3 days ago",
      results: 7,
      isFavorite: true,
    },
    {
      id: 4,
      query: "Senior Java developers Spring Boot",
      lastRun: "2 weeks ago",
      results: 31,
      isFavorite: false,
    },
  ];

  const handleRunSearch = (query: string) => {
    // In a real app, this would pass the query to the search page
    navigate("/recruiter/search", { state: { query } });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Saved Searches</h1>
          <p className="text-muted-foreground">
            Access and manage your previously saved candidate searches.
          </p>
        </div>
        <Button onClick={() => navigate("/recruiter/dashboard")}>
          <Search className="mr-2 h-4 w-4" />
          New Search
        </Button>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">All Searches</TabsTrigger>
          <TabsTrigger value="favorites">Favorites</TabsTrigger>
          <TabsTrigger value="recent">Recent</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-6">
          <div className="grid gap-4 md:grid-cols-2">
            {savedSearches.map((search) => (
              <SavedSearchCard 
                key={search.id}
                search={search}
                onRun={handleRunSearch}
              />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="favorites" className="mt-6">
          <div className="grid gap-4 md:grid-cols-2">
            {savedSearches
              .filter(search => search.isFavorite)
              .map((search) => (
                <SavedSearchCard 
                  key={search.id}
                  search={search}
                  onRun={handleRunSearch}
                />
              ))}
          </div>
        </TabsContent>
        
        <TabsContent value="recent" className="mt-6">
          <div className="grid gap-4 md:grid-cols-2">
            {savedSearches
              .sort((a, b) => {
                // This is a simplified example - in a real app you'd parse actual dates
                return a.lastRun.includes("day") ? -1 : 1;
              })
              .map((search) => (
                <SavedSearchCard 
                  key={search.id}
                  search={search}
                  onRun={handleRunSearch}
                />
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

interface SavedSearchCardProps {
  search: {
    id: number;
    query: string;
    lastRun: string;
    results: number;
    isFavorite: boolean;
  };
  onRun: (query: string) => void;
}

const SavedSearchCard = ({ search, onRun }: SavedSearchCardProps) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-base">{search.query}</CardTitle>
          {search.isFavorite && <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />}
        </div>
        <CardDescription className="flex items-center">
          <Clock className="h-3 w-3 mr-1" />
          Last run: {search.lastRun}
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <Badge variant="secondary">
          {search.results} candidates found
        </Badge>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="ghost" size="sm">
          <Trash2 className="h-4 w-4 mr-2" />
          Delete
        </Button>
        <Button size="sm" onClick={() => onRun(search.query)}>
          <Search className="h-4 w-4 mr-2" />
          Run Search
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RecruiterSavedSearches;
