import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";

interface DecorativeProps {
  top: string;
  left: string;
  transform: string;
  imageIndex: number;
}

interface SocialLink {
  href: string;
  children: React.ReactNode;
}

const SocialIcon: React.FC<SocialLink> = ({ href, children }) => (
  <motion.a
    href={href}
    whileHover={{ scale: 1.2, rotate: 10 }}
    className="text-pink-400 hover:text-pink-500 transition-colors"
  >
    {children}
  </motion.a>
);

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
        className="w-full h-full object-cover opacity-20"
      />
    </motion.div>
  );
};

const Footer: React.FC = () => {
  const [flowerPositions, setFlowerPositions] = useState<Array<{
    top: string;
    left: string;
    transform: string;
    imageIndex: number;
  }> | null>(null);

  useEffect(() => {
    // Generate random positions only on the client
    const positions = [...Array(12)].map((_, i) => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      transform: `rotate(${Math.random() * 360}deg) scale(${0.4 + Math.random() * 0.3})`,
      imageIndex: i % 4,
    }));
    setFlowerPositions(positions);
  }, []);

  const footerLinks = [
    {
      title: "Shop",
      links: ["All Products", "New Arrivals", "Best Sellers", "Sale"]
    },
    {
      title: "About",
      links: ["Our Story", "Blog", "Testimonials", "FAQ"]
    },
    {
      title: "Customer Care",
      links: ["Contact Us", "Shipping Info", "Returns", "Size Guide"]
    }
  ];

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative bg-gradient-to-b from-pink-50 to-white pt-16 overflow-hidden"
    >
      {/* Decorative flowers */}
      <div className="absolute inset-0">
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

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12">
          {/* Brand section */}
          <div className="text-center md:text-left">
            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="pacifico-regular text-3xl text-pink-500 mb-4"
            >
              Crochet by Ameesha
            </motion.h2>
            <p className="dm-sans-regular text-gray-600 mb-6">
              Handcrafted with love, designed to bring joy to your life.
            </p>
            {/* Newsletter signup */}
            <div className="mt-4">
              <h3 className="text-sm font-semibold text-gray-700 mb-2">Join our newsletter</h3>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 rounded-full border border-pink-200 focus:outline-none focus:border-pink-500"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-pink-primary text-white px-6 py-2 rounded-full hover:bg-pink-secondary transition-colors"
                >
                  Subscribe
                </motion.button>
              </div>
            </div>
          </div>

          {/* Links sections */}
          {footerLinks.map((section, idx) => (
            <div key={section.title} className="text-center md:text-left">
              <motion.h3
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 * idx }}
                className="text-lg font-semibold text-pink-500 mb-4 pacifico-regular"
              >
                {section.title}
              </motion.h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIdx) => (
                  <motion.li
                    key={link}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 * linkIdx }}
                  >
                    <a
                      href="#"
                      className="text-gray-600 hover:text-pink-500 transition-colors dm-sans-regular"
                    >
                      {link}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-pink-100 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 dm-sans-regular text-center md:text-left mb-4 md:mb-0">
              © 2024 Crochet by Ameesha. All rights reserved.
            </p>
            {/* Social links */}
            <div className="flex space-x-6">
              <SocialIcon href="#">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </SocialIcon>
              <SocialIcon href="#">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z"/>
                </svg>
              </SocialIcon>
              <SocialIcon href="#">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"/>
                </svg>
              </SocialIcon>
              <SocialIcon href="#">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"/>
                </svg>
              </SocialIcon>
            </div>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;