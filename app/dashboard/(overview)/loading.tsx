import CardSkeletonBig from '@/app/ui/new-skeletons';

export default function Loading() {
  return (
    <main className=" flex flex-col items-center justify-center">
      <div className=" mt-10 grid min-w-[343px] grid-cols-1 items-start justify-center gap-y-2 overflow-x-auto sm:min-w-[510px]  sm:overflow-x-auto lg:grid-cols-2  ">
        <div className="min-w-[343px] items-center pb-2 pt-6 lg:min-w-[500px]">
          <CardSkeletonBig />
        </div>
        <div className="min-w-[343px] items-center pb-2 pt-6 lg:min-w-[500px]">
          <CardSkeletonBig />
        </div>
        <div className="min-w-[343px] items-center pb-2 pt-6 lg:min-w-[500px]">
          <CardSkeletonBig />
        </div>

        <div className="min-w-[343px] items-center pb-2 pt-6 lg:min-w-[500px]">
          <CardSkeletonBig />
        </div>
      </div>
    </main>
  );
}
