import Button from "@/app/components/Button";
import Link from "next/link";
import { LuCirclePlus } from "react-icons/lu";

const Datasets = () => {
  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">All Datasets</h1>
          <p className="font-thin text-lg">
            Manage and view all your datasets.
          </p>
        </div>
        <Link href={"/datasets/create"}>
          <Button className="flex items-center gap-2">
            <LuCirclePlus size={20} />
            <p>Create New Dataset</p>
          </Button>
        </Link>
      </div>

      {/* Datasets list */}
      <div></div>
    </div>
  );
};

export default Datasets;
