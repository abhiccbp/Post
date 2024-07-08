import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import PostItem from '../PostItem'
import './index.css'
class PostsDisplay extends Component {
  render() {
    const {posts, deletePost, editPost} = this.props
    const length = posts.length

    return (
      <div>
        <h1 className="AllPostHeading">All Posts</h1>
        <div className="createBtnContainer">
          <Link to="/create">
            <button className="createBtn">Create New Post</button>
          </Link>
          <h4 className="count">Number of Posts: {length}</h4>
        </div>
        {posts.map(each => (
          <PostItem
            editPost={editPost}
            deletePost={deletePost}
            key={each.id}
            posts={each}
          />
        ))}
      </div>
    )
  }
}

export default PostsDisplay
