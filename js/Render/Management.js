define(['js/Base/Component.js'],
function(Component){
    class Management extends Component {
        render() {
            return `
                <div class="ship four-deck_ship">
                    <div class="item"></div>
                    <div class="item"></div>
                    <div class="item"></div>
                    <div class="item"></div>
                </div>
                <div class="four-deck_ship_count">1</div>
                <div class="ship three-deck_ship">
                    <div class="item"></div>
                    <div class="item"></div>
                    <div class="item"></div>
                </div>
                <div class="three-deck_ship_count">2</div>
                    <div class="ship two-deck_ship">
                    <div class="item"></div>
                    <div class="item"></div>
                </div>
                <div class="two-deck_ship_count">3</div>
                <div class="ship one-deck_ship">
                    <div class="item"></div>
                </div>
                <div class="one-deck_ship_count">4</div>
                <button class="start-button">Начать игру</button>`;
        }
    }
    return Management;
});