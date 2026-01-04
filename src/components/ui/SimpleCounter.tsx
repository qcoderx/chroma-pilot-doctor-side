import React, { useEffect, useState, useRef } from 'react';
import { useSpring, useInView } from 'framer-motion';

interface CounterProps {
  value: number;
  fontSize?: number;
  textColor?: string;
  fontWeight?: React.CSSProperties['fontWeight'];
  gradientFrom?: string;
  gradientTo?: string;
}

export default function Counter({
  value,
  fontSize = 16,
  textColor = 'inherit',
  fontWeight = 'inherit'
}: CounterProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const spring = useSpring(0);

  useEffect(() => {
    if (isInView) {
      spring.set(value);
    }
    
    const unsubscribe = spring.on('change', (latest) => {
      setDisplayValue(Math.round(latest));
    });

    return unsubscribe;
  }, [value, spring, isInView]);

  return (
    <span 
      ref={ref}
      style={{ 
        fontSize, 
        color: textColor, 
        fontWeight,
        fontVariantNumeric: 'tabular-nums'
      }}
    >
      {displayValue}
    </span>
  );
}