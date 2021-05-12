// Метод forEach НИЧЕГО НЕ ВОЗВРАЩАЕТ, его используют ТОЛЬКО ДЛЯ ПЕРЕБОРА массива, как более «элегантный» вариант, чем обычный цикл for

//  ФУНКЦИЯ (forEach) - callback - ВЫПОЛНЯЕТСЯ СРАЗУ, если нужно, чтобы forEach - выполнялся в другом месте (НЕ СРАЗУ) - все это нужно вставить в ОБЫЧНУЮ       Ф-ЦИЮ (render) - которую ПОТОМ можно вызвать где-угодно (стр.129) 
// ________________________________________________________________________

class Products { //(JS-DOM.html-стр. 6116) - создаем Класс
	constructor() {//(Св-ва)-То, что в методах Класса ИССПОЛЬЗУЕТСЯ НЕСКОЛЬКО РАЗ
		this.classNameActive = 'products-element__btn_active';
		this.labelAdd = 'Добавить в корзину';
		this.labelRemove = 'Удалить из корзины';
	}

// Сначала описываем render() а потом handleSetLocationStorage(element, id)
// ___________________________________________________________________________

	handleSetLocationStorage(currentElement, id) { //Ф-ция, которую вешаем на Нажатие КНОПКИ  стр. 101
// Аргумент currentElement -> при вызове Ф-ции (стр.101) -> Переписывается как this     (Вернет Конкретный ТЕГ(элемент) <button>  - КОНКРЕТНУЮ КНОПКУ, которая была нажата - И КОНКРЕТНЫЕ - присущие Конкретной кнопке <button>  - id или price)

// В АРУМЕНТЫ - можно Передать ЛЮБЫЕ ЭЛЕМЕНТЫ, которые перебираются в CATALOG методом forEach (стр.68 - id, name, price, img) 

		console.log(currentElement, id);
//<button... onclick="productsPage.handleSetLocationStorage(this, 'el3')">... </button> "el3" 

//<button... onclick="productsPage.handleSetLocationStorage(this, 'el5')">... </button> "el5"                               (и.т.д. по КAЖДОЙ НАЖАТОЙ КНОПКЕ)

//_________________________________________________________ 

// по нажатию копки ДОБАВЛЯЕМ НОВЫЙ ТОВАР в Local Storage - (ЕГО id по CATALOG)

//		    const result = localStorageUtil.putProducts(id);

// вызываем метод putProducts(id) из ОБ-КТА localStorageUtil (localStorageUtil.js)

//     console.log(result);  - Вернет Объект -(localStorageUtil.js - cтр. 48)
//                     {
//                        "pushProduct": true,
//                        "products": [
//                             "el3",
//                             "el5"
//                         ]
//                     }
// т.к. const result - Возвращает Объект (стр.35-41) - ДЕСТРУТУРИРУЕМ result - т.е. зададим Свойства Объекта - "pushProduct" и "products" - ВРУЧНУЮ
      const {pushProduct, products} = localStorageUtil.putProducts(id);
      console.log({pushProduct, products});
// Вернет - ТАКОЙ ЖЕ ОБЪЕКТ (стр.35-41)
// Формально запись result и {pushProduct, products} - ОДНО И ТО ЖЕ!!
      
      if (pushProduct === true) {
      	currentElement.classList.add(this.classNameActive);// добавим в Кликнутый элемент <button> - CSS класс
        currentElement.innerHTML = this.labelRemove; 
        // <button>Наполним соответствующим Содержимым<button>
      } else {
      	currentElement.classList.remove(this.classNameActive);// удалим из  элемента <button> - CSS класс
        currentElement.innerHTML = this.labelAdd;
        // <button>Наполним соответствующим Содержимым<button>
      }

      headerPage.render(products.length); // Кол-во элементов - длинна массива products (стр.37); описание(Header.js - cтр. 27)
	};

	render(){ //(JS.html-cтр. 2921-3021) - метод (ф-ция forEach) 

		const productsStore = localStorageUtil.getProducts();
		 //(localStorageUtil.js - cтр. 64) - получаем данные из Local Storage (LS)

		let htmlCatalog = '';
// Перебираем Массив - CATALOG (catalog.js) - описание (JS.html- стр.2943)
		CATALOG.forEach(({ id, name, price, img }) => {
			console.log(id, name, price, img); // выводим в консоль

//Для задания Активных Стилей и Текста в КНОПКЕ вводим 2 переменные
			let activeClass = '';
			let activeText = '';

//Метод — indexOf - РАБОТАЕТ В МАССИВАХ - ВОЗВРАЩАЕТ i элемента;                     либо -1 ПРИ ОТСУТСТВИИ такого ЭЛЕМЕНТА!!!
			if (productsStore.indexOf(id) === -1) { // Если ЭЛЕМЕНТА НЕТ (т.е. - элемент ранее НЕ БЫЛ ДОБАВЛЕН в Local Storage)

			activeText = this.labelAdd; 
            
			} else { // Если ЭЛЕМЕНТ УЖЕ БЫЛ ДОБАВЛЕН в Local Storage) 
				        activeText = this.labelRemove;

                activeClass = ' ' + this.classNameActive; // Присваиваем название CSS класса (Products.css- стр.53) - при НАЖАТИИ на КНОПКУ 

// activeClass = ' products-element__btn_active' (то же самое - стр.83)

//ВАЖНО!!! Поставить ПРОБЕЛ ПЕРЕД КАВЫЧКАМИ!!! - эту переменную как НАЗВАНИЕ ДОПОЛНИТЕЛЬНОГО КЛАССА мы передаем в HTML (стр.101) - а там между классами должен быть пробел!!!
			}

// ДЛЯ ВЫВОДА НА САЙТ (Экран) - как Список <li> (внутри <ul>)_________ :

//Выведем ОДИН ЗА ДРУГИМ <li> - которые вмещают в себя отдельные с-ва ОБЪЕКТА - который является ЭЛЕМЕНТОМ МАССИВА (CATALOG)  
	htmlCatalog = htmlCatalog + `<li class="products-element"> 
			                          <span class="products-element__name">
			                          ${name}
			                          </span>
                                <img class="products-element__img" src="${img}">
                                <span class="products-element__price">
                                ✧ ${price.toLocaleString()} USD
                                </span>
                               <button class="products-element__btn${activeClass}" onclick="productsPage.handleSetLocationStorage(this, '${id}');">
                                  ${activeText}
                                </button>
                               </li>`;
		});
// ______Cтилизуем в Products.css_________________

// В стр.99 - вставлена "звездочка"(copy-paste) из https://getsymbols.com/
// ЭМОДЗИ-картинки в Win7 НЕ отображаются

// В стр.99 - toLocaleString();  - преобразует ЧИСЛОВОЕ значение (Number) в СТРОКОВОЕ (String) и возвращает это значение [напр. 13 600 (С ПРОБЕЛОМ)] -         (JS-DOM.html-стр. 1849)

// В стр.101 - onclick="productsPage.handleSetLocationStorage()" - т.к. мы описываем Ф-цию обработчик-события [handleSetLocationStorage()] в КЛАССЕ - нам ужно ДОПИСАТЬ -на каком ОБЪЕКТЕ-ЭКЗЕМПЛЯРЕ Класса [productsPage] (стр.132) это событие произойдет 

// чудо-ПЕРЕМЕННАЯ «this»                                                    всегда УКАЗЫВАЕТ НА ОБЪЕКТ - ВЫЗЫВАЮЩИЙ Ф-ЦИЮ                                     В ДАННОМ СЛУЧАЕ  this (стр.101) - УКАЖЕТ НА ТЕГ(элемент) <button> КАЖДОЙ ОТДЕЛЬНОЙ КНОПКИ -Которая была нажата

//ВАЖНО!! (стр.101) - аргумент ВЫЗЫВАЕМОЙ ф-ции '${id}' - Обязательно В КАВЫЧКАХ т.к. ЭТО СТРОЧНЫЙ ЭЛЕМЕНТ в CATALOG 
// __________________________________________________________________________

// Создадим внешнюю оболочку <ul> - которой передадим внутренние <li> стр.93

		const html = `<ul class="products-container"> 
			              ${htmlCatalog}
                     </ul>`;

// Выводим <ul> на Сайт (экран);  ROOT_PRODUCTS - (root.js-стр.4)
    ROOT_PRODUCTS.innerHTML = html;
	};
};

// ____________________________________________________
const productsPage = new Products(); // cоздаем новый ОБЪЕКТ-ЭКЗЕМПЛЯР Класса

//productsPage.render(); // вызываем метод из ОБЪЕКТА - [ВСТАВЛЯЕМ в index.js]