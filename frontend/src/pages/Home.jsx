import { Link } from 'react-router-dom';
import { Briefcase, BarChart2, CheckCircle } from 'lucide-react';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
      <div className="mb-8 p-4 bg-blue-100 dark:bg-blue-900/30 rounded-full inline-block">
        <Briefcase className="h-16 w-16 text-blue-600 dark:text-blue-400" />
      </div>
      
      <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white mb-6">
        Track Your Job Applications <span className="text-blue-600 dark:text-blue-400">Effortlessly</span>
      </h1>
      
      <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mb-10">
        Stay organized in your job search. Keep all your applications, interview dates, and offers in one centralized dashboard.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4 mb-16">
        <Link
          to="/register"
          className="px-8 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
        >
          Get Started
        </Link>
        <Link
          to="/login"
          className="px-8 py-3 bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 font-bold rounded-lg border border-blue-200 dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors"
        >
          Login
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
        <FeatureCard 
          icon={<Briefcase className="h-8 w-8 text-blue-500" />}
          title="Organize Everything"
          description="Keep all your job applications in one place. No more messy spreadsheets."
        />
        <FeatureCard 
          icon={<BarChart2 className="h-8 w-8 text-green-500" />}
          title="Track Progress"
          description="Visual dashboard to see your application statuses at a glance."
        />
        <FeatureCard 
          icon={<CheckCircle className="h-8 w-8 text-purple-500" />}
          title="Stay Prepared"
          description="Never miss an interview. Add notes to remember key details."
        />
      </div>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col items-center text-center hover:shadow-md transition-shadow">
    <div className="mb-4 bg-gray-50 dark:bg-gray-700 p-3 rounded-full">
      {icon}
    </div>
    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{title}</h3>
    <p className="text-gray-600 dark:text-gray-400">{description}</p>
  </div>
);

export default Home;
