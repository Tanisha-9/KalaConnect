import { User, Craft, Notification } from './types';
import { PlaceHolderImages } from './placeholder-images';

const getImage = (id: string) => PlaceHolderImages.find(img => img.id === id)?.imageUrl || '';

export const mockUsers: User[] = [
  {
    id: 'artisan-1',
    name: 'Meera Kumari',
    email: 'Meerakumari@example.com',
    avatarUrl: getImage('avatar-1'),
    role: 'artisan',
    age: 34,
    region: 'Partan,Gujarat',
    artField: 'Patora',
    journey: 'I started my a journey after seeing my Dad, His work inspired me to give wings to my creativity.',
  },
  {
    id: 'buyer-1',
    name: 'Rashi sharma',
    email: 'Rashisharma@example.com',
    avatarUrl: getImage('avatar-2'),
    role: 'buyer',
    interests: 'Intersed in Comfortable yet graceful sarees and traditional attires',
  },
    {
    id: 'artisan-2',
    name: 'Krish Das',
    email: 'Krishdas@example.com',
    avatarUrl: getImage('avatar-3'),
    role: 'artisan',
    age: 42,
    region: 'Murshidabad,West Bengal',
    artField: 'Madhubani Painting',
    journey: 'Carrying forward the legacy of my family, I did not give up on my heritage; Madhubani Painting',
  },
];

export const mockCrafts: Craft[] = [
  {
    id: 'craft-1',
    artisanId: 'artisan-1',
    title: 'Patora Cotton Saree',
    description: 'Every thread is crafted with care, and design is from my heart.',
    imageUrl: getImage('craft-1'),
    createdAt: '2023-10-26T10:00:00Z',
  },
  {
    id: 'craft-2',
    artisanId: 'artisan-1',
    title: 'Exclusive Silk Patora',
    description: 'The color combinations will uplift the beauty of every Women and its comforatble fabric will give you a luxury experience.',
    imageUrl: getImage('craft-2'),
    createdAt: '2023-10-25T11:30:00Z',
  },
    {
    id: 'craft-3',
    artisanId: 'artisan-2',
    title: 'Flower Vase',
    description: 'A large, hand-carved flower vase, made to uplift the beauty of your house. Carrying the touch of modern design with traditional look',
    imageUrl: getImage('craft-3'),
    createdAt: '2023-10-24T14:00:00Z',
  },
  {
    id: 'craft-4',
    artisanId: 'artisan-2',
    title: 'Hand Painted Wall Hanging set',
    description: 'Durable and beautiful Wall Hanging Set. Every design is made with care and love.',
    imageUrl: getImage('craft-4'),
    createdAt: '2023-10-23T18:45:00Z',
  },
   {
    id: 'craft-5',
    artisanId: 'artisan-1',
    title: 'Patora Saree',
    description: 'This saree design is unique as it was the very own design of my father, suites every occasion; brings grace and charm',
    imageUrl: getImage('craft-5'),
    createdAt: '2023-10-22T09:20:00Z',
  },
];

export const mockNotifications: Notification[] = [
    {
        id: 'notif-1',
        userId: 'artisan-1',
        title: 'New Inquiry',
        description: ' Rashi Sharma is interested in a custom version of your Vase.',
        createdAt: '2023-10-27T09:00:00Z',
        read: false,
    },
    {
        id: 'notif-2',
        userId: 'artisan-1',
        title: 'Profile Liked',
        description: 'A buyer from Mumbai just liked your profile!',
        createdAt: '2023-10-26T15:30:00Z',
        read: true,
    },
     {
        id: 'notif-3',
        userId: 'buyer-1',
        title: 'Message from Meena Kumari',
        description: 'Meena has responded to your inquiry about the custom saree.',
        createdAt: '2023-10-27T10:15:00Z',
        read: false,
    }
];

export const getArtisanForCraft = (craft: Craft) => mockUsers.find(user => user.id === craft.artisanId && user.role === 'artisan');
