'use client';

import { Button } from '@ui/button';
import { Card } from '@ui/card';
import { Input } from '@ui/input';
import { MessageCircle, Plus, Search, Send } from 'lucide-react';
import { useState } from 'react';

interface ChatGroup {
  id: string;
  name: string;
  type: 'Group Invite' | 'Announcements' | 'Support';
  members: number;
  lastMessage: string;
  lastMessageTime: string;
  unread: number;
}

const mockChatGroups: ChatGroup[] = [
  {
    id: 'CH001',
    name: 'Gym Announcements',
    type: 'Announcements',
    members: 234,
    lastMessage: 'New nutrition workshop scheduled for Friday',
    lastMessageTime: '2 mins ago',
    unread: 0,
  },
  {
    id: 'CH002',
    name: 'Premium Members',
    type: 'Group Invite',
    members: 100,
    lastMessage: 'Exclusive access to VIP classes now available',
    lastMessageTime: '1 hour ago',
    unread: 3,
  },
  {
    id: 'CH003',
    name: 'Member Support',
    type: 'Support',
    members: 234,
    lastMessage: 'How can we help you today?',
    lastMessageTime: '3 hours ago',
    unread: 0,
  },
];

interface Message {
  id: string;
  author: string;
  content: string;
  timestamp: string;
  isOwn: boolean;
}

const mockMessages: Message[] = [
  {
    id: 'M001',
    author: 'You',
    content:
      'Welcome to our gym community group! Looking forward to connecting with all members.',
    timestamp: '10:00 AM',
    isOwn: true,
  },
  {
    id: 'M002',
    author: 'Alex Chen',
    content:
      'Thanks for creating this space! Excited to be part of the community.',
    timestamp: '10:05 AM',
    isOwn: false,
  },
  {
    id: 'M003',
    author: 'Maria Garcia',
    content: 'When is the next group workout?',
    timestamp: '10:15 AM',
    isOwn: false,
  },
];

export default function ChatPageContent() {
  const [selectedGroup, setSelectedGroup] = useState<ChatGroup | null>(
    mockChatGroups[0],
  );
  const [messageInput, setMessageInput] = useState('');
  const [messages, setMessages] = useState<Message[]>(mockMessages);

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      const newMessage: Message = {
        id: `M${Date.now()}`,
        author: 'You',
        content: messageInput,
        timestamp: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
        isOwn: true,
      };
      setMessages([...messages, newMessage]);
      setMessageInput('');
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Gym Chat & Messaging
          </h1>
          <p className="text-muted-foreground">
            Communicate with members and send group invites
          </p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 gap-2">
          <Plus className="w-4 h-4" />
          New Chat Group
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 p-4 border-border/50 h-96 lg:h-auto flex flex-col">
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search groups..."
                className="pl-10"
              />
            </div>
          </div>
          <div className="space-y-2 flex-1 overflow-y-auto">
            {mockChatGroups.map((group) => (
              <button
                key={group.id}
                onClick={() => setSelectedGroup(group)}
                className={`w-full text-left p-3 rounded-lg transition-colors ${
                  selectedGroup?.id === group.id
                    ? 'bg-primary/10 border border-primary'
                    : 'hover:bg-muted/50 border border-transparent'
                }`}
              >
                <div className="flex items-start justify-between mb-1">
                  <p className="font-medium text-foreground text-sm">
                    {group.name}
                  </p>
                  {group.unread > 0 && (
                    <span className="bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {group.unread}
                    </span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground truncate">
                  {group.lastMessage}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {group.lastMessageTime}
                </p>
              </button>
            ))}
          </div>
        </Card>

        <Card className="lg:col-span-2 p-6 border-border/50 flex flex-col h-96 lg:h-auto">
          {selectedGroup ? (
            <>
              <div className="pb-4 border-b border-border mb-4">
                <h2 className="font-semibold text-foreground">
                  {selectedGroup.name}
                </h2>
                <p className="text-xs text-muted-foreground">
                  {selectedGroup.members} members • {selectedGroup.type}
                </p>
              </div>

              <div className="flex-1 space-y-4 overflow-y-auto mb-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.isOwn ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs px-4 py-2 rounded-lg ${
                        msg.isOwn
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-foreground'
                      }`}
                    >
                      {!msg.isOwn && (
                        <p className="text-xs font-semibold mb-1">
                          {msg.author}
                        </p>
                      )}
                      <p className="text-sm">{msg.content}</p>
                      <p
                        className={`text-xs mt-1 ${msg.isOwn ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}
                      >
                        {msg.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <Input
                  placeholder="Type a message..."
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <Button
                  onClick={handleSendMessage}
                  className="bg-primary hover:bg-primary/90 gap-2"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              <MessageCircle className="w-8 h-8 mr-2" />
              <span>Select a group to start chatting</span>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
