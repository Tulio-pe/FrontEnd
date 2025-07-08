export const environment = {
  production: true,
  apiUrl: "https://tu-dominio-produccion.com/api/v1",
  endpoints: {
    auth: {
      signUp: "/authentication/sign-up",
      signIn: "/authentication/sign-in",
      signInEmail: "/authentication/sign-in-email",
    },
    workshops: "/workshops",
    cars: "/cars",
    users: "/users",
  },
}
