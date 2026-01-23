'use client';

import { Button } from '@/components/ui/button';
import { Column, DataTable } from '@/components/ui/data-table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
  CalendarIcon,
  Clock,
  Eye,
  MapPin,
  MoreVertical,
  Pencil,
  Plus,
  Search,
  Trash,
} from 'lucide-react';
import { useState } from 'react';

interface GymEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  capacity: number;
  attendees: number;
  instructor: string;
  status: 'Upcoming' | 'Ongoing' | 'Completed' | 'Cancelled';
}

const mockEvents: GymEvent[] = [
  {
    id: 'EV001',
    title: 'HIIT Workout Challenge',
    description:
      'High-intensity interval training session for all fitness levels',
    date: '2025-01-18',
    time: '18:00',
    location: 'Main Studio',
    capacity: 30,
    attendees: 24,
    instructor: 'Sarah Johnson',
    status: 'Upcoming',
  },
  {
    id: 'EV002',
    title: 'Yoga & Meditation',
    description: 'Relaxing yoga class with meditation for stress relief',
    date: '2025-01-19',
    time: '10:00',
    location: 'Yoga Studio',
    capacity: 20,
    attendees: 18,
    instructor: 'Emma Davis',
    status: 'Upcoming',
  },
  {
    id: 'EV003',
    title: 'Strength Training Workshop',
    description: 'Learn proper form and techniques for weight training',
    date: '2025-01-17',
    time: '19:00',
    location: 'Weight Training Area',
    capacity: 25,
    attendees: 22,
    instructor: 'John Smith',
    status: 'Ongoing',
  },
  {
    id: 'EV004',
    title: 'Zumba Dance Class',
    description: 'Fun and energetic dance fitness class',
    date: '2025-01-16',
    time: '17:30',
    location: 'Dance Studio',
    capacity: 35,
    attendees: 32,
    instructor: 'Mike Chen',
    status: 'Completed',
  },
];

export default function EventsPage() {
  const [events, setEvents] = useState<GymEvent[]>(mockEvents);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit' | 'view'>(
    'create',
  );
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    capacity: '',
    instructor: '',
  });

  const handleOpenModal = (
    mode: 'create' | 'edit' | 'view',
    event?: GymEvent,
  ) => {
    setModalMode(mode);
    if (event) {
      setSelectedEventId(event.id);
      setFormData({
        title: event.title,
        description: event.description,
        date: event.date,
        time: event.time,
        location: event.location,
        capacity: event.capacity.toString(),
        instructor: event.instructor,
      });
    } else {
      setSelectedEventId(null);
      setFormData({
        title: '',
        description: '',
        date: '',
        time: '',
        location: '',
        capacity: '',
        instructor: '',
      });
    }
    setIsModalOpen(true);
  };

  const columns: Column<GymEvent>[] = [
    {
      header: 'Session Title',
      cell: (event) => (
        <div className="space-y-1">
          <p className="font-medium text-foreground">{event.title}</p>
          <p className="text-xs text-muted-foreground line-clamp-1">
            {event.description}
          </p>
        </div>
      ),
    },
    {
      header: 'Schedule',
      cell: (event) => (
        <div className="space-y-1 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <CalendarIcon className="w-3 h-3 text-[#2c9d9d]" />
            {event.date}
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-3 h-3 text-[#2c9d9d]" />
            {event.time}
          </div>
        </div>
      ),
    },
    {
      header: 'Location',
      cell: (event) => (
        <div className="flex items-center gap-2 text-muted-foreground text-xs">
          <MapPin className="w-3 h-3" />
          {event.location}
        </div>
      ),
    },
    {
      header: 'Attendees',
      headerClassName: 'text-center',
      cell: (event) => (
        <div className="flex flex-col items-center gap-1">
          <span className="text-foreground font-medium text-xs">
            {event.attendees}/{event.capacity}
          </span>
          <div className="w-16 bg-secondary/50 rounded-full h-1">
            <div
              className="bg-[#2c9d9d] h-1 rounded-full"
              style={{ width: `${(event.attendees / event.capacity) * 100}%` }}
            />
          </div>
        </div>
      ),
    },
    {
      header: 'Instructor',
      accessorKey: 'instructor',
      className: 'text-muted-foreground text-xs',
    },
    {
      header: 'Status',
      headerClassName: 'text-center',
      cell: (event) => (
        <div className="flex justify-center">
          <span
            className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(event.status).replace('bg-', 'bg-opacity-10 bg-').replace('text-', 'text-')}`}
            style={{
              backgroundColor: 'rgba(0,0,0,0.1)',
              color: getStatusColor(event.status)
                .split(' ')[1]
                .replace('text-', ''),
            }}
          >
            {event.status}
          </span>
        </div>
      ),
    },
    {
      header: 'Action',
      headerClassName: 'text-center',
      cell: (event) => (
        <div className="flex items-center justify-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="p-1.5 hover:bg-muted/10 rounded transition-colors">
                <MoreVertical className="w-4 h-4 text-muted-foreground" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-40"
            >
              <DropdownMenuItem
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => handleOpenModal('view', event)}
              >
                <Eye className="w-4 h-4 text-green-500" />
                <span>View Details</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => handleOpenModal('edit', event)}
              >
                <Pencil className="w-4 h-4 text-yellow-500" />
                <span>Edit Session</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex items-center gap-2 cursor-pointer text-red-500 hover:text-red-500"
                onClick={() => handleDeleteEvent(event.id)}
              >
                <Trash className="w-4 h-4" />
                <span>Delete Session</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ),
    },
  ];

  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Upcoming':
        return 'bg-blue-100 text-blue-700';
      case 'Ongoing':
        return 'bg-green-100 text-green-700';
      case 'Completed':
        return 'bg-gray-100 text-gray-700';
      case 'Cancelled':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const handleSaveEvent = () => {
    if (modalMode === 'view') return;

    if (modalMode === 'edit' && selectedEventId) {
      setEvents(
        events.map((e) =>
          e.id === selectedEventId
            ? {
                ...e,
                title: formData.title,
                description: formData.description,
                date: formData.date,
                time: formData.time,
                location: formData.location,
                capacity: Number.parseInt(formData.capacity) || 0,
                instructor: formData.instructor,
              }
            : e,
        ),
      );
      console.log('[v0] Event updated:', selectedEventId);
    } else {
      const newEvent: GymEvent = {
        id: `EV${Date.now()}`,
        title: formData.title,
        description: formData.description,
        date: formData.date,
        time: formData.time,
        location: formData.location,
        capacity: Number.parseInt(formData.capacity) || 0,
        attendees: 0,
        instructor: formData.instructor,
        status: 'Upcoming',
      };
      setEvents([...events, newEvent]);
      console.log('[v0] Event created:', newEvent);
    }

    setIsModalOpen(false);
  };

  const handleDeleteEvent = (id: string) => {
    setEvents(events.filter((e) => e.id !== id));
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Pump Sessions</h1>
        <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
          <span>Events</span>
          <span>{'>'}</span>
          <span className="text-foreground">Pump Sessions</span>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-card p-4 rounded-lg">
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
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
        </div>
        <Button
          className="bg-[#2c9d9d] hover:bg-[#32b0b0] text-white w-full md:w-auto"
          onClick={() => handleOpenModal('create')}
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Session
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={filteredEvents}
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
              {modalMode === 'create'
                ? 'Create New Pump Session'
                : modalMode === 'edit'
                  ? 'Edit Pump Session'
                  : 'Session Details'}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Session Title</label>
              <Input
                placeholder="e.g., HIIT Workout Challenge"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                disabled={modalMode === 'view'}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Description</label>
              <Input
                placeholder="Describe the session..."
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                disabled={modalMode === 'view'}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Date</label>
              <Input
                type="date"
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
                disabled={modalMode === 'view'}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Time</label>
              <Input
                type="time"
                value={formData.time}
                onChange={(e) =>
                  setFormData({ ...formData, time: e.target.value })
                }
                disabled={modalMode === 'view'}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Location</label>
              <Input
                placeholder="e.g., Main Studio"
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
                disabled={modalMode === 'view'}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Capacity</label>
              <Input
                type="number"
                placeholder="30"
                value={formData.capacity}
                onChange={(e) =>
                  setFormData({ ...formData, capacity: e.target.value })
                }
                disabled={modalMode === 'view'}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Instructor</label>
              <Input
                placeholder="Instructor name"
                value={formData.instructor}
                onChange={(e) =>
                  setFormData({ ...formData, instructor: e.target.value })
                }
                disabled={modalMode === 'view'}
              />
            </div>
            <div className="flex gap-2 justify-end">
              <Button
                variant="outline"
                onClick={() => setIsModalOpen(false)}
              >
                {modalMode === 'view' ? 'Close' : 'Cancel'}
              </Button>
              {modalMode !== 'view' && (
                <Button
                  onClick={handleSaveEvent}
                  className="bg-primary hover:bg-primary/90"
                >
                  {modalMode === 'create' ? 'Create Session' : 'Save Changes'}
                </Button>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
