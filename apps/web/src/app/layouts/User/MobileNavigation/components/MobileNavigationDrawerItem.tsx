import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import type { navigationItem } from "@/app/layouts/User/User.layout.tsx";

type MobileNavigationDrawerItemProps = {
  item: navigationItem;
  label: string;
  isActive: boolean;
  onSelect: () => void;
};

export function MobileNavigationDrawerItem({
  item,
  label,
  isActive,
  onSelect,
}: MobileNavigationDrawerItemProps) {
  const Icon = item.icon;

  return (
    <motion.li
      variants={{
        hidden: { opacity: 0, x: -12 },
        visible: { opacity: 1, x: 0 },
      }}
    >
      <Link
        to={item.url}
        onClick={onSelect}
        aria-current={isActive ? "page" : undefined}
        className={`flex min-h-12 w-full items-center gap-3 rounded-control border px-3 text-sm font-black transition-[background-color,border-color,color] duration-200 ${
          isActive
            ? "border-border-strong bg-surface-raised text-primary"
            : "border-border bg-surface text-muted-foreground hover:border-ring hover:text-primary"
        }`}
      >
        {Icon && <Icon className="size-4.5 shrink-0" aria-hidden />}
        <span className="min-w-0 truncate">{label}</span>
      </Link>
    </motion.li>
  );
}
