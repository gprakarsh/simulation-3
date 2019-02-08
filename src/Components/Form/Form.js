import React, { Component } from 'react'
import {connect} from 'react-redux'
import axios from 'axios'

 class Form extends Component {
    constructor(props) {
        super(props)
        this.state = {
        title:'',
        image:'',
        content:''
        }
    }

    handleChange = (e) => {

        this.setState({
            [e.target.name]: e.target.value
        })

        console.log(this.state)
    }

    handlePost = async() => {
        let {id} = this.props
        console.log('Form',id)
        let {title,image,content} = this.state
        let newPost = {
            post_title: title,
            post_image: image,
            post_text: content
        }
        let creator = await axios.post(`/api/create/post/${id}`,newPost)
        this.props.history.push('/dashboard')  
    }

    render() {
        const {title,image,content} = this.state
        return (
            <div className='Form'>
                <input value={title} type='title' name='title' onChange={this.handleChange} placeholder='Enter Title' />
                <img src={image} alt='Image Preview'/>
                <input value={image} name='image' onChange={this.handleChange} placeholder='Enter Image URL' />
                <input value={content} type='content' name='content' onChange={this.handleChange} placeholder='Enter Content' />
                <button onClick={this.handlePost}>Post</button>
            </div>
        )
    }
}

const mapStateToProps = (reduxState) => {
    return {
        id:reduxState.id
    }
}

export default connect (mapStateToProps)(Form)
