import logo from "../../assets/logo.png";

// Logo de DeudasCero. Sobre fondos oscuros (navbar, footer) va dentro de un
// recuadro claro para que la flecha marrón no se pierda.
export default function Logo({ size = 36, badge = false }: { size?: number; badge?: boolean }) {
  const img = <img src={logo} alt="DeudasCero" width={size} height={size} className="object-contain" style={{ width: size, height: size }} />;
  if (!badge) return img;
  return (
    <span className="inline-flex items-center justify-center rounded-xl bg-background p-1 shadow-sm">
      {img}
    </span>
  );
}
