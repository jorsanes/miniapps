function checkAuthentication() {
    const user = sessionStorage.getItem('usuarioLogeado');
    if (!user) {
        // Si no hay usuario logeado, redirige al login
        window.location.href = "login.html";
    }
}
