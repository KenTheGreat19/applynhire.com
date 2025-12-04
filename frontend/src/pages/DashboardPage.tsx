import { useQuery } from '@tanstack/react-query';
import { jobsApi } from '../services/api';
import { useAuthStore } from '../store/authStore';
import { Link } from 'react-router-dom';
import { 
  BriefcaseIcon, 
  BookmarkIcon, 
  DocumentTextIcon,
  UserCircleIcon 
} from '@heroicons/react/24/outline';

export default function DashboardPage() {
  const { user } = useAuthStore();

  const { data: applications } = useQuery({
    queryKey: ['userApplications'],
    queryFn: () => jobsApi.getUserApplications(),
  });

  const { data: savedJobs } = useQuery({
    queryKey: ['userSavedJobs'],
    queryFn: () => jobsApi.getUserSavedJobs(),
  });

  const stats = [
    {
      name: 'Applications',
      value: applications?.length || 0,
      icon: DocumentTextIcon,
      color: 'bg-blue-500',
    },
    {
      name: 'Saved Jobs',
      value: savedJobs?.length || 0,
      icon: BookmarkIcon,
      color: 'bg-green-500',
    },
    {
      name: 'Interviews',
      value: applications?.filter((a) => a.status === 'interviewing').length || 0,
      icon: BriefcaseIcon,
      color: 'bg-purple-500',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'badge-gray';
      case 'reviewed':
        return 'badge-primary';
      case 'interviewing':
        return 'bg-purple-100 text-purple-800';
      case 'offered':
        return 'badge-green';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'badge-gray';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Welcome back, {user?.username}!
          </h1>
          <p className="text-gray-600 mt-1">
            Here's an overview of your job search activity.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat) => (
            <div key={stat.name} className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center gap-4">
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">{stat.name}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Applications */}
          <div className="bg-white rounded-xl shadow-sm">
            <div className="p-6 border-b">
              <h2 className="text-lg font-semibold text-gray-900">
                Recent Applications
              </h2>
            </div>
            <div className="divide-y">
              {applications && applications.length > 0 ? (
                applications.slice(0, 5).map((application) => (
                  <div key={application.id} className="p-4 hover:bg-gray-50">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-gray-900">
                          Job #{application.job_id.slice(0, 8)}
                        </p>
                        <p className="text-sm text-gray-500">
                          Applied {new Date(application.applied_at).toLocaleDateString()}
                        </p>
                      </div>
                      <span className={`badge ${getStatusColor(application.status)}`}>
                        {application.status}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center text-gray-500">
                  <DocumentTextIcon className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>No applications yet</p>
                  <Link to="/jobs" className="text-primary-600 hover:underline mt-2 inline-block">
                    Start applying to jobs
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Saved Jobs */}
          <div className="bg-white rounded-xl shadow-sm">
            <div className="p-6 border-b">
              <h2 className="text-lg font-semibold text-gray-900">Saved Jobs</h2>
            </div>
            <div className="divide-y">
              {savedJobs && savedJobs.length > 0 ? (
                savedJobs.slice(0, 5).map((saved) => (
                  <div key={saved.id} className="p-4 hover:bg-gray-50">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium text-gray-900">
                          Job #{saved.job_id.slice(0, 8)}
                        </p>
                        <p className="text-sm text-gray-500">
                          Saved {new Date(saved.saved_at).toLocaleDateString()}
                        </p>
                      </div>
                      <Link
                        to={`/jobs/${saved.job_id}`}
                        className="text-primary-600 hover:text-primary-700 text-sm"
                      >
                        View →
                      </Link>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center text-gray-500">
                  <BookmarkIcon className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>No saved jobs</p>
                  <Link to="/jobs" className="text-primary-600 hover:underline mt-2 inline-block">
                    Browse jobs
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Profile Card */}
        <div className="mt-8 bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.username}
                  className="w-16 h-16 rounded-full object-cover"
                />
              ) : (
                <UserCircleIcon className="h-12 w-12 text-gray-400" />
              )}
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900">{user?.username}</h3>
              <p className="text-gray-600">{user?.email}</p>
              <span className="badge-primary mt-1">{user?.role}</span>
            </div>
            <button className="btn-secondary">Edit Profile</button>
          </div>
        </div>
      </div>
    </div>
  );
}
