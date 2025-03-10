
import React, { useState } from "react";
import ConversationsList from "@/components/messaging/ConversationsList";
import MessageView from "@/components/messaging/MessageView";

interface MessageCenterProps {
  userType: "candidate" | "recruiter";
}

const MessageCenter = ({ userType }: MessageCenterProps) => {
  const [selectedConversation, setSelectedConversation] = useState<number | null>(1);
  
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
  
  const selectedConversationData = conversations.find(
    convo => convo.id === selectedConversation
  ) || null;

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
        <div className="md:col-span-1">
          <ConversationsList 
            conversations={conversations} 
            selectedConversation={selectedConversation}
            onSelectConversation={setSelectedConversation}
          />
        </div>
        
        <div className="md:col-span-2">
          <MessageView 
            conversation={selectedConversationData}
            userType={userType}
          />
        </div>
      </div>
    </div>
  );
};

export default MessageCenter;
