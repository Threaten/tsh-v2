import React from "react";

export interface NumberData {
  number: string | number;
  peak?: number;
  age?: number;
  year?: number;
  type?: "peak" | "challenge";
}

export interface NumberDiagramData {
  top: NumberData;
  bottom: NumberData;
  left: NumberData;
  leftSide: NumberData;
  topCenter: NumberData;
  right: NumberData;
  rightSide: NumberData;
  center: NumberData;
  lowerRight: NumberData;
  lowerLeft: NumberData;
  lowerCenter: NumberData;
}

export interface NumberDiagramProps {
  numbers: NumberDiagramData;
}

const NumberDiagram: React.FC<NumberDiagramProps> = ({ numbers }) => {
  const NumberBlock = ({
    number,
    peak,
    age,
    year,
    type,
    className,
  }: NumberData & { className: string }) => (
    <div className={`text-center flex flex-col items-center ${className}`}>
      <div
        className={`bg-white/10 backdrop-blur-sm rounded-full w-10 h-10 flex items-center justify-center mb-1 border 
        ${
          type === "challenge"
            ? "border-red-500/30 hover:border-red-500/50"
            : "border-yellow-500/30 hover:border-yellow-500/50"
        } 
        transition-colors`}
      >
        <span className="text-xl font-bold">{number}</span>
      </div>
      {peak && (
        <div
          className={`text-sm whitespace-nowrap ${
            type === "challenge" ? "text-red-500/80" : "text-yellow-500/80"
          }`}
        >
          {type === "challenge" ? "Thử thách" : "Đỉnh"} {peak}
        </div>
      )}
      {age && (
        <div className="text-xs text-yellow-500/60 whitespace-nowrap text-center flex items-center justify-center gap-1">
          <span>{age} tuổi</span>
          {year && <span>({year})</span>}
        </div>
      )}
    </div>
  );

  return (
    <div className="relative w-[500px] h-[600px] mx-auto bg-transparent">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 500 600">
        {/* Main diamond outline with gradient */}
        <defs>
          <linearGradient
            id="diamondGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#9333EA" stopOpacity="0.2" />
            <stop offset="50%" stopColor="#7C3AED" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#6366F1" stopOpacity="0.2" />
          </linearGradient>
        </defs>

        {/* Main diamond outline - Scaled and centered */}
        <path
          d="M250 75 L425 300 L250 525 L75 300 Z"
          fill="url(#diamondGradient)"
          stroke="rgba(255, 255, 255, 0.2)"
          strokeWidth="1.5"
        />

        {/* Inner diamonds with subtle gradients - Scaled and centered */}
        <path
          d="M250 125 L375 300 L250 475 L125 300 Z"
          fill="none"
          stroke="rgba(255, 255, 255, 0.15)"
          strokeWidth="1"
          strokeDasharray="4 2"
        />

        {/* Inner diamonds - Scaled and centered */}
        <path
          d="M250 125 L312.5 212.5 L250 300 L187.5 212.5 Z"
          fill="none"
          stroke="rgba(255, 255, 255, 0.15)"
          strokeWidth="1"
        />
        <path
          d="M375 300 L312.5 212.5 L250 300 L312.5 387.5 Z"
          fill="none"
          stroke="rgba(255, 255, 255, 0.15)"
          strokeWidth="1"
        />
        <path
          d="M250 475 L312.5 387.5 L250 300 L187.5 387.5 Z"
          fill="none"
          stroke="rgba(255, 255, 255, 0.15)"
          strokeWidth="1"
        />
        <path
          d="M125 300 L187.5 212.5 L250 300 L187.5 387.5 Z"
          fill="none"
          stroke="rgba(255, 255, 255, 0.15)"
          strokeWidth="1"
        />

        {/* Connection lines */}
        <line
          x1="125"
          y1="300"
          x2="375"
          y2="300"
          stroke="rgba(255, 255, 255, 0.1)"
          strokeWidth="1"
          strokeDasharray="4 2"
        />
      </svg>

      <div className="absolute inset-0 text-yellow-500">
        {/* Top number */}
        <NumberBlock
          {...numbers.top}
          className="absolute top-[3%] left-1/2 -translate-x-1/2"
        />

        {/* Bottom number */}
        <NumberBlock
          {...numbers.bottom}
          className="absolute bottom-[0%] left-1/2 -translate-x-1/2"
        />

        {/* Left side numbers */}
        <NumberBlock
          {...numbers.left}
          className="absolute top-[30%] left-[30%]"
        />
        <NumberBlock
          {...numbers.leftSide}
          className="absolute top-[47%] left-[20%]"
        />

        {/* Top center */}
        <NumberBlock
          {...numbers.topCenter}
          className="absolute top-[18%] left-1/2 -translate-x-1/2"
        />

        {/* Right side numbers */}
        <NumberBlock
          {...numbers.right}
          className="absolute top-[30%] right-[30%]"
        />
        <NumberBlock
          {...numbers.rightSide}
          className="absolute top-[47%] right-[20%]"
        />

        {/* Center */}
        <NumberBlock
          {...numbers.center}
          className="absolute top-[47%] left-1/2 -translate-x-1/2"
        />

        {/* Lower numbers */}
        <NumberBlock
          {...numbers.lowerRight}
          className="absolute bottom-[25%] right-[30%]"
        />
        <NumberBlock
          {...numbers.lowerLeft}
          className="absolute bottom-[25%] left-[30%]"
        />
        <NumberBlock
          {...numbers.lowerCenter}
          className="absolute bottom-[15%] left-1/2 -translate-x-1/2"
        />
      </div>
    </div>
  );
};

export default NumberDiagram;
