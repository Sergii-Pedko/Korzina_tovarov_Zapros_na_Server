class LocalStorageUtil { // (JS-DOM.html-стр. 5613)
   constructor() { //(Св-ва)- То , что в методах Класса ИССПОЛЬЗУЕТСЯ НЕСКОЛЬКО РАЗ
                this.keyName = 'products'; // Задаем key(ключ) - для LS
            }
// _________________________________________________________
            getProducts(){ //получить все продукты из LS
              const productsLocalStorage = localStorage.getItem(this.keyName);
//метод localStorage.getItem() - Возвращает СТРОКУ!!!(JSON) по Ключу ... или null;

              if (productsLocalStorage !== null) {
                return JSON.parse(productsLocalStorage);
// Преобразуем СТРОЧНЫЕ данные JSON -> В МАССИВ (Объект) - (JS-DOM.html-стр. 5995) 
              }
              return []; // иначе Вернуть ПУСТОЙ Массив
            }
// __________________________________________________________
// Добавляя НОВЫЙ Товар в LS - мы хотим ДОБАВИТЬ ЕГО id по catalog.js - Cледовательно в АРГУМЕНТ ф-ции (метода) - мы ПЕРЕДАЕМ  - id

            putProducts(id){ //1) Посмотреть - что уже находится в LS                   2) Добавить Новое Значение [id(по catalog.js)-ПРОДУКТА] в LS -стр.34 

//                    Application
//              key       |        Value
//            products    | ["el4", "el2", "el8"]

              let products = this.getProducts();
// 1) вызывая Метод (стр.6) - мы Получаем все продукты, которые уже есть в LS - и ЭТО МАССИВ

              let pushProduct = false;
 // Если false - то мы этот Продукт УДАЛИЛИ из LS;                                   Если true - то мы этот Продукт ДОБАВИЛИ в LS;

              const index = products.indexOf(id); //Метод — indexOf - РАБОТАЕТ В МАССИВАХ - ВОЗВРАЩАЕТ i элемента; либо => -1 ПРИ ОТСУТСТВИИ такого ЭЛЕМЕНТА

              if (index === -1) { // Если ЭЛЕМЕНТА НЕТ (т.е. - элемент ранее НЕ БЫЛ ДОБАВЛЕН в LS) 
                products.push(id); //2) Методом push() - ДОБАВЛЯЕМ новый элемент В КОНЕЦ МАССИВА - и ВОЗВРАЩАЕМ его новую ДЛИННУ.                                 (JS-DOM.html-стр. 133) 

                 pushProduct = true; //(стр. 29)

              } else { // Если ЭЛЕМЕНТ УЖЕ БЫЛ ДОБАВЛЕН в LS) 
                products.splice(index, 1); // УДАЛЯЕМ ЭТОТ элемент из массива.       splice(начальный индекс, сколько элементов удалить);                     (JS.html-стр. 2352) - ЧТОБЫ НЕ БЫЛО ЗАДВОЕНИЙ В ПОКУПКАХ ТОВАРА 
              }              
// ______________________________________________________
//метод localStorage.setItem("key", "Value"); - Добавляет в LS СТРОКУ!!!(JSON) - ПАРУ КЛЮЧ/ЗНАЧЕНИЕ (JS-DOM.html-стр. 5634)
              localStorage.setItem(this.keyName, JSON.stringify(products));
// т.к. products - это МАССИВ (стр.25) - а нам для Метода localStorage.setItem() - нужна СТРОКА - при помощи JSON.stringify() - преобразуем МАССИВ -> в Строку (JSON);
// __________________________________________________________________

// Кроме этого нам нужно вернуть pushProduct и сам массив продуктов - products           (стр. 25) - в Виде ОБЪЕКТА
              return {// ОБЪЕКТ
                pushProduct: pushProduct,
                products: products  
              };
        }
};

const localStorageUtil = new LocalStorageUtil(); // cоздаем новый ОБЪЕКТ-ЭКЗЕМПЛЯР Класса

// localStorageUtil.putProducts('el1'); // вызываем метод из ОБЪЕКТА
// localStorageUtil.putProducts('el2'); // вызываем метод из ОБЪЕКТА
// localStorageUtil.putProducts('el3'); // вызываем метод из ОБЪЕКТА
// localStorageUtil.putProducts('el4'); // вызываем метод из ОБЪЕКТА

// Чтобы ВРУЧНУЮ Правильно добавить в local Storage: el1 - el2, НЕОБХОДИМО сначала добавить el1 -стр.57; Потом закоментить стр.57 - и добавить el2-стр.58 - т.к. LS - CОХРАНЯЕТ ИЗМЕНЕНИЯ - ДАЖЕ КОГДА МЫ ВЫШЛИ ИЗ CАЙТА - (Если НЕ закоментить стр.57 - то el1 - ПОВТОРИТСЯ ДВАЖДЫ!!!  ["el1", "el1", "el2"] )

const a = localStorageUtil.getProducts(); // вызываем метод из ОБЪЕКТА
console.log(a);