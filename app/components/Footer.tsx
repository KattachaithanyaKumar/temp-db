import { LuBraces } from "react-icons/lu";

const Footer = () => {
  return (
    <div className="w-full p-5 border-t border-(--dark-gray)">
      <div className="max-w-[1000px] mx-auto ">
        <div className="flex items-center gap-2">
          <LuBraces color="var(--text-light)" size={18} />
          <h2 className="text-(--text-light)">Temp DB</h2>
        </div>
      </div>
    </div>
  );
};

export default Footer;
