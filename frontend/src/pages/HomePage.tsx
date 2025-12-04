import { Link, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { jobsApi } from '../services/api';
import SearchBar from '../components/SearchBar';
import JobCard from '../components/JobCard';
import { 
  BriefcaseIcon, 
  UserGroupIcon, 
  BuildingOfficeIcon,
  ChartBarIcon 
} from '@heroicons/react/24/outline';

export default function HomePage() {
  const navigate = useNavigate();

  const { data: featuredJobs, isLoading } = useQuery({
    queryKey: ['featuredJobs'],
    queryFn: () => jobsApi.getFeaturedJobs(6),
  });

  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: () => jobsApi.getCategories(),
  });

  const handleSearch = (params: { search: string; location: string }) => {
    const searchParams = new URLSearchParams();
    if (params.search) searchParams.set('search', params.search);
    if (params.location) searchParams.set('location', params.location);
    navigate(`/jobs?${searchParams.toString()}`);
  };

  const stats = [
    { icon: BriefcaseIcon, value: '50,000+', label: 'Active Jobs' },
    { icon: BuildingOfficeIcon, value: '10,000+', label: 'Companies' },
    { icon: UserGroupIcon, value: '1M+', label: 'Job Seekers' },
    { icon: ChartBarIcon, value: '95%', label: 'Success Rate' },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Find Your Dream Job Today
            </h1>
            <p className="text-xl text-primary-100 mb-8">
              Discover thousands of job opportunities from top companies. 
              Our intelligent aggregator brings you the best matches.
            </p>
            <div className="bg-white p-4 rounded-xl shadow-lg">
              <SearchBar onSearch={handleSearch} />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white border-b">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <stat.icon className="h-10 w-10 mx-auto text-primary-600 mb-3" />
                <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Jobs Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              Featured Jobs
            </h2>
            <Link to="/jobs" className="text-primary-600 hover:text-primary-700 font-medium">
              View all jobs →
            </Link>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="card p-6 animate-pulse">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
                    <div className="flex-1">
                      <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredJobs?.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Categories Section */}
      {categories && categories.length > 0 && (
        <section className="py-16 bg-gray-100">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
              Browse by Category
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {categories.slice(0, 8).map((category) => (
                <Link
                  key={category.name}
                  to={`/jobs?category=${encodeURIComponent(category.name)}`}
                  className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow text-center"
                >
                  <h3 className="font-semibold text-gray-900">{category.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {category.count} jobs
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 bg-primary-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Ready to Find Your Next Opportunity?
          </h2>
          <p className="text-primary-100 mb-8 max-w-2xl mx-auto">
            Create an account to save jobs, track applications, and get personalized recommendations.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              to="/register" 
              className="inline-flex items-center justify-center px-6 py-3 bg-white text-primary-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              Create Free Account
            </Link>
            <Link 
              to="/jobs" 
              className="inline-flex items-center justify-center px-6 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors"
            >
              Browse Jobs
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
