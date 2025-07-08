import { useGetStatus } from "../../api/status";
import DoneIcon from "../../assets/icons/DoneIcon";

import PendingIcon from "../../assets/icons/PendingIcon";
import RateIcon from "../../assets/icons/RateIcon";
import TotalIcon from "../../assets/icons/TotalIcon";
import Skeleton from "../../components/Skeleton";

const Home = () => {
  const { data: status, isLoading, error } = useGetStatus();

  const completed = status?.Statistics.countCompleted ?? 0;
  const pending = status?.Statistics.countNotCompleted ?? 0;
  const total = completed + pending;
  const completionRate = total ? Math.round((completed / total) * 100) : 0;

  if (isLoading) return <Skeleton />;
  if (error) return <div className="text-red-500">An error occurred while loading data.</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">

      {/* Completed */}
      <div className="bg-green-100 text-green-800 p-6 rounded-xl shadow-md flex items-center gap-4">
        <DoneIcon />
        <div>
          <p className="text-lg font-semibold">Completed</p>
          <p className="text-2xl font-bold">{completed}</p>
        </div>
      </div>

      {/* Pending */}
      <div className="bg-yellow-100 text-yellow-800 p-6 rounded-xl shadow-md flex items-center gap-4">
        <PendingIcon />
        <div>
          <p className="text-lg font-semibold">Pending</p>
          <p className="text-2xl font-bold">{pending}</p>
        </div>
      </div>

      {/* Total */}
      <div className="bg-blue-100 text-blue-800 p-6 rounded-xl shadow-md flex items-center gap-4">
        <TotalIcon />
        <div>
          <p className="text-lg font-semibold">Total Statuses</p>
          <p className="text-2xl font-bold">{total}</p>
        </div>
      </div>

      {/* Completion Rate */}
      <div className="bg-purple-100 text-purple-800 p-6 rounded-xl shadow-md flex items-center gap-4">
        <RateIcon />
        <div>
          <p className="text-lg font-semibold">Completion Rate</p>
          <p className="text-2xl font-bold">{completionRate}%</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
