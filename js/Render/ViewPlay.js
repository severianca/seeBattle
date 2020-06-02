define(['js/Render/PlayTable.js', 'js/Base/Component.js'],
function(PlayTable, Component){
    class ViewPlay extends Component {
        render() {
            return `
                <div class="viewPlay">
                    <div class="viewPlay_table" name="playTablePlayer">
                        ${this.childrens.create(PlayTable, {
                            playTable: 'player'
                        })}
                    </div>
                    <div class="viewPlay_table" name="playTableAI">
                        ${this.childrens.create(PlayTable, {
                            playTable: 'AI'
                        })}
                    </div>
                </div>`;
        }
    }
    return ViewPlay;
});