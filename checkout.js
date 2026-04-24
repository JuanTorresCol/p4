document.addEventListener("DOMContentLoaded", () => {
    const preciofin = localStorage.getItem("precio");
    document.getElementById("precio-fin").innerHTML = "<strong>Total:</strong> " + preciofin;
});