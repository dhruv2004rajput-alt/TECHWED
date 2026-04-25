export function FloatingEmoji({ children }: { children: React.ReactNode }) {
  return (
    <div className="absolute pointer-events-none animate-float">
      {children}
    </div>
  );
}