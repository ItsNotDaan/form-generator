import React from 'react';
import {BaseLayout} from '@/presentation/components/layout';
import {useRouter} from 'next/router';

export const HelpPageTailwind = () => {
  const router = useRouter();

  return (
    <BaseLayout
      title={'help'}
      showBackButton={true}
      onBackButtonClicked={() => router.back()}
    >
      <div className="w-full h-full bg-white rounded-2 flex-1 p-4 flex flex-col">
        <p className="text-xl font-bold w-full truncate mb-4">help</p>
      </div>
    </BaseLayout>
  );
};

export default HelpPageTailwind;
