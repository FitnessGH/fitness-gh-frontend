'use client';

import { getMember, Member, Transaction } from '@/lib/members-data';
import { Avatar, AvatarFallback, AvatarImage } from '@ui/avatar';
import { Button } from '@ui/button';
import { Column, DataTable } from '@ui/data-table';
import { ChevronLeft } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function MemberDetailsPage() {
  const [member, setMember] = useState<Member | undefined>(undefined);

  const router = useRouter();
  const params = useParams();

  const columns: Column<Transaction>[] = [
    {
      header: 'Date',
      accessorKey: 'date',
    },
    {
      header: 'Transaction ID',
      accessorKey: 'id',
      className: 'font-mono text-muted-foreground text-xs',
    },
    {
      header: 'Payment Method',
      accessorKey: 'method',
    },
    {
      header: 'Amount',
      headerClassName: 'text-right',
      className: 'text-right font-medium text-green-500',
      cell: (tx) => `GH₵${tx.amount.toFixed(2)}`,
    },
  ];

  useEffect(() => {
    if (params.id) {
      const foundMember = getMember(params.id as string);
      setMember(foundMember);
    }
  }, [params.id]);

  if (!member) {
    return (
      <div className="p-6">
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="mb-4 pl-0 hover:bg-transparent hover:text-primary"
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Back to Members
        </Button>
        <div className="text-center py-10 text-muted-foreground">
          Member not found or loading...
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="mb-4 pl-0 hover:bg-transparent hover:text-primary"
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Back to Members
        </Button>
        <h1 className="text-2xl font-bold text-foreground">Member Details</h1>
      </div>

      <div className="bg-card rounded-lg p-6 shadow-sm border border-border/40">
        <div className="flex flex-col md:flex-row gap-6 md:items-start">
          <div className="shrink-0">
            <Avatar className="w-24 h-24 rounded-full border-4 border-secondary/50">
              <AvatarImage src={`https://i.pravatar.cc/150?u=${member.id}`} />
              <AvatarFallback className="text-2xl bg-secondary text-secondary-foreground">
                {member.name.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </div>

          <div className="flex-1 space-y-6">
            <div>
              <h2 className="text-2xl font-bold">{member.name}</h2>
              <p className="text-[#2c9d9d] font-medium text-lg">
                {member.package}
              </p>
              <p className="text-sm text-muted-foreground">
                Member ID:{' '}
                <span className="font-mono text-foreground">
                  {member.memberId}
                </span>
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4">
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase mb-1">
                  Email
                </p>
                <p className="text-base">{member.email}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase mb-1">
                  Phone
                </p>
                <p className="text-base">{member.phone}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase mb-1">
                  Status
                </p>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${member.status === 'Paid' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'}`}
                >
                  {member.status}
                </span>
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase mb-1">
                  Joining Date
                </p>
                <p className="text-base">{member.joinDate}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase mb-1">
                  Expiry Date
                </p>
                <p className="text-base">{member.expireDate}</p>
              </div>
            </div>
          </div>

          <div className="bg-secondary/20 p-4 rounded-lg min-w-50 space-y-4 md:text-right">
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase">
                Paid Amount
              </p>
              <p className="text-2xl font-bold text-green-500">{member.paid}</p>
            </div>
            <div className="border-t border-border/20 pt-4">
              <p className="text-xs font-medium text-muted-foreground uppercase">
                Due Amount
              </p>
              <p className="text-2xl font-bold text-red-500">{member.due}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-bold">Transaction History</h3>
        {member.transactions && member.transactions.length > 0 ? (
          <DataTable
            columns={columns}
            data={member.transactions}
            className="border border-border/40 shadow-sm p-4 bg-card rounded-lg"
            pageSize={5}
          />
        ) : (
          <div className="p-8 text-center border-2 border-dashed border-border/40 rounded-lg text-muted-foreground">
            No transaction history available.
          </div>
        )}
      </div>
    </div>
  );
}
