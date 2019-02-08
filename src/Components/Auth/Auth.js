import React,{Component} from 'react'
import './Auth.css'
import Axios from 'axios'
import {connect} from 'react-redux'
import {updateUser} from './../../ducks/reducer'

class Auth extends Component {
    constructor(props){
        super(props)
        this.state={
        username:'',
        password:''        
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
        console.log(this.state)
    }

    register = async () => {
        const { username, password } = this.state
        try {
            const regRes = await Axios.post(`/auth/register`, { username, password })
            
            this.props.updateUser(regRes.data)
            this.props.history.push('/dashboard')            

        } catch (err) {
            console.log(err)
        }

    }

    login = async () => {
        const { username, password } = this.state
        try {
            const loginRes = await Axios.post(`/auth/login`, { username, password })
            this.props.updateUser(loginRes.data)
            this.props.history.push('/dashboard')            
        }
        catch (err) {
            console.log(err)
        }
    }

    render(){
        const {username,password} = this.state
        const {register,login} = this
        return(
            <div className='Auth'>
            Helo
            <input value={username} type='username' name='username' onChange={this.handleChange} placeholder='Username'/>
            <input value={password} type='password' name='password' onChange={this.handleChange} placeholder='Password'/>
            <div className='buttons'>
            <button onClick={login}>Login</button>
            <button onClick={register}>Register</button>
            </div>
            </div>
        )
    }
}

export default connect(null,{updateUser})(Auth)