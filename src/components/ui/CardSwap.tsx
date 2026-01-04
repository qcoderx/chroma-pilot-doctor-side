import React, { Children, cloneElement, forwardRef, isValidElement, useEffect, useMemo, useRef } from 'react';
import gsap from 'gsap';

export const Card = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { customClass?: string }>(
  ({ customClass, ...rest }, ref) => (
    <div ref={ref} {...rest} className={`card ${customClass ?? ''} ${rest.className ?? ''}`.trim()} />
  )
);
Card.displayName = 'Card';

interface CardSwapProps {
  width?: number;
  height?: number;
  cardDistance?: number;
  verticalDistance?: number;
  delay?: number;
  pauseOnHover?: boolean;
  onCardClick?: (index: number) => void;
  skewAmount?: number;
  easing?: 'elastic' | 'smooth';
  children: React.ReactNode;
}

const makeSlot = (i: number, distX: number, distY: number, total: number) => ({
  x: i * distX,
  y: -i * distY,
  z: -i * distX * 1.5,
  zIndex: total - i
});

const placeNow = (el: HTMLElement, slot: ReturnType<typeof makeSlot>, skew: number) =>
  gsap.set(el, {
    x: slot.x,
    y: slot.y,
    z: slot.z,
    xPercent: -50,
    yPercent: -50,
    skewY: skew,
    transformOrigin: 'center center',
    zIndex: slot.zIndex,
    force3D: true
  });

const CardSwap: React.FC<CardSwapProps> = ({
  width = 320,
  height = 200,
  cardDistance = 40,
  verticalDistance = 50,
  delay = 4000,
  pauseOnHover = true,
  onCardClick,
  skewAmount = 4,
  easing = 'elastic',
  children
}) => {
  const config = {
    ease: 'power2.out',
    duration: 0.6
  };

  const childArr = useMemo(() => Children.toArray(children), [children]);
  const refs = useMemo(
    () => childArr.map(() => React.createRef<HTMLDivElement>()),
    [childArr.length]
  );

  const order = useRef(Array.from({ length: childArr.length }, (_, i) => i));
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const total = refs.length;
    refs.forEach((r, i) => {
      if (r.current) {
        placeNow(r.current, makeSlot(i, cardDistance, verticalDistance, total), skewAmount);
      }
    });
  }, [cardDistance, verticalDistance, skewAmount, refs]);

  const bringToFront = (clickedIndex: number) => {
    const currentOrder = [...order.current];
    const clickedOrderIndex = currentOrder.indexOf(clickedIndex);
    
    if (clickedOrderIndex === 0) return; // Already at front
    
    // Remove clicked card from current position
    const [clickedCard] = currentOrder.splice(clickedOrderIndex, 1);
    // Add to front
    currentOrder.unshift(clickedCard);
    
    // Animate all cards to new positions
    currentOrder.forEach((cardIndex, newPosition) => {
      const el = refs[cardIndex].current;
      if (!el) return;
      
      const slot = makeSlot(newPosition, cardDistance, verticalDistance, refs.length);
      
      gsap.to(el, {
        x: slot.x,
        y: slot.y,
        z: slot.z,
        zIndex: slot.zIndex,
        duration: config.duration,
        ease: config.ease
      });
    });
    
    order.current = currentOrder;
  };

  const rendered = childArr.map((child, i) =>
    isValidElement(child)
      ? cloneElement(child, {
          key: i,
          ref: refs[i],
          style: { width, height, ...(child.props.style ?? {}) },
          onClick: (e: React.MouseEvent) => {
            e.stopPropagation();
            bringToFront(i);
            child.props.onClick?.(e);
            onCardClick?.(i);
          }
        })
      : child
  );

  return (
    <div 
      ref={container} 
      className="relative"
      style={{ 
        width, 
        height: height + 100,
        perspective: '900px',
        overflow: 'visible'
      }}
    >
      {rendered}
    </div>
  );
};

export default CardSwap;