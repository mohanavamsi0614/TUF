import { format, getMonth } from 'date-fns';

interface Props {
  currentDate: Date;
}

// A collection of stunning unsplash images mapping to 12 months for a vibrant feel
const monthImages = [
  "https://images.unsplash.com/photo-1445543949571-ffc3e0e2f55e?q=80&w=800&auto=format&fit=crop", // Jan: Winter
  "https://images.unsplash.com/photo-1483664852095-d6cc6870702d?q=80&w=800&auto=format&fit=crop", // Feb: Cold
  "https://images.unsplash.com/photo-1490750967868-88cb44cb2753?q=80&w=800&auto=format&fit=crop", // Mar: Bloom
  "https://images.unsplash.com/photo-1522748906645-95d8adfd52c7?q=80&w=800&auto=format&fit=crop", // Apr: Spring
  "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=800&auto=format&fit=crop", // May: Nature
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop", // Jun: Beach
  "https://images.unsplash.com/photo-1501426026826-31c667bdf23d?q=80&w=800&auto=format&fit=crop", // Jul: Summer (Swapped)
  "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=800&auto=format&fit=crop", // Aug: Car (Swapped)
  "https://images.unsplash.com/photo-1444464666168-e0d4d0469b55?q=80&w=800&auto=format&fit=crop", // Sep: Autumn start
  "https://images.unsplash.com/photo-1508611311497-6a568d7168db?q=80&w=800&auto=format&fit=crop", // Oct: Fall
  "https://images.unsplash.com/photo-1476820865390-c52aeebb9891?q=80&w=800&auto=format&fit=crop", // Nov: Late Fall
  "https://images.unsplash.com/photo-1512389142860-9c449e58a543?q=80&w=800&auto=format&fit=crop"  // Dec: Holidays
];

export default function HeroPanel({ currentDate }: Props) {
  const monthIndex = getMonth(currentDate);
  const imageUrl = monthImages[monthIndex];

  return (
    <div className="hero-panel">
      <img src={imageUrl} alt="Month visual theme" className="hero-image" />
      <div className="hero-overlay">
        <h1 className="hero-month-title">{format(currentDate, 'MMMM')}</h1>
        <h2 className="hero-year-title">{format(currentDate, 'yyyy')}</h2>
      </div>
    </div>
  );
}
