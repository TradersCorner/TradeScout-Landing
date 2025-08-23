import { MapPin, Phone, Mail, Award, Star } from "lucide-react";
import TrustScore from "./trust-score";

interface ContractorProfileCardProps {
  contractor: {
    id: string;
    name: string;
    email: string;
    phone?: string;
    specialties: string[];
    state: string;
    city?: string;
    licenseNumber?: string;
    insuranceVerified: boolean;
    backgroundCheckPassed: boolean;
    yearsExperience: number;
    completedProjects: number;
    averageRating: number;
    trustScore: number;
    verificationStatus: string;
    profileImage?: string;
    bio?: string;
  };
  compact?: boolean;
}

export default function ContractorProfileCard({ contractor, compact = false }: ContractorProfileCardProps) {
  const {
    name,
    email,
    phone,
    specialties,
    state,
    city,
    licenseNumber,
    insuranceVerified,
    backgroundCheckPassed,
    yearsExperience,
    completedProjects,
    averageRating,
    trustScore,
    verificationStatus,
    profileImage,
    bio
  } = contractor;

  if (compact) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 hover:shadow-lg transition-shadow">
        <div className="flex items-start gap-4">
          {/* Profile Image */}
          <div className="w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center overflow-hidden">
            {profileImage ? (
              <img src={profileImage} alt={name} className="w-full h-full object-cover" />
            ) : (
              <div className="text-xl font-bold text-gray-500">
                {name.split(' ').map(n => n[0]).join('').toUpperCase()}
              </div>
            )}
          </div>

          {/* Main Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white truncate">
                {name}
              </h3>
              {verificationStatus === 'verified' && (
                <Award className="w-4 h-4 text-blue-500" />
              )}
            </div>
            
            <div className="flex items-center gap-1 mb-2">
              <MapPin className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {city ? `${city}, ${state}` : state}
              </span>
            </div>

            <div className="flex flex-wrap gap-1 mb-3">
              {specialties.slice(0, 3).map((specialty, index) => (
                <span 
                  key={index}
                  className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs rounded-full"
                >
                  {specialty}
                </span>
              ))}
              {specialties.length > 3 && (
                <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded-full">
                  +{specialties.length - 3} more
                </span>
              )}
            </div>

            <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-500" />
                <span>{averageRating > 0 ? averageRating.toFixed(1) : 'New'}</span>
              </div>
              <span>•</span>
              <span>{completedProjects} projects</span>
              <span>•</span>
              <span>{yearsExperience}+ years</span>
            </div>
          </div>

          {/* Trust Score */}
          <div className="flex-shrink-0">
            <TrustScore
              score={trustScore}
              verificationStatus={verificationStatus}
              insuranceVerified={insuranceVerified}
              backgroundCheckPassed={backgroundCheckPassed}
              yearsExperience={yearsExperience}
              completedProjects={completedProjects}
              averageRating={averageRating}
              size="sm"
              showDetails={false}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-shadow">
      {/* Header */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-start gap-4">
          {/* Profile Image */}
          <div className="w-20 h-20 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center overflow-hidden">
            {profileImage ? (
              <img src={profileImage} alt={name} className="w-full h-full object-cover" />
            ) : (
              <div className="text-2xl font-bold text-gray-500">
                {name.split(' ').map(n => n[0]).join('').toUpperCase()}
              </div>
            )}
          </div>

          {/* Basic Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white truncate">
                {name}
              </h2>
              {verificationStatus === 'verified' && (
                <Award className="w-6 h-6 text-blue-500" />
              )}
            </div>
            
            <div className="flex items-center gap-2 mb-3">
              <MapPin className="w-5 h-5 text-gray-500" />
              <span className="text-gray-600 dark:text-gray-400">
                {city ? `${city}, ${state}` : state}
              </span>
            </div>

            <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-1">
                <Star className="w-5 h-5 text-yellow-500" />
                <span className="font-medium">
                  {averageRating > 0 ? averageRating.toFixed(1) : 'New Contractor'}
                </span>
              </div>
              <span>•</span>
              <span>{completedProjects} completed projects</span>
              <span>•</span>
              <span>{yearsExperience}+ years experience</span>
            </div>
          </div>
        </div>

        {/* Specialties */}
        <div className="mt-4">
          <div className="flex flex-wrap gap-2">
            {specialties.map((specialty, index) => (
              <span 
                key={index}
                className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm rounded-full font-medium"
              >
                {specialty}
              </span>
            ))}
          </div>
        </div>

        {/* Bio */}
        {bio && (
          <div className="mt-4">
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              {bio}
            </p>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Contact Information
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gray-500" />
                <span className="text-gray-600 dark:text-gray-400">{email}</span>
              </div>
              {phone && (
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-gray-500" />
                  <span className="text-gray-600 dark:text-gray-400">{phone}</span>
                </div>
              )}
              {licenseNumber && (
                <div className="flex items-center gap-3">
                  <Award className="w-5 h-5 text-gray-500" />
                  <span className="text-gray-600 dark:text-gray-400">
                    License: {licenseNumber}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Trust Score */}
          <div>
            <TrustScore
              score={trustScore}
              verificationStatus={verificationStatus}
              insuranceVerified={insuranceVerified}
              backgroundCheckPassed={backgroundCheckPassed}
              yearsExperience={yearsExperience}
              completedProjects={completedProjects}
              averageRating={averageRating}
              size="md"
              showDetails={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
}