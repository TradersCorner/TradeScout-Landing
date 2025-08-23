import { Shield, CheckCircle, Star, Award } from "lucide-react";

interface TrustScoreProps {
  score: number;
  verificationStatus: string;
  insuranceVerified: boolean;
  backgroundCheckPassed: boolean;
  yearsExperience: number;
  completedProjects: number;
  averageRating: number;
  size?: 'sm' | 'md' | 'lg';
  showDetails?: boolean;
}

export default function TrustScore({
  score,
  verificationStatus,
  insuranceVerified,
  backgroundCheckPassed,
  yearsExperience,
  completedProjects,
  averageRating,
  size = 'md',
  showDetails = true
}: TrustScoreProps) {
  const getScoreColor = (score: number) => {
    if (score >= 90) return "#22c55e"; // Green
    if (score >= 80) return "#3b82f6"; // Blue
    if (score >= 70) return "#f59e0b"; // Orange
    if (score >= 60) return "#ef4444"; // Red
    return "#6b7280"; // Gray
  };

  const getScoreText = (score: number) => {
    if (score >= 90) return "Excellent";
    if (score >= 80) return "Very Good";
    if (score >= 70) return "Good";
    if (score >= 60) return "Fair";
    return "Building";
  };

  const scoreColor = getScoreColor(score);
  const scoreText = getScoreText(score);
  
  const radius = size === 'sm' ? 35 : size === 'lg' ? 55 : 45;
  const strokeWidth = size === 'sm' ? 6 : size === 'lg' ? 10 : 8;
  const normalizedRadius = radius - strokeWidth * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDasharray = `${(score / 100) * circumference} ${circumference}`;

  const containerSize = size === 'sm' ? 'w-20 h-20' : size === 'lg' ? 'w-28 h-28' : 'w-24 h-24';
  const textSize = size === 'sm' ? 'text-xs' : size === 'lg' ? 'text-lg' : 'text-sm';
  const scoreSize = size === 'sm' ? 'text-sm' : size === 'lg' ? 'text-xl' : 'text-lg';

  return (
    <div className={`flex flex-col items-center gap-4 ${showDetails ? 'p-6' : 'p-2'} bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700`}>
      {/* Trust Score Circle */}
      <div className="relative flex items-center justify-center">
        <svg
          className={containerSize}
          viewBox={`0 0 ${radius * 2} ${radius * 2}`}
        >
          {/* Background circle */}
          <circle
            stroke="rgb(229, 231, 235)"
            fill="transparent"
            strokeWidth={strokeWidth}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
          {/* Progress circle */}
          <circle
            stroke={scoreColor}
            fill="transparent"
            strokeWidth={strokeWidth}
            strokeDasharray={strokeDasharray}
            strokeDashoffset={0}
            strokeLinecap="round"
            r={normalizedRadius}
            cx={radius}
            cy={radius}
            style={{
              transformOrigin: `${radius}px ${radius}px`,
              transform: 'rotate(-90deg)',
              transition: 'stroke-dasharray 0.8s ease-in-out'
            }}
          />
        </svg>
        
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className={`font-bold ${scoreSize}`} style={{ color: scoreColor }}>
            {score}
          </div>
          <div className={`font-medium text-gray-600 dark:text-gray-400 ${textSize}`}>
            {scoreText}
          </div>
        </div>
      </div>

      {showDetails && (
        <>
          {/* Trust Score Label */}
          <div className="text-center">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2 justify-center">
              <Shield className="w-5 h-5" style={{ color: scoreColor }} />
              Trust Score
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Based on verification, experience, and reviews
            </p>
          </div>

          {/* Verification Badges */}
          <div className="grid grid-cols-2 gap-3 w-full">
            <div className={`flex items-center gap-2 p-2 rounded-lg ${verificationStatus === 'verified' ? 'bg-green-50 dark:bg-green-900/20' : 'bg-gray-50 dark:bg-gray-700'}`}>
              <CheckCircle 
                className="w-4 h-4" 
                style={{ color: verificationStatus === 'verified' ? '#22c55e' : '#6b7280' }}
              />
              <span className={`text-xs font-medium ${verificationStatus === 'verified' ? 'text-green-700 dark:text-green-300' : 'text-gray-600 dark:text-gray-400'}`}>
                Verified
              </span>
            </div>

            <div className={`flex items-center gap-2 p-2 rounded-lg ${insuranceVerified ? 'bg-blue-50 dark:bg-blue-900/20' : 'bg-gray-50 dark:bg-gray-700'}`}>
              <Shield 
                className="w-4 h-4" 
                style={{ color: insuranceVerified ? '#3b82f6' : '#6b7280' }}
              />
              <span className={`text-xs font-medium ${insuranceVerified ? 'text-blue-700 dark:text-blue-300' : 'text-gray-600 dark:text-gray-400'}`}>
                Insured
              </span>
            </div>

            <div className={`flex items-center gap-2 p-2 rounded-lg ${backgroundCheckPassed ? 'bg-purple-50 dark:bg-purple-900/20' : 'bg-gray-50 dark:bg-gray-700'}`}>
              <CheckCircle 
                className="w-4 h-4" 
                style={{ color: backgroundCheckPassed ? '#8b5cf6' : '#6b7280' }}
              />
              <span className={`text-xs font-medium ${backgroundCheckPassed ? 'text-purple-700 dark:text-purple-300' : 'text-gray-600 dark:text-gray-400'}`}>
                Background
              </span>
            </div>

            <div className="flex items-center gap-2 p-2 rounded-lg bg-yellow-50 dark:bg-yellow-900/20">
              <Star 
                className="w-4 h-4" 
                style={{ color: '#f59e0b' }}
              />
              <span className="text-xs font-medium text-yellow-700 dark:text-yellow-300">
                {averageRating > 0 ? `${averageRating}/5` : 'New'}
              </span>
            </div>
          </div>

          {/* Experience Stats */}
          <div className="grid grid-cols-2 gap-4 w-full pt-2 border-t border-gray-200 dark:border-gray-600">
            <div className="text-center">
              <div className="text-xl font-bold text-gray-900 dark:text-white">
                {yearsExperience}+
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">
                Years Experience
              </div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-gray-900 dark:text-white">
                {completedProjects}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">
                Projects Done
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}