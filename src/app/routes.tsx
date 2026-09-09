import { createBrowserRouter } from "react-router";
import Layout from "./components/Layout";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Login from "./pages/login/Login";
import Registro from "./pages/login/Registro";
import ModulosIndex from "./pages/modulos/ModulosIndex";
import Ahorro from "./pages/modulos/Ahorro";
import Credito from "./pages/modulos/Credito";
import PresupuestoPersonal from "./pages/modulos/PresupuestoPersonal";
import PresupuestoLayout from "./pages/presupuesto/PresupuestoLayout";
import PresupuestoIndex from "./pages/presupuesto/PresupuestoIndex";
import Ingresos from "./pages/presupuesto/Ingresos";
import Gastos from "./pages/presupuesto/Gastos";
import Resumen from "./pages/presupuesto/Resumen";
import AprendizajeIndex from "./pages/aprendizaje/AprendizajeIndex";
import ArticulosList from "./pages/aprendizaje/ArticulosList";
import Articulo from "./pages/aprendizaje/Articulo";
import CursosList from "./pages/aprendizaje/CursosList";
import Curso from "./pages/aprendizaje/Curso";
import Quiz from "./pages/aprendizaje/Quiz";
import Glosario from "./pages/aprendizaje/Glosario";
import Nosotros from "./pages/nosotros/Nosotros";
import Contacto from "./pages/nosotros/Contacto";
import Perfil from "./pages/perfil/Perfil";
import EditarPerfil from "./pages/perfil/EditarPerfil";
import AdminDashboard from "./pages/admin/AdminDashboard";
import NotFound from "./pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "login", Component: Login },
      { path: "registro", Component: Registro },

      // Módulos
      { path: "modulos", Component: ModulosIndex },
      { path: "modulos/ahorro", Component: Ahorro },
      { path: "modulos/credito", Component: Credito },
      { path: "modulos/presupuesto-personal", Component: PresupuestoPersonal },

      // Presupuesto tool
      {
        path: "presupuesto",
        Component: PresupuestoLayout,
        children: [
          { index: true, Component: PresupuestoIndex },
          { path: "ingresos", Component: Ingresos },
          { path: "gastos", Component: Gastos },
          { path: "resumen", Component: Resumen },
        ],
      },

      // Aprendizaje
      { path: "aprendizaje", Component: AprendizajeIndex },
      { path: "aprendizaje/articulos", Component: ArticulosList },
      { path: "aprendizaje/articulos/:id", Component: Articulo },
      { path: "aprendizaje/cursos", Component: CursosList },
      { path: "aprendizaje/cursos/:id", Component: Curso },
      { path: "aprendizaje/quiz", Component: Quiz },
      { path: "aprendizaje/glosario", Component: Glosario },

      // Nosotros
      { path: "nosotros", Component: Nosotros },
      { path: "nosotros/contacto", Component: Contacto },

      // Perfil (requiere login)
      {
        path: "perfil",
        Component: () => (
          <ProtectedRoute>
            <Perfil />
          </ProtectedRoute>
        ),
      },
      {
        path: "perfil/editar",
        Component: () => (
          <ProtectedRoute>
            <EditarPerfil />
          </ProtectedRoute>
        ),
      },

      // Admin
      {
        path: "admin/dashboard",
        Component: () => (
          <ProtectedRoute adminOnly>
            <AdminDashboard />
          </ProtectedRoute>
        ),
      },

      { path: "*", Component: NotFound },
    ],
  },
]);
