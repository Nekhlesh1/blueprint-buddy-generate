
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Search, User, MessageSquare, ChevronDown, Check, Clock } from "lucide-react";
import MessageThread from "@/components/messaging/MessageThread";

interface MessageCenterProps {
  userType: "candidate" | "recruiter";
}

const MessageCenter = ({ userType }: MessageCenterProps) => {
  const [selectedConversation, setSelectedConversation] = useState<number | null>(1);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Mock conversation data
  const conversations = [
    {
      id: 1,
      withUser: userType === "candidate" ? "Taylor Smith" : "Jordan Lee",
      withUserRole: userType === "candidate" ? "Recruiter at TechCorp" : "Senior React Developer",
      lastMessage: "Thanks for your response. Are you available for a call next week?",
      lastMessageTime: "2 hours ago",
      unread: true,
      messages: [
        { id: 1, fromUser: userType === "candidate" ? false : true, text: "Hi there! I came across your profile and I think you'd be a great fit for a position we have open.", timestamp: "2 days ago" },
        { id: 2, fromUser: userType === "candidate" ? true : false, text: "Thanks for reaching out! I'd be interested in learning more about the opportunity.", timestamp: "1 day ago" },
        { id: 3, fromUser: userType === "candidate" ? false : true, text: "Great! The position is for a Senior React Developer role at a fast-growing startup. They're looking for someone with your experience in building complex web applications.", timestamp: "1 day ago" },
        { id: 4, fromUser: userType === "candidate" ? true : false, text: "That sounds interesting. What can you tell me about the company culture and their tech stack?", timestamp: "1 day ago" },
        { id: 5, fromUser: userType === "candidate" ? false : true, text: "They have a collaborative culture with a focus on work-life balance. Their tech stack includes React, TypeScript, Node.js, and they're using AWS for their infrastructure.", timestamp: "5 hours ago" },
        { id: 6, fromUser: userType === "candidate" ? false : true, text: "Thanks for your response. Are you available for a call next week?", timestamp: "2 hours ago" },
      ],
    },
    {
      id: 2,
      withUser: userType === "candidate" ? "Alex Thompson" : "Morgan Chen",
      withUserRole: userType === "candidate" ? "HR Manager at InnovateTech" : "Frontend Engineer",
      lastMessage: "I'd like to schedule an interview for the position we discussed.",
      lastMessageTime: "Yesterday",
      unread: false,
      messages: [
        { id: 1, fromUser: userType === "candidate" ? false : true, text: "Hello! I'm reaching out about your application for the Frontend Developer position.", timestamp: "3 days ago" },
        { id: 2, fromUser: userType === "candidate" ? true : false, text: "Hi Alex, thanks for getting in touch. I'm excited about the position!", timestamp: "3 days ago" },
        { id: 3, fromUser: userType === "candidate" ? false : true, text: "I'd like to schedule an interview for the position we discussed.", timestamp: "Yesterday" },
      ],
    },
    {
      id: 3,
      withUser: userType === "candidate" ? "Jamie Wilson" : "Taylor Wilson",
      withUserRole: userType === "candidate" ? "Technical Recruiter at DevHire" : "Full Stack Developer",
      lastMessage: "Let me know if you need any additional information from me.",
      lastMessageTime: "3 days ago",
      unread: false,
      messages: [
        { id: 1, fromUser: userType === "candidate" ? false : true, text: "Hi there! I'm Jamie from DevHire. I found your profile and wanted to connect about some opportunities.", timestamp: "1 week ago" },
        { id: 2, fromUser: userType === "candidate" ? true : false, text: "Hello Jamie, I'm open to hearing about new opportunities. What did you have in mind?", timestamp: "1 week ago" },
        { id: 3, fromUser: userType === "candidate" ? false : true, text: "We have a client in the fintech space looking for someone with your skills. Would you be interested in learning more?", timestamp: "5 days ago" },
        { id: 4, fromUser: userType === "candidate" ? true : false, text: "Yes, I'd be interested. Could you share more details about the role and company?", timestamp: "4 days ago" },
        { id: 5, fromUser: userType === "candidate" ? false : true, text: "Absolutely! I've attached a job description. Let me know if you need any additional information from me.", timestamp: "3 days ago" },
      ],
    },
  ];
  
  const filteredConversations = conversations.filter(
    convo => convo.withUser.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const selectedConversationData = conversations.find(
    convo => convo.id === selectedConversation
  );

  // Transform messages to match the expected MessageThread format
  const transformMessages = (messages: any[]) => {
    if (!messages) return [];
    
    return messages.map(msg => ({
      id: msg.id,
      senderId: msg.fromUser ? 'currentUser' : 'otherUser',
      content: msg.text,
      timestamp: msg.timestamp,
      isRead: true
    }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Messages</h1>
        <p className="text-muted-foreground">
          {userType === "recruiter" 
            ? "Connect with potential candidates and discuss opportunities."
            : "Communicate with recruiters about job opportunities."}
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 space-y-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search conversations..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="w-full grid grid-cols-3">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="unread">Unread</TabsTrigger>
              <TabsTrigger value="archive">Archive</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="mt-4 space-y-2">
              {filteredConversations.length > 0 ? (
                filteredConversations.map((conversation) => (
                  <ConversationCard
                    key={conversation.id}
                    conversation={conversation}
                    isSelected={selectedConversation === conversation.id}
                    onClick={() => setSelectedConversation(conversation.id)}
                  />
                ))
              ) : (
                <Card>
                  <CardContent className="p-4 text-center text-muted-foreground">
                    No conversations found
                  </CardContent>
                </Card>
              )}
            </TabsContent>
            
            <TabsContent value="unread" className="mt-4 space-y-2">
              {filteredConversations.filter(c => c.unread).length > 0 ? (
                filteredConversations
                  .filter(c => c.unread)
                  .map((conversation) => (
                    <ConversationCard
                      key={conversation.id}
                      conversation={conversation}
                      isSelected={selectedConversation === conversation.id}
                      onClick={() => setSelectedConversation(conversation.id)}
                    />
                  ))
              ) : (
                <Card>
                  <CardContent className="p-4 text-center text-muted-foreground">
                    No unread messages
                  </CardContent>
                </Card>
              )}
            </TabsContent>
            
            <TabsContent value="archive" className="mt-4">
              <Card>
                <CardContent className="p-4 text-center text-muted-foreground">
                  No archived conversations
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="md:col-span-2">
          {selectedConversationData ? (
            <Card className="h-full flex flex-col">
              <CardHeader className="border-b pb-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <User className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-base">{selectedConversationData.withUser}</CardTitle>
                      <p className="text-xs text-muted-foreground">{selectedConversationData.withUserRole}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon">
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-1 p-0 flex flex-col h-[400px]">
                {selectedConversationData.messages && (
                  <MessageThread 
                    messages={transformMessages(selectedConversationData.messages)}
                    currentUserType={userType}
                  />
                )}
              </CardContent>
            </Card>
          ) : (
            <Card className="h-full flex items-center justify-center">
              <CardContent className="text-center text-muted-foreground">
                <MessageSquare className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
                <h3 className="text-lg font-medium mb-1">No conversation selected</h3>
                <p className="text-sm">Choose a conversation from the list to view messages</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

interface ConversationCardProps {
  conversation: {
    id: number;
    withUser: string;
    withUserRole: string;
    lastMessage: string;
    lastMessageTime: string;
    unread: boolean;
  };
  isSelected: boolean;
  onClick: () => void;
}

const ConversationCard = ({ conversation, isSelected, onClick }: ConversationCardProps) => {
  return (
    <Card 
      onClick={onClick} 
      className={`cursor-pointer hover:bg-accent ${isSelected ? 'bg-accent border-primary' : ''}`}
    >
      <CardContent className="p-3 flex items-start gap-3">
        <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
          <User className="h-5 w-5 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start mb-1">
            <div className="font-medium truncate pr-2">{conversation.withUser}</div>
            <div className="text-xs text-muted-foreground whitespace-nowrap flex items-center">
              {conversation.unread ? (
                <Badge variant="default" className="rounded-full h-2 w-2 mr-1 p-0" />
              ) : (
                <Check className="h-3 w-3 mr-1 text-muted-foreground" />
              )}
              {conversation.lastMessageTime}
            </div>
          </div>
          <div className="text-sm text-muted-foreground truncate">{conversation.lastMessage}</div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MessageCenter;
