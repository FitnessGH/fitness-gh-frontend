"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Search, Plus, Eye, Pencil, Trash, ChevronLeft, ChevronRight } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface Member {
  id: string
  memberId: string
  name: string
  email: string
  phone: string
  photo?: string
  package: string
  joinDate: string
  expireDate: string
  paid: string
  due: string
  status: "Paid" | "Not paid"
}

const mockMembers: Member[] = [
  {
    id: "1",
    memberId: "3536",
    name: "Cody Fisher",
    email: "cody@example.com",
    phone: "(555) 012-3456",
    package: "Gold Membership",
    joinDate: "8/21/15",
    expireDate: "12/4/17",
    paid: "$450",
    due: "$450",
    status: "Not paid",
  },
  {
    id: "2",
    memberId: "4152",
    name: "Marvin McKinney",
    email: "marvin@example.com",
    phone: "(555) 012-3457",
    package: "Silver Membership",
    joinDate: "5/19/12",
    expireDate: "2/11/12",
    paid: "$450",
    due: "$450",
    status: "Not paid",
  },
  {
    id: "3",
    memberId: "9261",
    name: "Annette Black",
    email: "annette@example.com",
    phone: "(555) 012-3458",
    package: "Platinum Membership",
    joinDate: "3/4/16",
    expireDate: "10/6/13",
    paid: "$450",
    due: "$450",
    status: "Not paid",
  },
  {
    id: "4",
    memberId: "8811",
    name: "Dianne Russell",
    email: "dianne@example.com",
    phone: "(555) 012-3459",
    package: "Gold Membership",
    joinDate: "5/27/15",
    expireDate: "7/11/19",
    paid: "$450",
    due: "$450",
    status: "Not paid",
  },
  {
    id: "5",
    memberId: "5028",
    name: "Eleanor Pena",
    email: "eleanor@example.com",
    phone: "(555) 012-3460",
    package: "Silver Membership",
    joinDate: "9/18/16",
    expireDate: "8/2/19",
    paid: "$450",
    due: "$450",
    status: "Paid",
  },
  {
    id: "6",
    memberId: "5948",
    name: "Arlene McCoy",
    email: "arlene@example.com",
    phone: "(555) 012-3461",
    package: "Platinum Membership",
    joinDate: "8/15/17",
    expireDate: "7/27/13",
    paid: "$450",
    due: "$450",
    status: "Paid",
  },
  {
    id: "7",
    memberId: "1148",
    name: "Darrell Steward",
    email: "darrell@example.com",
    phone: "(555) 012-3462",
    package: "Gold Membership",
    joinDate: "12/4/17",
    expireDate: "7/18/17",
    paid: "$450",
    due: "$450",
    status: "Paid",
  },
  {
    id: "8",
    memberId: "6690",
    name: "Leslie Alexander",
    email: "leslie@example.com",
    phone: "(555) 012-3463",
    package: "Silver Membership",
    joinDate: "5/27/15",
    expireDate: "12/10/13",
    paid: "$450",
    due: "$450",
    status: "Paid",
  },
  {
    id: "9",
    memberId: "1439",
    name: "Floyd Miles",
    email: "floyd@example.com",
    phone: "(555) 012-3464",
    package: "Platinum Membership",
    joinDate: "10/6/13",
    expireDate: "4/4/18",
    paid: "$450",
    due: "$450",
    status: "Paid",
  },
  {
    id: "10",
    memberId: "4349",
    name: "Albert Flores",
    email: "albert@example.com",
    phone: "(555) 012-3465",
    package: "Gold Membership",
    joinDate: "7/27/13",
    expireDate: "3/4/16",
    paid: "$450",
    due: "$450",
    status: "Paid",
  },
]

export default function MembersPage() {
  const [members, setMembers] = useState<Member[]>(mockMembers)
  const [searchTerm, setSearchTerm] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [editingMember, setEditingMember] = useState<Member | null>(null)
  const [viewingMember, setViewingMember] = useState<Member | null>(null)
  const [deleteMemberId, setDeleteMemberId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    package: "Standard Membership",
    status: "Not paid" as "Paid" | "Not paid"
  })

  const filteredMembers = members.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.memberId.includes(searchTerm) ||
    member.package.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleOpenAddModal = () => {
    setEditingMember(null)
    setFormData({ name: "", email: "", phone: "", package: "Standard Membership", status: "Not paid" })
    setIsModalOpen(true)
  }

  const handleOpenEditModal = (member: Member) => {
    setEditingMember(member)
    setFormData({
      name: member.name,
      email: member.email,
      phone: member.phone,
      package: member.package,
      status: member.status
    })
    setIsModalOpen(true)
  }

  const handleOpenViewModal = (member: Member) => {
    setViewingMember(member)
    setIsViewModalOpen(true)
  }

  const handleConfirmDelete = (id: string) => {
    setDeleteMemberId(id)
    setIsDeleteModalOpen(true)
  }

  const handleSubmitMember = () => {
    if (editingMember) {
      setMembers(members.map(m =>
        m.id === editingMember.id
          ? {
            ...m,
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            package: formData.package,
            status: formData.status
          }
          : m
      ))
      console.log("[v0] Member updated:", editingMember.id)
    } else {
      const newMember: Member = {
        id: (members.length + 1).toString(),
        memberId: Math.floor(1000 + Math.random() * 9000).toString(),
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        package: formData.package,
        joinDate: new Date().toLocaleDateString(),
        expireDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString(),
        paid: "$0",
        due: formData.package.includes("Gold") ? "$450" : formData.package.includes("Platinum") ? "$600" : "$300",
        status: formData.status,
      }
      setMembers([...members, newMember])
      console.log("[v0] Member added:", newMember)
    }
    setFormData({ name: "", email: "", phone: "", package: "Standard Membership", status: "Not paid" })
    setIsModalOpen(false)
  }

  const handleDeleteMember = () => {
    if (deleteMemberId) {
      setMembers(members.filter(m => m.id !== deleteMemberId))
      setIsDeleteModalOpen(false)
      setDeleteMemberId(null)
      console.log("[v0] Member removed:", deleteMemberId)
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Member List</h1>
        <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
          <span>Member</span>
          <span>{">"}</span>
          <span className="text-foreground">Member List</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-card p-4 rounded-lg">
        <div className="flex items-center gap-0 w-full md:w-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search here...."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-secondary/50 border-none w-full md:w-[300px] rounded-r-none focus-visible:ring-0"
            />
          </div>
          <Button className="rounded-l-none bg-secondary hover:bg-secondary/80 text-foreground border-l border-white/10">Search</Button>
        </div>
        <Button className="bg-[#2c9d9d] hover:bg-[#32b0b0] text-white w-full md:w-auto" onClick={handleOpenAddModal}>
          <Plus className="w-4 h-4 mr-2" />
          Add Member
        </Button>
      </div>

      {/* Members Table */}
      <div className="bg-card rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-[#1f2937] text-gray-400">
              <tr>
                <th className="py-4 px-6 font-medium">Photo</th>
                <th className="py-4 px-6 font-medium">Name</th>
                <th className="py-4 px-6 font-medium">Member Id</th>
                <th className="py-4 px-6 font-medium">Package</th>
                <th className="py-4 px-6 font-medium">Joining Date</th>
                <th className="py-4 px-6 font-medium">Expire Date</th>
                <th className="py-4 px-6 font-medium">Paid</th>
                <th className="py-4 px-6 font-medium">Due</th>
                <th className="py-4 px-6 font-medium">Status</th>
                <th className="py-4 px-6 font-medium text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/20">
              {filteredMembers.map((member) => (
                <tr key={member.id} className="hover:bg-muted/10 transition-colors">
                  <td className="py-4 px-6">
                    <Avatar className="w-10 h-10 rounded-md">
                      <AvatarImage src={`https://i.pravatar.cc/150?u=${member.id}`} />
                      <AvatarFallback className="rounded-md bg-secondary text-secondary-foreground">{member.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                  </td>
                  <td className="py-4 px-6 text-foreground font-medium">{member.name}</td>
                  <td className="py-4 px-6 text-muted-foreground">{member.memberId}</td>
                  <td className="py-4 px-6 text-muted-foreground">{member.package}</td>
                  <td className="py-4 px-6 text-muted-foreground">{member.joinDate}</td>
                  <td className="py-4 px-6 text-muted-foreground">{member.expireDate}</td>
                  <td className="py-4 px-6 text-muted-foreground">{member.paid}</td>
                  <td className="py-4 px-6 text-muted-foreground">{member.due}</td>
                  <td className="py-4 px-6">
                    <span className={member.status === "Paid" ? "text-muted-foreground" : "text-muted-foreground"}>
                      {member.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        className="p-1.5 text-green-500 border border-green-500/20 rounded hover:bg-green-500/10 transition-colors"
                        onClick={() => handleOpenViewModal(member)}
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        className="p-1.5 text-yellow-500 border border-yellow-500/20 rounded hover:bg-yellow-500/10 transition-colors"
                        onClick={() => handleOpenEditModal(member)}
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        className="p-1.5 text-red-500 border border-red-500/20 rounded hover:bg-red-500/10 transition-colors"
                        onClick={() => handleConfirmDelete(member.id)}
                      >
                        <Trash className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between p-4 border-t border-border/20">
          <p className="text-sm text-muted-foreground">Showing 1-10 from 100</p>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" className="h-8 w-8 disabled:opacity-50 border-border/20 bg-transparent text-muted-foreground hover:bg-muted/10" disabled>
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button size="icon" className="h-8 w-8 bg-[#2c9d9d] hover:bg-[#32b0b0] text-white border-0">1</Button>
            <Button size="icon" variant="ghost" className="h-8 w-8 text-muted-foreground hover:bg-muted/10 hover:text-foreground">2</Button>
            <Button size="icon" variant="ghost" className="h-8 w-8 text-muted-foreground hover:bg-muted/10 hover:text-foreground">3</Button>
            <Button size="icon" variant="ghost" className="h-8 w-8 text-muted-foreground hover:bg-muted/10 hover:text-foreground">4</Button>
            <Button size="icon" variant="ghost" className="h-8 w-8 text-muted-foreground hover:bg-muted/10 hover:text-foreground">5</Button>
            <span className="text-muted-foreground">...</span>
            <Button variant="outline" size="icon" className="h-8 w-8 border-border/20 bg-transparent text-muted-foreground hover:bg-muted/10">
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Add Member Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingMember ? "Edit Member" : "Add New Member"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Full Name</label>
              <Input
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Email Address</label>
              <Input
                type="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Phone Number</label>
              <Input
                placeholder="(555) 000-0000"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Package</label>
                <select
                  className="w-full h-10 px-3 py-2 bg-secondary/50 border-none rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#2c9d9d]"
                  value={formData.package}
                  onChange={(e) => setFormData({ ...formData, package: e.target.value })}
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
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                >
                  <option value="Paid">Paid</option>
                  <option value="Not paid">Not paid</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
              <Button className="bg-[#2c9d9d] hover:bg-[#32b0b0] text-white" onClick={handleSubmitMember}>
                {editingMember ? "Update Member" : "Add Member"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* View Member Modal */}
      <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Member Details</DialogTitle>
          </DialogHeader>
          {viewingMember && (
            <div className="space-y-6 py-4">
              <div className="flex items-center gap-4 p-4 bg-secondary/30 rounded-lg">
                <Avatar className="w-16 h-16 rounded-md">
                  <AvatarImage src={`https://i.pravatar.cc/150?u=${viewingMember.id}`} />
                  <AvatarFallback className="text-xl">{viewingMember.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl font-bold">{viewingMember.name}</h3>
                  <p className="text-[#2c9d9d] font-medium">{viewingMember.package}</p>
                  <p className="text-sm text-muted-foreground">ID: {viewingMember.memberId}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-1">
                  <p className="text-xs font-medium text-muted-foreground uppercase">Email</p>
                  <p className="text-sm">{viewingMember.email}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-medium text-muted-foreground uppercase">Phone</p>
                  <p className="text-sm">{viewingMember.phone}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-medium text-muted-foreground uppercase">Joining Date</p>
                  <p className="text-sm">{viewingMember.joinDate}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-medium text-muted-foreground uppercase">Expiry Date</p>
                  <p className="text-sm">{viewingMember.expireDate}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-medium text-muted-foreground uppercase">Paid Amount</p>
                  <p className="text-sm font-bold text-green-500">{viewingMember.paid}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-medium text-muted-foreground uppercase">Due Amount</p>
                  <p className="text-sm font-bold text-red-500">{viewingMember.due}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-medium text-muted-foreground uppercase">Status</p>
                  <p className={`text-sm font-bold ${viewingMember.status === "Paid" ? "text-green-500" : "text-yellow-500"}`}>
                    {viewingMember.status}
                  </p>
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <Button className="bg-[#2c9d9d] hover:bg-[#32b0b0]" onClick={() => setIsViewModalOpen(false)}>Close</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-muted-foreground">
              Are you sure you want to remove <span className="font-bold text-foreground">{members.find(m => m.id === deleteMemberId)?.name}</span>? This action cannot be undone.
            </p>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsDeleteModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteMember}>
              Delete Member
            </Button>
          </div>
        </DialogContent>
      </Dialog>

    </div>
  )
}
