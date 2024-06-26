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

const SpinningTennisBall = () => (
  <ContentLoader
    speed={2}
    width={100}
    height={100}
    viewBox="0 0 100 100"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <path d="M 261.466 51.316 c -0.393 -0.395 -0.785 -0.79 -0.785 -1.184 C 233.199 19.342 193.155 0 149.185 0 C 104.822 0 65.17 19.342 38.081 50.132 l -1.177 1.184 C 14.134 77.763 0 112.105 0 150 c 0 40.658 16.489 77.763 42.792 105 l 0.786 0.789 l 0.392 0.395 c 0.393 0.395 0.393 0.79 0.785 0.79 C 71.845 283.421 108.748 300 149.185 300 c 82.444 0 149.185 -67.105 149.185 -150 c 0 -37.895 -14.134 -72.237 -36.904 -98.684 z m -13.741 176.842 c -30.229 -27.237 -44.755 -54.474 -43.185 -80.921 c 2.356 -34.737 31.015 -61.184 45.541 -72.632 c 15.703 20.921 24.733 46.974 24.733 75.395 c 0 29.605 -10.207 56.842 -27.089 78.158 z M 48.289 74.605 c 14.918 11.448 45.54 38.684 47.896 74.606 c 1.963 27.236 -12.956 54.868 -43.578 82.105 C 34.548 209.211 23.555 180.789 23.555 150 c 0 -28.421 9.423 -54.474 24.734 -75.395 z m 21.592 173.29 c 35.726 -32.369 52.608 -65.921 50.252 -100.263 c -3.141 -44.211 -36.904 -76.185 -55.748 -90.395 c 22.378 -20.921 52.215 -33.553 84.8 -33.553 c 32.585 0 62.422 12.632 84.8 33.553 c -17.667 14.21 -50.252 45.395 -53 88.421 c -2.356 34.342 14.526 67.895 50.251 99.868 c -21.985 18.948 -50.644 30.79 -82.051 30.79 c -30.23 0 -57.711 -10.658 -79.304 -28.421 z" />

    <animateTransform
      attributeName="transform"
      attributeType="XML"
      type="rotate"
      from="0 50 50"
      to="360 50 50"
      dur="2s"
      repeatCount="indefinite"
    />
  </ContentLoader>
);

export function TennisSkeleton() {
  return <SpinningTennisBall />;
}
