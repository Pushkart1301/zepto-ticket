import { useStore } from '../store/useStore';

export default function Toast() {
  const { toasts, removeToast } = useStore();

  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`card p-4 min-w-80 shadow-lg flex items-center justify-between ${
            toast.type === 'success' ? 'bg-success-light border-success' :
            toast.type === 'error' ? 'bg-danger-light border-danger' :
            'bg-info-light border-info'
          }`}
        >
          <div className="flex items-center gap-2">
            <span className="text-xl">
              {toast.type === 'success' ? '✓' : toast.type === 'error' ? '✗' : 'ℹ'}
            </span>
            <span className="text-body text-text-primary">{toast.message}</span>
          </div>
          <button
            onClick={() => removeToast(toast.id)}
            className="text-text-secondary hover:text-text-primary"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
}
