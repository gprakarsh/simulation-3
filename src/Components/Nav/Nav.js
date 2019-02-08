import React from 'react'
import {withRouter,Link} from 'react-router-dom'
import {connect} from 'react-redux'
import './Nav.css'

 function Nav(props) {
    return (
        <div>
            {console.log(props)}
            {props.location.pathname === '/'
                ? <div></div>
                : <div className='Nav'>
                    <div className='userinfo'>
                    <p>{props.username}</p>
                    <img src={props.profile_pic} onError={(e)=>e.target.src='http://truzzinfotech.com/wp-content/uploads/2017/01/logo.jpg'}/>
                    </div>
                    <Link to='/dashboard'><button>Home</button></Link>
                    <Link to='new'><button>New Post</button></Link>
                    <Link to='/post/:postid'><button>Logout</button></Link>
                </div>
            }

        </div>
    )
}

const mapStateToProps = (reduxState) => {
  return {
      username:reduxState.username,
      profile_pic:reduxState.profile_pic
  }
}

export default withRouter(connect(mapStateToProps)(Nav))