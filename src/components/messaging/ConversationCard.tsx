
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, Check } from "lucide-react";

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

export default ConversationCard;
