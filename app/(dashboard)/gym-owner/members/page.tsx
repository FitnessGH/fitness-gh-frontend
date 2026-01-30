'use client';

import { useToast } from '@/hooks/use-toast';
import {
  Member,
  Transaction,
  addMember,
  deleteMember,
  getMembers,
  updateMember,
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
  MoreHorizontal,
  Pencil,
  Plus,
  Search,
  Trash,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function MembersPage() {
  const [members, setMembers] = useState<Member[]>(getMembers());
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<Member | null>(null);
  const [payingMember, setPayingMember] = useState<Member | null>(null);
  const [deleteMemberId, setDeleteMemberId] = useState<string | null>(null);
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
    if (editingMember) {
      const updatedMember: Member = {
        ...editingMember,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        package: formData.package,
        status: formData.status,
      };

      updateMember(updatedMember);
      setMembers(getMembers());
    } else {
      const newMember: Member = {
        id: (members.length + 1).toString(),
        memberId: Math.floor(1000 + Math.random() * 9000).toString(),
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        package: formData.package,
        joinDate: new Date().toLocaleDateString(),
        expireDate: new Date(
          Date.now() + 30 * 24 * 60 * 60 * 1000,
        ).toLocaleDateString(),
        paid: 'GH₵0',
        due: formData.package.includes('Gold')
          ? 'GH₵450'
          : formData.package.includes('Platinum')
            ? 'GH₵600'
            : 'GH₵300',
        status: formData.status,
        transactions: [],
      };

      addMember(newMember);
      setMembers(getMembers());
    }
    setFormData({
      name: '',
      email: '',
      phone: '',
      package: 'Standard Membership',
      status: 'Not paid',
    });
    setIsModalOpen(false);
  };

  const handlePaymentSubmit = () => {
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

    const currentPaid =
      parseFloat(payingMember.paid.replace(/[^0-9.]/g, '')) || 0;
    const currentDue =
      parseFloat(payingMember.due.replace(/[^0-9.]/g, '')) || 0;

    const newPaid = currentPaid + paymentAmount;
    const newDue = Math.max(0, currentDue - paymentAmount);
    const newStatus = newDue <= 0 ? 'Paid' : 'Not paid';

    const newTransaction: Transaction = {
      id: Math.random().toString(36).substr(2, 9),
      amount: paymentAmount,
      date: paymentData.date,
      method: paymentData.method,
    };

    const updatedMember: Member = {
      ...payingMember,
      paid: `GH₵${newPaid}`,
      due: `GH₵${newDue}`,
      status: newStatus as 'Paid' | 'Not paid',
      transactions: [...(payingMember.transactions || []), newTransaction],
    };

    updateMember(updatedMember);
    setMembers(getMembers());

    toast({
      title: 'Payment Recorded',
      description: `Successfully recorded payment of GH₵${paymentAmount} for ${payingMember.name}.`,
    });

    setIsPaymentModalOpen(false);
    setPayingMember(null);
  };

  const handleDeleteMember = () => {
    if (deleteMemberId) {
      deleteMember(deleteMemberId);
      setMembers(getMembers());

      setIsDeleteModalOpen(false);
      setDeleteMemberId(null);
    }
  };

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

      <DataTable
        columns={columns}
        data={filteredMembers}
        pageSize={10}
        className="bg-card p-4 rounded-lg"
      />

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
