import { LuBraces } from "react-icons/lu";

const Logo = () => {
  return (
    <div className="flex items-center gap-2">
      <LuBraces size={24} color="var(--blue)" />
      <h1 className="text-2xl font-bold">TempDB</h1>
    </div>
  );
};

export default Logo;
