import { motion } from "framer-motion";

type userHeaderProps = {
  title: string;
  subtitle?: string;
};

export function UserHeader({ title, subtitle }: userHeaderProps) {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <motion.header
      className="space-y-2"
      initial="hidden"
      animate="visible"
      variants={itemVariants}
    >
      <h1 className="text-3xl md:text-4xl font-bold text-primary">{title}</h1>
      <p className="text-muted-foreground leading-relaxed">{subtitle}</p>
    </motion.header>
  );
}
