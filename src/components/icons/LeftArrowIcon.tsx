import React from 'react';

interface IconProps {
  className?: string;
  color?: string;
}

export const LeftArrowIcon = React.memo<IconProps>(
  ({className = 'w-6 h-6', color = 'currentColor'}) => {
    return (
      <svg
        className={className}
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M13.6 8C13.6 8.33137 13.3314 8.6 13 8.6L4.48967 8.6L7.81587 11.7675C8.05473 11.9972 8.06218 12.377 7.8325 12.6159C7.60283 12.8547 7.223 12.8622 6.98414 12.6325L2.58414 8.4325C2.46649 8.31937 2.40001 8.16321 2.40001 8C2.40001 7.83679 2.46649 7.68062 2.58414 7.5675L6.98414 3.3675C7.223 3.13782 7.60283 3.14527 7.83251 3.38413C8.06218 3.623 8.05473 4.00282 7.81587 4.2325L4.48967 7.4L13 7.4C13.3314 7.4 13.6 7.66863 13.6 8Z"
          fill={color}
        />
      </svg>
    );
  },
);

LeftArrowIcon.displayName = 'LeftArrowIcon';
