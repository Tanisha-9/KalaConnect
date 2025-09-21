import { cn } from '@/lib/utils';
import { Hand } from 'lucide-react';

type LogoProps = {
  className?: string;
  iconClassName?: string;
};

export function Logo({ className, iconClassName }: LogoProps) {
  return (
    <div
      className={cn(
        'font-headline flex items-center gap-2 text-primary',
        className
      )}
    >
      <Hand className={cn('size-8', iconClassName)} />
      <span>KalaConnect</span>
    </div>
  );
}
