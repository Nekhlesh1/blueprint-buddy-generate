
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, ChevronDown, MessageSquare } from "lucide-react";
import MessageThread from './MessageThread';

interface Conversation {
  id: number;
  withUser: string;
  withUserRole: string;
  messages: any[];
}

interface MessageViewProps {
  conversation: Conversation | null;
  userType: "candidate" | "recruiter";
}

const MessageView = ({ conversation, userType }: MessageViewProps) => {
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

  if (!conversation) {
    return (
      <Card className="h-full flex items-center justify-center">
        <CardContent className="text-center text-muted-foreground">
          <MessageSquare className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
          <h3 className="text-lg font-medium mb-1">No conversation selected</h3>
          <p className="text-sm">Choose a conversation from the list to view messages</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="border-b pb-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
              <User className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-base">{conversation.withUser}</CardTitle>
              <p className="text-xs text-muted-foreground">{conversation.withUserRole}</p>
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
        {conversation.messages && (
          <MessageThread 
            messages={transformMessages(conversation.messages)}
            currentUserType={userType}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default MessageView;
