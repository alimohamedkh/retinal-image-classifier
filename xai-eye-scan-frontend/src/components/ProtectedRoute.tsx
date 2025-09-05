function ProtectedRoute({ children }: { children: React.ReactNode }) {
  return (
    <div>
      ProtectedRoute
      <>{children}</>
    </div>
  );
}

export default ProtectedRoute;
