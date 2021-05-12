class Shopping {

	handleClear() {

		ROOT_SHOPPING.innerHTML = '';
// Чтобы ЗАКРЫТЬ Модальное Окно -> Достаточно ПИРСВОИТЬ ему ПУСТОЕ ЗНАЧЕНИЕ
	};

	render(){ 
    // стр. 11, 14, 19 - возьмем из Products.js
		const productsStore = localStorageUtil.getProducts();
		 //(localStorageUtil.js - cтр. 64) - получаем данные из Local Storage (LS)

		let htmlCatalog = '';

		let sumCatalog = 0; // Для расчета общей Суммы к оплате

// Перебираем Массив - CATALOG (catalog.js) - описание (JS.html- стр.2943)
			CATALOG.forEach(({ id, name, price }) => { 

// Но товары нужны НЕ ВСЕ, а тодько те, которые находятся в в Local Storage

//Метод — indexOf - РАБОТАЕТ В МАССИВАХ - ВОЗВРАЩАЕТ i элемента (в данном случае элемент  - это id)                                                               либо -1 ПРИ ОТСУТСТВИИ такого ЭЛЕМЕНТА!!!
     if (productsStore.indexOf(id) !== -1) {// т.е. Если ТОВАР ДОБАВЛЕН в LS  - ВЫВОДИМ (добавляем его) в ТАБЛИЦУ НА ЭКРАН (HTML.html-стр.546)

     	htmlCatalog = htmlCatalog + `<tr>
                                      <td class="shopping-element__name">✧ ${name}</td>
                                      <td class="shopping-element__price">
                                      ${price.toLocaleString()} USD</td>
                                  </tr>`; //Products.js-стр. 111

        sumCatalog = sumCatalog + price; // Перебирая массив, складываем Цены - всех выбранных (по id) элементов = ОБЩАЯ СТОИМОСТЬ
      }  
	  });

	//Вывод данных на экран
		// Создадим внешнюю оболочку-Таблицу <table>
		const html = `<div class="shopping-container">
		                 <div class="shopping__close" onclick="shoppingPage.handleClear();">
		                 </div>
		                  <table>
		                    ${htmlCatalog}
                        <tr>
                            <td class="shopping-total__name">
                            ☑︎ Общая СУММА к оплате</td>
                            <td class="shopping-total__price">
                                ${sumCatalog.toLocaleString()} USD</td>
                        </tr>
		                  </table>         
                  </div>`;
// стр. 43-48 - добавляем такие-же по структуре строки - как и стр. 26-30 - чтобы выдать Общая СУММА к оплате: ...USD

 // стр. 39 - <div class="shopping__close" > - необходим для стилизации "Крестика" И для подвязывая Ф-ции Обработчика события (onclick)- ДЛЯ закрытия модального окна 

		// Выводим Таблицу <table> на Сайт (экран);  ROOT_HEADER - (root.js-стр.5)
		ROOT_SHOPPING.innerHTML = html;
	};
};

// ____________________________________________________
const shoppingPage = new Shopping(); // cоздаем новый ОБЪЕКТ-ЭКЗЕМПЛЯР Класса

// Метод -> shoppingPage.render(); так Не вызываем - от должен вызываться, когда мы нажимаем на Выбрано Штук Товаров : (<div class="header-counter"> - Header.js-стр. 7 - Вешаем обработчик события