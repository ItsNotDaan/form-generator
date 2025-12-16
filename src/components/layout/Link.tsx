import NextLink from 'next/link';
import React from 'react';

export interface LinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href?: string;
  isExternal?: boolean;
  locale?: string | false | undefined;
}

const createLink = ({
  href,
  isExternal,
  locale,
  children,
  className = '',
  ...rest
}: LinkProps) => {
  if (!href) {
    return <>{children}</>;
  }

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        {...rest}
      >
        {children}
      </a>
    );
  }

  return (
    <NextLink href={href} locale={locale} className={className} {...rest}>
      {children}
    </NextLink>
  );
};

export const Link = React.memo(createLink);
