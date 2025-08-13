import { motion } from "framer-motion"

export const FloatingParticle = ({ delay = 0 }: { delay?: number }) => (
  <motion.div
    className="absolute w-2 h-2 bg-gradient-to-r from-pink-400 to-purple-600 rounded-full opacity-20"
    animate={{
      y: [-20, -100, -20],
      x: [-10, 10, -10],
      scale: [1, 1.5, 1],
      opacity: [0.2, 0.8, 0.2],
    }}
    transition={{
      duration: 6,
      repeat: Number.POSITIVE_INFINITY,
      delay,
      ease: "easeInOut",
    }}
    style={{
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
    }}
  />
)
