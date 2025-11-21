import SchemaTable from "@/app/features/schema/SchemaTable";
import { Input } from "antd";

const CreateDataset = () => {
  return (
    <div>
      <div>
        <h1 className="text-3xl font-bold">Create New Dataset</h1>
      </div>

      <div className="mt-10 grid gap-6">
        <div className="p-4 border border-(--light-gray) rounded-2xl">
          <h2 className="text-xl mb-4">Dataset name</h2>
          <Input size="large" />
        </div>

        <div className="p-4 border border-(--light-gray) rounded-2xl">
          <h2 className="text-xl">Schema Builder</h2>
          <p className="font-thin text-lg">
            Define the fields for your dataset.
          </p>

          <SchemaTable />
        </div>
      </div>
    </div>
  );
};

export default CreateDataset;
