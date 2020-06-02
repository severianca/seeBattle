'use strict';

define(['js/Render/Page.js', 'js/Base/Component.js', 'js/Play/TablePlayer.js', 'js/Play/TableAI.js'],
function(Page, Component, TablePlayer, TableAI) {

    let colorShip = '#CD5C5C';
    let colorItem = '#73c7e0';

    //флаг начала игры занаво
    let restart = false;

    Component.prototype.generateId = function() {
        return Math.random().toString(32).slice(2);
        };

    const page = factory.create(Page, {
        hint: 'Расположите корабли на поле',
        button_text: 'старт'
    });
    page.mount(document.body);

    // определяем все элементы поля игрока 
    var itemsPlayer = document.getElementsByName('player');
    //на каждый навешиваем обработчик клика и pointer курсор
    itemsPlayer.forEach((item) => {
        item.addEventListener('click', onItemPlayerClick);
        item.style.setProperty('--cursor', 'pointer');
    });

    // определяем все элементы поля ИИ
    var itemsAI = document.getElementsByName('AI');

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
        if (restart){
            restartPlay();
            return;
        }
        else {
            //проверим, что корабли расставлены верно
            let resultCheckLocationShips = tablePlayer.checkLocationShips();

            //проверим, что введено правильное количество кораблей
            let resultCheckCountShips = tablePlayer.checkCountShips();
            //если все условия выполняются
            if (resultCheckLocationShips && resultCheckCountShips) {
                //вывести сообщение что игра началась
                hint.innerHTML="Игра началась. Сделай первый ход";
                startPlay();
                restart = true;
                playButton[0].innerHTML="начать заново";
            }
            else {
                //вывести сообщение что корабли раставлены не верно
                hint.innerHTML="Корабли расставлены не верно. Попробуй расположить их по другому";
            }
        }
    }

    /**
     * Обработчик клика на поле AI
     * @param {mouseEvent} event 
     */
    function onItemAIClick(event) {
        // определим на какой элемент поля кликнули
        let idItemAIClick = event.currentTarget.id;
        //определим координаты
        let i = Number(idItemAIClick[0]);
        let j = Number(idItemAIClick[2]);
        let currentItemAIClick = document.getElementById(idItemAIClick);
        //play(i, j, currentItemAIClick);
    }

    function restartPlay(){
        tablePlayer.restartTablePlayer();
        itemsPlayer.forEach((item) => {
            item.addEventListener('click', onItemPlayerClick);
            item.style.setProperty('--cursor', 'pointer');
            item.style.setProperty('--background-color', colorItem);
        });
        tableAI.restartTableAI();
        itemsAI.forEach((item) => {
            item.removeEventListener('click', onItemAIClick);
            item.style.setProperty('--cursor', 'default');
            item.style.setProperty('--background-color', colorItem);
        });
        hint.innerHTML="Расположите корабли на поле";
        playButton[0].innerHTML="старт";
    }

    function startPlay(){
        //удаляем обработчик клика на поле игрока и удаляем pointer курсор
        itemsPlayer.forEach((item) => {
            item.removeEventListener('click', onItemPlayerClick);
            item.style.setProperty('--cursor', 'default');
        });
        //но добавляем для ИИ
        itemsAI.forEach((item) => {
            item.addEventListener('click', onItemAIClick);
            item.style.setProperty('--cursor', 'pointer');
        });
        //заполняем игровое поле II
        tableAI.createTableAI(tablePlayer);
    };
});
