import { cn } from "@/lib/utils";
import { PersonIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import agentforceLogo from "@/lib/images/agentforce-agent-astro.png";

interface ChatMessageProps {
  text: string;
  isUser: boolean;
}

export function ChatMessage({ text, isUser }: ChatMessageProps) {
  // Function to format text with line breaks
  const formatMessage = (message: string) => {
    // Split numbered lists into separate lines
    const formattedText = message.replace(/(\d+\.\s)/g, "\n$1");

    // Split on periods that are followed by a number (for steps)
    const lines = formattedText.split(/\.\s(?=\d)/);

    return lines.map((line, i) => (
      <div
        key={i}
        className={cn(
          "mb-1",
          // Add extra spacing before numbered items
          line.match(/^\d+\./) && "mt-2"
        )}
      >
        {/* Preserve periods except when they're between steps */}
        {line + (i < lines.length - 1 && !line.match(/^\d+\./) ? "." : "")}
      </div>
    ));
  };

  return (
    <div
      className={cn(
        "flex items-start gap-2 mb-4",
        isUser && "flex-row-reverse"
      )}
    >
      <div
        className={cn(
          "w-8 h-8 rounded-full overflow-hidden flex-shrink-0 flex items-center justify-center",
          isUser ? "bg-blue-100 border-2 border-blue-200" : undefined
        )}
      >
        {isUser ? (
          <PersonIcon className="w-5 h-5 text-blue-500" />
        ) : (
          <Image
            src={agentforceLogo}
            alt="Agentforce Avatar"
            width={32}
            height={32}
            className="object-cover"
          />
        )}
      </div>
      <div
        className={cn(
          "p-3 rounded-lg max-w-[80%]",
          isUser ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-800"
        )}
      >
        {formatMessage(text)}
      </div>
    </div>
  );
}
