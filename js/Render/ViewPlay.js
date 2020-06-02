define(['js/Render/Management.js', 'js/Render/PlayTable.js', 'js/Base/Component.js'],
function(Management, PlayTable, Component){
    class ViewPlay extends Component {
        render() {
            return `
                <div class="viewPlay">
                    <div class="viewPlay_table">
                        ${this.childrens.create(PlayTable, {
                            playTable: 'player'
                        })}
                    </div>
                    <div class="viewPlay_table">
                        ${this.childrens.create(PlayTable, {
                            playTable: 'II'
                        })}
                    </div>
                </div>`;
        }
    }
    return ViewPlay;
});