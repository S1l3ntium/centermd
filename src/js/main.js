/**
 * !(i)
 * Код попадает в итоговый файл, только когда вызвана функция, например FLSFunctions.spollers();
 * Или когда импортирован весь файл, например import "files/script.js";
 * Неиспользуемый код в итоговый файл не попадает.

 * Если мы хотим добавить модуль следует его раскомментировать
 */
// import { MousePRLX } from './libs/parallaxMouse'
// import AOS from 'aos'
// import Swiper, { Navigation, Pagination } from 'swiper';

import { BaseHelpers } from "./helpers/base-helpers";
// import { PopupManager } from './modules/popup-manager';
import { BurgerMenu } from "./modules/burger-menu";
// import { Tabs } from './modules/tabs';
// import { Accordion } from './modules/accordion';

BaseHelpers.checkWebpSupport();

BaseHelpers.calcScrollbarWidth();

BaseHelpers.addTouchClass();

BaseHelpers.addLoadedClass();

BaseHelpers.headerFixed();

/**
 * Открытие/закрытие модальных окон
 * Чтобы модальное окно открывалось и закрывалось
 * На окно повешай атрибут data-popup="<название окна>"
 * На кнопку, которая вызывает окно повешай атрибут data-type="<название окна>"

 * На обертку(.popup) окна добавь атрибут '[data-close-overlay]'
 * На кнопку для закрытия окна добавь класс '.button-close'
 * */
// new PopupManager();

/**
 *  Модуль для работы с меню (Бургер)
 * */
new BurgerMenu().init();

/**
 *  Библиотека для анимаций
 *  документация: https://michalsnik.github.io/aos
 * */
// AOS.init();

/**
 * Параллакс мышей
 * */
// new MousePRLX();

// new Tabs('tabs-example', {
// 	onChange: (data) => {
// 		console.log(data);
// 	},
// });

// new Accordion('.accordion', {
// 	shouldOpenAll: false, // true
// 	defaultOpen: [], // [0,1]
// 	collapsedClass: 'open',
// });

// select fix for forms
document.addEventListener("DOMContentLoaded", function () {
	const selectElement = document.querySelector("select[name='type']");
	const organizationField = document.querySelector(".feedback-form__form-item.organization");
	const organizationInput = organizationField.querySelector("input");

	selectElement.addEventListener("change", function () {
		if (selectElement.value === "organization") {
			// Показываем блок для организации
			organizationField.style.display = "flex";
			organizationInput.disabled = false;
			organizationInput.hidden = false;
		} else {
			// Скрываем блок и отключаем input
			organizationField.style.display = "none";
			organizationInput.disabled = true;
			organizationInput.hidden = true;
		}
	});
});

// manufacture

// Получаем все фильтры и фильтруемые элементы, включая "none"
const filters = document.querySelectorAll("[data-filter]");
const items = document.querySelectorAll("[data-filtered]");
const noItemsElement = document.querySelector('[data-filtered="none"]'); // Элемент для отображения, если нет результатов

// Функция для фильтрации элементов
function filterItems(category) {
	let visibleItemsCount = 0; // Счетчик отображаемых элементов

	items.forEach((item) => {
		const itemCategory = parseInt(item.getAttribute("data-filtered"));

		// Проверяем категорию элемента и показываем/скрываем
		if (itemCategory === category || category === -1) {
			item.style.display = "flex"; // Показываем элемент
			visibleItemsCount++;
		} else if (itemCategory !== "none") {
			item.style.display = "none"; // Скрываем элемент
		}
	});

	// Если видимых элементов нет, показываем элемент с data-filtered="none"
	if (visibleItemsCount === 0) {
		noItemsElement.style.display = "flex";
	} else {
		noItemsElement.style.display = "none";
	}
}

// Добавляем обработчики событий для фильтров
filters.forEach((filter) => {
	filter.addEventListener("click", () => {
		// Удаляем класс active со всех фильтров
		filters.forEach((f) => f.classList.remove("active"));

		// Добавляем класс active текущему фильтру
		filter.classList.add("active");

		// Получаем категорию выбранного фильтра
		const category = parseInt(filter.getAttribute("data-filter"));

		// Фильтруем элементы
		filterItems(category);
	});
});

filterItems(1);

function setupCardLoader(className, itemsToShow) {
	const cards = document.querySelectorAll(`.${className}__card`); // Получаем все карточки с указанной частью класса
	const moreBtn = document.querySelector(`.${className}__cards-more`); // Получаем кнопку
	let visibleCount = itemsToShow; // Число видимых элементов

	// Изначально скрываем все карточки
	cards.forEach((card) => (card.style.display = "none"));

	// Изначально показываем первые n карточек
	Array.from(cards)
		.slice(0, visibleCount)
		.forEach((card) => (card.style.display = "flex"));

	moreBtn.addEventListener("click", function () {
		const hiddenCards = Array.from(cards).slice(visibleCount, visibleCount + itemsToShow); // Следующие n карточек
		hiddenCards.forEach((card) => (card.style.display = "flex")); // Показываем их
		visibleCount += itemsToShow; // Увеличиваем счётчик видимых карточек

		// Если показаны все карточки, скрываем кнопку
		if (visibleCount >= cards.length) {
			moreBtn.style.display = "none";
		}
	});
}

// Пример использования:
setupCardLoader("portfolio", 4); // Вызов для класса portfolio с показом 4 карточек за раз

document.addEventListener("DOMContentLoaded", function () {
	const slider = document.querySelector(".hero__areas-items");
	const slides = document.querySelectorAll(".hero__areas-item");
	let currentIndex = 0; // Индекс текущего слайда
	let startX = 0; // Начальная позиция по оси X
	let currentTranslate = 0; // Текущее смещение слайдера
	let prevTranslate = 0; // Предыдущее смещение

	// Ограничиваем выполнение слайдера только для экранов до 767.98px
	if (window.innerWidth <= 767.98) {
		// Начало touch-события
		slider.addEventListener("touchstart", function (e) {
			startX = e.touches[0].clientX;
		});

		// Движение пальцем
		slider.addEventListener("touchmove", function (e) {
			const currentX = e.touches[0].clientX;
			const diff = currentX - startX; // Разница в движении
			currentTranslate = prevTranslate + diff;
			slider.style.transform = `translateX(${currentTranslate}px)`;
		});

		// Завершение touch-события
		slider.addEventListener("touchend", function () {
			const slideWidth = slides[0].offsetWidth;

			// Проверяем направление свайпа
			if (currentTranslate - prevTranslate < -50) {
				// Свайп влево, переходим к следующему слайду
				currentIndex = Math.min(currentIndex + 1, slides.length - 1);
			} else if (currentTranslate - prevTranslate > 50) {
				// Свайп вправо, возвращаемся к предыдущему слайду
				currentIndex = Math.max(currentIndex - 1, 0);
			}

			// Вычисляем окончательную позицию слайдера
			prevTranslate = -currentIndex * slideWidth;
			slider.style.transform = `translateX(${prevTranslate}px)`;
		});
	}
});

// Функция для отслеживания кликов по .button в .menu__list
function initClickListeners() {
	// Проверка на разрешение экрана
	if (window.innerWidth <= 767.98) {
		// Получаем все ссылки с классом button внутри меню
		const menuButtons = document.querySelectorAll(".menu__list a.button");
		const burgerIcon = document.querySelector(".header__burger.icon-menu");

		// Проверяем, что элементы существуют
		if (menuButtons && burgerIcon) {
			// Проходим по каждому элементу и добавляем обработчик клика
			menuButtons.forEach((button) => {
				button.addEventListener("click", function () {
					// Имитация клика по .header__burger.icon-menu
					burgerIcon.click();
				});
			});
		}
	}
}

// Инициализация при загрузке страницы
document.addEventListener("DOMContentLoaded", initClickListeners);

// Также добавляем слушатель события resize для обновления при изменении размера окна
window.addEventListener("resize", initClickListeners);
