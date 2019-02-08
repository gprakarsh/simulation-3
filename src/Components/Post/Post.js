import React, { Component } from 'react'
import axios from 'axios'

export default class Post extends Component {
    constructor(props) {
        super(props)
        this.state = {
            post: {}
        }
    }
    componentDidMount = async () => {
        let postRes = await axios.get(`/api/post/${this.props.match.params.postid}`)
        this.setState({
            post: postRes.data
        })
        // console.log(this.state.post)
    }
    render() {
        const { post_title, post_image, post_text, username, profile_pic } = this.state.post
        return (
            <div className='Post'>
                <h3>{post_title}</h3>
                <img id='post_pic' src={post_image} onError={(e) => e.target.src = 'http://truzzinfotech.com/wp-content/uploads/2017/01/logo.jpg'} />
                <p>{post_text}</p>
                <p>{username}</p>
                <img id='author_pic' src={profile_pic} onError={(e) => e.target.src = 'http://truzzinfotech.com/wp-content/uploads/2017/01/logo.jpg'} />
            </div>
        )
    }
}
