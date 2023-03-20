const pintarCarrito = () => {

    modalContainer.innerHTML = "";
    modalContainer.style.display = "flex";
    const modalHeader = document.createElement("div");
    modalHeader.className = "modal-header"
    modalHeader.innerHTML = `
    <h1 class="modal-header-title">Carrito.</h1>
    `;
    modalContainer.append(modalHeader);

    const modalButton = document.createElement("h1");
    modalButton.innerText = "x";
    modalButton.className = "modal-header-button";

    modalButton.addEventListener("click", () => {
        modalContainer.style.display = "none";
    });

    modalHeader.append(modalButton);

    carrito.forEach((product) => {

        let carritoContent = document.createElement("div");
        carritoContent.className = "modal-content";
        carritoContent.innerHTML = `
            <img src="${product.img}">
            <h3>${product.nombre}</h3>
            <p>$${product.precio}</p>
            <p>Cantidad: ${product.cantidad}</p>
        `
        modalContainer.append(carritoContent)

        let eliminar = document.createElement("span");
        eliminar.innerHTML = "❌";
        eliminar.className = "delete-product";
        carritoContent.append(eliminar);
        eliminar.addEventListener("click", eliminarProducto);
    });

    const total = carrito.reduce((acc, celus) => acc + celus.precio * celus.cantidad, 0);

    const totalBuying = document.createElement("div");
    totalBuying.className = "total-content";
    totalBuying.innerHTML = `Total a pagar: $${total}`;
    modalContainer.append(totalBuying);

    let botonPagar = document.createElement("button");
    botonPagar.innerText = "Pagar";
    botonPagar.className = "pagar";

    botonPagar.addEventListener("click",() =>{
        Swal.fire({
            title: 'Estas a punto de realizar la compra ',
            text: "Asegurate de tener los fondos suficientes",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Comprar'
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire(
                'Compra realizada',
                'Gracias por comprar en la Tienda',
                'success'
              )
              localStorage.clear();
              setTimeout (function (){
                location.reload();
              }, 3000);
            }
          })
    })

    modalContainer.append(botonPagar);

};

verCarrito.addEventListener("click", pintarCarrito);

const eliminarProducto = ()=> {
    const foundId = carrito.find((element) => element.id);
    carrito = carrito.filter((carritoId) => {
        return carritoId !== foundId;
    });
    carritoCounter();
    saveLocal();
    pintarCarrito();
};

const carritoCounter = () =>{
    cantidadCarrito.style.display = "block";

    const carritoLength = carrito.length;
    localStorage.setItem("carritoLength", JSON.stringify(carritoLength));
    cantidadCarrito.innerText = JSON.parse(localStorage.getItem("carritoLength"));
}

carritoCounter();