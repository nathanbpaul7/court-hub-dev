import { EmptyCard } from './components';

// Loading animation
const shimmer =
  'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';

export function EmptyCardSkel() {
  return (
    <div className={`${shimmer} relative grid justify-center`}>
      <EmptyCard />
    </div>
  );
}
