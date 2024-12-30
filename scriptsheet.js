let carrito = [];


document.addEventListener('DOMContentLoaded', () => {
    const menu = document.querySelector('.menu-toggle');
    const navL = document.querySelector('.nav-links');
    const nav = document.querySelector('.nav');

    if (menu && navL && nav) {
        menu.addEventListener('click', () => {
            navL.classList.toggle('active');
            const icon = menu.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-xmark');
        });

        document.addEventListener('click', (event) => {
            if (!nav.contains(event.target) && !menu.contains(event.target)) {
                navL.classList.remove('active');
                const icon = menu.querySelector('i');
                icon.classList.add('fa-bars');
                icon.classList.remove('fa-xmark');
            }
        });
    } else {
        console.error("One or more elements not found!");
    }
});




// Referencias al botón y al div donde se mostrará el consejo
const consejoDiv = document.getElementById('advice');
const obtenerConsejoBoton = document.getElementById('get-advice');

// Función para obtener un consejo aleatorio de la API
async function obtenerConsejo() {
  try {
    const respuesta = await fetch('https://api.adviceslip.com/advice');
    const datos = await respuesta.json();
    const consejoOriginal = datos.slip.advice;

    // Traducción del consejo al español
    const consejoTraducido = await traducirTexto(consejoOriginal, 'es');
    consejoDiv.textContent = consejoTraducido; // Mostrar el consejo traducido
  } catch (error) {
    console.error('Error al obtener el consejo:', error);
    consejoDiv.textContent = 'Hubo un error al cargar el consejo. Inténtalo nuevamente.';
  }
}

// Función para traducir texto usando la API de MyMemory
async function traducirTexto(texto, idiomaDestino) {
  const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(texto)}&langpair=en|${idiomaDestino}`;
  
  try {
    const respuesta = await fetch(url);
    const datos = await respuesta.json();
    return datos.responseData.translatedText; // Devuelve el texto traducido
  } catch (error) {
    console.error('Error al traducir el texto:', error);
    return 'No se pudo traducir el texto.';
  }
}

// Event Listener para el botón
obtenerConsejoBoton.addEventListener('click', obtenerConsejo);














function agregarAlCarrito(productoId, nombreProducto, precio) {
    // Verificar si el producto ya existe en el carrito
    const productoExistente = carrito.find(item => item.id === productoId);
    if (productoExistente) {
        // Si ya existe, solo incrementar la cantidad
        productoExistente.cantidad += 1;
    } else {
        // Si no existe, agregarlo al carrito
        carrito.push({ id: productoId, nombre: nombreProducto, precio: precio, cantidad: 1 });
    }
    
    // Actualizar la vista del carrito
    actualizarCarrito();
}







function actualizarCarrito() {
    const cartItemsContainer = document.getElementById('cart-items');
    const totalSpan = document.getElementById('total');
    
    // Limpiar los elementos del carrito
    cartItemsContainer.innerHTML = '';
    
    let total = 0;
    carrito.forEach(item => {
        // Crear un elemento para cada producto en el carrito
        const productElement = document.createElement('div');
        productElement.classList.add('cart-item');
        productElement.innerHTML = `
            <span>${item.nombre}</span>
            <span>${item.cantidad} x $${item.precio}</span>
            <span>Total: $${item.cantidad * item.precio}</span>
        `;
        cartItemsContainer.appendChild(productElement);
        
        // Actualizar el total
        total += item.cantidad * item.precio;
    });
    
    totalSpan.textContent = total.toFixed(2);
    
    // Actualizar el contador del carrito en el encabezado
    document.querySelector('.cart-count').textContent = carrito.length;
}



document.querySelectorAll('.cart-icon').forEach(button => {
    button.addEventListener('click', (event) => {
        event.preventDefault(); // Evita el comportamiento por defecto del enlace
        const productoId = event.target.closest('a').getAttribute('data-id');
        const nombreProducto = event.target.closest('a').getAttribute('data-nombre');
        const precio = parseFloat(event.target.closest('a').getAttribute('data-precio'));
        
        agregarAlCarrito(productoId, nombreProducto, precio);
    });
});


document.getElementById('clear-cart').addEventListener('click', () => {
    carrito = [];  // Vaciar el carrito
    actualizarCarrito();  // Actualizar la vista
});


document.getElementById('checkout').addEventListener('click', () => {
    if (carrito.length === 0) {
        alert('Tu carrito está vacío.');
    } else {
        alert('Gracias por tu compra. ¡Pronto recibirás un correo de confirmación!');
        // Redirigir o realizar el proceso de pago
    }
});



// Obtener los elementos
const cartWrapper = document.querySelector('.cart-wrapper');
const cartContainer = document.querySelector('.cart-container');

// Función para mostrar y ocultar el carrito
cartWrapper.addEventListener('click', () => {
    // Alternar la visibilidad del carrito
    if (cartContainer.style.display === 'none' || cartContainer.style.display === '') {
        cartContainer.style.display = 'block';
    } else {
        cartContainer.style.display = 'none';
    }
});

// Cerrar el carrito si se hace clic fuera de él
document.addEventListener('click', (event) => {
    // Verificar si el clic fue fuera del contenedor del carrito y fuera del botón para abrirlo
    if (!cartContainer.contains(event.target) && !cartWrapper.contains(event.target)) {
        cartContainer.style.display = 'none';
    }
});







// Mostrar el formulario
function mostrarFormulario(formulario) {
    const popup = document.getElementById(formulario + 'Popup');
    popup.style.display = 'flex';

    // Cerrar el popup si se hace clic fuera de él
    window.addEventListener('click', function(event) {
        if (event.target === popup) {
            cerrarFormulario(formulario);
        }
    });
}

// Cerrar el formulario
function cerrarFormulario(formulario) {
    document.getElementById(formulario + 'Popup').style.display = 'none';
}

// Crear cuenta
document.getElementById('crearCuentaForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const usuario = document.getElementById('usuario').value;
    const password = document.getElementById('password').value;

    if (usuario && password) {
        // Guardar en el localStorage
        localStorage.setItem('usuario', usuario);
        localStorage.setItem('password', password);
        alert('Cuenta creada con éxito');
        cerrarFormulario('crearCuenta');
    } else {
        alert('Por favor, completa todos los campos');
    }
});

// Iniciar sesión
document.getElementById('iniciarSesionForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const usuarioLogin = document.getElementById('usuarioLogin').value;
    const passwordLogin = document.getElementById('passwordLogin').value;

    // Recuperar datos del localStorage
    const storedUsuario = localStorage.getItem('usuario');
    const storedPassword = localStorage.getItem('password');

    if (usuarioLogin === storedUsuario && passwordLogin === storedPassword) {
        alert('¡Inicio de sesión exitoso!');
        cerrarFormulario('iniciarSesion');
    } else {
        alert('Usuario o contraseña incorrectos');
    }
});
