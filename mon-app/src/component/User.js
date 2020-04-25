import React from 'react';
import {connect} from "react-redux";
import { showUser } from '../actions/actions';
import * as serviceUser from "../services/serviceUser";


class User extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            datas: [],
            listUser:[]
        }

        this.listUser = this.listUser.bind(this);
        this.updateListUser = this.updateListUser.bind(this);
        this.sendUpdate = this.sendUpdate.bind(this);
        this.removeUser = this.removeUser.bind(this);
    }

    async componentDidMount(){
        let users = await this.props.users;
        this.setState({datas:users});
        this.listUser();
    }

    async listUser(){
        
        let list =  await this.state.datas.map((value, index) => { 
            return (
                    
                    <tr key={index}>
                        <th>{value._id}</th>
                        <th>{value.mail}</th>
                        <td>
                            <button onClick={this.updateListUser}>Modify</button>
                        </td>
                        <td>
                            <button onClick={() => {this.removeUser(value._id)}}>Delete</button>
                        </td>
                    </tr>
                        
                );
            });
            this.setState({listUser:list});
    }

    async removeUser(id){
        let data = {
            id: id
        }
        var tab = [id];
        let dataUsers = this.state.datas;
        for (var i = 0; i < dataUsers.length; i++) {
            var obj = dataUsers[i];

            if (tab.indexOf(obj._id) !== -1) {
                dataUsers.splice(i, 1);
            }
        }
        
        this.props.actions(dataUsers);
        this.setState({datas: dataUsers});
        this.listUser();
        serviceUser.deleteUser(data);
    }

    async updateListUser(){
       
        let list =  await this.state.datas.map((value, index) => { 
            return (
                    <tr key={index}>
                        <th>{value._id}</th>
                        <th>{value.mail}</th>
                        <td>
                            <form onSubmit={(e) => {this.sendUpdate(e);this.listUser();}}>
                                <input  type="hidden" defaultValue= {value._id} name="id"/>  
                                <input  type="text"  name="password"/>
                                <input  type="submit"  value="Update"/>    
                            </form>
                            
                        </td>
                    </tr>
                );
            });
            this.setState({listUser:list});
    }

    async sendUpdate(e){
        serviceUser.updateUser(e)
    }

   
    render(){
        return(
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                        </tr>
                    </thead>

                    <tbody>
                        {this.state.listUser}
                    </tbody>
                </table>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
      users: state.user,
    };
  }

function mapDispatchToProps(dispatch) {
  return { actions: (data) => {dispatch(showUser(data))} }
}
  export default connect(mapStateToProps, mapDispatchToProps)(User);