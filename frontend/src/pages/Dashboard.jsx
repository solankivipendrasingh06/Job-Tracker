import { useEffect, useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { JobContext } from '../context/JobContext';
import JobCard from '../components/JobCard';
import JobModal from '../components/JobModal';
import StatsCard from '../components/StatsCard';
import { Plus, Briefcase, CheckCircle, XCircle, Clock } from 'lucide-react';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const { jobs, stats, loading, getJobs, getStats, addJob, updateJob, deleteJob } = useContext(JobContext);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    if (user) {
      getJobs();
      getStats();
    }
  }, [user]);

  const handleOpenModal = (job = null) => {
    setEditingJob(job);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingJob(null);
  };

  const handleSubmitJob = async (jobData) => {
    let success = false;
    if (editingJob) {
      success = await updateJob(editingJob._id, jobData);
    } else {
      success = await addJob(jobData);
    }

    if (success) {
      handleCloseModal();
    }
  };

  const handleDeleteJob = async (id) => {
    if (window.confirm('Are you sure you want to delete this job?')) {
      await deleteJob(id);
    }
  };

  const filteredJobs = filter === 'All' ? jobs : jobs.filter((job) => job.status === filter);

  if (loading) {
    return <div className="text-center py-20 text-xl font-medium dark:text-white">Loading...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Welcome back, {user?.name}</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium flex items-center transition-colors shadow-sm"
        >
          <Plus className="h-5 w-5 mr-1" /> Add Job
        </button>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatsCard 
          title="Total Applications" 
          count={stats?.total} 
          icon={<Briefcase className="h-6 w-6 text-blue-600 dark:text-blue-400" />} 
          color="bg-blue-100 dark:bg-blue-900/30" 
        />
        <StatsCard 
          title="Interviews" 
          count={stats?.Interview} 
          icon={<Clock className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />} 
          color="bg-yellow-100 dark:bg-yellow-900/30" 
        />
        <StatsCard 
          title="Offers" 
          count={stats?.Offer} 
          icon={<CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />} 
          color="bg-green-100 dark:bg-green-900/30" 
        />
        <StatsCard 
          title="Rejected" 
          count={stats?.Rejected} 
          icon={<XCircle className="h-6 w-6 text-red-600 dark:text-red-400" />} 
          color="bg-red-100 dark:bg-red-900/30" 
        />
      </div>

      {/* Filter Section */}
      <div className="mb-6 flex items-center space-x-2 overflow-x-auto pb-2">
        {['All', 'Applied', 'Interview', 'Offer', 'Rejected'].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              filter === status
                ? 'bg-gray-800 text-white dark:bg-gray-200 dark:text-gray-900'
                : 'bg-white text-gray-600 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Jobs Grid */}
      {filteredJobs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredJobs.map((job) => (
            <JobCard
              key={job._id}
              job={job}
              onEdit={handleOpenModal}
              onDelete={handleDeleteJob}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700">
          <Briefcase className="h-12 w-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">No jobs found</h3>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            {filter === 'All' ? "You haven't added any job applications yet." : `No jobs with status '${filter}'.`}
          </p>
        </div>
      )}

      {/* Modal */}
      <JobModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmitJob}
        editingJob={editingJob}
      />
    </div>
  );
};

export default Dashboard;
