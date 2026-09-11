function Toast({ message }) {
  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 bg-cinema-surface border border-cinema-accent/30 text-cinema-text px-5 py-3 rounded-lg shadow-lg">
      {message}
    </div>
  );
}

export default Toast;