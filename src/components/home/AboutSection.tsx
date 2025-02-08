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
    '/imgs/flowers/flower1.webp', // Pink petals
    '/imgs/flowers/flower2.webp', // Mixed bouquet
    '/imgs/flowers/flower4.webp', // Pink daisy
    '/imgs/flowers/flower5.webp'  // Illustrated flower
  ];

  return (
    <motion.div
      className="absolute w-16 h-16 rounded-full overflow-hidden"
      style={{ top, left, transform }}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <img
        src={images[imageIndex]}
        alt="decorative flower"
        className="w-full h-full object-cover opacity-40 hover:opacity-60 transition-opacity duration-300"
      />
    </motion.div>
  );
};

export const AboutSection: React.FC = () => {
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
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  return (
    <motion.section
      id="about"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="container mx-auto px-4 relative mt-16 py-16 px-8 bg-gradient-to-br from-pink-50 to-gray-100 rounded-2xl shadow-lg overflow-hidden"
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
            About Us
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-pink-300 to-pink-500 rounded-full"/>
        </motion.div>

        <motion.div 
          variants={itemVariants}
          className="max-w-2xl mx-auto bg-white/90 backdrop-blur-sm p-10 rounded-xl shadow-xl"
        >
          <motion.p 
            variants={itemVariants}
            className="text-xl text-gray-600 dm-sans-regular text-center leading-relaxed"
          >
            At <span className="text-pink-500 pacifico-regular">Croche By Amisha</span>, we pride ourselves on creating beautiful, handcrafted crochet items. Our mission is to bring joy and style to your life with unique and sustainable products.
          </motion.p>

          <motion.div 
            variants={itemVariants}
            className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {[
              { title: "Handcrafted", desc: "Each piece made with love and care" },
              { title: "Unique", desc: "One-of-a-kind designs just for you" },
              { title: "Sustainable", desc: "Eco-friendly materials and practices" }
            ].map((item, index) => (
              <div key={index} className="text-center p-4 rounded-lg hover:bg-pink-50 transition-all duration-300">
                <h3 className="text-pink-500 pacifico-regular text-xl mb-2">{item.title}</h3>
                <p className="text-gray-600 dm-sans-regular">{item.desc}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};