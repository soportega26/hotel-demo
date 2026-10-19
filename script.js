// Carrusel de Imágenes
const slides = document.querySelectorAll('.slide');
let currentSlide = 0;

function nextSlide() {
    if (slides.length > 0) {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }
}
setInterval(nextSlide, 4000);

// Función para cambiar de vista sin recargar la página
// Función para cambiar de vista sin recargar la página
function showView(viewName) {
    // 1. Ocultar TODAS las vistas SPA
    const views = document.querySelectorAll('.page-view');
    views.forEach(v => {
        v.style.display = 'none';
        v.classList.remove('active-view');
    });

    // 2. Remover la clase activa de todos los enlaces del menú
    document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));

    // 3. REMOVER CLASES Y ESTADOS ACTIVOS DE PESTAÑAS (Resuelve el congelamiento de Select)
    document.querySelectorAll('.room-tab, .tab-btn, .tab-content').forEach(el => {
        el.classList.remove('active');
    });

    // 4. Mostrar la vista seleccionada
    if (viewName === 'inicio') {
        const view = document.getElementById('view-inicio');
        const nav = document.getElementById('nav-inicio');
        if (view) view.style.display = 'block';
        if (nav) nav.classList.add('active');

    } else if (viewName === 'habitaciones') {
        const view = document.getElementById('view-habitaciones');
        const nav = document.getElementById('nav-habitaciones');
        if (view) view.style.display = 'block';
        if (nav) nav.classList.add('active');
        
        // Volvemos a la pestaña por defecto si existe la función
        if (typeof switchRoomTab === 'function') {
            switchRoomTab('casa-marina');
        }

    } else if (viewName === 'galeria') {
        const view = document.getElementById('view-galeria');
        const nav = document.getElementById('nav-galeria');
        if (view) view.style.display = 'block';
        if (nav) nav.classList.add('active');

        // Si la galería tiene una función de renderizado o filtro, asegúrate de refrescarla aquí
        if (typeof renderGallery === 'function') {
            renderGallery();
        }

    } else if (viewName === 'noticias') {
        const newsView = document.getElementById('view-noticias');
        const newsNav = document.getElementById('nav-noticias');
        if (newsView) newsView.style.display = 'block';
        if (newsNav) newsNav.classList.add('active');
    }

    // 5. Reiniciar el scroll arriba
    window.scrollTo({ top: 0, behavior: 'instant' });
}

// Funciones del Lightbox (Ampliar al hacer clic)
function openLightbox(imgSrc, captionText) {
    const modal = document.getElementById('imageLightbox');
    const modalImg = document.getElementById('lightboxImg');
    const caption = document.getElementById('lightboxCaption');

    modal.style.display = 'flex';
    modalImg.src = imgSrc;
    caption.textContent = captionText;
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const modal = document.getElementById('imageLightbox');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Filtro multimedia
function filterGallery(category, evt) {
    const photos = document.querySelectorAll('.item-photo');
    const videos = document.querySelectorAll('.item-video');
    const filterBtns = document.querySelectorAll('.gallery-filter-btn');

    filterBtns.forEach(btn => btn.classList.remove('active'));
    if (evt && evt.currentTarget) {
        evt.currentTarget.classList.add('active');
    }

    if (category === 'all') {
        photos.forEach(el => el.style.display = 'block');
        videos.forEach(el => el.style.display = 'block');
    } else if (category === 'photos') {
        photos.forEach(el => el.style.display = 'block');
        videos.forEach(el => el.style.display = 'none');
    } else if (category === 'videos') {
        photos.forEach(el => el.style.display = 'none');
        videos.forEach(el => el.style.display = 'block');
    }
}

// Filtro rápido de contenido multimedia
function filterGallery(category, evt) {
    const photos = document.querySelectorAll('.item-photo');
    const videos = document.querySelectorAll('.item-video');
    const filterBtns = document.querySelectorAll('.gallery-filter-btn');

    filterBtns.forEach(btn => btn.classList.remove('active'));
    if (evt && evt.currentTarget) {
        evt.currentTarget.classList.add('active');
    }

    if (category === 'all') {
        photos.forEach(el => el.style.display = 'block');
        videos.forEach(el => el.style.display = 'block');
    } else if (category === 'photos') {
        photos.forEach(el => el.style.display = 'block');
        videos.forEach(el => el.style.display = 'none');
    } else if (category === 'videos') {
        photos.forEach(el => el.style.display = 'none');
        videos.forEach(el => el.style.display = 'block');
    }
}

// Confirmación del formulario
document.getElementById('bookingForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const confirmationDiv = document.getElementById('bookingConfirmation');
    confirmationDiv.style.display = 'block';
    confirmationDiv.innerHTML = `
        <strong>¡Disponibilidad confirmada!</strong><br>
        Se ha generado la pre-solicitud #HT-${Math.floor(100000 + Math.random() * 900000)}.
    `;
});

function switchRoomTab(tabName) {
    // Amagar tots els continguts de pestanyes
    document.getElementById('tab-casa-marina').style.display = 'none';
    document.getElementById('tab-select-adults').style.display = 'none';

    // Desactivar l'estat actiu de tots els botons
    const buttons = document.querySelectorAll('.tab-btn');
    buttons.forEach(btn => btn.classList.remove('active'));

    // Mostrar la pestanya seleccionada i activar el seu botó
    if (tabName === 'casa-marina') {
        document.getElementById('tab-casa-marina').style.display = 'block';
        buttons[0].classList.add('active');
    } else if (tabName === 'select-adults') {
        document.getElementById('tab-select-adults').style.display = 'block';
        buttons[1].classList.add('active');
    }
}

// Cambiar de Hotel en la Galería
// Cambiar de Hotel en la Galería
function switchGalleryHotel(hotel, evt) {
    document.getElementById('gallery-tab-casa-marina').style.display = 'none';
    document.getElementById('gallery-tab-select-adults').style.display = 'none';

    const galleryBtns = document.querySelectorAll('#view-galeria .tab-btn');
    galleryBtns.forEach(btn => btn.classList.remove('active'));

    if (evt && evt.currentTarget) {
        evt.currentTarget.classList.add('active');
    }

    if (hotel === 'casa-marina') {
        document.getElementById('gallery-tab-casa-marina').style.display = 'block';
        // Por defecto al cambiar a Casa Marina muestra las fotos y activa su botón
        resetHotelFilters('casa-marina', 'photos');
    } else if (hotel === 'select-adults') {
        document.getElementById('gallery-tab-select-adults').style.display = 'block';
        // Por defecto al cambiar a Select muestra las fotos y activa su botón
        resetHotelFilters('select-adults', 'photos');
    }
}

// Filtrar Fotos o Videos dentro del hotel activo
function filterHotelGallery(hotel, type, evt) {
    const tabContainer = document.getElementById(hotel === 'casa-marina' ? 'gallery-tab-casa-marina' : 'gallery-tab-select-adults');
    
    // Botones de filtro dentro de esta pestaña
    const filterBtns = tabContainer.querySelectorAll('.gallery-filter-btn');
    filterBtns.forEach(btn => btn.classList.remove('active'));
    if (evt && evt.currentTarget) {
        evt.currentTarget.classList.add('active');
    }

    const photos = tabContainer.querySelectorAll(hotel === 'casa-marina' ? '.cm-photo' : '.sel-photo');
    const videos = tabContainer.querySelectorAll(hotel === 'casa-marina' ? '.cm-video' : '.sel-video');

    if (type === 'photos') {
        photos.forEach(el => el.style.display = 'block');
        videos.forEach(el => el.style.display = 'none');
    } else if (type === 'videos') {
        photos.forEach(el => el.style.display = 'none');
        videos.forEach(el => el.style.display = 'block');
    }
}

// Función auxiliar para restablecer la vista inicial de fotos al cambiar de pestaña
function filterHotelGallery(hotel, type, evt) {
    const isCasaMarina = hotel === 'casa-marina';
    const containerId = isCasaMarina ? 'gallery-tab-casa-marina' : 'gallery-tab-select-adults';
    const tabContainer = document.getElementById(containerId);

    if (!tabContainer) return;

    // Actualizar estados activos de los botones de filtro
    const filterBtns = tabContainer.querySelectorAll('.gallery-filter-btn');
    filterBtns.forEach(btn => btn.classList.remove('active'));
    if (evt && evt.currentTarget) {
        evt.currentTarget.classList.add('active');
    }

    // Seleccionar elementos de foto y video según el hotel
    const photoClass = isCasaMarina ? '.cm-photo' : '.sel-photo';
    const videoClass = isCasaMarina ? '.cm-video' : '.sel-video';

    const photos = tabContainer.querySelectorAll(photoClass);
    const videos = tabContainer.querySelectorAll(videoClass);

    if (type === 'photos') {
        photos.forEach(el => el.style.display = 'block');
        videos.forEach(el => el.style.display = 'none');
    } else if (type === 'videos') {
        photos.forEach(el => el.style.display = 'none');
        videos.forEach(el => el.style.display = 'block');
    }
}

function toggleNewsReadMore(btn) {
    const extraText = document.getElementById('extraNewsText');
    if (extraText.style.display === 'none' || extraText.style.display === '') {
        extraText.style.display = 'block';
        btn.innerHTML = 'Leer menos <i class="fa-solid fa-arrow-up"></i>';
    } else {
        extraText.style.display = 'none';
        btn.innerHTML = 'Leer más <i class="fa-solid fa-arrow-right"></i>';
    }
}