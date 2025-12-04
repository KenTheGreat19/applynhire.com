import { Link } from 'react-router-dom';
import type { JobListItem } from '../types';
import { formatDistanceToNow } from 'date-fns';
import { 
  MapPinIcon, 
  BriefcaseIcon, 
  CurrencyDollarIcon,
  StarIcon 
} from '@heroicons/react/24/outline';
import clsx from 'clsx';

interface JobCardProps {
  job: JobListItem;
}

export default function JobCard({ job }: JobCardProps) {
  const formatSalary = () => {
    if (!job.salary?.min_amount && !job.salary?.max_amount) return null;
    
    const currency = job.salary.currency || 'USD';
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      maximumFractionDigits: 0,
    });

    if (job.salary.min_amount && job.salary.max_amount) {
      return `${formatter.format(job.salary.min_amount)} - ${formatter.format(job.salary.max_amount)}`;
    }
    if (job.salary.min_amount) {
      return `From ${formatter.format(job.salary.min_amount)}`;
    }
    return `Up to ${formatter.format(job.salary.max_amount!)}`;
  };

  const formatJobType = (type?: string) => {
    if (!type) return null;
    return type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  return (
    <Link to={`/jobs/${job.id}`}>
      <div className={clsx(
        'card p-6 hover:shadow-md transition-shadow cursor-pointer',
        job.is_featured && 'ring-2 ring-primary-500 ring-opacity-50'
      )}>
        {job.is_featured && (
          <div className="flex items-center gap-1 text-yellow-600 mb-2">
            <StarIcon className="h-4 w-4 fill-current" />
            <span className="text-xs font-medium">Featured</span>
          </div>
        )}

        <div className="flex items-start gap-4">
          {/* Company Logo */}
          <div className="flex-shrink-0 w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
            {job.company.logo ? (
              <img 
                src={job.company.logo} 
                alt={job.company.name}
                className="w-10 h-10 object-contain rounded"
              />
            ) : (
              <span className="text-xl font-bold text-gray-400">
                {job.company.name.charAt(0)}
              </span>
            )}
          </div>

          {/* Job Info */}
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-gray-900 truncate">
              {job.title}
            </h3>
            <p className="text-gray-600 mt-1">{job.company.name}</p>

            {/* Meta info */}
            <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-gray-500">
              {job.location && (
                <div className="flex items-center gap-1">
                  <MapPinIcon className="h-4 w-4" />
                  <span>
                    {job.is_remote ? 'Remote' : job.location.city}
                    {job.location.state && !job.is_remote && `, ${job.location.state}`}
                  </span>
                </div>
              )}

              {job.job_type && (
                <div className="flex items-center gap-1">
                  <BriefcaseIcon className="h-4 w-4" />
                  <span>{formatJobType(job.job_type)}</span>
                </div>
              )}

              {formatSalary() && (
                <div className="flex items-center gap-1">
                  <CurrencyDollarIcon className="h-4 w-4" />
                  <span>{formatSalary()}</span>
                </div>
              )}
            </div>

            {/* Posted time */}
            {job.posted_at && (
              <p className="text-xs text-gray-400 mt-3">
                Posted {formatDistanceToNow(new Date(job.posted_at), { addSuffix: true })}
              </p>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
