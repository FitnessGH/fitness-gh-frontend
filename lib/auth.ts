export type UserRole = "gym_owner" | "customer" | "vendor" | "admin"

export interface AuthUser {
  id: string
  email: string
  name: string
  role: UserRole
  avatar?: string
  approvalStatus?: "pending" | "approved" | "rejected"
  gymDetails?: GymDetails
}

export interface GymDetails {
  gymName: string
  location: string
  phone: string
  email: string
  amenities: string[]
  plans: Array<{ name: string; price: string; duration: string }>
  employees: Array<{ name: string; role: string; email: string }>
}

// Mock user storage (in production, use a real database)
const mockUsers: Record<string, AuthUser> = {
  "owner@fitclub.com": {
    id: "1",
    email: "owner@fitclub.com",
    name: "John Fitness",
    role: "gym_owner",
    avatar: "JF",
    approvalStatus: "approved",
  },
  "newowner@fitclub.com": {
    id: "5",
    email: "newowner@fitclub.com",
    name: "Alex New",
    role: "gym_owner",
    avatar: "AN",
    // No approvalStatus set initially, representing a fresh signup
  },
  "pending@fitclub.com": {
    id: "6",
    email: "pending@fitclub.com",
    name: "Pat Pending",
    role: "gym_owner",
    avatar: "PP",
    approvalStatus: "pending",
  },
  "member@email.com": {
    id: "2",
    email: "member@email.com",
    name: "Sarah Johnson",
    role: "customer",
    avatar: "SJ",
  },
  "vendor@shop.com": {
    id: "3",
    email: "vendor@shop.com",
    name: "Mike Supplements",
    role: "vendor",
    avatar: "MS",
  },
  "admin@fitclub.com": {
    id: "4",
    email: "admin@fitclub.com",
    name: "Admin User",
    role: "admin",
    avatar: "AU",
  },
}

// Mock login - in production, verify credentials against database
export function validateCredentials(email: string, password: string): AuthUser | null {
  // For demo purposes, any password works for demo accounts
  const user = mockUsers[email.toLowerCase()]
  return user || null
}

// Get role-specific dashboard path
export function getDashboardPath(role: UserRole): string {
  const paths: Record<UserRole, string> = {
    gym_owner: "/gym-owner",
    customer: "/customer",
    vendor: "/vendor",
    admin: "/admin",
  }
  return paths[role]
}

// Get role display name
export function getRoleDisplay(role: UserRole): string {
  const names: Record<UserRole, string> = {
    gym_owner: "Gym Owner",
    customer: "Member",
    vendor: "Vendor",
    admin: "Administrator",
  }
  return names[role]
}
// Submit gym details
export function submitGymDetails(userId: string, details: GymDetails): void {
  // In a real app, this would save to a DB
  const user = Object.values(mockUsers).find((u) => u.id === userId)
  if (user) {
    user.gymDetails = details
    user.approvalStatus = "pending"
  }
}

// Get approval status
export function getApprovalStatus(userId: string): "pending" | "approved" | "rejected" | undefined {
  const user = Object.values(mockUsers).find((u) => u.id === userId)
  return user?.approvalStatus
}

// Mock signup
export async function registerUser(data: { name: string; email: string; role: UserRole }): Promise<AuthUser> {
  const newId = (Object.keys(mockUsers).length + 1).toString()
  const newUser: AuthUser = {
    id: newId,
    email: data.email,
    name: data.name,
    role: data.role,
    avatar: data.name.slice(0, 2).toUpperCase(),
  }
  // In a real app, save to DB
  mockUsers[data.email.toLowerCase()] = newUser
  return newUser
}
