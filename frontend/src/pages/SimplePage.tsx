// Simple placeholder component for remaining pages

interface SimplePageProps {
  title: string;
  description: string;
  comingSoon?: boolean;
}

export default function SimplePage({ title, description, comingSoon = false }: SimplePageProps) {
  return (
    <div className="p-6">
      <h1 className="text-h1 text-text-primary mb-2">{title}</h1>
      <p className="text-body text-text-secondary mb-6">{description}</p>
      {comingSoon && (
        <div className="card p-8 text-center">
          <div className="text-4xl mb-4">🚧</div>
          <h2 className="text-h2 text-text-primary mb-2">Coming Soon</h2>
          <p className="text-body text-text-secondary">
            This feature is under development and will be available soon.
          </p>
        </div>
      )}
    </div>
  );
}
