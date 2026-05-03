const StatsCard = ({ title, count, icon, color }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 p-6 flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
          {title}
        </p>
        <h4 className="text-3xl font-bold text-gray-900 dark:text-white">
          {count || 0}
        </h4>
      </div>
      <div className={`p-3 rounded-full ${color}`}>
        {icon}
      </div>
    </div>
  );
};

export default StatsCard;
