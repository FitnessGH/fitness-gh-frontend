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
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", package: "Standard" })

  const handleAddMember = () => {
    // Logic to add member
    setIsModalOpen(false)
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
              className="pl-10 bg-secondary/50 border-none w-full md:w-[300px] rounded-r-none focus-visible:ring-0"
            />
          </div>
          <Button className="rounded-l-none bg-secondary hover:bg-secondary/80 text-foreground border-l border-white/10">Search</Button>
        </div>
        <Button className="bg-[#2c9d9d] hover:bg-[#32b0b0] text-white w-full md:w-auto" onClick={() => setIsModalOpen(true)}>
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
              {members.map((member) => (
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
                      <button className="p-1.5 text-green-500 border border-green-500/20 rounded hover:bg-green-500/10 transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-yellow-500 border border-yellow-500/20 rounded hover:bg-yellow-500/10 transition-colors">
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-red-500 border border-red-500/20 rounded hover:bg-red-500/10 transition-colors">
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
            <DialogTitle>Add New Member</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {/* Form fields here - kept simple for this update */}
            <p className="text-muted-foreground">Form details...</p>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
              <Button className="bg-[#2c9d9d] hover:bg-[#32b0b0]" onClick={handleAddMember}>Add</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
