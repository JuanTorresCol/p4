document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("btn-dani-jarque").addEventListener("click", async () => {
    await nuevoElemento({
      modelo: document.getElementById("nombre-dani-jarque").textContent,
      descripcion: document.getElementById("descripcion-dani-jarque").textContent,
      precioUnidad: parseFloat(document.getElementById("precio-dani-jarque").textContent.replace(/[^\d.,-]/g, "").replace(",", "."))
    });
  });

  document.getElementById("btn-cinta-nadal").addEventListener("click", async () => {
    await nuevoElemento({
      modelo: document.getElementById("nombre-cinta").textContent,
      descripcion: document.getElementById("descripcion-cinta").textContent,
      precioUnidad: parseFloat(document.getElementById("precio-cinta").textContent.replace(/[^\d.,-]/g, "").replace(",", "."))
    });
  });

  document.getElementById("btn-gafas-nano").addEventListener("click", async () => {
    await nuevoElemento({
      modelo: document.getElementById("nombre-gafas").textContent,
      descripcion: document.getElementById("descripcion-gafas").textContent,
      precioUnidad: parseFloat(document.getElementById("precio-gafas").textContent.replace(/[^\d.,-]/g, "").replace(",", "."))
    });
  });

  const nuevoElemento = async (producto) => {
    try {
      const response = await fetch("http://localhost:8080/api/carrito", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(producto)
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "No se pudo añadir el producto al carrito");
      }

      alert(`Producto '${producto.modelo}' añadido al carrito.`);
      window.location.href = "carrito.html";
    } catch (error) {
      console.error(error);
      alert("Error al añadir el producto al carrito: " + error.message);
    }
  };
});