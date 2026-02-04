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
    const scrollTopBtn = document.getElementById('scrollTopBtn');

    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth' // Desplazamiento suave y elegante
            });
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