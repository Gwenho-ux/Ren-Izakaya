'use client';

interface AttributeScaleProps {
  leftLabel: string;
  rightLabel: string;
  value: number;
}

const Circle = ({ filled }: { filled: boolean }) => {
  return (
    <div 
      className={`w-[15px] h-[15px] rounded-full transition-all duration-300 box-border ${
        filled 
          ? 'bg-[#FF3E3C]' 
          : 'border-[1.5px] border-[#FF3E3C] bg-transparent'
      }`}
    />
  );
};

export const AttributeScale = ({ leftLabel, rightLabel, value }: AttributeScaleProps) => {
  return (
    <div 
      className="w-full" 
      style={{ 
        margin: '12px 0',
        padding: '0',
        display: 'grid',
        gridTemplateColumns: '80px 1fr 80px',
        alignItems: 'center',
        gap: '12px'
      }}
    >
      {/* Left Label */}
      <span className="text-[14px] font-pt-mono text-left" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
        {leftLabel}
      </span>

      {/* Rating Circles */}
      <div className="flex justify-between items-center relative">
        {/* Horizontal line under circles */}
        <div 
          className="absolute left-0 right-0 h-[2px]" 
          style={{ 
            backgroundColor: 'rgba(255, 62, 60, 0.6)',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 1
          }}
        />
        {[1, 2, 3, 4, 5].map((circle) => (
          <div key={circle} style={{ position: 'relative', zIndex: 2 }}>
            <Circle filled={circle <= value} />
          </div>
        ))}
      </div>

      {/* Right Label */}
      <span className="text-[14px] font-pt-mono text-right" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
        {rightLabel}
      </span>
    </div>
  );
}; 