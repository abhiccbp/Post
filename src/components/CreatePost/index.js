import React, {Component} from 'react'
import {withRouter, Link} from 'react-router-dom'
import {v4} from 'uuid'
import './index.css'

class CreatePost extends Component {
  state = {
    name: '',
    showNameError: false,
    showTitleError: false,
    showContentError: false,
    isFormSubmitted: false,
    title: '',
    content: '',
  }

  handleSubmit = event => {
    const isValidName = this.validateName()
    const isValidTitle = this.validateTitle()
    const isValidContent = this.validateContent()
    console.log(isValidName)
    console.log(isValidTitle)
    event.preventDefault()
    const {title, content, name} = this.state
    const newPost = {
      id: v4(),
      title,
      content,
      name,
    }
    this.props.addPost(newPost)
    this.setState({
      name: '',
      title: '',
      content: '',
    })

    if (isValidTitle && isValidName && isValidContent) {
      this.setState({
        isFormSubmitted: true,
      })
    } else {
      this.setState({
        showNameError: !isValidName,
        showTitleError: !isValidTitle,
        showContentError: !isValidContent,
        isFormSubmitted: false,
      })
    }
  }

  onChangeTitle = event => {
    this.setState({title: event.target.value})
  }

  onChangeContent = event => {
    this.setState({content: event.target.value})
  }

  onChangeName = event => {
    this.setState({name: event.target.value})
  }
  validateName = () => {
    const {name} = this.state

    return name !== ''
  }
  validateTitle = () => {
    const {title} = this.state

    return title !== ''
  }

  validateContent = () => {
    const {content} = this.state
    return content !== ''
  }

  viewAllPost = () => {
    const {history} = this.props
    history.push('/')
  }

  onClickSubmitAnotherResponse = () => {
    this.setState(prevState => ({
      isFormSubmitted: !prevState.isFormSubmitted,
      name: '',
      title: '',
      content: '',
      showContentError: false,
      showNameError: false,
      showTitleError: false,
    }))
  }

  renderSubmissionSuccessView = () => (
    <div className="SuccessContainer">
      <div className="succesView">
        <img
          src="https://assets.ccbp.in/frontend/react-js/success-icon-img.png"
          alt="success"
          className="success-image"
        />
        <p>Post Submitted Successfully</p>
        <Link to="/create">
          <button
            type="button"
            className="submit-button"
            onClick={this.onClickSubmitAnotherResponse}
          >
            Submit Another Response
          </button>
        </Link>
      </div>
    </div>
  )

  renderForm = () => {
    const {
      title,
      content,
      name,
      showNameError,
      showTitleError,
      showContentError,
    } = this.state
    return (
      <div className="createPostContainer">
        <form className="form" onSubmit={this.handleSubmit}>
          <h1 className="createPostHeading">Create New Post</h1>
          <div className="nameContainer">
            <label>Name</label>
            <input
              onChange={this.onChangeName}
              className="input"
              value={name}
              placeholder="Enter Your Name"
              type="text"
            />
            {showNameError && <p className="errorMsg">*Required</p>}
          </div>
          <div className="titleContainer">
            <label>Title</label>
            <input
              className="input"
              placeholder="Title"
              value={title}
              type="text"
              onChange={this.onChangeTitle}
            />
            {showTitleError && <p className="errorMsg">*Required</p>}
          </div>
          <div className="contentContainer">
            <label>Content</label>
            <textarea
              className="content"
              placeholder="Content"
              cols="20"
              rows="8"
              name="content"
              value={content}
              onChange={this.onChangeContent}
            />
            {showContentError && <p className="errorMsg">*Required</p>}
          </div>
          <div className="btnCont">
            <button className="submit-button" onClick={this.viewAllPost}>
              View All Posts
            </button>{' '}
            <button className="submitButton" type="submit">
              Add Post
            </button>
          </div>
        </form>
        <div>
          <img
            className="image"
            src="https://mylargebox.com/wp-content/uploads/2019/02/blog-posting-websites.jpg"
          />
        </div>
      </div>
    )
  }

  render() {
    const {isFormSubmitted} = this.state

    return (
      <div className="view-container">
        {isFormSubmitted
          ? this.renderSubmissionSuccessView()
          : this.renderForm()}
      </div>
    )
  }
}

export default withRouter(CreatePost)
