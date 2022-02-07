import {motion, 
        useViewportScroll } from "framer-motion";
import "./inicial.css"

export const Inicial = () => {
    const {scrollY} = useViewportScroll();
    return (
        <motion.div className="title" style={{y: scrollY}}>
            <p>
                Blue Amazonia Project
            </p>
            <hr/>
            <h2>BLAB</h2>
        </motion.div>
    )
}
