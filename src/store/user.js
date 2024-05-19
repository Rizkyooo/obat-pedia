import { create } from 'zustand'
import { getUser } from '@/libs/actions'
export const userStore = create((set) => ({
    user: null,
    getUser: async () => {
        try {
            const userData = await getUser();
            set({ user: userData });
        } catch (error) {
            console.error('Error fetching user:', error);
            set({ user: null });
        }
    },
    removeUser: () => set({ user: null }),
}))
