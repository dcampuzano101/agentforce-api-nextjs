"use client";

import React, { useState } from "react";
import { CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { ChatMessage } from "@/components/ChatMessage";
import { TypingIndicator } from "@/components/TypingIndicator";
import Image from "next/image";
import agentforceLogo from "@/lib/images/agentforce-agent-astro.png";
import { cn } from "@/lib/utils";

// Types for API responses
interface SessionResponse {
  sessionId: string;
  _links: {
    messages: { href: string };
    session: { href: string };
  };
  messages: Array<{
    type: string;
    message: string;
  }>;
}

interface MessageResponse {
  messages: Array<{
    type: string;
    message: string;
    result?: Array<{
      type: string;
      property: string;
      value: {
        result: Array<{
          id: string;
          title: string;
          data: Record<string, { displayValue: string | null; value: string }>;
        }>;
        explanation: string;
      };
    }>;
  }>;
}

export default function Dashboard() {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState<
    Array<{ text: string; isUser: boolean }>
  >([]);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isChatStarted, setIsChatStarted] = useState(false);
  const [isAgentTyping, setIsAgentTyping] = useState(false);
  const [isMessageSending, setIsMessageSending] = useState(false);

  const startChat = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/agentforce", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "createSession",
          sessionData: {
            externalSessionKey: crypto.randomUUID(),
            instanceConfig: {
              endpoint: process.env.SF_DOMAIN!,
            },
            streamingCapabilities: {
              chunkTypes: ["Text"],
            },
            bypassUser: true,
          },
        }),
      });

      const data: SessionResponse = await response.json();
      setSessionId(data.sessionId);

      // Add initial bot message if it exists
      if (data.messages?.[0]?.message) {
        setMessages([{ text: data.messages[0].message, isUser: false }]);
      }

      setIsChatStarted(true);
    } catch (error) {
      console.error("Error starting chat:", error);
      setMessages([
        {
          text: "Sorry, there was an error starting the chat. Please try again.",
          isUser: false,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const sendMessage = async (text: string) => {
    if (!sessionId || isMessageSending) return;

    try {
      setIsMessageSending(true);
      setIsAgentTyping(true);

      // Add user message immediately
      setMessages((prev) => [...prev, { text, isUser: true }]);

      // Scroll to bottom
      setTimeout(() => {
        const chatContainer = document.querySelector(".chat-container");
        if (chatContainer) {
          chatContainer.scrollTop = chatContainer.scrollHeight;
        }
      }, 100);

      const response = await fetch("/api/agentforce", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "sendMessage",
          sessionId,
          message: {
            sequenceId: messages.length + 1,
            type: "Text",
            text: text,
          },
        }),
      });

      const data: MessageResponse = await response.json();

      // Add bot response
      if (data.messages?.[0]?.message) {
        setMessages((prev) => [
          ...prev,
          { text: data.messages[0].message, isUser: false },
        ]);

        // Scroll to bottom again after response
        setTimeout(() => {
          const chatContainer = document.querySelector(".chat-container");
          if (chatContainer) {
            chatContainer.scrollTop = chatContainer.scrollHeight;
          }
        }, 100);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prev) => [
        ...prev,
        {
          text: "Sorry, there was an error processing your message.",
          isUser: false,
        },
      ]);
    } finally {
      setIsMessageSending(false);
      setIsAgentTyping(false);
    }
  };

  const handleSearch = () => {
    if (query.trim()) {
      sendMessage(query);
      setQuery("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSearch();
    }
  };

  return (
    <div className="w-full flex justify-center">
      <div className="w-[90%] md:w-[75%] flex flex-col">
        <CardHeader className="pb-4">
          <CardTitle className="text-4xl text-[#001e5b] text-center">
            How can <span className="text-[#022ac0]">Agentforce</span> help?
          </CardTitle>
        </CardHeader>

        {!isChatStarted ? (
          <div className="flex justify-center mt-4">
            <Button
              onClick={startChat}
              disabled={isLoading}
              size="lg"
              className="text-lg bg-[#022ac0]"
            >
              {isLoading && (
                <Loader2 className="mr-2 text-white h-4 w-4 animate-spin" />
              )}
              Start Chat
            </Button>
          </div>
        ) : (
          <div className="flex flex-col max-w-2xl mx-auto w-full">
            {/* Chat messages */}
            <div
              className={cn(
                "border rounded-lg bg-white shadow-sm overflow-y-auto chat-container p-4",
                messages.length > 0 ? "min-h-[400px]" : "min-h-[200px]",
                "max-h-[600px] transition-all duration-200"
              )}
            >
              {messages.map((msg, index) => (
                <ChatMessage key={index} text={msg.text} isUser={msg.isUser} />
              ))}
              {isAgentTyping && (
                <div className="flex items-start gap-2 mb-4">
                  <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                    <Image
                      src={agentforceLogo}
                      alt="Agentforce Avatar"
                      width={32}
                      height={32}
                      className="object-cover"
                    />
                  </div>
                  <TypingIndicator />
                </div>
              )}
            </div>

            {/* Input area */}
            <div className="mt-4 flex gap-2">
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={
                  isAgentTyping
                    ? "Agent is typing..."
                    : isMessageSending
                    ? "Sending message..."
                    : "Type your message..."
                }
                disabled={isAgentTyping || isMessageSending}
                className="flex-1"
              />
              <Button
                onClick={handleSearch}
                type="submit"
                disabled={isAgentTyping || isMessageSending || !query.trim()}
                className="relative bg-[#022ac0]"
              >
                {isMessageSending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "Send"
                )}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
