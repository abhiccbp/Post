import React, {Component} from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import PostsDisplay from './components/PostsDisplay'
import CreatePost from './components/CreatePost'
import {v4} from 'uuid'
const initaialPosts = [
  {
    id: v4(),
    name: 'Jacob',
    title: 'React JS',
    content:
      'ReactJS, also known as React, is a popular JavaScript library for building user interfaces. It is also referred to as a front-end JavaScript library. It was developed by Facebook and is widely used for creating dynamic and interactive web applications.',
  },
  {
    id: v4(),
    name: 'Andrews',
    title: 'Fitness',
    content:
      'Having a high level of overall fitness is linked with a lower risk of chronic disease, as well as a better ability to manage health issues that do come up. Better fitness also promotes more functionality and mobility throughout one’s life span.',
  },
]

class App extends Component {
  state = {posts: initaialPosts}

  addPost = newPost => {
    this.setState(prevState => ({
      posts: [...prevState.posts, newPost],
    }))
  }

  deletePost = id => {
    const {posts} = this.state
    const filteredResults = posts.filter(each => each.id !== id)
    this.setState({posts: filteredResults})
  }

  editPost = (id, editedContent) => {
    const {posts} = this.state
    const updatedPosts = posts.map(post =>
      post.id === id ? {...post, content: editedContent} : post,
    )
    this.setState({posts: updatedPosts})
  }

  render() {
    const {posts} = this.state

    return (
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route exact path="/">
              <PostsDisplay
                editPost={this.editPost}
                deletePost={this.deletePost}
                posts={posts}
              />
            </Route>
            <Route path="/create">
              <CreatePost addPost={this.addPost} />
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

export default App
