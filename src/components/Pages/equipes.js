import React, { useState, useEffect } from "react";
import { wrap } from "popmotion";
import {motion, 
        AnimatePresence, 
        useViewportScroll } from "framer-motion";
import image_1 from '../../images/image_1.jpg'
import image_2 from '../../images/image_2.jpg'
import image_3 from '../../images/image_3.jpg'
import "./inicial.css"

const images = [
    image_1, 
    image_2,
    image_3
];

export const Equipes = () => {
    const [page, setPage] = useState(0);
    const imageIndex = wrap(0, images.length, page);
    const {scrollY} = useViewportScroll();

    // const paginate = () => {
    //     setPage(page+1);
    //     console.log(page);
    // }

    useEffect(() => {
        const interval = setInterval(() => {
            setPage(page => page+1);
        }, 3000);
        return () => clearInterval(interval);

    });

    return (
        <>
            <AnimatePresence initial={false}>
                <motion.img
                key={page}
                src={images[imageIndex]}
                initial={{ opacity: 0}}
                animate={{ opacity: 1}}
                exit={{ opacity: 1 }}
                transition={{
                    opacity: { duration: 0.5 }
                }}
                className="App-logo"
                />
            </AnimatePresence>
            <motion.div className="wrap" style={{y: scrollY}}>
                <p>
                    Blue Amazonia Project
                </p>
                <hr/>
                <h2>EQUIPES</h2>
                {/* <div className="dot-box">
                    <span className="dot"></span>
                    <span className="dot"></span>
                    <span className="dot"></span>
                </div> */}
            </motion.div>

            {/* <div className="next" onClick={() => paginate(1)}>
                {"‣"}
            </div>
            <div className="prev" onClick={() => paginate(-1)}>
                {"‣"}
            </div> */}
        </>
    )
}
