
import { create } from 'zustand'
import { FilterType } from '@/lib/types'
import { groups } from '@/lib/data/groups'

//shape of the store - what data it holds and what actions (function) can change that data

interface AppState {
    // --- STATE ---

    //which groups are currently toggle ON in the sidebar
    //starts with all group names active
    activeGroups: string[]
    
    //the current filter - all, gg, bg, or soloist
    filterType: FilterType

    currentMonth: Date

    sidebarOpen: boolean

    //which groups are toggled in the COUNTDOWN panel
    countdownActiveGroups: string[]

    // --- ACTIONS ---

    //toggle a group on/off in the sidebar
    toggleGroup: (group: string) => void

    setFilterType: (type: FilterType) => void

    nextMonth: () => void

    prevMonth: () => void

    toggleSideBar: () => void

    //toggle a group on/off in the countdown panel
    toggleCountdownGroup: (group: string) => void
}

//create() is the Zustand function that builds the store
//set is a function you call to update the state

export const useAppStore = create<AppState>((set) => ({

    //default values when the app loads
    activeGroups: groups.map(g => g.name),
    filterType: 'all',
    currentMonth: new Date(),
    sidebarOpen: true,
    countdownActiveGroups: groups.map(g => g.name),

    //if it's already in the array -> remove it
    //if it's not in the array -> add it
    toggleGroup: (group) =>
        set((state) => ({
            activeGroups: state.activeGroups.includes(group)
                ? state.activeGroups.filter((g) => g !== group)
                : [...state.activeGroups, group]
        })),
    
    //replace filterType with the new value
    setFilterType: (type) => set({ filterType: type}),

    nextMonth: () =>
        set((state) => {
            const next = new Date(state.currentMonth)
            next.setMonth(next.getMonth() + 1)
            return { currentMonth: next }
        }),

    prevMonth: () =>
        set((state) => {
            const prev = new Date(state.currentMonth)
            prev.setMonth(prev.getMonth() - 1)
            return { currentMonth: prev }
        }),

    toggleSideBar: () =>
        set((state) => ({ sidebarOpen: !state.sidebarOpen })),

    toggleCountdownGroup: (group) =>
        set((state) => ({
            countdownActiveGroups: state.countdownActiveGroups.includes(group)
                ? state.countdownActiveGroups.filter((g) => g !== group)
                : [...state.countdownActiveGroups, group],
        })),
}))


