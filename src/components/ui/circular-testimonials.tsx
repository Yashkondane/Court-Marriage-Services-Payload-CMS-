"use client";
import React, {
  useEffect,
  useRef,
  useState,
  useMemo,
  useCallback,
} from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  img: string;
}

interface CircularTestimonialsProps {
  testimonials: Testimonial[];
}

const CircularTestimonials: React.FC<CircularTestimonialsProps> = ({
  testimonials,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [direction, setDirection] = useState(0);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  const rotateTestimonials = useCallback(
    (newDirection: number) => {
      setDirection(newDirection);
      setCurrentIndex((prevIndex) => {
        if (newDirection === 1) {
          return (prevIndex + 1) % testimonials.length;
        }
        return (prevIndex - 1 + testimonials.length) % testimonials.length;
      });
    },
    [testimonials.length]
  );

  const handleNext = () => {
    setIsAutoPlaying(false);
    rotateTestimonials(1);
  };

  const handlePrev = () => {
    setIsAutoPlaying(false);
    rotateTestimonials(-1);
  };

  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayRef.current = setInterval(() => {
        rotateTestimonials(1);
      }, 5000);
    } else if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying, rotateTestimonials]);

  const testimonialsAround = useMemo(() => {
    const num = testimonials.length;
    return testimonials.map((_, i) => {
      const angle = (i / num) * 2 * Math.PI;
      const x = Math.cos(angle) * 150; // Radius
      const y = Math.sin(angle) * 150;
      return { x, y, index: i };
    });
  }, [testimonials.length]);

  return (
    <div className="relative w-full max-w-5xl mx-auto h-[500px] flex items-center justify-center overflow-hidden bg-transparent font-sans">
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Outer Circular Path */}
        <div className="absolute w-[350px] h-[350px] border border-dashed border-[#1a365d]/10 rounded-full" />

        {/* Floating Avatars */}
        {testimonialsAround.map((pos) => {
          const isSelected = pos.index === currentIndex;
          return (
            <motion.div
              key={pos.index}
              initial={false}
              animate={{
                x: pos.x,
                y: pos.y,
                scale: isSelected ? 1.2 : 0.8,
                opacity: isSelected ? 1 : 0.4,
              }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              className={`absolute w-12 h-12 rounded-full border-2 cursor-pointer transition-all duration-300 ${
                isSelected
                  ? "border-[#c7a84b] scale-110 shadow-lg shadow-[#c7a84b]/20"
                  : "border-transparent opacity-40 hover:opacity-100"
              }`}
              onClick={() => {
                setIsAutoPlaying(false);
                setCurrentIndex(pos.index);
              }}
            >
              <div className="w-full h-full rounded-full overflow-hidden bg-slate-100 relative">
                <img
                  src={testimonials[pos.index].img}
                  alt={testimonials[pos.index].name}
                  className="w-full h-full rounded-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/placeholder-avatar.png';
                  }}
                />
              </div>
            </motion.div>
          );
        })}

        {/* Central Content Card */}
        <div className="relative z-10 w-[300px] md:w-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="bg-white rounded-3xl p-8 shadow-2xl shadow-[#1a365d]/5 border border-slate-100 flex flex-col items-center text-center"
            >
              <div className="w-20 h-20 rounded-2xl overflow-hidden mb-6 shadow-xl ring-4 ring-slate-50 rotate-3 transition-transform duration-300">
                <img
                  src={testimonials[currentIndex].img}
                  alt={testimonials[currentIndex].name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/placeholder-avatar.png';
                  }}
                />
              </div>

              <div className="mb-6 relative">
                <span className="absolute -top-6 -left-4 text-6xl text-[#c7a84b]/10 font-serif">
                  &ldquo;
                </span>
                <p className="text-[#1a365d] text-lg italic leading-relaxed relative z-10 px-2 font-medium">
                  {testimonials[currentIndex].quote}
                </p>
                <span className="absolute -bottom-10 -right-4 text-6xl text-[#c7a84b]/10 font-serif">
                  &rdquo;
                </span>
              </div>

              <div>
                <h4 className="font-heading font-bold text-[#1a365d] text-2xl mb-1">
                  {testimonials[currentIndex].name}
                </h4>
                <p className="text-[#c7a84b] text-sm font-bold uppercase tracking-widest">
                  {testimonials[currentIndex].role}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={handlePrev}
              className="p-4 rounded-full bg-slate-100 text-[#1a365d] hover:bg-slate-200 transition-all shadow-md group border border-slate-200"
              aria-label="Previous testimonial"
            >
              <FaArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            </button>
            <button
              onClick={handleNext}
              className="p-4 rounded-full bg-[#1a365d] text-white hover:bg-[#2a4a7f] transition-all shadow-lg group"
              aria-label="Next testimonial"
            >
              <FaArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CircularTestimonials;
