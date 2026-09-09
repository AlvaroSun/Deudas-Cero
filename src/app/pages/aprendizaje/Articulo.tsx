import { useParams, Link } from "react-router";
import { ArrowLeft, Clock, Share2 } from "lucide-react";
import { articulos } from "./ArticulosList";

const contenidos: Record<string, string[]> = {
  "1": [
    "El interés compuesto es uno de los conceptos más importantes del mundo financiero. Albert Einstein supuestamente lo llamó \"la octava maravilla del mundo\". Lo haya dicho o no, la frase captura algo real: el interés compuesto tiene un poder extraordinario.",
    "**¿Qué es el interés compuesto?** Es el interés que se calcula no solo sobre el capital original, sino también sobre los intereses acumulados previamente. Dicho de otra manera: los intereses generan más intereses. Es una bola de nieve que rueda cuesta abajo y crece cada vez más rápido.",
    "**Cuando trabaja en tu contra (deudas):** Imaginá que tenés $50.000 en tu tarjeta de crédito a una TNA del 180%. Si no pagás nada en un año, la deuda no crece a $90.000. Crece mucho más, porque cada mes los intereses se suman al capital y el mes siguiente pagás intereses sobre ese capital mayor.",
    "Resultado real al cabo de un año: alrededor de $270.000. Partiste de $50.000 y ahora debés $270.000 sin haber comprado nada extra. Eso es el interés compuesto trabajando en tu contra.",
    "**Cuando trabaja a tu favor (ahorro e inversión):** Ahora imaginá que tenés $50.000 ahorrados y los ponés en un instrumento que rinde un 100% anual. Al año tenés $100.000. Si reinvertís los intereses (eso es el interés compuesto), al segundo año no tenés $150.000 sino $200.000. Al tercero, $400.000. Al quinto, $1.600.000.",
    "La clave es reinvertir los intereses. Si los gastás cada año, el crecimiento es lineal. Si los dejás en el instrumento, el crecimiento es exponencial.",
    "**La conclusión práctica:** Evitá las deudas con interés compuesto alto (tarjetas, préstamos personales informales). Buscá instrumentos de ahorro que apliquen interés compuesto a tu favor. Y empezá lo antes posible: el tiempo es el ingrediente más importante de la ecuación.",
  ],
  "2": [
    "Un estudio reciente reveló que el 68% de los jóvenes argentinos entre 18 y 30 años no tiene ahorros. No tiene un peso de reserva. Ningún colchón ante emergencias. Es un número brutal, pero cuando analizamos el contexto, es difícil sorprenderse.",
    "**Tres factores que destruyen el ahorro joven en Argentina:**",
    "Primero, la inflación. Cuando los precios suben al 100-200% anual, ahorrar en pesos implica ver derretirse el poder adquisitivo en tiempo real. Muchos jóvenes concluyen que ahorrar no tiene sentido. El error es confundir \"ahorrar en pesos sin rendimiento\" con \"ahorrar\".",
    "Segundo, los salarios. Los sueldos de entrada para jóvenes en Argentina son bajos y crecen lentamente. Cuando el ingreso apenas alcanza para vivir, el ahorro parece un lujo imposible.",
    "Tercero, la cultura del consumo. Las redes sociales muestran estilos de vida aspiracionales. Las tarjetas de crédito facilitan gastar dinero que no se tiene. Las cuotas sin interés (que en realidad sí tienen interés incluido en el precio) invitan a comprar ahora y pagar después.",
    "**¿Qué podés hacer?** La respuesta no es mágica ni requiere ganar más. Requiere un cambio de perspectiva y herramientas concretas.",
    "Empezá por registrar tus gastos durante 30 días. Solo observar adónde va tu dinero ya cambia comportamientos. Luego, aplicá la regla del ahorro automático: el día que cobras, transferí aunque sea el 5% a una cuenta separada. Ese dinero no existe para vos hasta que lo necesites de verdad.",
    "Finalmente, buscá instrumentos que le ganen a la inflación. Los fondos comunes de inversión money market, los plazos fijos UVA o las stablecoins (para los que entienden el riesgo) son opciones que han estado al alcance de cualquier persona con acceso a un homebanking.",
  ],
  "3": [
    "\"12 cuotas sin interés\" es una de las frases más seductoras del marketing financiero. Suena a que el banco te está regalando algo. En la mayoría de los casos, no es así.",
    "**Cómo funciona el mecanismo real:** Cuando un comercio ofrece cuotas sin interés, quien financia esa operación es el banco (o la red de tarjetas). El banco le adelanta al comercio el dinero total, pero le descuenta una comisión por hacerlo. Esa comisión puede ser del 15% al 30% del valor de la venta.",
    "Para recuperar esa pérdida, el comercio tiene dos opciones: absorber el costo (muy raro) o subirle el precio al producto para recuperarlo. En la práctica, la gran mayoría de los comercios elige la segunda opción.",
    "**El precio \"real\":** Un producto que en efectivo vale $80.000 puede costar $100.000 en 12 cuotas sin interés. La diferencia de $20.000 es el \"interés\" que estás pagando aunque te dijeron que no había interés.",
    "**Cómo detectarlo:** La prueba del descuento por pago en efectivo. Si le preguntás al vendedor si hay descuento por pago al contado y te dice que sí (10-20%), eso es exactamente la comisión que el banco le cobró y que vos pagaste en cuotas.",
    "**¿Cuándo sí conviene el pago en cuotas?** Cuando el precio en efectivo y en cuotas es el mismo (los bancos a veces absorben el costo como estrategia de adquisición de clientes), y cuando tenés el dinero en una inversión que rinde más de lo que dura el plan de cuotas. En ese caso, te conviene pagar en cuotas y mantener tu dinero invertido.",
    "La conclusión: antes de pagar en cuotas, siempre preguntá el precio en efectivo. La diferencia puede sorprenderte.",
  ],
  "4": [
    "Tenés deuda de tarjeta. La situación se acumuló: un mes no pudiste pagar el total, después vino otro gasto, y ahora el saldo crece mes a mes aunque sigas pagando el mínimo. Es una situación frustrante pero muy común, y tiene solución.",
    "**Dos estrategias probadas (sin milagros):**",
    "**Estrategia 1: La bola de nieve (Debt Snowball)** Listá todas tus deudas de menor a mayor saldo. Pagá el mínimo en todas, pero destiná todo el dinero extra a la deuda más pequeña hasta cancelarla. Cuando la cancelés, usá ese dinero para atacar la siguiente.",
    "La ventaja: psicológica. Cancelar la primera deuda rápido genera motivación para seguir. La desventaja: no es la más eficiente matemáticamente.",
    "**Estrategia 2: El alud (Debt Avalanche)** Listá todas tus deudas de mayor a menor tasa de interés. Pagá el mínimo en todas, pero destiná el dinero extra a la de mayor interés primero.",
    "La ventaja: pagás menos intereses en total. La desventaja: puede tardar más en ver resultados si la primera deuda es grande.",
    "**¿Cuál elegir?** Si necesitás motivación para arrancar, elegí la bola de nieve. Si sos disciplinado y querés ahorrar más dinero a largo plazo, el alud es la opción racional.",
    "**Consejo adicional:** Mientras pagás deudas, no acumulés nuevas. Bloqueá las tarjetas de crédito si es necesario. Usá débito o efectivo. El plan funciona solo si el saldo total baja mes a mes.",
  ],
  "5": [
    "Muchos jóvenes preguntan: \"¿Debería invertir en criptomonedas?\" o \"¿Me conviene un plazo fijo?\" La respuesta correcta casi siempre es: antes de invertir en cualquier cosa, necesitás un fondo de emergencia.",
    "**¿Qué es un fondo de emergencia?** Es una reserva de dinero equivalente a 3 a 6 meses de tus gastos básicos, guardada en un lugar de bajo riesgo y fácil acceso. No está para crecer: está para protegerte.",
    "**Por qué es más urgente que cualquier inversión:** Las emergencias no avisan. Un accidente, una enfermedad, quedarte sin trabajo, la rotura del auto o un problema grave en el departamento pueden aparecer en cualquier momento. Si no tenés ese colchón, ¿qué hacés?",
    "La mayoría de las personas recurre al crédito: tarjeta, préstamo personal, plata prestada a familiares. Con tasas del 150-200% anual, pagar una emergencia con deuda puede costarte el doble o el triple de lo que costó el problema original.",
    "**Cómo construirlo paso a paso:** Paso 1: Calculá cuánto necesitás para vivir un mes (solo gastos esenciales: alquiler, servicios, comida, transporte, salud). Paso 2: Ese número multiplicado por 3 es tu objetivo inicial. Paso 3: Guardá ese dinero en una cuenta separada de tu cuenta corriente. Que no esté a mano para tentaciones del día a día.",
    "**¿Dónde guardarlo?** El fondo de emergencia no es una inversión. No busques rendimiento máximo, buscá liquidez y seguridad. Una caja de ahorro, un fondo money market o un plazo fijo a 30 días son opciones válidas. Lo importante es que puedas acceder en menos de 48 horas.",
    "Una vez que tenés el fondo de emergencia, ahí sí podés empezar a pensar en invertir el resto.",
  ],
  "6": [
    "Este artículo no es para decirte que con un sueldo mínimo podés \"vivir cómodo y ahorrar\". Sería mentirte. Los salarios en Argentina son históricamente bajos en términos reales. Pero hay estrategias que marcan la diferencia entre sobrevivir y tener algo de control.",
    "**El presupuesto de urgencia:** Cuando los ingresos son ajustados, el presupuesto no es opcional. Es obligatorio. Necesitás saber con precisión cuánto entra y cuánto sale.",
    "**Priorización forzada:** Con presupuesto ajustado, cada peso tiene que tener un destino. El orden de prioridad: 1) Vivienda y servicios (sin techo, nada funciona), 2) Alimentación, 3) Transporte al trabajo, 4) Salud, 5) Deudas urgentes. Todo lo demás viene después.",
    "**Reducir sin sacrificar calidad de vida:** Cocinar en casa vs delivery (la diferencia puede ser 5x el costo por comida). Transporte público vs Uber. Entretenimiento gratuito (parques, amigos en casa, plataformas de streaming compartidas). No es fácil, pero cada recorte en estas áreas libera margen.",
    "**El ahorro del pobre (pero funciona):** Aunque sea $1.000 por mes. No porque cambie tu vida hoy, sino porque crea el hábito. Cuando tus ingresos suban (y subirán), el hábito de ahorrar ya está instalado.",
    "**La trampa que destruye todo:** La deuda con interés alto. Con ingresos ajustados, pagar un 200% TNA es devastador. Evitá las financieras informales, los préstamos por WhatsApp y las tarjetas de crédito si no podés pagar el total. Si ya estás atrapado en una, negociá. Los bancos prefieren cobrar menos que no cobrar nada.",
  ],
  "7": [
    "Necesitás plata. Podés ir a pedir un préstamo personal al banco o podés usar tu tarjeta de crédito. ¿Cuál conviene? La respuesta depende de varios factores que vale la pena entender.",
    "**Préstamo personal:** Te entregan una suma fija y la devolvés en cuotas fijas durante un plazo determinado. Las tasas suelen ser fijas, lo que te da previsibilidad. El CFT (Costo Financiero Total) en Argentina oscila entre el 100% y el 400% según la entidad.",
    "**Tarjeta de crédito:** Es una línea de crédito rotativo. Comprás, y al vencimiento del resumen podés pagar el total (sin interés) o el mínimo (con interés sobre el saldo). La flexibilidad es su mayor ventaja; la tasa variable y el interés compuesto son su mayor riesgo.",
    "**¿Cuándo conviene el préstamo personal?** Cuando necesitás una suma grande para algo específico (refacción, viaje, compra de bien durable) y sabés exactamente cuánto vas a pagar por mes y por cuánto tiempo. La previsibilidad te ayuda a planificar el presupuesto.",
    "**¿Cuándo conviene la tarjeta?** Solo cuando vas a pagar el total al vencimiento. En ese caso, la tarjeta es gratis: comprás hoy y pagás a fin de mes sin interés. Si no podés pagar el total, la tarjeta es el instrumento de crédito más caro que existe.",
    "**La regla de oro:** Si necesitás crédito, comparé siempre el CFT (no la cuota mensual ni la TNA). Y nunca pidas más de lo que podés pagar. El banco siempre cobra: la pregunta es cuánto.",
  ],
  "8": [
    "Los gastos hormiga son esas pequeñas compras que hacés casi sin pensar y que, sumadas, representan una porción significativa de tus ingresos. Se llaman hormiga porque son pequeñas pero caminan en fila: hay muchas y juntas llevan mucho peso.",
    "**Ejemplos típicos:** El café del kiosko todas las mañanas ($400/día = $10.000/mes). El alfajor o medialuna de las 10 ($300/día = $7.500/mes). El delivery de las noches que \"no tenés ganas de cocinar\" ($2.000/semana = $8.000/mes). Las suscripciones olvidadas: una app de meditación, un antivirus, un newsletter pago. Cada transacción pequeña parece irrelevante. Juntas pueden ser el 15-20% de tu sueldo.",
    "**El experimento de los 30 días:** Durante un mes, anotá TODOS tus gastos, por mínimos que sean. Al final, sumá los gastos hormiga. El número te va a sorprender.",
    "No se trata de eliminarlo todo. Se trata de hacerlo consciente. El café de la mañana puede ser un ritual que valorás y querés mantener. Está bien, solo que ahora lo estás eligiendo intencionalmente.",
    "**Las suscripciones olvidadas:** Revisá todos los débitos automáticos de tu tarjeta y tu cuenta bancaria de los últimos 3 meses. Es casi seguro que vas a encontrar alguna suscripción que no recordabas o que dejaste de usar. Cancelarlas es dinero instantáneo.",
    "**La app de finanzas:** Usar una app para registrar gastos (o la herramienta de presupuesto de FinanzasJoven) trae conciencia automáticamente. Saber que vas a tener que registrar el gasto hace que pienses dos veces antes de hacerlo.",
  ],
};

export default function Articulo() {
  const { id } = useParams<{ id: string }>();
  const articulo = articulos.find((a) => a.id === id);
  const contenido = id ? contenidos[id] : null;

  if (!articulo) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-foreground mb-4">Artículo no encontrado</h1>
        <Link to="/aprendizaje/articulos" className="text-accent underline">Volver a artículos</Link>
      </div>
    );
  }

  const otros = articulos.filter((a) => a.id !== id).slice(0, 3);

  return (
    <div className="bg-background min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Link to="/aprendizaje/articulos" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm mb-8 transition-colors">
          <ArrowLeft size={16} /> Volver a artículos
        </Link>

        <div className="mb-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-accent/10 text-accent">{articulo.categoria}</span>
            <span className="text-xs text-muted-foreground flex items-center gap-1"><Clock size={12} /> {articulo.tiempo} de lectura</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground leading-tight mb-4">{articulo.titulo}</h1>
          <p className="text-muted-foreground text-lg leading-relaxed italic border-l-4 border-accent pl-4">{articulo.extracto}</p>
        </div>

        <div className="h-72 rounded-2xl overflow-hidden mb-10 bg-muted">
          <img src={articulo.imagen} alt={articulo.titulo} className="w-full h-full object-cover" />
        </div>

        <div className="prose max-w-none space-y-5 mb-12">
          {(contenido || ["Contenido próximamente disponible."]).map((p, i) => (
            <p
              key={i}
              className="text-foreground/80 leading-relaxed text-base"
              dangerouslySetInnerHTML={{
                __html: p.replace(/\*\*(.*?)\*\*/g, "<strong class='text-foreground font-semibold'>$1</strong>")
              }}
            />
          ))}
        </div>

        {/* More articles */}
        <div className="border-t border-border pt-10">
          <h3 className="font-bold text-xl text-foreground mb-6">Seguí leyendo</h3>
          <div className="grid sm:grid-cols-3 gap-5">
            {otros.map((a) => (
              <Link key={a.id} to={`/aprendizaje/articulos/${a.id}`} className="group bg-card rounded-xl border border-border overflow-hidden hover:shadow-md transition-shadow">
                <div className="h-28 bg-muted overflow-hidden">
                  <img src={a.imagen} alt={a.titulo} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                </div>
                <div className="p-4">
                  <span className="text-xs text-accent font-semibold">{a.categoria}</span>
                  <p className="text-sm font-semibold text-foreground mt-1 leading-snug line-clamp-2 group-hover:text-accent transition-colors">{a.titulo}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
