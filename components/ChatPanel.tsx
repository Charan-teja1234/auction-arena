import React, { useState, useEffect, useRef } from 'react';
import { RoomState } from '../lib/room-manager';
import { Send, Smile, MessageSquare } from 'lucide-react';

interface ChatPanelProps {
  room: RoomState;
  myPlayerId: string | null;
  onSendChat: (message: string, type?: 'text' | 'reaction') => void;
}

const PRESET_EMOJIS = ['🎉', '💸', '😲', '🤫', '😂', '🏏', '🔥', '👑'];

export default function ChatPanel({ room, myPlayerId, onSendChat }: ChatPanelProps) {
  const [msgText, setMsgText] = useState('');
  const chatScrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll chat to the bottom
  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [room.chat]);

  const handleSendText = (e: React.FormEvent) => {
    e.preventDefault();
    if (!msgText.trim()) return;
    onSendChat(msgText.trim(), 'text');
    setMsgText('');
  };

  const textMessages = room.chat.filter((msg) => msg.type !== 'system');

  return (
    <div className="glass-panel rounded-2xl border border-border/80 flex flex-col h-[320px] bg-card/45 overflow-hidden">
      {/* Header bar */}
      <div className="bg-secondary/40 px-4 py-3 border-b border-border/50 flex items-center gap-2">
        <MessageSquare className="w-4 h-4 text-primary" />
        <span className="text-xs font-extrabold text-zinc-300 uppercase tracking-wider">
          Arena Chat & Reactions
        </span>
      </div>

      {/* Messages area */}
      <div
        ref={chatScrollRef}
        className="flex-1 p-3 overflow-y-auto space-y-2 min-h-0 text-xs"
      >
        {textMessages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-zinc-600 italic">
            No chats yet. Throw some trash talk!
          </div>
        ) : (
          textMessages.map((msg, idx) => {
            const isMe = msg.senderId === myPlayerId;
            const isReaction = msg.type === 'reaction';

            if (isReaction) {
              return (
                <div key={idx} className="flex justify-center my-1 animate-bounce">
                  <span className="bg-zinc-800/80 px-3 py-1.5 rounded-full border border-border text-[10px] text-zinc-300 font-semibold">
                    ⚡ {msg.senderName} reacted <span className="text-base ml-1">{msg.message}</span>
                  </span>
                </div>
              );
            }

            return (
              <div
                key={idx}
                className={`flex flex-col gap-1 max-w-[85%] ${
                  isMe ? 'ml-auto items-end' : 'mr-auto items-start'
                }`}
              >
                <span className="text-[10px] font-bold text-zinc-500">
                  {msg.senderName}
                </span>
                <div
                  className={`px-3 py-2 rounded-2xl font-medium leading-relaxed ${
                    isMe
                      ? 'bg-primary text-background rounded-tr-none font-semibold'
                      : 'bg-secondary text-zinc-200 rounded-tl-none border border-border/60'
                  }`}
                >
                  {msg.message}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Quick reaction keyboard */}
      <div className="bg-background/40 px-3 py-2 border-t border-border/40 flex items-center justify-between gap-1 shrink-0">
        <span className="text-[9px] uppercase font-bold text-zinc-500 tracking-wider">React:</span>
        <div className="flex gap-1.5 overflow-x-auto pr-1">
          {PRESET_EMOJIS.map((emoji) => (
            <button
              key={emoji}
              onClick={() => onSendChat(emoji, 'reaction')}
              className="text-lg hover:scale-125 transition-transform cursor-pointer active:scale-95 px-1 py-0.5"
            >
              {emoji}
            </button>
          ))}
        </div>
      </div>

      {/* Input keyboard form */}
      <form onSubmit={handleSendText} className="flex border-t border-border/40 shrink-0">
        <input
          type="text"
          value={msgText}
          onChange={(e) => setMsgText(e.target.value)}
          placeholder="Send text message..."
          maxLength={60}
          className="flex-1 bg-background px-4 py-3.5 text-xs text-white focus:outline-none focus:placeholder-zinc-600"
        />
        <button
          type="submit"
          disabled={!msgText.trim()}
          className="bg-primary hover:bg-primary/95 text-background px-4.5 font-bold transition-all disabled:opacity-40 flex items-center justify-center cursor-pointer"
        >
          <Send className="w-4 h-4 fill-current" />
        </button>
      </form>
    </div>
  );
}
