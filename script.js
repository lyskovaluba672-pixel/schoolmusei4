// Данные экспонатов (замените на реальные данные вашего музея)
const exhibitsData = [
    {
        id: 1,
        title: "Первая ученическая тетрадь",
        date: "1965 г.",
        category: "history",
        description: "Тетрадь ученицы 1-го класса школы №126, основанной в 1965 году. Сохранились первые записи и рисунки.",
        value: "Историческая ценность: документ, свидетельствующий о начале работы школы.",
        image: "images/expo1.jpg"  // Замените на путь к реальному изображению
    },
    {
        id: 2,
        title: "Портрет ветерана педагогического труда",
        date: "1980-е гг.",
        category: "teachers",
        description: "Портрет Ивановой Анны Петровны, проработавшей в школе более 40 лет учителем русского языка и литературы.",
        value: "Ценность: память о выдающихся педагогах школы.",
        image: "images/expo2.jpg"
    },
    {
        id: 3,
        title: "Значок выпускника",
        date: "1975 г.",
        category: "graduates",
        description: "Памятный значок первого выпуска школы №126.",
        value: "Редкий экземпляр, сохранившийся в единственном числе.",
        image: "images/expo3.jpg"
    },
    {
        id: 4,
        title: "Письмо с фронта",
        date: "1943 г.",
        category: "war",
        description: "Фронтовое письмо выпускника школы, погибшего в годы Великой Отечественной войны.",
        value: "Уникальный исторический документ, переданный родственниками в школьный музей.",
        image: "images/expo4.jpg"
    },
    {
        id: 5,
        title: "Фотография строительства микрорайона",
        date: "1960 г.",
        category: "district",
        description: "Черно-белая фотография строительства жилого массива, где находится школа №126.",
        value: "Документ истории микрорайона города Барнаула.",
        image: "images/expo5.jpg"
    },
    {
        id: 6,
        title: "Диплом ученика",
        date: "1990 г.",
        category: "history",
        description: "Диплом победителя городской олимпиады по истории.",
        value: "Свидетельство достижений учащихся школы.",
        image: "images/expo6.jpg"
    }
];

// Данные новостей
const newsData = [
    {
        id: 1,
        title: "Открытие обновлённой экспозиции",
        date: "15 марта 2025",
        content: "В школьном музее открылась обновлённая экспозиция, посвящённая истории микрорайона. Приглашаем всех желающих!",
        image: "images/news1.jpg"
    },
    {
        id: 2,
        title: "День открытых дверей в музее",
        date: "10 апреля 2025",
        content: "В рамках недели истории музей провёл день открытых дверей. Школу посетили ветераны и выпускники разных лет.",
        image: "images/news2.jpg"
    },
    {
        id: 3,
        title: "Новый экспонат: фронтовое письмо",
        date: "25 апреля 2025",
        content: "Фонд музея пополнился уникальным экспонатом — письмом с фронта 1943 года. Благодарим семью передавшую реликвию.",
        image: "images/news3.jpg"
    }
];

// Функция для загрузки галереи
function loadGallery(filterCategory = "all") {
    const galleryGrid = document.getElementById("galleryGrid");
    if (!galleryGrid) return;
    
    let filteredExhibits = exhibitsData;
    if (filterCategory !== "all") {
        filteredExhibits = exhibitsData.filter(exhibit => exhibit.category === filterCategory);
    }
    
    galleryGrid.innerHTML = "";
    
    filteredExhibits.forEach(exhibit => {
        const item = document.createElement("div");
        item.className = "gallery-item";
        item.setAttribute("data-id", exhibit.id);
        item.innerHTML = `
            <img src="${exhibit.image}" alt="${exhibit.title}" onerror="this.src='https://via.placeholder.com/300x200?text=Фото+экспоната'">
            <div class="gallery-info">
                <h3>${exhibit.title}</h3>
                <p class="category">${getCategoryName(exhibit.category)}</p>
                <p class="date">${exhibit.date}</p>
            </div>
        `;
        item.addEventListener("click", () => openModal(exhibit.id));
        galleryGrid.appendChild(item);
    });
}

// Загрузка экспонатов на главную страницу (избранное)
function loadFeaturedExhibits() {
    const featuredGrid = document.getElementById("featuredExhibits");
    if (!featuredGrid) return;
    
    const featured = exhibitsData.slice(0, 3);
    featuredGrid.innerHTML = "";
    
    featured.forEach(exhibit => {
        const item = document.createElement("div");
        item.className = "exhibit-card";
        item.innerHTML = `
            <img src="${exhibit.image}" alt="${exhibit.title}" onerror="this.src='https://via.placeholder.com/300x200?text=Фото+экспоната'">
            <h4>${exhibit.title}</h4>
            <p>${exhibit.date}</p>
        `;
        item.addEventListener("click", () => openModal(exhibit.id));
        featuredGrid.appendChild(item);
    });
}

// Загрузка новостей
function loadNews() {
    const newsGrid = document.getElementById("newsGrid");
    if (!newsGrid) return;
    
    newsGrid.innerHTML = "";
    
    newsData.forEach(news => {
        const item = document.createElement("div");
        item.className = "news-card";
        item.innerHTML = `
            <img src="${news.image}" alt="${news.title}" onerror="this.src='https://via.placeholder.com/350x200?text=Новость'">
            <div class="news-content">
                <p class="news-date"><i class="far fa-calendar-alt"></i> ${news.date}</p>
                <h3>${news.title}</h3>
                <p>${news.content}</p>
            </div>
        `;
        newsGrid.appendChild(item);
    });
}

// Получение названия категории
function getCategoryName(category) {
    const categories = {
        "history": "История школы",
        "teachers": "Педагоги-ветераны",
        "graduates": "Выдающиеся выпускники",
        "war": "Великая Отечественная война",
        "district": "История микрорайона"
    };
    return categories[category] || category;
}

// Открытие модального окна
function openModal(exhibitId) {
    const exhibit = exhibitsData.find(e => e.id === exhibitId);
    if (!exhibit) return;
    
    const modal = document.getElementById("modal");
    const modalImage = document.getElementById("modalImage");
    const modalTitle = document.getElementById("modalTitle");
    const modalDate = document.getElementById("modalDate");
    const modalDescription = document.getElementById("modalDescription");
    const modalValue = document.getElementById("modalValue");
    
    modalImage.src = exhibit.image;
    modalImage.alt = exhibit.title;
    modalTitle.textContent = exhibit.title;
    modalDate.textContent = exhibit.date;
    modalDescription.textContent = exhibit.description;
    modalValue.textContent = exhibit.value;
    
    modal.style.display = "block";
}

// Инициализация фильтров на странице галереи
function initFilters() {
    const filterButtons = document.querySelectorAll(".filter-btn");
    if (filterButtons.length === 0) return;
    
    filterButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            filterButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            const category = btn.getAttribute("data-category");
            loadGallery(category);
        });
    });
}

// Обработка формы обратной связи
function initContactForm() {
    const form = document.getElementById("feedbackForm");
    if (!form) return;
    
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const subject = document.getElementById("subject").value;
        const message = document.getElementById("message").value.trim();
        
        // Валидация
        if (!name || !email || !subject || !message) {
            showFormMessage("Пожалуйста, заполните все обязательные поля", "error");
            return;
        }
        
        if (!isValidEmail(email)) {
            showFormMessage("Пожалуйста, введите корректный email адрес", "error");
            return;
        }
        
        // Сохранение в localStorage
        const feedback = {
            id: Date.now(),
            name: name,
            email: email,
            subject: subject,
            message: message,
            date: new Date().toLocaleString()
        };
        
        let feedbacks = JSON.parse(localStorage.getItem("museumFeedbacks") || "[]");
        feedbacks.push(feedback);
        localStorage.setItem("museumFeedbacks", JSON.stringify(feedbacks));
        
        // Здесь можно добавить отправку на email через серверную часть
        // Для статического сайта — сохранение в localStorage
        
        showFormMessage("Спасибо! Ваше сообщение отправлено. Мы свяжемся с вами в ближайшее время.", "success");
        form.reset();
    });
}

function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function showFormMessage(text, type) {
    const messageDiv = document.getElementById("formMessage");
    if (messageDiv) {
        messageDiv.textContent = text;
        messageDiv.className = `form-message ${type}`;
        setTimeout(() => {
            messageDiv.textContent = "";
            messageDiv.className = "form-message";
        }, 5000);
    }
}

// Мобильное меню
function initMobileMenu() {
    const menuToggle = document.getElementById("menuToggle");
    const navMenu = document.getElementById("navMenu");
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener("click", () => {
            navMenu.classList.toggle("show");
        });
    }
}

// Закрытие модального окна
function initModal() {
    const modal = document.getElementById("modal");
    const closeBtn = document.querySelector(".modal-close");
    
    if (modal && closeBtn) {
        closeBtn.addEventListener("click", () => {
            modal.style.display = "none";
        });
        
        window.addEventListener("click", (e) => {
            if (e.target === modal) {
                modal.style.display = "none";
            }
        });
    }
}

// Инициализация при загрузке страницы
document.addEventListener("DOMContentLoaded", () => {
    loadFeaturedExhibits();
    loadGallery();
    loadNews();
    initFilters();
    initContactForm();
    initMobileMenu();
    initModal();
});