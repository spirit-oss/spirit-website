import React, { useState, useRef, useEffect } from 'react';
import { StatusBar } from './StatusBar';
import { ArrowLeft, Terminal } from 'lucide-react';

interface TerminalAppProps {
  onBack: () => void;
}

export const TerminalApp: React.FC<TerminalAppProps> = ({ onBack }) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<Array<{ command: string; output: string; type: 'command' | 'output' | 'error' }>>([
    { command: '', output: 'Spirit OS Terminal v1.0', type: 'output' },
    { command: '', output: 'Type "help" for available commands', type: 'output' },
    { command: '', output: '', type: 'output' },
  ]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  const commands = {
    help: () => `Available commands:
  help        - Show this help message
  clear       - Clear terminal
  whoami      - Show current user
  uname       - System information
  ps          - List running processes
  df          - Show disk usage
  free        - Show memory usage
  privacy     - Privacy status
  apps        - List installed apps
  date        - Show current date/time`,
    
    clear: () => {
      setHistory([]);
      return '';
    },
    
    whoami: () => 'spirit-user',
    
    uname: () => 'Spirit OS 1.0 (AOSP 16.0) arm64',
    
    ps: () => `PID  COMMAND
  1   init
 42   system_server
123   com.android.systemui
156   com.spiritos.launcher
234   com.spiritos.terminal`,
    
    df: () => `Filesystem     Size  Used Avail Use%
/system        2.1G  1.8G  300M  86%
/data          120G   43G   77G  36%
/cache         512M   12M  500M   3%`,
    
    free: () => `              total        used        free
Mem:        8192000     3456000     4736000
Swap:             0           0           0`,
    
    privacy: () => `Privacy Status: PROTECTED
- Google Services: DISABLED
- Tracking: BLOCKED
- Data Collection: NONE
- Encryption: ENABLED`,
    
    apps: () => `Installed Apps:
- Aurora Store (FOSS)
- F-Droid (FOSS)
- Signal (Privacy)
- Fennec F-Droid (Browser)
- NewPipe (Media)
- OsmAnd (Maps)`,
    
    date: () => new Date().toString(),
  };

  const executeCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    
    if (trimmedCmd === '') return;

    // Add to command history
    setCommandHistory(prev => [...prev, cmd]);
    setHistoryIndex(-1);

    // Add command to history
    setHistory(prev => [...prev, { command: cmd, output: '', type: 'command' }]);

    // Execute command
    if (trimmedCmd === 'clear') {
      commands.clear();
      return;
    }

    const output = commands[trimmedCmd as keyof typeof commands];
    if (output) {
      const result = output();
      if (result) {
        setHistory(prev => [...prev, { command: '', output: result, type: 'output' }]);
      }
    } else {
      setHistory(prev => [...prev, { 
        command: '', 
        output: `Command not found: ${cmd}. Type "help" for available commands.`, 
        type: 'error' 
      }]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      executeCommand(input);
      setInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1;
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1);
          setInput('');
        } else {
          setHistoryIndex(newIndex);
          setInput(commandHistory[newIndex]);
        }
      }
    }
  };

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div className="h-full bg-black text-green-400 flex flex-col font-mono">
      <StatusBar />
      
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-green-400/20 bg-black">
        <button
          onClick={onBack}
          className="w-10 h-10 rounded-full bg-green-400/10 flex items-center justify-center transition-smooth hover:bg-green-400/20"
        >
          <ArrowLeft className="w-5 h-5 text-green-400" />
        </button>
        <div className="flex items-center">
          <Terminal className="w-5 h-5 text-green-400 mr-2" />
          <h1 className="text-lg font-medium text-green-400">Terminal</h1>
        </div>
        <div className="w-10" />
      </div>

      {/* Terminal Content */}
      <div 
        ref={terminalRef}
        className="flex-1 p-4 overflow-y-auto text-sm leading-relaxed"
        onClick={() => inputRef.current?.focus()}
      >
        {history.map((entry, index) => (
          <div key={index} className="mb-1">
            {entry.type === 'command' && (
              <div className="flex">
                <span className="text-green-400 mr-2">spirit@spiritos:~$</span>
                <span className="text-white">{entry.command}</span>
              </div>
            )}
            {entry.type === 'output' && entry.output && (
              <div className="text-green-300 whitespace-pre-line">{entry.output}</div>
            )}
            {entry.type === 'error' && (
              <div className="text-red-400">{entry.output}</div>
            )}
          </div>
        ))}
        
        {/* Current input line */}
        <div className="flex">
          <span className="text-green-400 mr-2">spirit@spiritos:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent text-white outline-none caret-green-400"
            autoFocus
          />
        </div>
      </div>

      {/* Footer */}
      <div className="px-4 py-2 border-t border-green-400/20 bg-black">
        <p className="text-green-400/60 text-xs">
          Use arrow keys for command history • Ctrl+C to interrupt
        </p>
      </div>
    </div>
  );
};