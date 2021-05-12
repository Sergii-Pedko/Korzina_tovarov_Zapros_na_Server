class Error {

	render(){ //Вывод окна Error - когда ответ с Сервера НЕ ПРИШЕЛ

		// Создадим внешнюю обвертку <div>
		const html =  `<div class="error-container">
		                    <div class="error-message">
		                      <h3>Нет Доступа!!</h3>  
                          <p>Попробуйте зайти позже</p>
                        </div> 
                    </div>`;

		// Выводим <div> на Сайт (экран);  ROOT_ERROR - (root.js-стр.7)
    ROOT_ERROR.innerHTML = html;
	};

};

const errorPage = new Error(); // cоздаем новый ОБЪЕКТ-ЭКЗЕМПЛЯР Класса

// errorPage.render();  - вызываем метод из ОБЪЕКТА - [ВСТАВЛЯЕМ в index.js]