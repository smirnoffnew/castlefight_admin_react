import React, {Component} from 'react';
import Helper from "../helper";

const helper = new Helper;

class KnightFormItemComponent extends Component {
    render() {
        console.log('KnightFormItemComponent', this.props.data);
        return (
            <div>
                <div className="btn-remove-select">
                    <button type="reset" onClick={this.props.deleteSkillItem} >delete select</button>
                </div>

                <div style={{'height': '40px'}}>
                    <select className="select-skill"
                            name={this.props.name}
                            id={this.props.id}
                            value={this.props.data.type}
                            onChange={(e)=>this.props.onSelectSkillItem(this.props.data.uniqueId, e)}>
                        {
                            this.props.abilities.map((item, index) =>
                                <option value={item.type} key={index}>{item.type}</option>
                            )
                        }
                    </select>
                </div>

                <div className="new-inputs" style={{'width':'90%', 'margin':'auto'}}>
                    <label style={{'marginRight':'75px'}}>Name property</label>
                    <label>Value property</label>
                </div>

                {
                    this.props.data.values.map( item =>
                        <div key={helper.makeId()} className="new-inputs" >
                            <input
                                key={helper.makeId()}
                                type="text"
                                value={item.name}
                                onChange={(e)=>this.props.changeValueInput(this.props.data.uniqueId, item.uniqueId, e, 'name')}
                            />
                            <input
                                key={helper.makeId()}
                                type="text"
                                value={item.value}
                                onChange={ (e)=>this.props.changeValueInput(this.props.data.uniqueId, item.uniqueId, e, 'value') }
                            />
                            <button type="reset" onClick={()=>this.props.deleteValueInput(this.props.data.uniqueId, item.uniqueId)}>delete prop</button>
                        </div>
                    )
                }

                <div className="btn-edit-input">
                    <button type="reset" onClick={()=>this.props.addValueInput(this.props.data.uniqueId)}>+1</button>
                </div>
                <hr/>
            </div>

        )
    }
}

export default KnightFormItemComponent;