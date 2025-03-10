
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Send } from "lucide-react";

interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: Date;
  isRead: boolean;
}

interface MessageThreadProps {
  recipientId?: string;
  recipientName?: string;
  messages: Message[];
  currentUserId?: string;
  currentUserType?: "candidate" | "recruiter";
  onSendMessage?: (content: string) => void;
}

const MessageThread = ({
  recipientName,
  messages,
  currentUserId,
  currentUserType,
  onSendMessage
}: MessageThreadProps) => {
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() && onSendMessage) {
      onSendMessage(newMessage);
      setNewMessage("");
    }
  };

  return (
    <div className="flex flex-col h-full">
      {recipientName && (
        <div className="border-b p-4">
          <h3 className="font-medium">{recipientName}</h3>
        </div>
      )}
      
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {messages.length > 0 ? (
          messages.map((message) => {
            // Check if the message is from the current user
            const isOwnMessage = currentUserId ? 
              message.senderId === currentUserId : 
              message.senderId === 'currentUser';
            
            return (
              <div 
                key={message.id}
                className={`flex ${isOwnMessage ? "justify-end" : "justify-start"}`}
              >
                <Card className={`max-w-[80%] ${isOwnMessage ? "bg-primary text-primary-foreground" : ""}`}>
                  <CardContent className="p-3">
                    <p>{message.content}</p>
                    <p className="text-xs mt-1 opacity-70">
                      {typeof message.timestamp === 'string' ? 
                        message.timestamp : 
                        new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </CardContent>
                </Card>
              </div>
            );
          })
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <p>No messages yet</p>
            <p className="text-sm">Start the conversation by sending a message</p>
          </div>
        )}
      </div>
      
      {onSendMessage && (
        <div className="border-t p-4">
          <form onSubmit={handleSendMessage} className="flex gap-2">
            <Input
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="flex-1"
            />
            <Button type="submit" size="icon">
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      )}
    </div>
  );
};

export default MessageThread;
