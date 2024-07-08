import React, {useState} from 'react'
import './index.css'
const PostItem = props => {
  const {posts, deletePost, editPost} = props
  const {name, title, content, id} = posts

  const [isEditing, setIsEditing] = useState(false)
  const [editedContent, setEditedContent] = useState(content)

  const deleteItem = () => {
    deletePost(id)
  }

  const handleEdit = () => {
    setIsEditing(true)
    setEditedContent(content) // Initialize edited content with current content
  }

  const handleSave = () => {
    editPost(id, editedContent)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setIsEditing(false)
  }

  const handleChange = event => {
    setEditedContent(event.target.value)
  }

  return (
    <div className="main-postItem">
      <div className="postItemContainer">
        <h2>{name}</h2>
        <h4>{title}</h4>
        {isEditing ? (
          <textarea
            rows="6"
            className="content"
            value={editedContent}
            onChange={handleChange}
          />
        ) : (
          <p>{content}</p>
        )}
        {isEditing ? (
          <div>
            <button className="editButton" onClick={handleSave}>
              Save
            </button>
            <button className="editButton" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        ) : (
          <button onClick={handleEdit} className="editButton">
            Edit Post
          </button>
        )}
        <button onClick={deleteItem} className="deleteButton">
          Delete Post
        </button>
      </div>
    </div>
  )
}

export default PostItem
