export type UserRole = 'gym_owner' | 'customer' | 'vendor' | 'admin';

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  approvalStatus?: 'pending' | 'approved' | 'rejected';
  gymDetails?: GymDetails;
  emailVerified?: boolean;
}

export interface GymDetails {
  gymName: string;
  location: string;
  phone: string;
  email: string;
  amenities: string[];
  plans: Array<{ name: string; price: string; duration: string }>;
  employees: Array<{ name: string; role: string; email: string }>;
}

const mockUsers: Record<string, AuthUser> = {
  'owner@fitclub.com': {
    id: '1',
    email: 'owner@fitclub.com',
    name: 'John Fitness',
    role: 'gym_owner',
    avatar: 'JF',
    approvalStatus: 'approved',
  },
  'newowner@fitclub.com': {
    id: '5',
    email: 'newowner@fitclub.com',
    name: 'Alex New',
    role: 'gym_owner',
    avatar: 'AN',
  },
  'pending@fitclub.com': {
    id: '6',
    email: 'pending@fitclub.com',
    name: 'Pat Pending',
    role: 'gym_owner',
    avatar: 'PP',
    approvalStatus: 'pending',
  },
  'member@email.com': {
    id: '2',
    email: 'member@email.com',
    name: 'Sarah Johnson',
    role: 'customer',
    avatar: 'SJ',
  },
  'vendor@shop.com': {
    id: '3',
    email: 'vendor@shop.com',
    name: 'Mike Supplements',
    role: 'vendor',
    avatar: 'MS',
  },
  'admin@fitclub.com': {
    id: '4',
    email: 'admin@fitclub.com',
    name: 'Admin User',
    role: 'admin',
    avatar: 'AU',
  },
};

export function validateCredentials(
  email: string,
  password: string,
): AuthUser | null {
  const user = mockUsers[email.toLowerCase()];
  return user || null;
}

export function getDashboardPath(role: UserRole): string {
  const paths: Record<UserRole, string> = {
    gym_owner: '/gym-owner',
    customer: '/customer',
    vendor: '/vendor',
    admin: '/admin',
  };
  return paths[role];
}

export function mapBackendUserTypeToRole(userType: string): UserRole {
  switch (userType) {
    case 'GYM_OWNER':
      return 'gym_owner';
    case 'MEMBER':
      return 'customer';
    case 'EMPLOYEE':
      return 'vendor';
    case 'ADMIN':
      return 'admin';
    default:
      return 'customer';
  }
}

export function getRoleDisplay(role: UserRole): string {
  const names: Record<UserRole, string> = {
    gym_owner: 'Gym Owner',
    customer: 'Member',
    vendor: 'Vendor',
    admin: 'Administrator',
  };
  return names[role];
}

export function submitGymDetails(userId: string, details: GymDetails): void {
  const user = Object.values(mockUsers).find((u) => u.id === userId);
  if (user) {
    user.gymDetails = details;
    user.approvalStatus = 'pending';
  }
}

export function getApprovalStatus(
  userId: string,
): 'pending' | 'approved' | 'rejected' | undefined {
  const user = Object.values(mockUsers).find((u) => u.id === userId);
  return user?.approvalStatus;
}

export async function registerUser(data: {
  name: string;
  email: string;
  role: UserRole;
}): Promise<AuthUser> {
  const newId = (Object.keys(mockUsers).length + 1).toString();
  const newUser: AuthUser = {
    id: newId,
    email: data.email,
    name: data.name,
    role: data.role,
    avatar: data.name.slice(0, 2).toUpperCase(),
    approvalStatus: data.role === 'gym_owner' ? 'approved' : undefined,
  };

  mockUsers[data.email.toLowerCase()] = newUser;
  return newUser;
}
