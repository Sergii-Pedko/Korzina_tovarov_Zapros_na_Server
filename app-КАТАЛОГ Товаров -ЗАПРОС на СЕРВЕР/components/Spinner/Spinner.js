class Spinner {

	handleClear(){ //СКРЫВАЕМ Cпиннер - когда запрос на Сервер ОКОНЧЕН и данные загрузились

		ROOT_SPINNER.innerHTML = ''; //Присваиваем ПУСТУЮ Строку
	};


	render(){ //Вывод Cпиннера на Экран (пока идет запрос на Сервер)

		// Создадим внешнюю обвертку <div>
		const html =  `<div class="spinner-container">  
                       <img class="spinner__img" src="img/fastSpinner.svg">
                  </div>`;

		// Выводим <div> на Сайт (экран);  ROOT_SPINNER - (root.js-стр.6)
    ROOT_SPINNER.innerHTML = html;
	};

};

const spinnerPage = new Spinner(); // cоздаем новый ОБЪЕКТ-ЭКЗЕМПЛЯР Класса

// spinnerPage.render();  - вызываем метод из ОБЪЕКТА - [ВСТАВЛЯЕМ в index.js]

//spinnerPage.handleClear(); - вызываем метод из ОБЪЕКТА - [ВСТАВЛЯЕМ в index.js]