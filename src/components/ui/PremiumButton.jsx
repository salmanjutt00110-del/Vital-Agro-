import React from 'react';
import { motion } from 'framer-motion';
import useMagneticEffect from '@/hooks/useMagneticEffect';
import { ArrowRight } from 'lucide-react';

export default function PremiumButton({
  children,
  onClick,
  href,
  target,
  rel,
  className = '',
  variant = 'primary', // 'primary', 'secondary', 'whatsapp'
  isMagnetic = true,
  showArrow = true,
  disabled = false,
  ...props
}) {
  const { ref, x, y } = useMagneticEffect(0.2, 80);

  const buttonContent = (
    <motion.span
      className="flex items-center justify-center gap-2 select-none"
      style={isMagnetic ? { x, y } : {}}
    >
      {children}
      {showArrow && (
        <motion.span
          className="inline-block transition-transform duration-300 group-hover:translate-x-1.5"
        >
          <ArrowRight className="w-4 h-4" />
        </motion.span>
      )}
    </motion.span>
  );

  const baseStyles = "relative px-8 py-4 rounded-full text-sm font-extrabold flex items-center justify-center group overflow-hidden transition-all duration-300 shadow-lg select-none cursor-pointer active:scale-[0.97]";

  const variantStyles = {
    primary: "bg-[#0A2E1F] text-white border border-[#76C945]/30 hover:border-[#76C945] hover:shadow-[#76C945]/20",
    secondary: "bg-white/10 backdrop-blur-md text-white border border-white/20 hover:bg-white/20 hover:border-white/40",
    whatsapp: "bg-[#25D366] text-white hover:bg-[#20ba5a] hover:shadow-[#25D366]/20",
  };

  const Component = href ? 'a' : 'button';
  const externalProps = href ? { href, target, rel } : { onClick, disabled };

  return (
    <Component
      ref={isMagnetic ? ref : null}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      {...externalProps}
      {...props}
    >
      {/* Background sweep reflection on hover */}
      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none" />
      {buttonContent}
    </Component>
  );
}
