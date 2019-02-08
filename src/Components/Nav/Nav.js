import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import './Nav.css'
import Axios from 'axios'
import {updateUser} from './../../ducks/reducer'

class Nav extends Component {
    
    logout=()=>{
        Axios.post(`/auth/logout`)
        .then(res=>{
            this.props.updateUser({})
            this.props.history.push('/')
        })
        .catch(err=>{
            console.log(err)
        })
    }
    
    render() {
        return (
            <div>
                {this.props.location.pathname === '/'
                    ? <div></div>
                    : <div className='Nav'>
                        <div className='userinfo'>
                            <p>{this.props.username}</p>
                            <img src={this.props.profile_pic} onError={(e) => e.target.src = 'http://truzzinfotech.com/wp-content/uploads/2017/01/logo.jpg'} />
                        </div>
                        <Link to='/dashboard'><button>Home</button></Link>
                        <Link to='new'><button>New Post</button></Link>
                        <Link to='/post/:postid'><button onClick={this.logout}>Logout</button></Link>
                    </div>
                }

            </div>
        )
    }
}

const mapStateToProps = (reduxState) => {
    return {
        username: reduxState.username,
        profile_pic: reduxState.profile_pic
    }
}

export default withRouter(connect(mapStateToProps,{updateUser})(Nav))