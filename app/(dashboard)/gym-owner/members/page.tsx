'use client';

import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/components/auth-context';
import GymsAPI from '@/lib/api/gyms';
import SubscriptionsAPI from '@/lib/api/subscriptions';
import type { Membership } from '@/lib/api/subscriptions';
import {
  Member,
  Transaction,
} from '@/lib/members-data';
import { Avatar, AvatarFallback, AvatarImage } from '@ui/avatar';
import { Button } from '@ui/button';
import { Column, DataTable } from '@ui/data-table';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@ui/dropdown-menu';
import { Input } from '@ui/input';
import {
  Coins,
  Eye,
  Loader2,
  MoreHorizontal,
  Pencil,
  Plus,
  Search,
  Trash,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

// Transform Membership to Member format
function transformMembershipToMember(membership: Membership, index: number): Member {
  console.log('Transforming membership:', membership);
  
  const profile = membership.profile;
  const name = profile
    ? `${profile.firstName || ''} ${profile.lastName || ''}`.trim() || profile.username
    : 'Unknown Member';
  
  // Handle date conversion - dates come as strings from JSON
  let startDate = 'N/A';
  let endDate = 'N/A';
  
  if (membership.startDate) {
    try {
      startDate = new Date(membership.startDate as any).toLocaleDateString();
    } catch (e) {
      console.error('Error parsing startDate:', membership.startDate, e);
    }
  }
  
  if (membership.endDate) {
    try {
      endDate = new Date(membership.endDate as any).toLocaleDateString();
    } catch (e) {
      console.error('Error parsing endDate:', membership.endDate, e);
    }
  }

  // Calculate payment status based on membership status
  const status = membership.status === 'ACTIVE' ? 'Paid' : 'Not paid';
  
  // Get plan price
  const planPrice = membership.plan?.price || 0;
  const paid = status === 'Paid' ? `GH₵${planPrice}` : 'GH₵0';
  const due = status === 'Not paid' ? `GH₵${planPrice}` : 'GH₵0';

  const member: Member = {
    id: membership.id,
    memberId: membership.profileId?.slice(-8).toUpperCase() || `MEM${index}`,
    name,
    email: profile?.username || '',
    phone: '',
    photo: profile?.avatarUrl || undefined,
    package: membership.plan?.name || 'Unknown Plan',
    joinDate: startDate,
    expireDate: endDate,
    paid,
    due,
    status,
    transactions: [],
  };
  
  console.log('Transformed to member:', member);
  return member;
}

export default function MembersPage() {
  const { userData } = useAuth();
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedGymId, setSelectedGymId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<Member | null>(null);
  const [payingMember, setPayingMember] = useState<Member | null>(null);
  const [deleteMemberId, setDeleteMemberId] = useState<string | null>(null);

  // Fetch gyms and memberships
  useEffect(() => {
    const fetchData = async () => {
      if (!userData?.tokens?.accessToken) {
        setError('Not authenticated');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        // Get user's gyms
        const gymsData = await GymsAPI.getMyGyms(userData.tokens.accessToken);
        const allGyms = [...gymsData.owned, ...gymsData.employed];

        if (allGyms.length === 0) {
          setError('No gyms found. Please create a gym first.');
          setLoading(false);
          return;
        }

        // Use first gym by default
        const gymId = allGyms[0].id;
        setSelectedGymId(gymId);

        // Fetch memberships for the gym
        const memberships = await SubscriptionsAPI.getGymMemberships(
          gymId,
          userData.tokens.accessToken,
        );

        console.log('Fetched memberships:', memberships);

        // Transform memberships to members
        const transformedMembers = memberships.map((m, idx) =>
          transformMembershipToMember(m, idx),
        );

        console.log('Transformed members:', transformedMembers);
        setMembers(transformedMembers);
      } catch (err: any) {
        console.error('Failed to fetch members:', err);
        setError(err.message || 'Failed to load members');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userData]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    package: 'Standard Membership',
    status: 'Not paid' as 'Paid' | 'Not paid',
  });
  const [paymentData, setPaymentData] = useState({
    amount: '',
    method: 'Cash',
    date: new Date().toISOString().split('T')[0],
  });

  const { toast } = useToast();
  const router = useRouter();

  const columns: Column<Member>[] = [
    {
      header: 'Photo',
      cell: (member) => (
        <Avatar className="w-10 h-10 rounded-md">
          <AvatarImage src={`https://i.pravatar.cc/150?u=${member.id}`} />
          <AvatarFallback className="rounded-md bg-secondary text-secondary-foreground">
            {member.name.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      ),
    },
    {
      header: 'Name',
      accessorKey: 'name',
      className: 'text-foreground font-medium',
    },
    {
      header: 'Member Id',
      accessorKey: 'memberId',
      className: 'text-muted-foreground',
    },
    {
      header: 'Package',
      accessorKey: 'package',
      className: 'text-muted-foreground',
    },
    {
      header: 'Joining Date',
      accessorKey: 'joinDate',
      className: 'text-muted-foreground',
    },
    {
      header: 'Expire Date',
      accessorKey: 'expireDate',
      className: 'text-muted-foreground',
    },
    {
      header: 'Paid',
      accessorKey: 'paid',
      className: 'text-muted-foreground',
    },
    {
      header: 'Due',
      accessorKey: 'due',
      className: 'text-muted-foreground',
    },
    {
      header: 'Status',
      cell: (member) => (
        <span className="text-muted-foreground">{member.status}</span>
      ),
    },
    {
      header: 'Action',
      headerClassName: 'text-center',
      cell: (member) => (
        <div className="flex items-center justify-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="h-8 w-8 p-0"
              >
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => handleOpenPaymentModal(member)}>
                <Coins className="mr-2 h-4 w-4" />
                <span>Receive Payment</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleViewDetails(member)}>
                <Eye className="mr-2 h-4 w-4" />
                <span>View Details</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleOpenEditModal(member)}>
                <Pencil className="mr-2 h-4 w-4" />
                <span>Edit Member</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => handleConfirmDelete(member.id)}
                className="text-red-600 focus:text-red-600"
              >
                <Trash className="mr-2 h-4 w-4" />
                <span>Delete Member</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ),
    },
  ];

  const filteredMembers = members.filter(
    (member) =>
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.memberId.includes(searchTerm) ||
      member.package.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Debug: Log current state
  console.log('Current members state:', members);
  console.log('Filtered members:', filteredMembers);

  const handleOpenAddModal = () => {
    setEditingMember(null);
    setFormData({
      name: '',
      email: '',
      phone: '',
      package: 'Standard Membership',
      status: 'Not paid',
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (member: Member) => {
    setEditingMember(member);
    setFormData({
      name: member.name,
      email: member.email,
      phone: member.phone,
      package: member.package,
      status: member.status,
    });
    setIsModalOpen(true);
  };

  const handleViewDetails = (member: Member) => {
    router.push(`/gym-owner/members/${member.id}`);
  };

  const handleOpenPaymentModal = (member: Member) => {
    setPayingMember(member);
    const dueAmount = member.due.replace(/[^0-9.]/g, '');
    setPaymentData({
      amount: dueAmount,
      method: 'Cash',
      date: new Date().toISOString().split('T')[0],
    });
    setIsPaymentModalOpen(true);
  };

  const handleConfirmDelete = (id: string) => {
    setDeleteMemberId(id);
    setIsDeleteModalOpen(true);
  };

  const handleSubmitMember = () => {
    // TODO: Implement member creation/update via API
    toast({
      title: 'Feature Coming Soon',
      description: 'Member management will be available soon.',
    });
    setIsModalOpen(false);
  };

  const handlePaymentSubmit = () => {
    // TODO: Implement payment recording via API
    if (!payingMember || !paymentData.amount) return;

    const paymentAmount = parseFloat(paymentData.amount);
    if (isNaN(paymentAmount) || paymentAmount <= 0) {
      toast({
        title: 'Invalid Amount',
        description: 'Please enter a valid payment amount.',
        variant: 'destructive',
      });
      return;
    }

    toast({
      title: 'Feature Coming Soon',
      description: 'Payment recording will be available soon.',
    });

    setIsPaymentModalOpen(false);
    setPayingMember(null);
  };

  const handleDeleteMember = () => {
    // TODO: Implement member deletion via API
    if (deleteMemberId) {
      toast({
        title: 'Feature Coming Soon',
        description: 'Member deletion will be available soon.',
      });
      setIsDeleteModalOpen(false);
      setDeleteMemberId(null);
    }
  };

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading members...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
          <p className="text-destructive font-medium">Error</p>
          <p className="text-sm text-muted-foreground mt-1">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Member List</h1>
        <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
          <span>Member</span>
          <span>{'>'}</span>
          <span className="text-foreground">Member List</span>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-card p-4 rounded-lg">
        <div className="flex items-center gap-0 w-full md:w-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search here...."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-secondary/50 border-none w-full md:w-75 rounded-r-none focus-visible:ring-0"
            />
          </div>
          <Button className="rounded-l-none bg-secondary hover:bg-secondary/80 text-foreground border-l border-white/10">
            Search
          </Button>
        </div>
        <Button
          className="bg-[#2c9d9d] hover:bg-[#32b0b0] text-white w-full md:w-auto"
          onClick={handleOpenAddModal}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Member
        </Button>
      </div>

      {filteredMembers.length === 0 ? (
        <div className="bg-card p-8 rounded-lg text-center">
          <p className="text-muted-foreground">
            {members.length === 0
              ? 'No members found. Members will appear here once they subscribe to your gym.'
              : 'No members match your search criteria.'}
          </p>
        </div>
      ) : (
        <DataTable
          columns={columns}
          data={filteredMembers}
          pageSize={10}
          className="bg-card p-4 rounded-lg"
        />
      )}

      <Dialog
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingMember ? 'Edit Member' : 'Add New Member'}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Full Name</label>
              <Input
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Email Address</label>
              <Input
                type="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Phone Number</label>
              <Input
                placeholder="(555) 000-0000"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Package</label>
                <select
                  className="w-full h-10 px-3 py-2 bg-secondary/50 border-none rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#2c9d9d]"
                  value={formData.package}
                  onChange={(e) =>
                    setFormData({ ...formData, package: e.target.value })
                  }
                >
                  <option>Standard Membership</option>
                  <option>Gold Membership</option>
                  <option>Platinum Membership</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Status</label>
                <select
                  className="w-full h-10 px-3 py-2 bg-secondary/50 border-none rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#2c9d9d]"
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({ ...formData, status: e.target.value as any })
                  }
                >
                  <option value="Paid">Paid</option>
                  <option value="Not paid">Not paid</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-4">
              <Button
                variant="outline"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                className="bg-[#2c9d9d] hover:bg-[#32b0b0] text-white"
                onClick={handleSubmitMember}
              >
                {editingMember ? 'Update Member' : 'Add Member'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog
        open={isPaymentModalOpen}
        onOpenChange={setIsPaymentModalOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Receive Payment</DialogTitle>
          </DialogHeader>
          {payingMember && (
            <div className="space-y-4 py-4">
              <div className="p-4 bg-secondary/30 rounded-lg space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Member:</span>
                  <span className="font-medium">{payingMember.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    Total Due:
                  </span>
                  <span className="font-bold text-red-500">
                    {payingMember.due}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Amount to Pay (GH₵)
                </label>
                <Input
                  type="number"
                  placeholder="0.00"
                  value={paymentData.amount}
                  onChange={(e) =>
                    setPaymentData({ ...paymentData, amount: e.target.value })
                  }
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Payment Method</label>
                  <select
                    className="w-full h-10 px-3 py-2 bg-secondary/50 border-none rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#2c9d9d]"
                    value={paymentData.method}
                    onChange={(e) =>
                      setPaymentData({ ...paymentData, method: e.target.value })
                    }
                  >
                    <option>Cash</option>
                    <option>Credit Card</option>
                    <option>Debit Card</option>
                    <option>Bank Transfer</option>
                    <option>UPI</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Date</label>
                  <Input
                    type="date"
                    value={paymentData.date}
                    onChange={(e) =>
                      setPaymentData({ ...paymentData, date: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setIsPaymentModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  className="bg-green-600 hover:bg-green-700 text-white"
                  onClick={handlePaymentSubmit}
                >
                  Confirm Payment
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog
        open={isDeleteModalOpen}
        onOpenChange={setIsDeleteModalOpen}
      >
        <DialogContent className="sm:max-w-100">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-muted-foreground">
              Are you sure you want to remove{' '}
              <span className="font-bold text-foreground">
                {members.find((m) => m.id === deleteMemberId)?.name}
              </span>
              ? This action cannot be undone.
            </p>
          </div>
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => setIsDeleteModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteMember}
            >
              Delete Member
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
