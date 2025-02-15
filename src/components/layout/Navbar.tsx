import React, { useState, useEffect } from "react";
import { Icon } from "../ui/Icons";
import { motion, AnimatePresence } from "framer-motion";

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
      className="absolute w-8 h-8 rounded-full overflow-hidden pointer-events-none"
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

type UserData = {
  id: string;
  name: string;
  email: string;
};

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [flowerPositions, setFlowerPositions] = useState<Array<{
    top: string;
    left: string;
    transform: string;
    imageIndex: number;
  }> | null>(null);

  useEffect(() => {
    const positions = [...Array(6)].map((_, i) => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      transform: `rotate(${Math.random() * 360}deg) scale(${0.4 + Math.random() * 0.3})`,
      imageIndex: i % 4,
    }));
    setFlowerPositions(positions);
  }, []);

  useEffect(() => {
    const checkAuthStatus = () => {
      try {
        if (typeof window !== "undefined") {
          const token = localStorage.getItem("authToken");
          const userStr = localStorage.getItem("user");
          if (token && userStr) {
            const user = JSON.parse(userStr);
            setIsLoggedIn(true);
            setUserData({
              id: user.id,
              name: user.name,
              email: user.email
            });
          } else {
            setIsLoggedIn(false);
            setUserData(null);
          }
        }
      } catch (error) {
        console.error("Error checking auth status:", error);
        setIsLoggedIn(false);
        setUserData(null);
      }
    };

    if (typeof window !== "undefined") {
      checkAuthStatus();
      window.addEventListener("auth-change", checkAuthStatus);
      return () => {
        window.removeEventListener("auth-change", checkAuthStatus);
      };
    }
  }, []);

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
      setIsLoggedIn(false);
      setUserData(null);
      window.location.href = "/";
    }
  };

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="bg-white/95 backdrop-blur-sm shadow-md fixed w-full top-0 z-50"
    >
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        {flowerPositions?.map((pos, i) => (
          <FlowerImage
            key={`flower-${i}`}
            top={pos.top}
            left={pos.left}
            transform={pos.transform}
            imageIndex={pos.imageIndex}
          />
        ))}

        <div className="flex justify-between items-center h-16">
          <div className="flex items-center flex-1 sm:flex-none">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={toggleMenu}
              className="sm:hidden p-2 focus:outline-none"
            >
              <AnimatePresence mode="wait">
                {isMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                  >
                    <Icon name="x" className="h-6 w-6 text-gray-600" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                  >
                    <Icon name="menu" className="h-6 w-6 text-gray-600" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
            <motion.a
              href="/"
              whileHover={{ scale: 1.05 }}
              className="dm-sans-semi-bold font-bold text-pink-500 ml-2 sm:ml-0 flex-1 text-center sm:text-left"
            >
              <span className="pacifico-bold text-2xl sm:text-3xl pr-2">Crochet</span>
              <span className="hidden sm:inline-block">by Ameesha</span>
            </motion.a>
          </div>

          <div className="hidden sm:flex items-center space-x-8">
            {["Shop", "About", "Contact"].map((item) => (
              <motion.a
                key={item}
                href={item === "Shop" ? "/shop" : `/#${item.toLowerCase()}`}
                whileHover={{ scale: 1.1 }}
                className="text-gray-600 hover:text-pink-400 transition-colors"
              >
                {item}
              </motion.a>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            {isLoggedIn && userData ? (
              <>
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  href={`/profile/${userData.id}`}
                  className="hidden sm:flex items-center text-gray-600 hover:text-pink-400 transition-colors"
                >
                  <Icon name="user" className="h-5 w-5 mr-1" />
                  <span>{userData.name}</span>
                </motion.a>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLogout}
                  className="hidden sm:block pacifico-regular bg-pink-500 text-white px-4 py-2 rounded-full hover:bg-pink-600 transition-colors"
                >
                  Logout
                </motion.button>
              </>
            ) : (
              <div className="hidden sm:flex items-center space-x-4">
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  href="/login"
                  className="text-gray-600 hover:text-pink-400 transition-colors"
                >
                  Login
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="/register"
                  className="bg-pink-primary pacifico-regular text-white px-4 py-2 rounded-full hover:bg-pink-secondary transition-colors"
                >
                  Register
                </motion.a>
              </div>
            )}

            <div className="flex items-center">
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="/cart"
                className="relative p-2"
              >
                <Icon
                  name="shoppingCart"
                  className="h-6 w-6 text-gray-600 hover:text-pink-400 transition-colors"
                />
              </motion.a>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="sm:hidden absolute top-16 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-lg z-50 overflow-hidden"
            >
              <div className="px-4 pt-2 pb-4 space-y-2">
                {["Shop", "About", "Contact"].map((item) => (
                  <motion.a
                    key={item}
                    whileHover={{ scale: 1.05, x: 10 }}
                    href={item === "Shop" ? "/shop" : `/#${item.toLowerCase()}`}
                    onClick={toggleMenu}
                    className="block py-2 text-gray-600 hover:text-pink-400 transition-colors"
                  >
                    {item}
                  </motion.a>
                ))}

                <div className="border-t pt-4 mt-2">
                  {isLoggedIn && userData ? (
                    <>
                      <motion.a
                        whileHover={{ scale: 1.05, x: 10 }}
                        href={`/profile/${userData.id}`}
                        className="block py-2 text-gray-600 hover:text-pink-400 transition-colors"
                      >
                        Profile
                      </motion.a>
                      <motion.button
                        whileHover={{ scale: 1.05, x: 10 }}
                        onClick={handleLogout}
                        className="w-full text-left py-2 text-gray-600 text-pink-500 hover:text-pink-600 transition-colors"
                      >
                        Logout
                      </motion.button>
                    </>
                  ) : (
                    <>
                      <motion.a
                        whileHover={{ scale: 1.05, x: 10 }}
                        href="/login"
                        className="block py-2 text-gray-600 hover:text-pink-400 transition-colors"
                      >
                        Login
                      </motion.a>
                      <motion.a
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        href="/register"
                        className="block w-full bg-pink-primary pacifico-regular text-white px-4 py-3 rounded-full hover:bg-pink-secondary transition-colors mt-2 text-center"
                      >
                        Register
                      </motion.a>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;