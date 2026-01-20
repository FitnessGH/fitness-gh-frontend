export interface Transaction {
  id: string;
  amount: number;
  date: string;
  method: string;
}

export interface Member {
  id: string;
  memberId: string;
  name: string;
  email: string;
  phone: string;
  photo?: string;
  package: string;
  joinDate: string;
  expireDate: string;
  paid: string;
  due: string;
  status: 'Paid' | 'Not paid';
  transactions: Transaction[];
}

export const initialMembers: Member[] = [
  {
    id: '1',
    memberId: '3536',
    name: 'Cody Fisher',
    email: 'cody@example.com',
    phone: '(555) 012-3456',
    package: 'Gold Membership',
    joinDate: '8/21/15',
    expireDate: '12/4/17',
    paid: '$450',
    due: '$450',
    status: 'Not paid',
    transactions: [
      { id: 'tx_101', amount: 450, date: '2023-01-21', method: 'Credit Card' },
      { id: 'tx_102', amount: 450, date: '2023-02-21', method: 'Credit Card' },
      { id: 'tx_103', amount: 450, date: '2023-03-21', method: 'Credit Card' },
      { id: 'tx_104', amount: 450, date: '2023-04-21', method: 'Credit Card' },
      { id: 'tx_105', amount: 450, date: '2023-05-21', method: 'Credit Card' },
      { id: 'tx_106', amount: 450, date: '2023-06-21', method: 'Credit Card' },
      { id: 'tx_107', amount: 450, date: '2023-07-21', method: 'Credit Card' },
      { id: 'tx_108', amount: 450, date: '2023-08-21', method: 'Credit Card' },
      { id: 'tx_109', amount: 450, date: '2023-09-21', method: 'Credit Card' },
      { id: 'tx_110', amount: 450, date: '2023-10-21', method: 'Credit Card' },
      { id: 'tx_111', amount: 450, date: '2023-11-21', method: 'Credit Card' },
      { id: 'tx_112', amount: 450, date: '2023-12-21', method: 'Credit Card' },
    ],
  },
  {
    id: '2',
    memberId: '4152',
    name: 'Marvin McKinney',
    email: 'marvin@example.com',
    phone: '(555) 012-3457',
    package: 'Silver Membership',
    joinDate: '5/19/12',
    expireDate: '2/11/12',
    paid: '$450',
    due: '$450',
    status: 'Not paid',
    transactions: [
      {
        id: 'tx_102',
        amount: 200,
        date: '2023-05-19',
        method: 'Cash',
      },
      {
        id: 'tx_103',
        amount: 250,
        date: '2023-06-19',
        method: 'Cash',
      },
    ],
  },
  {
    id: '3',
    memberId: '9261',
    name: 'Annette Black',
    email: 'annette@example.com',
    phone: '(555) 012-3458',
    package: 'Platinum Membership',
    joinDate: '3/4/16',
    expireDate: '10/6/13',
    paid: '$450',
    due: '$450',
    status: 'Not paid',
    transactions: [],
  },
  {
    id: '4',
    memberId: '8811',
    name: 'Dianne Russell',
    email: 'dianne@example.com',
    phone: '(555) 012-3459',
    package: 'Gold Membership',
    joinDate: '5/27/15',
    expireDate: '7/11/19',
    paid: '$450',
    due: '$450',
    status: 'Not paid',
    transactions: [],
  },
  {
    id: '5',
    memberId: '5028',
    name: 'Eleanor Pena',
    email: 'eleanor@example.com',
    phone: '(555) 012-3460',
    package: 'Silver Membership',
    joinDate: '9/18/16',
    expireDate: '8/2/19',
    paid: '$450',
    due: '$450',
    status: 'Paid',
    transactions: [
      {
        id: 'tx_104',
        amount: 450,
        date: '2023-09-18',
        method: 'Bank Transfer',
      },
    ],
  },
  {
    id: '6',
    memberId: '5948',
    name: 'Arlene McCoy',
    email: 'arlene@example.com',
    phone: '(555) 012-3461',
    package: 'Platinum Membership',
    joinDate: '8/15/17',
    expireDate: '7/27/13',
    paid: '$450',
    due: '$450',
    status: 'Paid',
    transactions: [
      {
        id: 'tx_105',
        amount: 450,
        date: '2023-08-15',
        method: 'UPI',
      },
    ],
  },
  {
    id: '7',
    memberId: '1148',
    name: 'Darrell Steward',
    email: 'darrell@example.com',
    phone: '(555) 012-3462',
    package: 'Gold Membership',
    joinDate: '12/4/17',
    expireDate: '7/18/17',
    paid: '$450',
    due: '$450',
    status: 'Paid',
    transactions: [],
  },
  {
    id: '8',
    memberId: '6690',
    name: 'Leslie Alexander',
    email: 'leslie@example.com',
    phone: '(555) 012-3463',
    package: 'Silver Membership',
    joinDate: '5/27/15',
    expireDate: '12/10/13',
    paid: '$450',
    due: '$450',
    status: 'Paid',
    transactions: [],
  },
  {
    id: '9',
    memberId: '1439',
    name: 'Floyd Miles',
    email: 'floyd@example.com',
    phone: '(555) 012-3464',
    package: 'Platinum Membership',
    joinDate: '10/6/13',
    expireDate: '4/4/18',
    paid: '$450',
    due: '$450',
    status: 'Paid',
    transactions: [],
  },
  {
    id: '10',
    memberId: '4349',
    name: 'Albert Flores',
    email: 'albert@example.com',
    phone: '(555) 012-3465',
    package: 'Gold Membership',
    joinDate: '7/27/13',
    expireDate: '3/4/16',
    paid: '$450',
    due: '$450',
    status: 'Paid',
    transactions: [],
  },
];

let members: Member[] = [...initialMembers];

export function getMembers(): Member[] {
  return members;
}

export function getMember(id: string): Member | undefined {
  return members.find((m) => m.id === id);
}

export function addMember(member: Member) {
  members.push(member);
}

export function updateMember(updatedMember: Member) {
  members = members.map((m) => (m.id === updatedMember.id ? updatedMember : m));
}

export function deleteMember(id: string) {
  members = members.filter((m) => m.id !== id);
}
