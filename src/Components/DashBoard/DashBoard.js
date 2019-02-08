import React, { Component } from 'react'
import './DashBoard.css'
import { connect } from 'react-redux'
import axios from 'axios';
import {Link} from 'react-router-dom'

class DashBoard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            search: '',
            myposts: true,
            posts: []
        }
    }

    componentDidMount() {
        this.getPosts()
    }

    handleChange = (e) => {

        this.setState({
            [e.target.name]: e.target.value
        })

        console.log(this.state)
    }

    handleBox = () => {
        this.setState({
            myposts: !this.state.myposts
        })
        console.log(this.state)
    }

    getPosts = async () => {
        const { id } = this.props
        let { myposts, search } = this.state
        let postsRes = await axios.get(`/api/posts/?userposts=${myposts}&search=${search}`)
        this.setState({
            posts: postsRes.data
        })
    }

    reset = () => {
        this.getPosts()
        this.setState({
            search: ''
        })
    }
    render() {
        console.log(this.state)
        let postMapper = this.state.posts.map((post, i) => {
            return (
                <Link to={`/post/${post.post_id}`}>
                <div className='posts'>
                    <p>{post.post_title}</p>
                    <p>{post.username}</p>
                    <img id='author_pic' src={post.profile_pic} onError={(e) => e.target.src = 'http://truzzinfotech.com/wp-content/uploads/2017/01/logo.jpg'} />
                </div>
                </Link>
            )
        })
        const { search, myposts } = this.state
        return (
            <div className='DashBoard'>
                <header>
                    <input value={search} type='search' name='search' onChange={this.handleChange} placeholder='Search' />
                    <button onClick={this.getPosts}><img id='search' src='https://cdn1.iconfinder.com/data/icons/startup-business-vol-1-1/512/business_symbolicon_flat-04-512.png' /></button>
                    <button onClick={this.reset}>Reset</button>
                    <input type='checkbox' name='myposts' value={myposts} onClick={this.handleBox} />
                    {postMapper}
                </header>
            </div>
        )
    }
}

export default DashBoard