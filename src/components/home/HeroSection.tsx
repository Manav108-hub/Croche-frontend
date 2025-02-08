import { motion } from "framer-motion";

export const HeroSection = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center relative"
    >
      <div 
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: 'url("/imgs/backgroundRibbion.webp")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          zIndex: 0
        }}
      />
      <section className="container mx-auto px-4 pt-20 bg-white/80 dark:bg-gray-900/80 relative z-10">
          <div className="grid max-w-screen-xl mx-auto lg:gap-8 xl:gap-0 lg:grid-cols-12">
              <div className="mr-auto place-self-center lg:col-span-7">
                  <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">Handmade Crochet, Made with Love</h1>
                  <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">From intricate patterns to bold textures, our handcrafted crochet pieces are designed to inspire creativity and elevate your style.</p>
                  <a href="/shop" className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base pacifico-regular text-center text-white rounded-lg bg-pink-600 hover:bg-pink-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900">
                    Discover Our Collection
                    <svg className="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                  </a>
              </div>
              <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
                  <img src="/imgs/heroImage.webp" alt="mockup" className="w-full h-full object-cover" />
              </div>                
          </div>
      </section>
    </motion.div>
  );
};