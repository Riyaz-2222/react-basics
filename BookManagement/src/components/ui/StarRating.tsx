import { motion } from "framer-motion"
import { Star } from "lucide-react"

export const StarRating = ({
  rating,
  onRatingChange,
  interactive = false,
}: {
  rating: number
  onRatingChange?: (rating: number) => void
  interactive?: boolean
}) => (
  <div className="flex gap-1">
    {[1, 2, 3, 4, 5].map((star) => (
      <motion.button
        key={star}
        type="button"
        onClick={() => interactive && onRatingChange?.(star)}
        className={`${interactive ? "cursor-pointer" : "cursor-default"}`}
        whileHover={interactive ? { scale: 1.2, rotate: 15 } : {}}
        whileTap={interactive ? { scale: 0.9 } : {}}
      >
        <Star
          className={`h-4 w-4 ${
            star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
          }`}
        />
      </motion.button>
    ))}
  </div>
)
