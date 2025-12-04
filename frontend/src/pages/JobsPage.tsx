import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { jobsApi } from '../services/api';
import SearchBar from '../components/SearchBar';
import JobCard from '../components/JobCard';
import { FunnelIcon, XMarkIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

export default function JobsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);

  // Get current filters from URL
  const filters = {
    search: searchParams.get('search') || '',
    location: searchParams.get('location') || '',
    job_type: searchParams.get('job_type') || '',
    experience: searchParams.get('experience') || '',
    remote: searchParams.get('remote') === 'true',
    page: parseInt(searchParams.get('page') || '1'),
  };

  // Fetch jobs
  const { data, isLoading, error } = useQuery({
    queryKey: ['jobs', filters],
    queryFn: () => jobsApi.getJobs({
      search: filters.search || undefined,
      location: filters.location || undefined,
      job_type: filters.job_type || undefined,
      experience: filters.experience || undefined,
      remote: filters.remote || undefined,
      page: filters.page,
      page_size: 20,
    }),
  });

  const handleSearch = (params: { search: string; location: string }) => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      if (params.search) {
        newParams.set('search', params.search);
      } else {
        newParams.delete('search');
      }
      if (params.location) {
        newParams.set('location', params.location);
      } else {
        newParams.delete('location');
      }
      newParams.set('page', '1');
      return newParams;
    });
  };

  const handleFilterChange = (key: string, value: string | boolean) => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      if (value) {
        newParams.set(key, String(value));
      } else {
        newParams.delete(key);
      }
      newParams.set('page', '1');
      return newParams;
    });
  };

  const clearFilters = () => {
    setSearchParams({});
  };

  const handlePageChange = (newPage: number) => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      newParams.set('page', String(newPage));
      return newParams;
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const jobTypes = [
    { value: 'full_time', label: 'Full Time' },
    { value: 'part_time', label: 'Part Time' },
    { value: 'contract', label: 'Contract' },
    { value: 'internship', label: 'Internship' },
    { value: 'freelance', label: 'Freelance' },
  ];

  const experienceLevels = [
    { value: 'entry', label: 'Entry Level' },
    { value: 'mid', label: 'Mid Level' },
    { value: 'senior', label: 'Senior' },
    { value: 'lead', label: 'Lead' },
    { value: 'executive', label: 'Executive' },
  ];

  const hasActiveFilters = filters.job_type || filters.experience || filters.remote;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Search Header */}
      <div className="bg-white border-b sticky top-16 z-40">
        <div className="container mx-auto px-4 py-4">
          <SearchBar 
            onSearch={handleSearch}
            initialSearch={filters.search}
            initialLocation={filters.location}
          />
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className={clsx(
            'lg:w-64 flex-shrink-0',
            showFilters ? 'block' : 'hidden lg:block'
          )}>
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-32">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-gray-900">Filters</h3>
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="text-sm text-primary-600 hover:text-primary-700"
                  >
                    Clear all
                  </button>
                )}
              </div>

              {/* Remote Toggle */}
              <div className="mb-6">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.remote}
                    onChange={(e) => handleFilterChange('remote', e.target.checked)}
                    className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                  />
                  <span className="ml-2 text-gray-700">Remote only</span>
                </label>
              </div>

              {/* Job Type */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3">Job Type</h4>
                <div className="space-y-2">
                  {jobTypes.map((type) => (
                    <label key={type.value} className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="job_type"
                        checked={filters.job_type === type.value}
                        onChange={() => handleFilterChange('job_type', type.value)}
                        className="h-4 w-4 text-primary-600 border-gray-300 focus:ring-primary-500"
                      />
                      <span className="ml-2 text-gray-700">{type.label}</span>
                    </label>
                  ))}
                </div>
                {filters.job_type && (
                  <button
                    onClick={() => handleFilterChange('job_type', '')}
                    className="text-xs text-gray-500 hover:text-gray-700 mt-2"
                  >
                    Clear
                  </button>
                )}
              </div>

              {/* Experience Level */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3">Experience Level</h4>
                <div className="space-y-2">
                  {experienceLevels.map((level) => (
                    <label key={level.value} className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="experience"
                        checked={filters.experience === level.value}
                        onChange={() => handleFilterChange('experience', level.value)}
                        className="h-4 w-4 text-primary-600 border-gray-300 focus:ring-primary-500"
                      />
                      <span className="ml-2 text-gray-700">{level.label}</span>
                    </label>
                  ))}
                </div>
                {filters.experience && (
                  <button
                    onClick={() => handleFilterChange('experience', '')}
                    className="text-xs text-gray-500 hover:text-gray-700 mt-2"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>
          </aside>

          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="lg:hidden fixed bottom-4 right-4 bg-primary-600 text-white p-4 rounded-full shadow-lg z-50"
          >
            {showFilters ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <FunnelIcon className="h-6 w-6" />
            )}
          </button>

          {/* Job Listings */}
          <div className="flex-1">
            {/* Results count */}
            <div className="mb-4 text-gray-600">
              {data ? (
                <span>{data.count} jobs found</span>
              ) : (
                <span>Loading...</span>
              )}
            </div>

            {/* Loading state */}
            {isLoading && (
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="card p-6 animate-pulse">
                    <div className="flex gap-4">
                      <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
                      <div className="flex-1">
                        <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2 mb-3"></div>
                        <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Error state */}
            {error && (
              <div className="text-center py-12">
                <p className="text-red-600">Failed to load jobs. Please try again.</p>
              </div>
            )}

            {/* Job cards */}
            {data && (
              <>
                <div className="space-y-4">
                  {data.results.map((job) => (
                    <JobCard key={job.id} job={job} />
                  ))}
                </div>

                {data.results.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-gray-600">No jobs found matching your criteria.</p>
                    <button
                      onClick={clearFilters}
                      className="mt-4 text-primary-600 hover:text-primary-700"
                    >
                      Clear filters
                    </button>
                  </div>
                )}

                {/* Pagination */}
                {data.total_pages > 1 && (
                  <div className="mt-8 flex justify-center gap-2">
                    <button
                      onClick={() => handlePageChange(filters.page - 1)}
                      disabled={filters.page <= 1}
                      className="btn-secondary disabled:opacity-50"
                    >
                      Previous
                    </button>
                    <span className="flex items-center px-4 text-gray-600">
                      Page {filters.page} of {data.total_pages}
                    </span>
                    <button
                      onClick={() => handlePageChange(filters.page + 1)}
                      disabled={filters.page >= data.total_pages}
                      className="btn-secondary disabled:opacity-50"
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
