import logo from "../../assets/logo.png";
import textoBlanco from "../../assets/logo-texto-blanco.png";
import textoMarron from "../../assets/logo-texto-marron.png";

// Ícono de DeudasCero. Sobre fondos oscuros (navbar, footer) va dentro de un
// recuadro claro para que la flecha marrón no se pierda.
export default function Logo({ size = 36, badge = false }: { size?: number; badge?: boolean }) {
  // alt vacío: siempre va acompañado del texto "DeudasCero" (LogoTexto)
  const img = <img src={logo} alt="" width={size} height={size} className="object-contain" style={{ width: size, height: size }} />;
  if (!badge) return img;
  return (
    <span className="inline-flex items-center justify-center rounded-xl bg-background p-1 shadow-sm">
      {img}
    </span>
  );
}

// Texto "DEUDAS CERO" diseñado por el equipo: blanco para fondos oscuros, marrón para fondos claros
export function LogoTexto({ height = 44, color = "blanco" }: { height?: number; color?: "blanco" | "marron" }) {
  return (
    <img
      src={color === "blanco" ? textoBlanco : textoMarron}
      alt="DeudasCero"
      className="w-auto"
      style={{ height }}
    />
  );
}
