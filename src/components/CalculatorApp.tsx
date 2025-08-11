import React, { useState } from 'react';
import { StatusBar } from './StatusBar';
import { ArrowLeft, RotateCcw, Plus, Minus, Divide, X, Equal } from 'lucide-react';

interface CalculatorAppProps {
  onBack: () => void;
}

export const CalculatorApp: React.FC<CalculatorAppProps> = ({ onBack }) => {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const inputNumber = (num: string) => {
    if (waitingForOperand) {
      setDisplay(num);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const inputOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);

      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const calculate = (firstValue: number, secondValue: number, operation: string) => {
    switch (operation) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '×':
        return firstValue * secondValue;
      case '÷':
        return firstValue / secondValue;
      case '=':
        return secondValue;
      default:
        return secondValue;
    }
  };

  const performCalculation = () => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation);
      setDisplay(String(newValue));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForOperand(true);
    }
  };

  const clear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const buttons = [
    ['C', '±', '%', '÷'],
    ['7', '8', '9', '×'],
    ['4', '5', '6', '-'],
    ['1', '2', '3', '+'],
    ['0', '.', '=']
  ];

  const getButtonStyle = (button: string) => {
    if (['÷', '×', '-', '+', '='].includes(button)) {
      return 'gradient-primary text-white';
    }
    if (['C', '±', '%'].includes(button)) {
      return 'bg-white/20 text-white';
    }
    return 'bg-white/10 text-white hover:bg-white/20';
  };

  const handleButtonPress = (button: string) => {
    switch (button) {
      case 'C':
        clear();
        break;
      case '±':
        setDisplay(String(parseFloat(display) * -1));
        break;
      case '%':
        setDisplay(String(parseFloat(display) / 100));
        break;
      case '=':
        performCalculation();
        break;
      case '+':
      case '-':
      case '×':
      case '÷':
        inputOperation(button);
        break;
      case '.':
        if (display.indexOf('.') === -1) {
          inputNumber(button);
        }
        break;
      default:
        if (!isNaN(parseInt(button))) {
          inputNumber(button);
        }
    }
  };

  return (
    <div className="h-full bg-gradient-surface text-white flex flex-col">
      <StatusBar />
      
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
        <button
          onClick={onBack}
          className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center transition-smooth hover:bg-white/20"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-xl font-medium">Calculator</h1>
        <div className="w-10" />
      </div>

      {/* Display */}
      <div className="px-6 py-8 text-right">
        <div className="bg-black/20 rounded-2xl p-6 backdrop-blur-sm">
          <div className="text-4xl font-light text-white break-all">{display}</div>
          {operation && previousValue !== null && (
            <div className="text-lg text-white/60 mt-2">
              {previousValue} {operation}
            </div>
          )}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex-1 px-6 pb-8">
        <div className="space-y-3">
          {buttons.map((row, rowIndex) => (
            <div key={rowIndex} className="grid grid-cols-4 gap-3">
              {row.map((button) => (
                <button
                  key={button}
                  onClick={() => handleButtonPress(button)}
                  className={`
                    aspect-square rounded-2xl text-xl font-medium transition-smooth active:scale-95
                    ${button === '0' ? 'col-span-2' : ''}
                    ${getButtonStyle(button)}
                  `}
                >
                  {button}
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};