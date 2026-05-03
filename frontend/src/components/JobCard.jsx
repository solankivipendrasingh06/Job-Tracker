import { Building2, Calendar, Pencil, Trash2 } from 'lucide-react';

const JobCard = ({ job, onEdit, onDelete }) => {
  const statusColors = {
    Applied: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
    Interview: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
    Offer: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
    Rejected: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 p-5 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
            {job.position}
          </h3>
          <div className="flex items-center text-gray-600 dark:text-gray-400 mt-1">
            <Building2 className="h-4 w-4 mr-1" />
            <span className="font-medium">{job.company}</span>
          </div>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            statusColors[job.status]
          }`}
        >
          {job.status}
        </span>
      </div>

      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
        <Calendar className="h-4 w-4 mr-1" />
        Applied: {formatDate(job.dateApplied)}
      </div>

      {job.notes && (
        <div className="mb-4">
          <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
            {job.notes}
          </p>
        </div>
      )}

      <div className="flex justify-end space-x-2 mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
        <button
          onClick={() => onEdit(job)}
          className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-md transition-colors"
          aria-label="Edit job"
        >
          <Pencil className="h-4 w-4" />
        </button>
        <button
          onClick={() => onDelete(job._id)}
          className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors"
          aria-label="Delete job"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default JobCard;
