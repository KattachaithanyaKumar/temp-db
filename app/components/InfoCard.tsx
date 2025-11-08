import {
  LuCode,
  LuLock,
  LuGroup,
  LuZap,
  LuDatabase,
  LuSlidersHorizontal,
} from "react-icons/lu";
import { JSX } from "react";

interface InfoCardProps {
  card: {
    title: string;
    description: string;
    icon: keyof typeof ICONS;
  };
}

const ICONS: Record<string, JSX.Element> = {
  code: <LuCode size={28} color="var(--blue)" />,
  lock: <LuLock size={28} color="var(--blue)" />,
  group: <LuGroup size={28} color="var(--blue)" />,
  bolt: <LuZap size={28} color="var(--blue)" />,
  tune: <LuSlidersHorizontal size={28} color="var(--blue)" />,
  schema: <LuDatabase size={28} color="var(--blue)" />,
};

const InfoCard = ({ card }: InfoCardProps) => {
  return (
    <div className="p-6 border border-(--white-10) bg-(--white-05) rounded-lg hover:shadow-2xl hover:border-(--blue) transition-all ">
      <div className="mb-4">{ICONS[card.icon]}</div>
      <h3 className="text-base text-(--white) font-bold mb-2">{card.title}</h3>
      <p className="text-sm text-(--text-light)">{card.description}</p>
    </div>
  );
};

export default InfoCard;
