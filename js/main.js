'use strict';

define(['js/Render/Page.js', 'js/Base/Component.js'],
function(Page, Component) {

    let colorShip = '#CD5C5C';
    let colorItem = '#73c7e0';

    Component.prototype.generateId = function() {
        return Math.random().toString(32).slice(2);
        };

    const page = factory.create(Page, {
        hint: 'Расположите корабли на поле'
    });
    page.mount(document.body);

    // определяем все элементы поля игрока 
    var itemsPlayer = document.getElementsByName('player');
    //на каждый навешиваем обработчик клика и pointer курсор
    itemsPlayer.forEach((item) => {
        item.addEventListener('click', onItemPlayerClick);
        item.style.setProperty('--cursor', 'pointer');
    });

    let playButton = document.getElementsByName('playButton');
    playButton[0].addEventListener('click', onStartButtonClick);

    let hint = document.getElementById('hint');

    //создадим поле игрока
    let tablePlayer = new TablePlayer();
    //создаем поле ИИ
    let tableAI = new TableAI();

    /**
     * Обработчик клика на поле игрока
     * @param {mouseEvent} event 
     */
    function onItemPlayerClick(event) {
        // определим на какой элемент поля кликнули
        let idItemClick = event.currentTarget.id;
        let currentItemClick = document.getElementById(idItemClick);

        if (tablePlayer.canAddShip(idItemClick)) {
            currentItemClick.style.setProperty('--background-color', colorShip);
        }
        else {
            currentItemClick.style.setProperty('--background-color', colorItem);
        }
    }

    /**
     * Обработчик клика на кнопку "начать игру"
     * @param {mouseEvent} event 
     */
    function onStartButtonClick(event) {

    }
});
