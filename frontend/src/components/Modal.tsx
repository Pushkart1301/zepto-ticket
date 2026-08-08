import { useStore } from '../store/useStore';

export default function Modal() {
  const { modal, closeModal } = useStore();

  if (!modal) return null;

  const handleConfirm = () => {
    modal.onConfirm();
    closeModal();
  };

  const handleCancel = () => {
    modal.onCancel();
    closeModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="card max-w-md w-full mx-4 p-6">
        <h2 className="text-h2 text-text-primary mb-2">{modal.title}</h2>
        <p className="text-body text-text-secondary mb-6">{modal.message}</p>
        <div className="flex items-center justify-end gap-2">
          {modal.type === 'confirm' && (
            <button onClick={handleCancel} className="btn-secondary">
              Cancel
            </button>
          )}
          <button onClick={handleConfirm} className="btn-primary">
            {modal.type === 'confirm' ? 'Confirm' : 'OK'}
          </button>
        </div>
      </div>
    </div>
  );
}
