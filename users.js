const users = [
  {
    email: "jorsanes@hotmail.com",
    password: "joridoxx",
    role: "admin", // Define el rol de administrador
    status: "active", // Estado del usuario: active, frozen, blocked
    firstName: "Jorge",
    lastName: "Sánchez",
    workplace: "Vet Intelligence AI",
  },
];

function validateUser(email, password) {
  const user = users.find((user) => user.email === email);
  if (!user) {
    return { success: false, message: "Usuario no encontrado" };
  }
  if (user.password !== password) {
    return { success: false, message: "Contraseña incorrecta" };
  }
  if (user.status !== "active") {
    return { success: false, message: `Usuario ${user.status}` };
  }
  return { success: true, user };
}
