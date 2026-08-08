import { create } from 'zustand';
import { Ticket, mockTickets, currentUser } from '../data/mockData';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

interface Modal {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  type: 'confirm' | 'alert';
}

interface AppState {
  tickets: Ticket[];
  selectedTicketIds: string[];
  currentUser: typeof currentUser;
  toasts: Toast[];
  modal: Modal | null;
  sidebarCollapsed: boolean;
  
  // Actions
  updateTicket: (id: string, updates: Partial<Ticket>) => void;
  deleteTicket: (id: string) => void;
  toggleTicketSelection: (id: string) => void;
  selectAllTickets: (ids: string[]) => void;
  clearSelection: () => void;
  showToast: (message: string, type: Toast['type']) => void;
  removeToast: (id: string) => void;
  showModal: (modal: Omit<Modal, 'isOpen'>) => void;
  closeModal: () => void;
  toggleSidebar: () => void;
}

export const useStore = create<AppState>((set, get) => ({
  tickets: mockTickets,
  selectedTicketIds: [],
  currentUser,
  toasts: [],
  modal: null,
  sidebarCollapsed: false,

  updateTicket: (id, updates) => {
    set((state) => ({
      tickets: state.tickets.map((ticket) =>
        ticket.id === id
          ? { ...ticket, ...updates, updatedAt: new Date().toISOString() }
          : ticket
      ),
    }));
    get().showToast('Ticket updated successfully', 'success');
  },

  deleteTicket: (id) => {
    set((state) => ({
      tickets: state.tickets.filter((ticket) => ticket.id !== id),
      selectedTicketIds: state.selectedTicketIds.filter((tid) => tid !== id),
    }));
    get().showToast('Ticket deleted successfully', 'success');
  },

  toggleTicketSelection: (id) => {
    set((state) => ({
      selectedTicketIds: state.selectedTicketIds.includes(id)
        ? state.selectedTicketIds.filter((tid) => tid !== id)
        : [...state.selectedTicketIds, id],
    }));
  },

  selectAllTickets: (ids) => {
    set({ selectedTicketIds: ids });
  },

  clearSelection: () => {
    set({ selectedTicketIds: [] });
  },

  showToast: (message, type) => {
    const id = Math.random().toString(36).substr(2, 9);
    set((state) => ({
      toasts: [...state.toasts, { id, message, type }],
    }));
    setTimeout(() => {
      get().removeToast(id);
    }, 5000);
  },

  removeToast: (id) => {
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id),
    }));
  },

  showModal: (modal) => {
    set({ modal: { ...modal, isOpen: true } });
  },

  closeModal: () => {
    set({ modal: null });
  },

  toggleSidebar: () => {
    set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed }));
  },
}));
