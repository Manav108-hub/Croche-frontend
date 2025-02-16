import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";

interface DecorativeProps {
  top: string;
  left: string;
  transform: string;
  imageIndex: number;
}

const FlowerImage: React.FC<DecorativeProps> = ({ top, left, transform, imageIndex }) => {
  const images = [
    '/imgs/flowers/flower1.webp',
    '/imgs/flowers/flower2.webp',
    '/imgs/flowers/flower4.webp',
    '/imgs/flowers/flower5.webp'
  ];

  return (
    <motion.div
      className="absolute w-12 h-12 rounded-full overflow-hidden pointer-events-none"
      style={{ top, left, transform }}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <img
        src={images[imageIndex]}
        alt="decorative flower"
        className="w-full h-full object-cover opacity-30"
      />
    </motion.div>
  );
};

const features = [
  {
    title: "Custom Orders",
    description: "Want something unique? We take custom orders!",
    icon: "🎨"
  },
  {
    title: "Quality Materials",
    description: "Only the finest yarns and materials used.",
    icon: "✨"
  },
  {
    title: "Made with Care",
    description: "Each item is carefully crafted by hand.",
    icon: "💝"
  },
] as const;

export const FeaturesSection: React.FC = () => {
  const [flowerPositions, setFlowerPositions] = useState<Array<Array<{
    top: string;
    left: string;
    transform: string;
    imageIndex: number;
  }>>>([]);

  useEffect(() => {
    // Generate random positions only on the client
    const positions = features.map(() =>
      [...Array(4)].map(() => ({
        top: `${Math.random() * 80}%`, // Constrain top to 80% to avoid overflow
        left: `${Math.random() * 80}%`, // Constrain left to 80% to avoid overflow
        transform: `rotate(${Math.random() * 360}deg) scale(${0.5 + Math.random() * 0.3})`,
        imageIndex: Math.floor(Math.random() * 4),
      }))
    );
    setFlowerPositions(positions);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="container mx-auto relative mt-16 py-8 px-4 overflow-hidden" // Add overflow-hidden to prevent 2D scroll
    >
      {/* Features grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="relative bg-white/90 backdrop-blur-sm p-8 rounded-xl shadow-xl text-center transform hover:scale-105 transition-transform duration-300 overflow-hidden" // Add overflow-hidden to prevent 2D scroll
          >
            <span className="text-3xl mb-4 block">{feature.icon}</span>
            <h3 className="text-2xl pacifico-regular text-pink-500 mb-3">
              {feature.title}
            </h3>
            <p className="text-gray-600 dm-sans-regular">
              {feature.description}
            </p>

            {/* Flowers around each card */}
            {flowerPositions[index]?.map((pos, i) => (
              <FlowerImage
                key={`flower-${index}-${i}`}
                top={pos.top}
                left={pos.left}
                transform={pos.transform}
                imageIndex={pos.imageIndex}
              />
            ))}
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};