import { motion } from "framer-motion"

export const GlowingOrb = ({
  size = "w-32 h-32",
  color = "from-blue-400 to-purple-600",
  delay = 0,
}) => (
  <motion.div
    className={`absolute ${size} rounded-full bg-gradient-to-r ${color} opacity-10 blur-xl`}
    animate={{
      scale: [1, 1.2, 1],
      opacity: [0.1, 0.3, 0.1],
      rotate: [0, 180, 360],
    }}
    transition={{
      duration: 8,
      repeat: Number.POSITIVE_INFINITY,
      delay,
      ease: "easeInOut",
    }}
    style={{
      left: `${Math.random() * 80}%`,
      top: `${Math.random() * 80}%`,
    }}
  />
)
