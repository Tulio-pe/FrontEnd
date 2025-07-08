export const environment = {
  production: false,
  apiUrl: "http://localhost:8080/api/v1", // Spring Boot API
  endpoints: {
    auth: {
      signUp: "/authentication/sign-up",
      signIn: "/authentication/sign-in",
      signInEmail: "/authentication/sign-in-email",
    },
    workshops: "/workshops",
    cars: "/cars",
    users: "/users",
    // Agregamos el endpoint para horarios de talleres
    schedule: {
      save: "/workshops/schedule", // o el endpoint que corresponda en tu API
      get: "/workshops/schedule",
      update: "/workshops/schedule"
    }
  },
}
