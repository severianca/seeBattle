'use strict';

define(['js/Render/Page.js', 'js/Base/Component.js', 'js/Base/TableFactory.js', 'js/Play/TablePlayer.js', 'js/Play/TableAI.js'],
function(Page, Component, TableFactory, TablePlayer, TableAI) {

    let colorShip = '#CD5C5C';
    let colorItem = '#73c7e0';

    //флаг начала игры занаво
    let restart = false;

    const tableFactory = new TableFactory();

    let tablePlayer = tableFactory.createTablePlayer();
    let tableAI = tableFactory.createTableAI();

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

    //последний ход ИИ
    let lastI = -1;
    let lastJ = -1;

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
            restart = false;
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
        shotPlayer(i, j, currentItemAIClick);
    }

    function restartPlay(){
        tablePlayer.restartTable();
        itemsPlayer.forEach((item) => {
            item.addEventListener('click', onItemPlayerClick);
            item.style.setProperty('--cursor', 'pointer');
            item.style.setProperty('--background-color', colorItem);
        });
        tableAI.restartTable();
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
        //заполняем игровое поле AI
        tableAI.createTableAI(tablePlayer.getTable());
    }

    /**
    * i, j - координаты, которыми сходил игрок
    * currentItemAIClick - поле по которому кликнул игрок
    */
   function shotPlayer(i, j, currentItemAIClick){
    if (tableAI.shot(i, j)){
        currentItemAIClick.style.setProperty('--background-color', '#FF0000');
        if(tableAI.checkKill(i, j)){
            hint.innerHTML="Убил";
        }
        else {
            hint.innerHTML="Ранил";
        }
    }
    else {
        currentItemAIClick.style.setProperty('--background-color', '#000000');
        hint.innerHTML="Мимо. Ход ИИ";
        actionAI();
    }
    if (tableAI.getCountShips()==0){
        hint.innerHTML="Победа!";
        endPlay();
    }
    if (tablePlayer.getCountShips()==0){
        hint.innerHTML="Поражение";
        endPlay();
    }
}

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    /**
    * ход искусственного интеллекта
    */
    function actionAI(){
        let i, j;
        if (lastI == -1 && lastJ == -1){
            i = getRandomInt(0,9);
            j = getRandomInt(0,9);
            while (tablePlayer.getItem(i, j) == -1){
                i = getRandomInt(0,9);
                j = getRandomInt(0,9);
            }
            if (!tablePlayer.shot(i, j)){
                //в таком случае ход ИИ окончен
                //поле окрашивается в цвет поражения...
                tablePlayer.paintItemMiss(i, j);
                hint.innerHTML="Твой ход";
                return;
            }
            //значит мы попали в корабль
            else{
                //это поле окрашивается
                tablePlayer.paintItemGet(i, j);
                //проверяется убили или ранили
                if (tablePlayer.checkKill(i, j)){
                    //сбрасываем lastI lastJ
                    lastI = -1;
                    lastJ = -1;
                    //и продолжаем ход
                    actionAI();
                }
                else {
                    //если ранили запоминаем ход ИИ
                    lastI = i;
                    lastJ = j;
                    //делаем новый ход
                    actionAI();
                }
            }
        }
        //значит что в прошлый раз ИИ не добил корабль
        else {
            //ищем куда сходить
            //если не верхняя горизонтальная строка, и не стреля ли уже в поле сверху
            if (lastI != 0 && lastI != -1 && tablePlayer.checkShot(lastI-1, lastJ)){
                //то делаем выстрел
                if (tablePlayer.shot(lastI-1, lastJ)){
                    //если действия ИИ закончились успехом, то ИИ ходит ещё
                    //но прежде запомним новый успешный ход
                    lastI = lastI-1;
                    //и покрасим клеточку
                    tablePlayer.paintItemGet(lastI, lastJ);
                    if (tablePlayer.checkKill(lastI, lastJ)){
                        lastI = -1;
                        lastJ = -1;
                    }
                    actionAI();
                }
                else {
                    //ход завершен
                    //поле окрашивается в цвет поражения...
                    tablePlayer.paintItemMiss(lastI-1, lastJ);
                    hint.innerHTML="Твой ход";
                    return;
                }
            }

            if (lastI != 9 && lastI != -1 && tablePlayer.checkShot(lastI+1, lastJ)){
                if (tablePlayer.shot(lastI+1, lastJ)) {
                    lastI = lastI+1;
                    //и покрасим клеточку
                    tablePlayer.paintItemGet(lastI, lastJ);
                    //проверяем убит ли корабль
                    //если убит, то сбрасываем lastI и lastJ
                    if (tablePlayer.checkKill(lastI, lastJ)){
                        lastI = -1;
                        lastJ = -1;
                    }
                    actionAI();
                }
                else {
                    //поле окрашивается в цвет поражения...
                    tablePlayer.paintItemMiss(lastI+1, lastJ);
                    hint.innerHTML="Твой ход";
                    return;
                }
            }

            //если не самый правый столбец, и не стреля ли уже в поле справа
            if (lastJ != 9 && lastJ != -1 && tablePlayer.checkShot(lastI, lastJ+1)){
                if (tablePlayer.shot(lastI, lastJ+1)) {
                    lastJ = lastJ+1;
                    //и покрасим клеточку
                    tablePlayer.paintItemGet(lastI, lastJ);
                    if (tablePlayer.checkKill(lastI, lastJ)){
                        lastI = -1;
                        lastJ = -1;
                    }
                    actionAI();
                }
                else {
                    //поле окрашивается в цвет поражения...
                    tablePlayer.paintItemMiss(lastI, lastJ+1);
                    hint.innerHTML="Твой ход";
                    return;
                }
            }

            if (lastJ != 0 && lastJ != -1 && tablePlayer.checkShot(lastI, lastJ-1)){
                if (tablePlayer.shot(lastI, lastJ-1)){
                    lastJ = lastJ-1;
                    //и покрасим клеточку
                    tablePlayer.paintItemGet(lastI, lastJ);
                    if (tablePlayer.checkKill(lastI, lastJ)){
                        lastI = -1;
                        lastJ = -1;
                    }
                    actionAI();
                }
                else {
                    //поле окрашивается в цвет поражения...
                    tablePlayer.paintItemMiss(lastI, lastJ-1);
                    hint.innerHTML="Твой ход";
                    return;
                }
            }
        }
    }

    function endPlay(){
        //удаляем обработчик клика на поле ИИ, удаляем pointer курсор
        itemsAI.forEach((item) => {
            item.removeEventListener('click', onItemAIClick);
            item.style.setProperty('--cursor', 'default');
        });
    }
});
