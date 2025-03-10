
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Search } from "lucide-react";
import ConversationCard from './ConversationCard';

interface Conversation {
  id: number;
  withUser: string;
  withUserRole: string;
  lastMessage: string;
  lastMessageTime: string;
  unread: boolean;
  messages: any[];
}

interface ConversationsListProps {
  conversations: Conversation[];
  selectedConversation: number | null;
  onSelectConversation: (id: number) => void;
}

const ConversationsList = ({ 
  conversations, 
  selectedConversation, 
  onSelectConversation 
}: ConversationsListProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredConversations = conversations.filter(
    convo => convo.withUser.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-4">
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
                onClick={() => onSelectConversation(conversation.id)}
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
                  onClick={() => onSelectConversation(conversation.id)}
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
  );
};

export default ConversationsList;
