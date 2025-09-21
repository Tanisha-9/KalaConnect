import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { Logo } from '@/components/logo';

export default function Home() {
  return (
    <div className="relative min-h-screen w-full">
      <Image
        src="https://picsum.photos/seed/1/1800/1200"
        alt="Artisanal crafts"
        data-ai-hint="artisanal crafts"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-background/60 backdrop-blur-sm" />
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center p-4 text-center">
        <div className="mb-8">
          <Logo className="text-5xl md:text-7xl" />
        </div>
        <h1 className="font-headline text-4xl md:text-6xl text-primary drop-shadow-md">
          Your Story, Handcrafted.
        </h1>
        <p className="mt-4 max-w-2xl text-lg md:text-xl text-foreground/80">
          A marketplace for artisans to share their passion and for explorers to
          discover unique, handmade treasures.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <Button asChild size="lg" className="font-headline text-lg">
            <Link href="/signup">Get Started</Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="secondary"
            className="font-headline text-lg"
          >
            <Link href="/login">Log In</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
