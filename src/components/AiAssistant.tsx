import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, Send, Bot, User, Cpu, AlertTriangle, ArrowRight, CornerDownLeft } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  isFallback?: boolean;
}

export default function AiAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "initial-welcome",
      role: "assistant",
      content: `Hello, I am your **Forester Crane AI Sales Engineer**. 

I can help with complex industrial computations, such as:
* Checking tractor compatibility (PTO flow l/min & system pressure)
* Comparing structural differences between **FT-10**, **FT-12**, and **FT-15** trailers
* Suggesting crane classes (**FC-51**, **FC-67**, **FC-80**) based on wood varieties or weight ranges
* Engineering questions on steel ratings (**S460 Swedish Alloy vs. standard structural steel**)

What setup are you currently considering?`
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const quickQuestions = [
    { text: "Compare FT-12 vs FT-10 Specs", prompt: "Explain the exact technical differences between the FT-12 and FT-10 trailers in terms of frame construction steel, load volumes and overall empty weights." },
    { text: "What pump flow is required for FC-67?", prompt: "What are the exact hydraulic pump requirements, oil flow rates (l/min) and pressure values (bar) to operate the FC-67 telescopic crane smoothly?" },
    { text: "Tell me about S460 Steel frames", prompt: "What are the structural advantages of using S460 high-tensile steel in Forester Crane trailers compared to standard low-carbon construction steels?" },
    { text: "Recommend setup for 12t hardwood", prompt: "I operate in hardwood forests hauling Beech and Oak log piles of roughly 12 tons weight. Recommend the perfect trailer, crane reach and grapple claw combination." }
  ];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    const userMsg: Message = {
      id: Math.random().toString(),
      role: "user",
      content: textToSend,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsLoading(true);

    try {
      const payloadMessages = [...messages, userMsg].map((msg) => ({
        role: msg.role,
        content: msg.content,
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: payloadMessages }),
      });

      if (!res.ok) {
        throw new Error("Failed to receive response from AI backend.");
      }

      const data = await res.json();

      const assistantMsg: Message = {
        id: Math.random().toString(),
        role: "assistant",
        content: data.content,
        isFallback: data.isFallback,
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (error) {
      console.error("AI Assistant Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          id: Math.random().toString(),
          role: "assistant",
          content: "❌ **System Connection Error**: Unable to link to the Forester Crane central host. Please verify your connection or use the manual specification panel below."
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col rounded border border-[#1A2D23] bg-[#0B130E] overflow-hidden shadow-2xl h-[560px]">
      {/* Console Header */}
      <div className="flex items-center justify-between border-b border-[#1A2D23] bg-[#121F18]/50 px-4 py-3">
        <div className="flex items-center gap-2.5">
          <div className="h-2 w-2 rounded-full bg-industrial-orange animate-pulse" />
          <Cpu className="h-4 w-4 text-industrial-orange" />
          <span className="font-display text-xs font-bold uppercase tracking-wider text-white">
            SPECIFICATION CO-PILOT
          </span>
        </div>
        <span className="font-mono text-[9px] text-gray-500 uppercase tracking-widest bg-[#070D0B] px-2 py-0.5 rounded">
          Model: Gemini Flash v3.5
        </span>
      </div>

      {/* Messages Console Box */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-4 py-4 space-y-4 scrollbar-thin scrollbar-thumb-forest bg-[#070D0B]/30"
      >
        {messages.map((msg) => {
          const isUser = msg.role === "user";
          return (
            <div 
              key={msg.id} 
              className={`flex items-start gap-3 max-w-[85%] ${isUser ? "ml-auto flex-row-reverse" : "mr-auto"}`}
            >
              {/* Profile Avatar */}
              <div className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border text-xs ${
                isUser 
                  ? "bg-[#1C3328] border-[#2C5241] text-industrial-steel" 
                  : "bg-black/40 border-[#1A2D23] text-industrial-orange"
              }`}>
                {isUser ? <User className="h-3.5 w-3.5" /> : <Bot className="h-3.5 w-3.5" />}
              </div>

              {/* Message Payload Box */}
              <div className={`p-3.5 rounded text-xs select-text ${
                isUser 
                  ? "bg-[#1C3328]/80 text-[#E6EAE7] rounded-tr-none border border-[#2C5241]/30" 
                  : "bg-[#0B130E] text-gray-300 rounded-tl-none border border-[#1A2D23]"
              }`}>
                {/* Parse Markdown-like blocks simply with CSS or standard markdown helpers. We will do clean CSS parsing. */}
                <div className="prose prose-invert prose-xs text-xs max-w-none leading-relaxed space-y-2">
                  {msg.content.split("\n").map((line, idx) => {
                    // Check for headers
                    if (line.startsWith("### ")) {
                      return <h4 key={idx} className="font-display font-bold text-white text-xs mt-3 select-all">{line.replace("### ", "")}</h4>;
                    }
                    if (line.startsWith("## ")) {
                      return <h3 key={idx} className="font-display font-bold text-white text-sm mt-4 select-all">{line.replace("## ", "")}</h3>;
                    }
                    // Check for bullet points
                    if (line.trim().startsWith("* ") || line.trim().startsWith("- ")) {
                      // bold text replacement inside line
                      const rawText = line.trim().substring(2);
                      return (
                        <ul key={idx} className="list-disc pl-4 select-all">
                          <li>{parseBoldText(rawText)}</li>
                        </ul>
                      );
                    }
                    if (/^\d+\./.test(line.trim())) {
                      const rawText = line.replace(/^\d+\.\s*/, "");
                      return (
                        <ol key={idx} className="list-decimal pl-4 select-all">
                          <li>{parseBoldText(rawText)}</li>
                        </ol>
                      );
                    }
                    return <p key={idx} className="select-all">{parseBoldText(line)}</p>;
                  })}
                </div>

                {msg.isFallback && (
                  <div className="mt-3 flex items-center gap-1.5 border-t border-[#13221B] pt-2 font-mono text-[9px] text-[#2C5241]">
                    <AlertTriangle className="h-3 w-3 text-industrial-orange" />
                    Offline Spec Core Active
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* Typing Loading Indicator */}
        {isLoading && (
          <div className="flex items-start gap-3">
            <div className="flex h-7 w-7 items-center justify-center rounded-full border border-[#1A2D23] bg-black/40 text-industrial-orange">
              <Bot className="h-3.5 w-3.5 animate-pulse" />
            </div>
            <div className="bg-[#0B130E] p-3.5 rounded border border-[#1A2D23] rounded-tl-none text-xs text-gray-500 font-mono tracking-wider flex items-center gap-2">
              <div className="flex gap-1">
                <span className="h-1.5 w-1.5 bg-[#2C5241] rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="h-1.5 w-1.5 bg-[#2C5241] rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="h-1.5 w-1.5 bg-[#2C5241] rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
              Analyzing hydraulic tolerances...
            </div>
          </div>
        )}
      </div>

      {/* Preset Questions Suggestions Drawer */}
      <div className="border-t border-[#1A2D23] bg-[#030605] px-4 py-2.5">
        <p className="text-[10px] text-[#2C5241] font-mono uppercase tracking-widest mb-1.5 font-semibold">
          Select Analytical Prompt:
        </p>
        <div className="flex flex-wrap gap-1.5">
          {quickQuestions.map((qq, index) => (
            <button
              key={index}
              disabled={isLoading}
              onClick={() => handleSendMessage(qq.prompt)}
              className="text-[11px] font-medium text-gray-400 bg-[#0B130E] border border-[#1A2D23]/60 hover:border-industrial-orange hover:text-white px-2.5 py-1 rounded transition-all cursor-pointer font-sans active:scale-95 text-left truncate max-w-[240px]"
            >
              {qq.text}
            </button>
          ))}
        </div>
      </div>

      {/* Console Input Bar */}
      <form 
        onSubmit={(e) => {
          e.preventDefault();
          if (inputValue.trim()) handleSendMessage(inputValue);
        }}
        className="border-t border-[#1A2D23] bg-[#0B130E] p-4 flex gap-3 items-center"
      >
        <div className="relative flex-1">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={isLoading}
            placeholder="Ask dynamic questions (e.g. 'PTO pressure required for FT-12')..."
            className="w-full text-xs text-white bg-[#070D0B] border border-[#1A2D23]/80 focus:border-industrial-orange focus:outline-none rounded px-3.5 py-2.5 pr-12 font-sans placeholder-gray-600 transition-all shadow-inner"
          />
          <div className="absolute right-3.5 top-1/2 -translate-y-1/2 flex items-center gap-1.5 text-[9px] text-[#2C5241] font-mono uppercase font-bold select-none">
            <span>Enter</span>
            <CornerDownLeft className="h-2.5 w-2.5 text-[#2C5241]" />
          </div>
        </div>
        <button
          type="submit"
          disabled={isLoading || !inputValue.trim()}
          className="flex h-9 w-9 items-center justify-center rounded bg-industrial-orange hover:bg-[#F27E31] text-black outline-none transition-transform disabled:opacity-30 disabled:scale-100 cursor-pointer active:scale-95"
        >
          <Send className="h-4 w-4" />
        </button>
      </form>
    </div>
  );
}

// Utility function to support basic text formatting (**bolding**)
function parseBoldText(text: string): React.ReactNode {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={index} className="text-white font-bold">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}
