import { LuCirclePlus } from "react-icons/lu";
import Button from "@/app/components/Button";
import Card from "@/app/components/Card";
import Table from "@/app/components/Table";

const dashboard = () => {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Button className="flex items-center gap-2">
          <LuCirclePlus size={20} />
          <p>Create New Dataset</p>
        </Button>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-10">
        <div className="grid grid-cols-3 gap-10">
          <Card>
            <p className="text-(--text-light) text-sm leading-loose">
              API Calls
            </p>
            <h2 className="text-3xl font-bold">1,254,324</h2>
          </Card>
          <Card>
            <p className="text-(--text-light) text-sm leading-loose">
              Active Datasets
            </p>
            <h2 className="text-3xl font-bold">9</h2>
          </Card>
          <Card>
            <p className="text-(--text-light) text-sm leading-loose">
              Storage Used
            </p>
            <h2 className="text-3xl font-bold">452 MB</h2>
          </Card>
        </div>

        <div>
          <Table
            title="Subscription Status"
            columns={["DatasetName", "Status", "Last Accessed"]}
            rows={[
              ["user-profiles", "active", "2 hours ago"],
              ["products-catalog", "active", "7 hours ago"],
              ["inventory", "expired", "2 days ago"],
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default dashboard;
