import React from 'react';

export interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

export interface StepProps {
  badge: string;
  title: string;
  children: React.ReactNode;
  note?: string;
}

export interface SectionProps {
  title: string;
  icon?: React.ReactNode;
  color?: string; // Tailwind color class for borders/accents
  children: React.ReactNode;
}

export interface StatCardProps {
  title: string;
  value: string | number;
  trend?: string;
  trendUp?: boolean;
  icon: React.ReactNode;
  color: string;
}

export enum MeetingStatus {
  SCHEDULED = 'SCHEDULED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED'
}

export interface Participant {
  id: string;
  name: string;
  avatar: string;
}

export interface Meeting {
  id: string;
  title: string;
  location: string;
  date: string;
  startTime: string;
  endTime: string;
  participants: Participant[];
  status: MeetingStatus;
}