import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Alert, Spinner } from 'react-bootstrap';
import PostItem from './PostItem';  
const PostForm = ({ onNewPost, currentUser }) => {
  const [text, setText] = useState('');
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(file ? URL.createObjectURL(file) : null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) {
      setError('Post text is required!');
      return;
    }

    setLoading(true);
    setError('');

    const formData = new FormData();
    formData.append('body', text);
    if (image) formData.append('image', image);

    try {
      const response = await axios.post('http://localhost:5000/api/posts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      onNewPost(response.data);
      setText('');
      setImage(null);
      setPreview(null);
    } catch (err) {
      setError('Failed to create post. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="mb-4 border rounded p-3 bg-light shadow-sm">
      {error && <Alert variant="danger">{error}</Alert>}
      <Form.Group controlId="postText" className="mb-3">
        <Form.Label>Write something, {currentUser?.name}:</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="What's on your mind?"
        />
      </Form.Group>

      <Form.Group controlId="postImage" className="mb-3">
        <Form.Label>Upload an image (optional):</Form.Label>
        <Form.Control type="file" accept="image/*" onChange={handleImageChange} />
        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="img-fluid mt-2 rounded shadow-sm"
            style={{ maxHeight: '200px' }}
          />
        )}
      </Form.Group>

      <Button type="submit" variant="primary" disabled={loading} className="w-100">
        {loading ? <Spinner animation="border" size="sm" /> : 'Post'}
      </Button>
      {text.trim() && (
  <div className="mt-4 p-3 border-top">
    <h6 className="text-muted mb-2">Preview:</h6>
    <p className="fst-italic">{text}</p>
  </div>
)}

    </Form>
  );
};

export default PostForm;