const { motion } = require("framer-motion");

export const EventCard = ({item, setSelectedId}) => {
  return (
    
    <motion.div className="flex-grow-1 w-96 border-solid border-black border-1" layoutId={item.id} onClick={() => setSelectedId(item.id)}>
      <motion.h2>{item.title}</motion.h2>
      <motion.h5>{item.subtitle}</motion.h5>
    </motion.div>
  );
};
