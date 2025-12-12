import {PageHeader} from '@/presentation/components/layout';
import React from 'react';
import {Button} from '@/presentation/components/ui';
import {NotFoundIcon} from '@/presentation/components/icons/NotFoundIcon';
import {useRouter} from 'next/router';
import {Routes} from './routes';

export const NotFoundPageTailwind = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col w-full min-h-screen h-full bg-gray-100 items-center">
      <PageHeader />
      <NotFoundIcon className="mt-32" />
      <p className="mt-16 text-xl font-semibold text-brand-700">
        notFound.title
      </p>
      <p className="mt-2">notFound.description</p>
      <Button
        variant="primary"
        onClick={event => {
          event.preventDefault();
          router.push(Routes.overview);
        }}
        className="mt-8"
      >
        backToStart
      </Button>
    </div>
  );
};

export default NotFoundPageTailwind;
