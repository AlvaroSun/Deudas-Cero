import { Link } from "react-router";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="text-center">
        <p className="text-8xl font-bold text-accent/30 mb-4">404</p>
        <h1 className="text-3xl font-bold text-foreground mb-3">Página no encontrada</h1>
        <p className="text-muted-foreground mb-8">La página que buscás no existe o fue movida.</p>
        <Link to="/" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent text-white font-bold hover:bg-accent/90 transition-colors">
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}
