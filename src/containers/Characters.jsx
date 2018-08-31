import React, { Component } from 'react';
import AddButton from "../components/AddButton";
import Loading from "../components/common/loading";
import CharactersTable from "../components/CharactersTable";
import Helper from "../helper";
import axios from '../axiosBaseUrlConfig';
import { withAlert } from "react-alert"


class TableContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            entity: '',
            abilities: [],
            rows: [],
            columns: ['Name', 'Components', 'Edit', 'Delete']
        };
        this.helper = new Helper();
    }

    componentDidMount() {
        this.getData();
    };

    componentWillReceiveProps() {
        this.getData();
    };

    objectToArray = (objectData) => {
        return objectData
            ?
            Object.keys(objectData).map(key=>({
                uniqueId: this.helper.makeId(),
                nameInput: key,
                valueInput: objectData[key]
            }))
            :
            []
    };

    removeRecord = (entity, id) => {
        axios
            .delete(`/${entity}/${id}`, {})
            .then(() => {
              this.props.alert.success("Successfully deleted!")
              this.getData()
            })
            .catch((error) => {
              this.props.alert.error(error)
                console.error(error);
            });
    };

    getData = () => {
        axios
            .get(this.props.history.location.pathname)
            .then(response => {
                this.setState((prevState) => ({
                    ...prevState,
                    entity: this.props.history.location.pathname.substr(1),
                    rows: response.data.map(entityItem=>(
                        {
                            ...entityItem,
                            components:entityItem.components.map(item=>{
                                return{
                                    ...item,
                                    uniqueId:this.helper.makeId(),
                                    values:this.objectToArray(item.values)
                                }
                            }),
                            uniqueId:this.helper.makeId(),
                            name: this.props.history.location.pathname === '/abilities' ? entityItem.id : entityItem.name,
                        }
                        )),
                }));
                return this.getComponentsList();
            })
            .then((componentsListResponse)=>{
                this.setState((prevState) => ({
                    ...prevState,
                    isLoaded: true,
                    abilities: componentsListResponse.data.map(componentName=>this.helper.getUniqueAbility(componentName))
                }));
            })
            .catch(function (error) {
                console.error(error);
            });
    };

    getComponentsList = () => {
        return axios.get('/components')
    };


    render() {
        return (
            <div className="container">
                <h2 className="col-50">{this.state.entity}</h2>
                {
                    this.state.isLoaded
                        ?
                        <div>
                            <AddButton
                                abilities={this.state.abilities}
                                entity={this.state.entity}
                                getData={this.getData}
                            />
                            <CharactersTable
                                abilities={this.state.abilities}
                                entity={this.state.entity}
                                columns = {this.state.columns}
                                rows = {this.state.rows}
                                getData={this.getData}
                                removeRecord={this.removeRecord}
                            />
                        </div>
                        :
                        <Loading />
                }
            </div>
        )
    };
}

export default withAlert(TableContainer);
