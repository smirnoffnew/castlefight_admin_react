import React, {Component} from 'react';

class Skills extends Component {

    render() {
        return (

            <div idx={this.props.key}>
                <div className="btn-remove-select">
                    <button onClick={this.props.deleteSkillItem} >delete select</button>
                </div>

                <div style={{'height': '40px'}}>
                    <select className="select-skill" name={this.props.name} id={this.props.id} onChange={(e)=>this.props.onSelectSkillItem(this.props.data.uniqueId, e)}>
                        {
                            this.props.components.map( (item) =>
                                <option value={item.type}>{item.type}</option>
                            )
                        }
                    </select>
                </div>

                <div className="new-inputs" style={{'width':'90%', 'margin':'auto'}}>
                    <label style={{'marginRight':'75px'}}>Name property</label>
                    <label>Value property</label>
                </div>

                {
                    this.props.data.inputArray.map(  (item, index) =>
                        <div className="new-inputs" key={item.uniqueId}>
                            <input
                                type="text"
                                value={item.name}
                                onChange={ (e)=>this.props.changeValueInput(this.props.data.uniqueId, item.uniqueId, e, 'name') }
                            />
                            <input
                                type="text"
                                value={item.value}
                                onChange={ (e)=>this.props.changeValueInput(this.props.data.uniqueId, item.uniqueId, e, 'value') }
                            />
                            <button onClick={()=>this.props.deleteValueInput(this.props.data.uniqueId, item.uniqueId)}>delete prop</button>
                        </div>
                    )
                }

                <div className="btn-edit-input">
                    <button onClick={()=>this.props.addValueInput(this.props.data.uniqueId)}>+1</button>
                </div>
                <hr/>
            </div>

        )
    }
}

export default Skills;