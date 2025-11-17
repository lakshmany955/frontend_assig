import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const resources = {
  en: {
    translation: {
      app: {
        title: 'Admin Dashboard',
        logout: 'Logout',
        settings: 'Settings',
        language: 'Language',
        theme: 'Theme',
        light: 'Light',
        dark: 'Dark',
      },
      nav: {
        dashboard: 'Dashboard',
        users: 'Users',
        products: 'Products',
      },
      auth: {
        login: 'Login',
        email: 'Email',
        password: 'Password',
        signIn: 'Sign In',
        invalid: 'Invalid credentials',
      },
      common: {
        create: 'Create',
        edit: 'Edit',
        delete: 'Delete',
        save: 'Save',
        cancel: 'Cancel',
        confirmDelete: 'Are you sure to delete?',
        search: 'Search',
        filters: 'Filters',
        role: 'Role',
        category: 'Category',
        price: 'Price',
      },
      errors: {
        forbidden: 'You do not have access to this page.',
        notFound: 'The page you are looking for was not found.',
      },
    },
  },
  es: {
    translation: {
      app: {
        title: 'Panel de Administración',
        logout: 'Cerrar sesión',
        settings: 'Configuración',
        language: 'Idioma',
        theme: 'Tema',
        light: 'Claro',
        dark: 'Oscuro',
      },
      nav: {
        dashboard: 'Tablero',
        users: 'Usuarios',
        products: 'Productos',
      },
      auth: {
        login: 'Iniciar sesión',
        email: 'Correo',
        password: 'Contraseña',
        signIn: 'Entrar',
        invalid: 'Credenciales inválidas',
      },
      common: {
        create: 'Crear',
        edit: 'Editar',
        delete: 'Eliminar',
        save: 'Guardar',
        cancel: 'Cancelar',
        confirmDelete: '¿Seguro que desea eliminar?',
        search: 'Buscar',
        filters: 'Filtros',
        role: 'Rol',
        category: 'Categoría',
        price: 'Precio',
      },
      errors: {
        forbidden: 'No tienes acceso a esta página.',
        notFound: 'La página que buscas no existe.',
      },
    },
  },
}

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem('lang') || 'en',
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
  })

export default i18n