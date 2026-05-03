import { createContext, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';
import { toast } from 'react-toastify';

export const JobContext = createContext();

const API_URL = import.meta.env.VITE_API_URL + '/api/jobs/';

export const JobProvider = ({ children }) => {
  const [jobs, setJobs] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);

  const getAuthConfig = () => {
    return {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
  };

  const getJobs = async () => {
    setLoading(true);
    try {
      const response = await axios.get(API_URL, getAuthConfig());
      setJobs(response.data);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error fetching jobs');
    }
    setLoading(false);
  };

  const getStats = async () => {
    try {
      const response = await axios.get(API_URL + 'stats', getAuthConfig());
      setStats(response.data);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error fetching stats');
    }
  };

  const addJob = async (jobData) => {
    try {
      const response = await axios.post(API_URL, jobData, getAuthConfig());
      setJobs([response.data, ...jobs]);
      getStats();
      toast.success('Job added successfully');
      return true;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error adding job');
      return false;
    }
  };

  const updateJob = async (id, jobData) => {
    try {
      const response = await axios.put(API_URL + id, jobData, getAuthConfig());
      setJobs(jobs.map((job) => (job._id === id ? response.data : job)));
      getStats();
      toast.success('Job updated successfully');
      return true;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error updating job');
      return false;
    }
  };

  const deleteJob = async (id) => {
    try {
      await axios.delete(API_URL + id, getAuthConfig());
      setJobs(jobs.filter((job) => job._id !== id));
      getStats();
      toast.success('Job deleted');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error deleting job');
    }
  };

  return (
    <JobContext.Provider
      value={{ jobs, stats, loading, getJobs, getStats, addJob, updateJob, deleteJob }}
    >
      {children}
    </JobContext.Provider>
  );
};
