import React, { useState, useEffect } from "react";

import { wrap } from "popmotion";
import { motion, AnimatePresence } from "framer-motion";

import image_1 from "../../images/image_1.jpg";
import image_2 from "../../images/image_2.jpg";
import image_3 from "../../images/image_3.jpg";

const images = [image_1, image_2, image_3];

function Background() {
  const [page, setPage] = useState(0);
  const imageIndex = wrap(0, images.length, page);
  useEffect(() => {
    const interval = setInterval(() => {
      setPage((page) => page + 1);
    }, 3000);
    return () => clearInterval(interval);
  });
  return (
    <AnimatePresence initial={false}>
      <motion.img
        key={page}
        src={images[imageIndex]}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 1 }}
        transition={{
          opacity: { duration: 0.5 },
        }}
        className="background"
      />
    </AnimatePresence>
  );
}

export { Background };
