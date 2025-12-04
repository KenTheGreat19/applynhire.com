import { useState } from 'react';
import { MagnifyingGlassIcon, MapPinIcon } from '@heroicons/react/24/outline';

interface SearchBarProps {
  onSearch: (params: { search: string; location: string }) => void;
  initialSearch?: string;
  initialLocation?: string;
}

export default function SearchBar({ onSearch, initialSearch = '', initialLocation = '' }: SearchBarProps) {
  const [search, setSearch] = useState(initialSearch);
  const [location, setLocation] = useState(initialLocation);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({ search, location });
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex flex-col md:flex-row gap-3">
        {/* Search input */}
        <div className="relative flex-1">
          <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Job title, keywords, or company"
            className="input pl-12"
          />
        </div>

        {/* Location input */}
        <div className="relative md:w-64">
          <MapPinIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="City or remote"
            className="input pl-12"
          />
        </div>

        {/* Search button */}
        <button type="submit" className="btn-primary md:px-8">
          Search Jobs
        </button>
      </div>
    </form>
  );
}
