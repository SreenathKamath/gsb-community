import React from "react";
import { motion } from "framer-motion";

const SectionHeader = ({ eyebrow, title, children, align = "center" }) => (
  <motion.div
    className={`section-heading section-heading-${align}`}
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.35 }}
    transition={{ duration: 0.55, ease: "easeOut" }}
  >
    {eyebrow && <p className="section-eyebrow">{eyebrow}</p>}
    <h2 className="section-title">{title}</h2>
    {children && <p className="section-intro">{children}</p>}
  </motion.div>
);

export default SectionHeader;
