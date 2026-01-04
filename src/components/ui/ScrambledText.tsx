import React, { useEffect, useRef, useState } from 'react';

export interface ScrambledTextProps {
  radius?: number;
  duration?: number;
  scrambleChars?: string;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

const ScrambledText: React.FC<ScrambledTextProps> = ({
  radius = 100,
  duration = 800,
  scrambleChars = '!@#$%^&*()_+-=[]{}|;:,.<>?',
  className = '',
  style = {},
  children
}) => {
  const textRef = useRef<HTMLDivElement>(null);
  const [displayText, setDisplayText] = useState('');
  const originalText = children?.toString() || '';
  const animationRef = useRef<number>();

  useEffect(() => {
    setDisplayText(originalText);
  }, [originalText]);

  const scrambleText = (targetText: string, callback?: () => void) => {
    let frame = 0;
    const maxFrames = duration / 16; // ~60fps

    const animate = () => {
      const progress = frame / maxFrames;
      
      if (progress >= 1) {
        setDisplayText(targetText);
        callback?.();
        return;
      }

      const scrambled = targetText
        .split('')
        .map((char, index) => {
          if (char === ' ') return ' ';
          
          const shouldReveal = progress > (index / targetText.length);
          if (shouldReveal) return char;
          
          return scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
        })
        .join('');

      setDisplayText(scrambled);
      frame++;
      animationRef.current = requestAnimationFrame(animate);
    };

    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    animate();
  };

  const handleMouseEnter = () => {
    scrambleText(originalText);
  };

  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={textRef}
      className={`font-mono cursor-pointer ${className}`}
      style={style}
      onMouseEnter={handleMouseEnter}
    >
      {displayText}
    </div>
  );
};

export default ScrambledText;