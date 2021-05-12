class Header { // Cчетчик товаров

  handlerOpenShoppingPage() { //Ф-ция, которую вешаем на Нажатие - Штук Товаров : - стр. 11
   shoppingPage.render(); // Shopping.js-стр.42
};

	render(count){ //Вывод данных на экран
		// Создадим внешнюю оболочку <div>
		const html = `
                <div class="header-container">
                    <div class="header-counter" onclick="headerPage.handlerOpenShoppingPage();">
                    ➽ Выбрано штук товаров: <span>${count}</span>
                    </div>
                </div>
		`;
// В стр.12 - вставлена "стрелочка"(copy-paste) из https://getsymbols.com/
// ЭМОДЗИ-картинки в Win7 НЕ отображаются

		// Выводим <div> на Сайт (экран);  ROOT_HEADER - (root.js-стр.3)
    ROOT_HEADER.innerHTML = html;
	};
};

// ___________________________________________
const headerPage = new Header(); // cоздаем новый ОБЪЕКТ-ЭКЗЕМПЛЯР Класса

//const productsStore = localStorageUtil.getProducts(); 

// Берем id ТОВАРОВ из Local Storage (LS) вызываем метод getProducts() из ОБЪЕКТА localStorageUtil                                                                                 (localStorageUtil.js - cтр. 6)  - И это МАССИВ!! - [ВСТАВЛЯЕМ в index.js]

// Длинна Массива => это Кол-во элементов в Массиве т.е КОЛИЧЕСТВО ТОВАРОВ В Local Storage = productsStore.length => Передадим это кол-во как Аргумент в выполнение метода - стр.33

//headerPage.render(productsStore.length);  

// вызываем метод из ОБЪЕКТА
// render(productsStore.length) -> трансформируется в любое название Аргумента при описании Ф-ции(Метода) -> render(count) (стр. 7, 12) - (JS.html-стр. 1429) -[ВСТАВЛЯЕМ в index.js]

// _______________________________________________________________________

// Все это будет работать - Товары будут добавляться корректно в Сетчик - ТОЛЬКО ПОСЛЕ ПРЕЗАГРУЗКИ СТРАНИЦИ - чтобы это происходило СРАЗУ - этот механизм =>

// headerPage.render(productsStore.length) =>Нужно вызывать из компонента Products.js    (стр. 58)- т.е. 

// нужно ПРОПИСАТЬ В Ф-ЦИЮ ОБРАБОТЧИК-СОБЫТИЯ (клик НА ТЕГ(элемент) <button> КАЖДОЙ ОТДЕЛЬНОЙ КНОПКИ -Которая была нажата) 