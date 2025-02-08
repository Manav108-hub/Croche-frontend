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
      className="absolute w-16 h-16 rounded-full overflow-hidden"
      style={{ top, left, transform }}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <img
        src={images[imageIndex]}
        alt="decorative flower"
        className="w-full h-full object-cover opacity-40 hover:opacity-60 transition-opacity duration-300"
      />
    </motion.div>
  );
};

export const ContactSection: React.FC = () => {
  const [flowerPositions, setFlowerPositions] = useState<Array<{
    top: string;
    left: string;
    transform: string;
    imageIndex: number;
  }> | null>(null);

  useEffect(() => {
    // Generate random positions only on the client
    const positions = [...Array(15)].map((_, i) => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      transform: `rotate(${Math.random() * 360}deg) scale(${0.6 + Math.random() * 0.4})`,
      imageIndex: i % 4,
    }));
    setFlowerPositions(positions);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.section
      id="contact"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="container mx-auto px-4 relative mt-16 py-16 px-8 bg-gradient-to-br from-pink-50 to-gray-100 rounded-2xl shadow-lg overflow-hidden mb-8"
    >
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        {flowerPositions?.map((pos, i) => (
          <FlowerImage
            key={`flower-${i}`}
            top={pos.top}
            left={pos.left}
            transform={pos.transform}
            imageIndex={pos.imageIndex}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10">
        <motion.div
          variants={itemVariants}
          className="flex flex-col items-center justify-center space-y-2 mb-8"
        >
          <h2 className="text-5xl text-pink-500 pacifico-regular">
            Contact Us
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-pink-300 to-pink-500 rounded-full" />
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="max-w-lg mx-auto bg-white/90 backdrop-blur-sm p-10 rounded-xl shadow-xl"
        >
          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-600 mb-8 dm-sans-regular text-center"
          >
            Have questions or need help?
            <br />
            <span className="text-pink-500">We'd love to hear from you!</span>
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="space-y-6 dm-sans-regular"
          >
            <div className="flex items-center justify-center space-x-3 p-4 rounded-lg hover:bg-pink-50 transition-colors duration-300">
              <span className="text-2xl text-pink-400">✉</span>
              <p className="text-lg text-gray-700">
                <strong className="dm-sans-bold">Email:</strong>
                <span className="ml-2 text-pink-500">croche@example.com</span>
              </p>
            </div>

            <div className="flex items-center justify-center space-x-3 p-4 rounded-lg hover:bg-pink-50 transition-colors duration-300">
              <span className="text-2xl text-pink-400">☎</span>
              <p className="text-lg text-gray-700">
                <strong className="dm-sans-bold">Phone:</strong>
                <span className="ml-2 text-pink-500">+123 456 7890</span>
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};