import { create } from 'zustand';
import { TimelineFilter } from '../types/timeline.types';

interface TimelineStore {
  activeFilter: TimelineFilter['type'];
  setActiveFilter: (filter: TimelineFilter['type']) => void;
  expandedEvents: Set<string>;
  toggleEventExpansion: (eventId: string) => void;
}

export const useTimelineStore = create<TimelineStore>((set) => ({
  activeFilter: 'all',
  setActiveFilter: (filter) => set({ activeFilter: filter }),
  expandedEvents: new Set(),
  toggleEventExpansion: (eventId) => set((state) => {
    const newExpanded = new Set(state.expandedEvents);
    if (newExpanded.has(eventId)) {
      newExpanded.delete(eventId);
    } else {
      newExpanded.add(eventId);
    }
    return { expandedEvents: newExpanded };
  }),
}));