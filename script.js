document.addEventListener('DOMContentLoaded', () => {
    
    // =========================================
    // 1. LÓGICA DEL MENÚ LATERAL (HAMBURGUESA)
    // =========================================
    const menuBtn = document.getElementById('menuBtn');
    const sideMenu = document.getElementById('sideMenu');

    if (menuBtn && sideMenu) {
        // Alternar menú al hacer clic en la hamburguesa
        menuBtn.addEventListener('click', (e) => {
            sideMenu.classList.toggle('active');
            e.stopPropagation(); // Evita que el clic se propague al documento inmediatamente
        });

        // Cerrar menú al hacer clic en cualquier parte fuera del menú o del botón
        document.addEventListener('click', (e) => {
            if (!sideMenu.contains(e.target) && !menuBtn.contains(e.target)) {
                sideMenu.classList.remove('active');
            }
        });
    }

    // =========================================
    // 2. BOTÓN "VOLVER ARRIBA" (SCROLL TO TOP)
    // =========================================
    const scrollTopBtn = document.getElementById('scrollTopBtn'); // Botón del footer
    const floatingScrollBtn = document.getElementById('floatingScrollTopBtn'); // Botón flotante nuevo

    // Función que hace el scroll suave hacia arriba
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // Desplazamiento suave y elegante
        });
    };

    // Asignar clic al botón del footer
    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', scrollToTop);
    }

    // Asignar clic y lógica de aparición al botón flotante
    if (floatingScrollBtn) {
        floatingScrollBtn.addEventListener('click', scrollToTop);
        
        // Mostrar u ocultar el botón flotante dependiendo de cuánto baje el usuario
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) { // Si baja más de 300px, aparece
                floatingScrollBtn.classList.add('visible');
            } else { // Si está arriba, se oculta
                floatingScrollBtn.classList.remove('visible');
            }
        });
    }

    // =========================================
    // 3. FORMULARIO DE CONTACTO (WEB3FORMS)
    // =========================================
    const form = document.getElementById('form');
    
    if (form) {
        const submitBtn = form.querySelector('button[type="submit"]');

        form.addEventListener('submit', async (e) => {
            e.preventDefault(); // Evita la recarga de la página

            const formData = new FormData(form);
            // Tu Access Key proporcionada
            formData.append("access_key", "29bce6d9-2100-40ec-86d6-9fed16f169d2");

            // Guardamos el texto original del botón
            const originalText = submitBtn.textContent;

            // Estado de carga
            submitBtn.textContent = "Enviando...";
            submitBtn.disabled = true;

            try {
                const response = await fetch("https://api.web3forms.com/submit", {
                    method: "POST",
                    body: formData
                });

                const data = await response.json();

                if (response.ok) {
                    // Mensaje de éxito
                    alert("¡Éxito! Tu mensaje ha sido enviado correctamente.");
                    form.reset(); // Limpia los campos
                } else {
                    // Mensaje de error de la API
                    alert("Error: " + data.message);
                }

            } catch (error) {
                // Error de red o conexión
                console.error("Error en el envío:", error);
                alert("Algo salió mal. Por favor, verifica tu conexión e inténtalo de nuevo.");
            } finally {
                // Restaurar botón a su estado original
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        });
    }
});

// =========================================
// 4. LÓGICA DEL MODAL VISOR DE PDF
// =========================================

// Estas funciones DEBEN estar fuera del DOMContentLoaded para que el HTML las reconozca
function openPdfModal(pdfUrl, title) {
    const modal = document.getElementById('pdfModal');
    const iframe = document.getElementById('pdfViewer');
    const downloadBtn = document.getElementById('downloadPdfBtn');
    const modalTitle = document.getElementById('modalTitle');

    if (modal && iframe && downloadBtn) {
        // Asignar el título
        modalTitle.textContent = title;
        // Asignar la ruta al iframe para visualizar
        iframe.src = pdfUrl;
        // Asignar la ruta al botón de descarga
        downloadBtn.href = pdfUrl;
        
        // Mostrar el modal
        modal.classList.add('active');
        // Prevenir el scroll de la página de fondo
        document.body.style.overflow = 'hidden';
    }
}

function closePdfModal() {
    const modal = document.getElementById('pdfModal');
    const iframe = document.getElementById('pdfViewer');

    if (modal) {
        // Ocultar el modal
        modal.classList.remove('active');
        // Restaurar el scroll de la página
        document.body.style.overflow = 'auto';
        
        // Limpiar el iframe después de la animación para no consumir memoria
        setTimeout(() => {
            if(iframe) iframe.src = "";
        }, 300);
    }
}

// Este evento cierra el modal si el usuario hace clic en el fondo oscuro (fuera del cuadro blanco)
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('pdfModal');
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closePdfModal();
            }
        });
    }
});