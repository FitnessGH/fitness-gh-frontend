'use client';

import { BebasFont } from '@/constant';
import { cn } from '@/lib/utils';
import { Badge } from '@ui/badge';
import { Button } from '@ui/button';
import {
  ArrowLeft,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  Dumbbell,
  ExternalLink,
  Flame,
  Heart,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Share2,
  Sparkles,
  Star,
  Users,
  Waves,
  Wifi,
  Zap,
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

interface Gym {
  id: number;
  name: string;
  location: string;
  area: string;
  description: string;
  price: number;
  rating: number;
  reviews: number;
  members: number;
  distance: number;
  amenities: string[];
  images: string[];
  featured: boolean;
  openNow: boolean;
  hours: { day: string; open: string; close: string }[];
  phone: string;
  email: string;
  website: string;
  plans: {
    name: string;
    price: number;
    duration: string;
    features: string[];
  }[];
  trainers: { name: string; specialty: string; image: string }[];
  reviewsList: {
    name: string;
    rating: number;
    date: string;
    comment: string;
    avatar: string;
  }[];
}

const MOCK_GYMS: Record<string, Gym> = {
  '1': {
    id: 1,
    name: 'FitClub Downtown',
    location: '123 Oxford Street',
    area: 'Osu, Accra',
    description:
      "FitClub Downtown is a premier fitness destination offering state-of-the-art equipment, expert personal trainers, and a vibrant community atmosphere. Our 15,000 sq ft facility features dedicated zones for strength training, cardio, functional fitness, and group classes. Whether you're a beginner or an experienced athlete, our team is here to help you achieve your fitness goals.",
    price: 89,
    rating: 4.8,
    reviews: 342,
    members: 1240,
    distance: 0.8,
    amenities: [
      'Weight Training',
      'Cardio Zone',
      'Swimming Pool',
      'Yoga Studio',
      'Sauna',
      'Steam Room',
      'Locker Rooms',
      'Towel Service',
      'Free WiFi',
      'Parking',
      'Juice Bar',
      'Personal Training',
    ],
    images: [
      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1540497905703-29efb88a5602?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1593079831268-3381b0db4a77?w=1200&h=800&fit=crop',
    ],
    featured: true,
    openNow: true,
    hours: [
      { day: 'Monday', open: '5:00 AM', close: '11:00 PM' },
      { day: 'Tuesday', open: '5:00 AM', close: '11:00 PM' },
      { day: 'Wednesday', open: '5:00 AM', close: '11:00 PM' },
      { day: 'Thursday', open: '5:00 AM', close: '11:00 PM' },
      { day: 'Friday', open: '5:00 AM', close: '10:00 PM' },
      { day: 'Saturday', open: '6:00 AM', close: '8:00 PM' },
      { day: 'Sunday', open: '7:00 AM', close: '6:00 PM' },
    ],
    phone: '+233 20 123 4567',
    email: 'info@fitclubdowntown.com',
    website: 'www.fitclubdowntown.com',
    plans: [
      {
        name: 'Basic',
        price: 89,
        duration: 'month',
        features: ['Gym Access', 'Locker Room', 'Free WiFi', 'Basic Equipment'],
      },
      {
        name: 'Premium',
        price: 149,
        duration: 'month',
        features: [
          'Full Gym Access',
          'Pool & Sauna',
          'Group Classes',
          'Towel Service',
          '1 PT Session/month',
        ],
      },
      {
        name: 'Elite',
        price: 249,
        duration: 'month',
        features: [
          'Unlimited Access',
          'All Amenities',
          'Unlimited Classes',
          '4 PT Sessions/month',
          'Nutrition Consultation',
          'Priority Booking',
        ],
      },
    ],
    trainers: [
      {
        name: 'Kwame Asante',
        specialty: 'Strength & Conditioning',
        image:
          'https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=200&h=200&fit=crop',
      },
      {
        name: 'Ama Mensah',
        specialty: 'Yoga & Pilates',
        image:
          'https://images.unsplash.com/photo-1594381898411-846e7d193883?w=200&h=200&fit=crop',
      },
      {
        name: 'Kofi Boateng',
        specialty: 'CrossFit & HIIT',
        image:
          'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=200&h=200&fit=crop',
      },
    ],
    reviewsList: [
      {
        name: 'Abena K.',
        rating: 5,
        date: '2 weeks ago',
        comment:
          "Amazing facility! The equipment is top-notch and the trainers are incredibly helpful. I've seen great results since joining.",
        avatar:
          'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
      },
      {
        name: 'Emmanuel O.',
        rating: 5,
        date: '1 month ago',
        comment:
          'Best gym in Accra! Clean, well-maintained, and the community vibe is fantastic. Highly recommend the group classes.',
        avatar:
          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
      },
      {
        name: 'Nana A.',
        rating: 4,
        date: '1 month ago',
        comment:
          'Great gym overall. Sometimes gets crowded during peak hours but the staff manages it well. Love the pool!',
        avatar:
          'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
      },
    ],
  },
  '2': {
    id: 2,
    name: 'PowerLift Gym',
    location: '45 American House Road',
    area: 'East Legon, Accra',
    description:
      'PowerLift Gym is the ultimate destination for serious lifters and fitness enthusiasts. Specializing in weightlifting and CrossFit, we offer specialized equipment, Olympic platforms, and expert coaching to help you reach your strength goals.',
    price: 79,
    rating: 4.6,
    reviews: 289,
    members: 856,
    distance: 1.2,
    amenities: [
      'Weightlifting',
      'CrossFit Box',
      'Personal Training',
      'Supplements Shop',
      'Locker Rooms',
      'Showers',
      'Free Parking',
      'Chalk Stations',
    ],
    images: [
      'https://images.unsplash.com/photo-1540497905703-29efb88a5602?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1558611848-73f7eb4001a1?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&h=800&fit=crop',
    ],
    featured: false,
    openNow: true,
    hours: [
      { day: 'Monday', open: '6:00 AM', close: '10:00 PM' },
      { day: 'Tuesday', open: '6:00 AM', close: '10:00 PM' },
      { day: 'Wednesday', open: '6:00 AM', close: '10:00 PM' },
      { day: 'Thursday', open: '6:00 AM', close: '10:00 PM' },
      { day: 'Friday', open: '6:00 AM', close: '9:00 PM' },
      { day: 'Saturday', open: '7:00 AM', close: '7:00 PM' },
      { day: 'Sunday', open: '8:00 AM', close: '5:00 PM' },
    ],
    phone: '+233 24 567 8901',
    email: 'info@powerliftgym.com',
    website: 'www.powerliftgym.com',
    plans: [
      {
        name: 'Standard',
        price: 79,
        duration: 'month',
        features: ['Gym Access', 'Locker Room', 'Free Parking'],
      },
      {
        name: 'Pro',
        price: 129,
        duration: 'month',
        features: [
          'Full Access',
          'CrossFit Classes',
          '2 PT Sessions/month',
          'Supplement Discount',
        ],
      },
    ],
    trainers: [
      {
        name: 'Daniel Tetteh',
        specialty: 'Olympic Weightlifting',
        image:
          'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=200&h=200&fit=crop',
      },
      {
        name: 'Grace Addo',
        specialty: 'CrossFit Coach',
        image:
          'https://images.unsplash.com/photo-1594381898411-846e7d193883?w=200&h=200&fit=crop',
      },
    ],
    reviewsList: [
      {
        name: 'Michael T.',
        rating: 5,
        date: '3 weeks ago',
        comment:
          'Perfect for serious lifters. Great equipment and knowledgeable staff.',
        avatar:
          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
      },
      {
        name: 'Sarah M.',
        rating: 4,
        date: '2 months ago',
        comment: 'Intense atmosphere, love the CrossFit community here!',
        avatar:
          'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
      },
    ],
  },
  '3': {
    id: 3,
    name: 'Yoga & Wellness Center',
    location: '12 Fifth Circular Road',
    area: 'Labone, Accra',
    description:
      'Find your inner peace at Yoga & Wellness Center. We offer a sanctuary for mind-body wellness with expert-led yoga classes, meditation sessions, pilates, and spa treatments. Our serene environment is designed to help you de-stress and rejuvenate.',
    price: 59,
    rating: 4.9,
    reviews: 456,
    members: 645,
    distance: 1.5,
    amenities: [
      'Yoga Classes',
      'Pilates Studio',
      'Meditation Room',
      'Spa Services',
      'Juice Bar',
      'Mat Rental',
      'Changing Rooms',
      'Aromatherapy',
    ],
    images: [
      'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1588286840104-8957b019727f?w=1200&h=800&fit=crop',
    ],
    featured: true,
    openNow: true,
    hours: [
      { day: 'Monday', open: '6:00 AM', close: '9:00 PM' },
      { day: 'Tuesday', open: '6:00 AM', close: '9:00 PM' },
      { day: 'Wednesday', open: '6:00 AM', close: '9:00 PM' },
      { day: 'Thursday', open: '6:00 AM', close: '9:00 PM' },
      { day: 'Friday', open: '6:00 AM', close: '8:00 PM' },
      { day: 'Saturday', open: '7:00 AM', close: '6:00 PM' },
      { day: 'Sunday', open: '8:00 AM', close: '4:00 PM' },
    ],
    phone: '+233 27 890 1234',
    email: 'namaste@yogawellness.com',
    website: 'www.yogawellnessgh.com',
    plans: [
      {
        name: 'Drop-in',
        price: 25,
        duration: 'class',
        features: ['Single Class', 'Mat Provided'],
      },
      {
        name: 'Monthly',
        price: 59,
        duration: 'month',
        features: ['Unlimited Yoga', 'Meditation Access', 'Mat Rental'],
      },
      {
        name: 'Wellness',
        price: 99,
        duration: 'month',
        features: [
          'Unlimited Classes',
          'Spa Discount',
          'Juice Bar Credit',
          'Priority Booking',
        ],
      },
    ],
    trainers: [
      {
        name: 'Akua Nyarko',
        specialty: 'Vinyasa & Hatha Yoga',
        image:
          'https://images.unsplash.com/photo-1594381898411-846e7d193883?w=200&h=200&fit=crop',
      },
      {
        name: 'Yaw Frimpong',
        specialty: 'Meditation & Breathwork',
        image:
          'https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=200&h=200&fit=crop',
      },
    ],
    reviewsList: [
      {
        name: 'Linda A.',
        rating: 5,
        date: '1 week ago',
        comment:
          'The most peaceful space in Accra. The instructors are amazing and very patient.',
        avatar:
          'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
      },
      {
        name: 'James K.',
        rating: 5,
        date: '3 weeks ago',
        comment: 'Started yoga here 6 months ago. Life-changing experience!',
        avatar:
          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
      },
    ],
  },
  '4': {
    id: 4,
    name: 'Elite Sports Complex',
    location: '8 Airport Bypass Road',
    area: 'Airport Residential, Accra',
    description:
      'Elite Sports Complex is a world-class multi-sport facility featuring an Olympic-size swimming pool, basketball courts, rock climbing wall, and a fully-equipped gym. Perfect for athletes and fitness enthusiasts who want variety in their training.',
    price: 119,
    rating: 4.7,
    reviews: 523,
    members: 2100,
    distance: 2.3,
    amenities: [
      'Full Equipment',
      'Olympic Pool',
      'Basketball Court',
      'Climbing Wall',
      'Steam Room',
      'Sauna',
      'Cafe',
      'Pro Shop',
      'Parking',
      'Kids Zone',
    ],
    images: [
      'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1593079831268-3381b0db4a77?w=1200&h=800&fit=crop',
    ],
    featured: true,
    openNow: false,
    hours: [
      { day: 'Monday', open: '5:30 AM', close: '10:30 PM' },
      { day: 'Tuesday', open: '5:30 AM', close: '10:30 PM' },
      { day: 'Wednesday', open: '5:30 AM', close: '10:30 PM' },
      { day: 'Thursday', open: '5:30 AM', close: '10:30 PM' },
      { day: 'Friday', open: '5:30 AM', close: '10:00 PM' },
      { day: 'Saturday', open: '6:00 AM', close: '9:00 PM' },
      { day: 'Sunday', open: '7:00 AM', close: '7:00 PM' },
    ],
    phone: '+233 30 234 5678',
    email: 'info@elitesportscomplex.com',
    website: 'www.elitesportscomplex.com',
    plans: [
      {
        name: 'Gym Only',
        price: 119,
        duration: 'month',
        features: ['Gym Access', 'Locker Room', 'Basic Amenities'],
      },
      {
        name: 'All Access',
        price: 199,
        duration: 'month',
        features: [
          'Full Facility Access',
          'Pool & Courts',
          'Climbing Wall',
          'Steam & Sauna',
        ],
      },
      {
        name: 'Family',
        price: 349,
        duration: 'month',
        features: [
          '4 Family Members',
          'Full Access',
          'Kids Zone',
          'Guest Passes',
        ],
      },
    ],
    trainers: [
      {
        name: 'Prince Owusu',
        specialty: 'Swimming Coach',
        image:
          'https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=200&h=200&fit=crop',
      },
      {
        name: 'Efua Darko',
        specialty: 'Basketball & Fitness',
        image:
          'https://images.unsplash.com/photo-1594381898411-846e7d193883?w=200&h=200&fit=crop',
      },
    ],
    reviewsList: [
      {
        name: 'Frank O.',
        rating: 5,
        date: '2 weeks ago',
        comment:
          'Incredible facility! The pool is Olympic standard and always clean.',
        avatar:
          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
      },
      {
        name: 'Melissa B.',
        rating: 4,
        date: '1 month ago',
        comment: 'Great for families. My kids love the climbing wall!',
        avatar:
          'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
      },
    ],
  },
  '5': {
    id: 5,
    name: 'Iron Temple Fitness',
    location: '67 Josif Broz Tito Avenue',
    area: 'Cantonments, Accra',
    description:
      'Iron Temple Fitness is dedicated to bodybuilding and strength training. With heavy-duty equipment, dedicated spotters, and a no-nonsense attitude, we cater to serious lifters looking to build muscle and strength.',
    price: 95,
    rating: 4.5,
    reviews: 198,
    members: 520,
    distance: 2.8,
    amenities: [
      'Bodybuilding',
      'Sauna',
      'Supplements',
      'Personal Training',
      'Posing Room',
      'Locker Rooms',
    ],
    images: [
      'https://images.unsplash.com/photo-1558611848-73f7eb4001a1?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1540497905703-29efb88a5602?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1200&h=800&fit=crop',
    ],
    featured: false,
    openNow: true,
    hours: [
      { day: 'Monday', open: '5:00 AM', close: '11:00 PM' },
      { day: 'Tuesday', open: '5:00 AM', close: '11:00 PM' },
      { day: 'Wednesday', open: '5:00 AM', close: '11:00 PM' },
      { day: 'Thursday', open: '5:00 AM', close: '11:00 PM' },
      { day: 'Friday', open: '5:00 AM', close: '10:00 PM' },
      { day: 'Saturday', open: '6:00 AM', close: '8:00 PM' },
      { day: 'Sunday', open: '7:00 AM', close: '6:00 PM' },
    ],
    phone: '+233 26 345 6789',
    email: 'lift@irontemple.com',
    website: 'www.irontemple.com',
    plans: [
      {
        name: 'Monthly',
        price: 95,
        duration: 'month',
        features: ['Full Gym Access', 'Sauna', 'Posing Room'],
      },
      {
        name: 'Competitor',
        price: 165,
        duration: 'month',
        features: [
          'Full Access',
          '4 PT Sessions',
          'Supplement Discount',
          'Competition Prep',
        ],
      },
    ],
    trainers: [
      {
        name: 'Kwesi Strong',
        specialty: 'Bodybuilding Coach',
        image:
          'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=200&h=200&fit=crop',
      },
    ],
    reviewsList: [
      {
        name: 'David A.',
        rating: 5,
        date: '1 month ago',
        comment: 'Best gym for serious bodybuilders. No frills, just iron.',
        avatar:
          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
      },
    ],
  },
  '6': {
    id: 6,
    name: 'CrossFit Accra',
    location: '23 Ring Road Central',
    area: 'Ridge, Accra',
    description:
      'CrossFit Accra is the premier CrossFit box in Ghana. Join our community of athletes for high-intensity functional training, expert coaching, and a supportive environment that pushes you to be your best.',
    price: 110,
    rating: 4.8,
    reviews: 312,
    members: 780,
    distance: 3.1,
    amenities: [
      'CrossFit',
      'HIIT',
      'Nutrition Coaching',
      'Group Classes',
      'Open Gym',
      'Showers',
      'Parking',
    ],
    images: [
      'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1540497905703-29efb88a5602?w=1200&h=800&fit=crop',
    ],
    featured: false,
    openNow: true,
    hours: [
      { day: 'Monday', open: '5:30 AM', close: '8:30 PM' },
      { day: 'Tuesday', open: '5:30 AM', close: '8:30 PM' },
      { day: 'Wednesday', open: '5:30 AM', close: '8:30 PM' },
      { day: 'Thursday', open: '5:30 AM', close: '8:30 PM' },
      { day: 'Friday', open: '5:30 AM', close: '7:30 PM' },
      { day: 'Saturday', open: '7:00 AM', close: '12:00 PM' },
      { day: 'Sunday', open: 'Closed', close: 'Closed' },
    ],
    phone: '+233 28 456 7890',
    email: 'wod@crossfitaccra.com',
    website: 'www.crossfitaccra.com',
    plans: [
      {
        name: 'Unlimited',
        price: 110,
        duration: 'month',
        features: ['Unlimited Classes', 'Open Gym', 'Community Events'],
      },
      {
        name: 'Competition',
        price: 180,
        duration: 'month',
        features: [
          'Unlimited Access',
          'Competition Training',
          'Nutrition Plan',
          '1-on-1 Coaching',
        ],
      },
    ],
    trainers: [
      {
        name: 'Eric Osei',
        specialty: 'CrossFit L3 Coach',
        image:
          'https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=200&h=200&fit=crop',
      },
      {
        name: 'Adjoa Williams',
        specialty: 'Olympic Lifting',
        image:
          'https://images.unsplash.com/photo-1594381898411-846e7d193883?w=200&h=200&fit=crop',
      },
    ],
    reviewsList: [
      {
        name: 'Chris M.',
        rating: 5,
        date: '2 weeks ago',
        comment:
          'Best CrossFit community in Ghana. The coaches are world-class!',
        avatar:
          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
      },
    ],
  },
  '7': {
    id: 7,
    name: 'Aqua Fitness Hub',
    location: '15 Liberation Road',
    area: 'Adabraka, Accra',
    description:
      'Aqua Fitness Hub specializes in water-based fitness activities. Our facility features a large pool for swimming laps, aqua aerobics classes, and water therapy sessions, plus a traditional gym and cardio area.',
    price: 75,
    rating: 4.4,
    reviews: 167,
    members: 430,
    distance: 3.5,
    amenities: [
      'Swimming',
      'Aqua Aerobics',
      'Cardio',
      'Steam Room',
      'Changing Rooms',
      'Cafe',
    ],
    images: [
      'https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1540497905703-29efb88a5602?w=1200&h=800&fit=crop',
    ],
    featured: false,
    openNow: true,
    hours: [
      { day: 'Monday', open: '6:00 AM', close: '9:00 PM' },
      { day: 'Tuesday', open: '6:00 AM', close: '9:00 PM' },
      { day: 'Wednesday', open: '6:00 AM', close: '9:00 PM' },
      { day: 'Thursday', open: '6:00 AM', close: '9:00 PM' },
      { day: 'Friday', open: '6:00 AM', close: '8:00 PM' },
      { day: 'Saturday', open: '7:00 AM', close: '6:00 PM' },
      { day: 'Sunday', open: '8:00 AM', close: '4:00 PM' },
    ],
    phone: '+233 29 567 8901',
    email: 'splash@aquafitnesshub.com',
    website: 'www.aquafitnesshub.com',
    plans: [
      {
        name: 'Swim Only',
        price: 50,
        duration: 'month',
        features: ['Pool Access', 'Changing Rooms'],
      },
      {
        name: 'Full Access',
        price: 75,
        duration: 'month',
        features: ['Pool & Gym', 'Aqua Classes', 'Steam Room'],
      },
    ],
    trainers: [
      {
        name: 'Vida Ampong',
        specialty: 'Aqua Fitness Instructor',
        image:
          'https://images.unsplash.com/photo-1594381898411-846e7d193883?w=200&h=200&fit=crop',
      },
    ],
    reviewsList: [
      {
        name: 'Patricia N.',
        rating: 4,
        date: '3 weeks ago',
        comment: 'Great pool and the aqua aerobics classes are so much fun!',
        avatar:
          'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
      },
    ],
  },
  '8': {
    id: 8,
    name: 'Urban Athletics',
    location: '33 Spintex Road',
    area: 'Spintex, Accra',
    description:
      'Urban Athletics is a modern fitness center focused on functional training and combat sports. Our facility includes a boxing ring, MMA cage, functional training area, and recovery zone.',
    price: 85,
    rating: 4.6,
    reviews: 234,
    members: 920,
    distance: 4.2,
    amenities: [
      'Functional Training',
      'Boxing',
      'Cardio',
      'Recovery Zone',
      'MMA Cage',
      'Showers',
      'Parking',
    ],
    images: [
      'https://images.unsplash.com/photo-1593079831268-3381b0db4a77?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=1200&h=800&fit=crop',
    ],
    featured: false,
    openNow: false,
    hours: [
      { day: 'Monday', open: '6:00 AM', close: '10:00 PM' },
      { day: 'Tuesday', open: '6:00 AM', close: '10:00 PM' },
      { day: 'Wednesday', open: '6:00 AM', close: '10:00 PM' },
      { day: 'Thursday', open: '6:00 AM', close: '10:00 PM' },
      { day: 'Friday', open: '6:00 AM', close: '9:00 PM' },
      { day: 'Saturday', open: '7:00 AM', close: '7:00 PM' },
      { day: 'Sunday', open: '8:00 AM', close: '5:00 PM' },
    ],
    phone: '+233 25 678 9012',
    email: 'fight@urbanathletics.com',
    website: 'www.urbanathletics.com',
    plans: [
      {
        name: 'Fitness',
        price: 85,
        duration: 'month',
        features: ['Gym Access', 'Functional Area', 'Recovery Zone'],
      },
      {
        name: 'Fighter',
        price: 140,
        duration: 'month',
        features: [
          'Full Access',
          'Boxing/MMA Classes',
          'Sparring Sessions',
          'Coach Access',
        ],
      },
    ],
    trainers: [
      {
        name: 'Samuel Boxer',
        specialty: 'Boxing Coach',
        image:
          'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=200&h=200&fit=crop',
      },
      {
        name: 'Naa Kwarley',
        specialty: 'Functional Fitness',
        image:
          'https://images.unsplash.com/photo-1594381898411-846e7d193883?w=200&h=200&fit=crop',
      },
    ],
    reviewsList: [
      {
        name: 'Robert K.',
        rating: 5,
        date: '1 month ago',
        comment: 'Best boxing gym in Accra! The coaches are legit.',
        avatar:
          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
      },
    ],
  },
};

const AMENITY_ICONS: Record<string, typeof Dumbbell> = {
  'Weight Training': Dumbbell,
  Weightlifting: Dumbbell,
  Bodybuilding: Dumbbell,
  'Full Equipment': Dumbbell,
  Pool: Waves,
  'Olympic Pool': Waves,
  'Swimming Pool': Waves,
  Swimming: Waves,
  CrossFit: Zap,
  'CrossFit Box': Zap,
  HIIT: Zap,
  Cardio: Zap,
  'Cardio Zone': Zap,
  'Functional Training': Zap,
  Yoga: Flame,
  'Yoga Studio': Flame,
  'Yoga Classes': Flame,
  Pilates: Flame,
  'Pilates Studio': Flame,
  Meditation: Flame,
  'Meditation Room': Flame,
  Sauna: Sparkles,
  'Steam Room': Sparkles,
  Spa: Sparkles,
  'Spa Services': Sparkles,
  'Free WiFi': Wifi,
  WiFi: Wifi,
  default: CheckCircle2,
};

function getAmenityIcon(amenity: string) {
  return AMENITY_ICONS[amenity] || AMENITY_ICONS.default;
}

export function GymDetailContent({ gymId }: { gymId: string }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(0);

  const gym = MOCK_GYMS[gymId];

  if (!gym) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center py-20 px-6">
        <div className="w-20 h-20 rounded-full bg-muted/50 flex items-center justify-center mb-6">
          <Dumbbell className="w-8 h-8 text-muted-foreground" />
        </div>
        <h1 className={cn(BebasFont.className, 'text-3xl mb-2')}>
          Gym Not Found
        </h1>
        <p className="text-muted-foreground mb-6">
          The gym you're looking for doesn't exist.
        </p>
        <Link href="/browse-gyms">
          <Button className="rounded-xl">Browse All Gyms</Button>
        </Link>
      </div>
    );
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % gym.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + gym.images.length) % gym.images.length,
    );
  };

  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
  const todayHours = gym.hours.find((h) => h.day === today);

  return (
    <div className="min-h-screen pb-20">
      <div className="relative">
        <div className="relative h-[50vh] md:h-[60vh] overflow-hidden">
          <img
            src={gym.images[currentImageIndex]}
            alt={gym.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-background via-background/20 to-transparent" />

          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center text-foreground hover:bg-background transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center text-foreground hover:bg-background transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2">
            {gym.images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentImageIndex(idx)}
                className={cn(
                  'w-2 h-2 rounded-full transition-all',
                  idx === currentImageIndex
                    ? 'w-8 bg-primary'
                    : 'bg-white/50 hover:bg-white/80',
                )}
              />
            ))}
          </div>

          <div className="absolute top-0 left-0 right-0 p-4 md:p-6 flex items-center justify-between">
            <Link
              href="/browse-gyms"
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-background/80 backdrop-blur-sm text-foreground hover:bg-background transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm font-medium">Back</span>
            </Link>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className={cn(
                  'w-10 h-10 rounded-full flex items-center justify-center transition-all',
                  isFavorite
                    ? 'bg-red-500 text-white'
                    : 'bg-background/80 backdrop-blur-sm text-foreground hover:bg-background',
                )}
              >
                <Heart
                  className={cn('w-5 h-5', isFavorite && 'fill-current')}
                />
              </button>
              <button className="w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center text-foreground hover:bg-background transition-colors">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="absolute bottom-20 left-6 flex items-center gap-2">
            {gym.featured && (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-linear-to-r from-yellow-500 to-orange-500 text-white text-sm font-semibold">
                <Sparkles className="w-4 h-4" />
                Featured
              </div>
            )}
            {gym.openNow ? (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500 text-white text-sm font-semibold">
                <Clock className="w-4 h-4" />
                Open Now
              </div>
            ) : (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted text-muted-foreground text-sm font-semibold">
                <Clock className="w-4 h-4" />
                Closed
              </div>
            )}
          </div>
        </div>

        <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 hidden md:flex items-center gap-2 p-2 rounded-2xl bg-card/90 backdrop-blur-sm border border-border/50">
          {gym.images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentImageIndex(idx)}
              className={cn(
                'w-16 h-12 rounded-lg overflow-hidden transition-all',
                idx === currentImageIndex
                  ? 'ring-2 ring-primary ring-offset-2 ring-offset-card'
                  : 'opacity-60 hover:opacity-100',
              )}
            >
              <img
                src={img}
                alt=""
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-16 md:pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div>
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <h1
                    className={cn(
                      BebasFont.className,
                      'text-4xl md:text-5xl lg:text-6xl',
                    )}
                  >
                    {gym.name}
                  </h1>
                  <p className="text-lg text-muted-foreground flex items-center gap-2 mt-2">
                    <MapPin className="w-5 h-5 text-primary" />
                    {gym.location}, {gym.area}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 md:gap-6">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                    <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                    <span className="font-semibold">{gym.rating}</span>
                  </div>
                  <span className="text-muted-foreground">
                    ({gym.reviews} reviews)
                  </span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Users className="w-5 h-5" />
                  <span>{gym.members.toLocaleString()} members</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="w-5 h-5" />
                  <span>{gym.distance} km away</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className={cn(BebasFont.className, 'text-2xl')}>About</h2>
              <p className="text-muted-foreground leading-relaxed">
                {gym.description}
              </p>
            </div>

            <div className="space-y-4">
              <h2 className={cn(BebasFont.className, 'text-2xl')}>Amenities</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {gym.amenities.map((amenity) => {
                  const Icon = getAmenityIcon(amenity);
                  return (
                    <div
                      key={amenity}
                      className="flex items-center gap-3 p-3 rounded-xl bg-card/50 border border-border/50"
                    >
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <span className="text-sm font-medium">{amenity}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {gym.trainers.length > 0 && (
              <div className="space-y-4">
                <h2 className={cn(BebasFont.className, 'text-2xl')}>
                  Our Trainers
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {gym.trainers.map((trainer, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-4 p-4 rounded-xl bg-card/50 border border-border/50"
                    >
                      <img
                        src={trainer.image}
                        alt={trainer.name}
                        className="w-14 h-14 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-semibold">{trainer.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {trainer.specialty}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className={cn(BebasFont.className, 'text-2xl')}>Reviews</h2>
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-xl gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  Write a Review
                </Button>
              </div>
              <div className="space-y-4">
                {gym.reviewsList.map((review, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-xl bg-card/50 border border-border/50 space-y-3"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <img
                          src={review.avatar}
                          alt={review.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                          <p className="font-semibold">{review.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {review.date}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={cn(
                              'w-4 h-4',
                              i < review.rating
                                ? 'text-yellow-500 fill-yellow-500'
                                : 'text-muted-foreground',
                            )}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-muted-foreground">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="sticky top-6 space-y-6">
              <div className="p-6 rounded-2xl bg-card border border-border/50 space-y-6">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-1">
                    Starting from
                  </p>
                  <div
                    className={cn(BebasFont.className, 'text-5xl text-primary')}
                  >
                    GH₵{gym.price}
                    <span className="text-lg text-muted-foreground font-sans">
                      /mo
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  {gym.plans.map((plan, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedPlan(idx)}
                      className={cn(
                        'w-full p-4 rounded-xl border text-left transition-all',
                        selectedPlan === idx
                          ? 'border-primary bg-primary/10'
                          : 'border-border/50 hover:border-primary/50',
                      )}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold">{plan.name}</span>
                        <span
                          className={cn(
                            BebasFont.className,
                            'text-xl text-primary',
                          )}
                        >
                          GH₵{plan.price}
                          <span className="text-xs text-muted-foreground font-sans">
                            /{plan.duration}
                          </span>
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {plan.features.slice(0, 3).map((feature, fidx) => (
                          <Badge
                            key={fidx}
                            variant="outline"
                            className="text-[10px] px-2 py-0.5 border-border/50"
                          >
                            {feature}
                          </Badge>
                        ))}
                        {plan.features.length > 3 && (
                          <Badge
                            variant="outline"
                            className="text-[10px] px-2 py-0.5 border-primary/30 text-primary"
                          >
                            +{plan.features.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </button>
                  ))}
                </div>

                <Link
                  href="/signup/customer"
                  className="block"
                >
                  <Button className="w-full h-14 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-lg gap-2">
                    Join This Gym
                    <ChevronRight className="w-5 h-5" />
                  </Button>
                </Link>

                <p className="text-xs text-center text-muted-foreground">
                  Create an account to join and manage your membership
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-card border border-border/50 space-y-4">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold">Opening Hours</h3>
                </div>
                <div className="space-y-2">
                  {gym.hours.map((hour, idx) => (
                    <div
                      key={idx}
                      className={cn(
                        'flex items-center justify-between py-2 px-3 rounded-lg text-sm',
                        hour.day === today && 'bg-primary/10',
                      )}
                    >
                      <span
                        className={cn(
                          hour.day === today
                            ? 'font-semibold'
                            : 'text-muted-foreground',
                        )}
                      >
                        {hour.day}
                      </span>
                      <span
                        className={cn(hour.day === today && 'font-semibold')}
                      >
                        {hour.open === 'Closed'
                          ? 'Closed'
                          : `${hour.open} - ${hour.close}`}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-card border border-border/50 space-y-4">
                <h3 className="font-semibold">Contact Information</h3>
                <div className="space-y-3">
                  <a
                    href={`tel:${gym.phone}`}
                    className="flex items-center gap-3 p-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Phone className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Phone</p>
                      <p className="font-medium">{gym.phone}</p>
                    </div>
                  </a>
                  <a
                    href={`mailto:${gym.email}`}
                    className="flex items-center gap-3 p-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Email</p>
                      <p className="font-medium">{gym.email}</p>
                    </div>
                  </a>
                  <a
                    href={`https://${gym.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <ExternalLink className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Website</p>
                      <p className="font-medium">{gym.website}</p>
                    </div>
                  </a>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-card border border-border/50 space-y-4">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold">Location</h3>
                </div>
                <div className="aspect-video rounded-xl bg-muted/50 flex items-center justify-center border border-border/50">
                  <div className="text-center">
                    <MapPin className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">
                      {gym.location}
                      <br />
                      {gym.area}
                    </p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="w-full rounded-xl gap-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  Get Directions
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
