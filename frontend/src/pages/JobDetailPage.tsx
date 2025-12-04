import { useParams, Link } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import { jobsApi } from '../services/api';
import { useAuthStore } from '../store/authStore';
import { formatDistanceToNow } from 'date-fns';
import toast from 'react-hot-toast';
import {
  MapPinIcon,
  BriefcaseIcon,
  CurrencyDollarIcon,
  ClockIcon,
  BuildingOfficeIcon,
  BookmarkIcon,
  ArrowLeftIcon,
  GlobeAltIcon,
} from '@heroicons/react/24/outline';
import { BookmarkIcon as BookmarkSolidIcon } from '@heroicons/react/24/solid';

export default function JobDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { isAuthenticated } = useAuthStore();

  const { data: job, isLoading, error } = useQuery({
    queryKey: ['job', id],
    queryFn: () => jobsApi.getJob(id!),
    enabled: !!id,
  });

  const applyMutation = useMutation({
    mutationFn: () => jobsApi.applyToJob(id!, {}),
    onSuccess: () => {
      toast.success('Application submitted successfully!');
    },
    onError: () => {
      toast.error('Failed to apply. Please try again.');
    },
  });

  const saveMutation = useMutation({
    mutationFn: () => jobsApi.toggleSaveJob(id!),
    onSuccess: () => {
      toast.success('Job saved!');
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="bg-white rounded-xl p-8">
              <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-6 bg-gray-200 rounded w-1/2 mb-8"></div>
              <div className="space-y-4">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Job not found</h2>
          <Link to="/jobs" className="btn-primary">
            Back to Jobs
          </Link>
        </div>
      </div>
    );
  }

  const formatSalary = () => {
    if (!job.salary?.min_amount && !job.salary?.max_amount) return null;

    const currency = job.salary.currency || 'USD';
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      maximumFractionDigits: 0,
    });

    const period = job.salary.period ? ` / ${job.salary.period}` : '';

    if (job.salary.min_amount && job.salary.max_amount) {
      return `${formatter.format(job.salary.min_amount)} - ${formatter.format(job.salary.max_amount)}${period}`;
    }
    if (job.salary.min_amount) {
      return `From ${formatter.format(job.salary.min_amount)}${period}`;
    }
    return `Up to ${formatter.format(job.salary.max_amount!)}${period}`;
  };

  const formatJobType = (type?: string) => {
    if (!type) return null;
    return type.replace('_', ' ').replace(/\b\w/g, (l) => l.toUpperCase());
  };

  const handleApply = () => {
    if (!isAuthenticated) {
      toast.error('Please login to apply');
      return;
    }
    
    if (job.apply_url) {
      window.open(job.apply_url, '_blank');
    } else {
      applyMutation.mutate();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Back button */}
        <Link
          to="/jobs"
          className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2" />
          Back to Jobs
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm p-6 md:p-8">
              {/* Header */}
              <div className="flex items-start gap-4 mb-6">
                <div className="flex-shrink-0 w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                  {job.company.logo ? (
                    <img
                      src={job.company.logo}
                      alt={job.company.name}
                      className="w-14 h-14 object-contain rounded"
                    />
                  ) : (
                    <span className="text-2xl font-bold text-gray-400">
                      {job.company.name.charAt(0)}
                    </span>
                  )}
                </div>
                <div className="flex-1">
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                    {job.title}
                  </h1>
                  <p className="text-lg text-gray-600 mt-1">{job.company.name}</p>
                </div>
              </div>

              {/* Meta info */}
              <div className="flex flex-wrap gap-4 mb-8 text-gray-600">
                {job.location && (
                  <div className="flex items-center gap-2">
                    <MapPinIcon className="h-5 w-5" />
                    <span>
                      {job.location.is_remote
                        ? 'Remote'
                        : `${job.location.city}${job.location.state ? `, ${job.location.state}` : ''}`}
                    </span>
                  </div>
                )}
                {job.job_type && (
                  <div className="flex items-center gap-2">
                    <BriefcaseIcon className="h-5 w-5" />
                    <span>{formatJobType(job.job_type)}</span>
                  </div>
                )}
                {formatSalary() && (
                  <div className="flex items-center gap-2">
                    <CurrencyDollarIcon className="h-5 w-5" />
                    <span>{formatSalary()}</span>
                  </div>
                )}
                {job.posted_at && (
                  <div className="flex items-center gap-2">
                    <ClockIcon className="h-5 w-5" />
                    <span>
                      Posted{' '}
                      {formatDistanceToNow(new Date(job.posted_at), {
                        addSuffix: true,
                      })}
                    </span>
                  </div>
                )}
              </div>

              {/* Description */}
              <div className="prose max-w-none">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Job Description
                </h2>
                {job.description_html ? (
                  <div
                    dangerouslySetInnerHTML={{ __html: job.description_html }}
                    className="text-gray-700"
                  />
                ) : (
                  <p className="text-gray-700 whitespace-pre-wrap">{job.description}</p>
                )}
              </div>

              {/* Requirements */}
              {job.requirements && job.requirements.length > 0 && (
                <div className="mt-8">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    Requirements
                  </h2>
                  <ul className="list-disc list-inside space-y-2 text-gray-700">
                    {job.requirements.map((req, index) => (
                      <li key={index}>{req}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Skills */}
              {job.skills && job.skills.length > 0 && (
                <div className="mt-8">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Skills</h2>
                  <div className="flex flex-wrap gap-2">
                    {job.skills.map((skill, index) => (
                      <span key={index} className="badge-primary">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Benefits */}
              {job.benefits && job.benefits.length > 0 && (
                <div className="mt-8">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Benefits</h2>
                  <ul className="list-disc list-inside space-y-2 text-gray-700">
                    {job.benefits.map((benefit, index) => (
                      <li key={index}>{benefit}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
              {/* Apply buttons */}
              <div className="space-y-3 mb-6">
                <button
                  onClick={handleApply}
                  disabled={applyMutation.isPending}
                  className="btn-primary w-full py-3"
                >
                  {applyMutation.isPending ? 'Applying...' : 'Apply Now'}
                </button>
                <button
                  onClick={() => {
                    if (!isAuthenticated) {
                      toast.error('Please login to save jobs');
                      return;
                    }
                    saveMutation.mutate();
                  }}
                  className="btn-secondary w-full py-3 flex items-center justify-center gap-2"
                >
                  <BookmarkIcon className="h-5 w-5" />
                  Save Job
                </button>
              </div>

              {/* Company info */}
              <div className="border-t pt-6">
                <h3 className="font-semibold text-gray-900 mb-4">About the Company</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <BuildingOfficeIcon className="h-5 w-5" />
                    <span>{job.company.name}</span>
                  </div>
                  {job.company.industry && (
                    <div className="flex items-center gap-2 text-gray-600">
                      <BriefcaseIcon className="h-5 w-5" />
                      <span>{job.company.industry}</span>
                    </div>
                  )}
                  {job.company.size && (
                    <div className="flex items-center gap-2 text-gray-600">
                      <span className="text-gray-500">Size:</span>
                      <span>{job.company.size}</span>
                    </div>
                  )}
                  {job.company.website && (
                    <a
                      href={job.company.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-primary-600 hover:text-primary-700"
                    >
                      <GlobeAltIcon className="h-5 w-5" />
                      <span>Visit Website</span>
                    </a>
                  )}
                </div>
                {job.company.description && (
                  <p className="mt-4 text-sm text-gray-600">{job.company.description}</p>
                )}
              </div>

              {/* Source info */}
              <div className="border-t pt-6 mt-6 text-sm text-gray-500">
                <p>Source: {job.source}</p>
                <p>{job.views_count} views • {job.applications_count} applications</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
