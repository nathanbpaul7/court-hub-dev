import React from 'react';
import ContentLoader from 'react-content-loader';

const CardSkeleton = () => (
  <ContentLoader
    speed={1}
    width={400}
    height={500}
    viewBox="0 0 400 500"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="166" y="66" rx="3" ry="3" width="220" height="7" />
    <rect x="167" y="92" rx="3" ry="3" width="148" height="7" />
    <rect x="31" y="189" rx="3" ry="3" width="373" height="5" />
    <circle cx="91" cy="78" r="57" />
    <rect x="30" y="281" rx="0" ry="0" width="383" height="92" />
    <rect x="33" y="242" rx="3" ry="3" width="373" height="5" />
    <rect x="33" y="215" rx="3" ry="3" width="373" height="5" />
    <rect x="276" y="416" rx="0" ry="0" width="131" height="30" />
  </ContentLoader>
);

export default function CardSkeletonBig() {
  return (
    <>
      <div className="m-4 flex">
        <CardSkeleton />
      </div>
    </>
  );
}

const ConvoLoader = () => (
  <ContentLoader
    speed={2}
    width={300}
    height={100}
    viewBox="0 0 300 100"
    backgroundColor="#dedede"
    foregroundColor="#ecebeb"
  >
    <rect x="215" y="580" rx="0" ry="0" width="1" height="0" />
    <circle cx="43" cy="52" r="38" />
    <rect x="102" y="27" rx="0" ry="0" width="133" height="9" />
    <rect x="97" y="67" rx="0" ry="0" width="193" height="12" />
    <rect x="104" y="47" rx="0" ry="0" width="102" height="8" />
  </ContentLoader>
);

export function ConvoSkeleton() {
  return <ConvoLoader />;
}

const MyLoader = () => (
  <ContentLoader
    speed={2}
    width={300}
    height={300}
    viewBox="0 0 280 300"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="103" y="52" rx="3" ry="3" width="153" height="5" />
    <rect x="104" y="70" rx="3" ry="3" width="103" height="5" />
    <rect x="10" y="138" rx="3" ry="3" width="259" height="3" />
    <circle cx="51" cy="60" r="40" />
    <rect x="9" y="202" rx="0" ry="0" width="266" height="64" />
    <rect x="215" y="580" rx="0" ry="0" width="1" height="0" />
    <rect x="11" y="174" rx="3" ry="3" width="259" height="3" />
    <rect x="11" y="156" rx="3" ry="3" width="259" height="3" />
    <rect x="132" y="300" rx="0" ry="0" width="131" height="30" />
  </ContentLoader>
);

export function CardSkeletonSmall() {
  return <MyLoader />;
}
