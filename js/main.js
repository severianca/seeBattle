'use strict';

define(['js/Render/Page.js', 'js/Base/Component.js'],
function(Page, Component) {

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

    /**
     * Обработчик клика на поле игрока
     * @param {mouseEvent} event 
     */
    function onItemPlayerClick(event) {

    }

    /**
     * Обработчик клика на кнопку "начать игру"
     * @param {mouseEvent} event 
     */
    function onStartButtonClick(event) {

    }
});
