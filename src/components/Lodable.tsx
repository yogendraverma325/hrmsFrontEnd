import React, { Suspense } from 'react';

// project import
import SuspenseLoader from './SuspenseLoader';

// ==============================|| LOADABLE - LAZY LOADING ||============================== //

// eslint-disable-next-line react/display-name
const Lodable = (Component: any) => (props: any) =>
  (
    <Suspense fallback={<SuspenseLoader />}>
      <Component {...props} />
    </Suspense>
  );

export default Lodable;
