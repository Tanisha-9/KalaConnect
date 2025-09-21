export type UserRole = 'artisan' | 'buyer';

export type User = {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  role: UserRole;
  // Artisan specific
  age?: number;
  region?: string;
  artField?: string;
  journey?: string;
  // Buyer specific
  interests?: string;
};

export type Craft = {
  id: string;
  artisanId: string;
  title: string;
  description: string;
  imageUrl: string;
  createdAt: string;
};

export type Notification = {
  id: string;
  userId: string;
  title: string;
  description: string;
  createdAt: string;
  read: boolean;
};

export type SocialPost = {
  id: string;
  craftId: string;
  artisanId: string;
  hashtags: string[];
  postDate: string;
};
