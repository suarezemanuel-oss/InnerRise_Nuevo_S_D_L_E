document.addEventListener('DOMContentLoaded', () => {

    // 1. Detección automática de la página activa en el menú
    const navLinks = document.querySelectorAll('.navbar a');
    const currentUrl = window.location.pathname.split('/').pop();

    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (linkPath === currentUrl || (currentUrl === '' && linkPath === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // 2. Animaciones de revelado con scroll (Intersection Observer)
    const elementosAnimables = document.querySelectorAll('.card, .hero-description, .content-box, .contenido, .mapa-card, form');

    elementosAnimables.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)';
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    elementosAnimables.forEach(el => observer.observe(el));

    // 3. Efecto de inclinación 3D en las tarjetas al pasar el cursor
    const tarjetas = document.querySelectorAll('.card, .service-card, .team-card');

    tarjetas.forEach(card => {
        card.style.transition = 'transform 0.25s ease, box-shadow 0.3s ease';

        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            card.style.transform = `perspective(600px) rotateX(${-y / 10}deg) rotateY(${x / 10}deg) translateY(-8px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(600px) rotateX(0deg) rotateY(0deg) translateY(0px)';
        });
    });

    // 4. Widget dinámico con Frases Inspiradoras en el Inicio
    const frases = [
        "Confía en el proceso y celebra tus pequeños logros.",
        "Tu paz mental siempre debe ser tu mayor prioridad.",
        "Aprender a poner límites también es una forma de amor propio.",
        "No te compares con nadie; tu camino es único.",
        "Está bien tomarse un descanso cuando lo necesites.",
        "Confía, brilla, ¡sé tú mismo!",
        "Soltar lo que no puedes controlar es un acto de libertad.",
        "Tu valor no depende de qué tan ocupado o productivo estés hoy.",
        "Decir «no» a los demás suele ser la mejor forma de decirte «sí» a ti mismo.",
        "El silencio y la pausa también son formas válidas de avanzar.",
        "No tienes que resolver toda tu vida hoy; basta con dar el siguiente paso.",
        "Sé tan paciente y amable contigo como lo eres con las personas que amas.",
        "Priorizar tu bienestar no es egoísmo, es autocuidado esencial.",
        "Quien se molesta por tus límites suele ser quien se beneficiaba de que no los tuvieras.",
        "Tu único punto de comparación real es la persona que eras ayer.",
        "Sana a tu propio ritmo; la vida no es una carrera contra nadie.",
        "Los avances pequeños y silenciosos siguen siendo avances gigantes.",
        "No necesitas tener el mapa completo para atreverte a empezar.",
        "Florecer toma tiempo, no te desesperes con la fase de la semilla.",
        "Cada mañana es una página en blanco para volver a intentarlo.",
        "Confía en que donde estás hoy es solo una parada, no tu destino final.",
        "Permítete sentir lo que sientes sin juzgarte por ello.",
        "No te exijas perfección en un proceso que requiere aprendizaje y error.",
        "Lo que realmente es para ti no te exigirá que dejes de ser tú mismo.",
        "Honra tu historia y reconoce todo lo que ya has superado para estar aquí."
    ];

    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        const fraseContenedor = document.createElement('div');
        fraseContenedor.style.cssText = `
            margin: 25px auto 0;
            padding: 14px 22px;
            background: rgba(255, 255, 255, 0.75);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            border-left: 4px solid #184684;
            border-radius: 12px;
            max-width: 550px;
            font-style: italic;
            font-size: 0.92rem;
            color: #0E356E;
            box-shadow: 0 4px 15px rgba(10, 39, 81, 0.06);
        `;

        const fraseAleatoria = frases[Math.floor(Math.random() * frases.length)];
        fraseContenedor.innerHTML = `✨ <strong>Frase de hoy:</strong> "${fraseAleatoria}"`;
        heroSection.appendChild(fraseContenedor);
    }

    // 5. Botón flotante animado "Volver arriba"
    const btnArriba = document.createElement('button');
    btnArriba.innerHTML = '↑';
    btnArriba.setAttribute('aria-label', 'Volver arriba');
    btnArriba.style.cssText = `
        position: fixed;
        bottom: 25px;
        right: 25px;
        width: 45px;
        height: 45px;
        background-color: #184684;
        color: #ffffff;
        border: none;
        border-radius: 50%;
        font-size: 1.3rem;
        font-weight: bold;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        box-shadow: 0 6px 18px rgba(10, 39, 81, 0.25);
        z-index: 1000;
    `;
    document.body.appendChild(btnArriba);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 250) {
            btnArriba.style.opacity = '1';
            btnArriba.style.visibility = 'visible';
        } else {
            btnArriba.style.opacity = '0';
            btnArriba.style.visibility = 'hidden';
        }
    });

    btnArriba.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    btnArriba.addEventListener('mouseenter', () => {
        btnArriba.style.backgroundColor = '#568AC3';
        btnArriba.style.transform = 'translateY(-3px)';
    });

    btnArriba.addEventListener('mouseleave', () => {
        btnArriba.style.backgroundColor = '#184684';
        btnArriba.style.transform = 'translateY(0)';
    });

    // 6. Notificación emergente animada para el formulario
    const formulario = document.querySelector('form');
    if (formulario) {
        formulario.addEventListener('submit', () => {
            const toast = document.createElement('div');
            toast.style.cssText = `
                position: fixed;
                top: 25px;
                right: 25px;
                background: #0E356E;
                color: #ffffff;
                padding: 16px 24px;
                border-radius: 12px;
                border-left: 5px solid #568AC3;
                box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
                font-size: 0.92rem;
                z-index: 2000;
                opacity: 0;
                transform: translateX(100%);
                transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
            `;
            toast.innerHTML = '🌱 ¡Gracias por contactarnos! Tu mensaje fue enviado con éxito.';
            document.body.appendChild(toast);

            setTimeout(() => {
                toast.style.opacity = '1';
                toast.style.transform = 'translateX(0)';
            }, 50);

            setTimeout(() => {
                toast.style.opacity = '0';
                toast.style.transform = 'translateX(100%)';
                setTimeout(() => toast.remove(), 400);
            }, 4200);
        });
    }
});