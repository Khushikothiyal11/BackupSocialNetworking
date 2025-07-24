import React, { useState, useEffect } from "react";
import PostForm from "../components/PostForm";
import GroupCard from "../components/GroupCard";
import axios from "axios";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Home = ({ currentUser }) => {
  const navigate = useNavigate();
  // const [likes, setLikes] = useState(post.likes || []);

  const [posts, setPosts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [friends, setFriends] = useState([]);
  const [groups, setGroups] = useState([]);
  // useEffect(() => {
  //   axios.get('http://localhost:5000/api/posts', {
  //     headers: {
  //       Authorization: `Bearer ${localStorage.getItem("token")}`,
  //     },
  //   })
  //   .then(res => setPosts(res.data))
  //   .catch(err => console.error(err));
  // }, []);
 
  const getAllFriends = async () => {
    fetch("http://localhost:5000/api/friends/" + localStorage.getItem("userId"))
      .then((response) => response.json())
      .then((data) => {
        setFriends(data);
        localStorage.setItem("setProfile",data?.[0]?.receiver);
        console.log("Friends:", data);
      })
      .catch((error) => {
        console.error("Error fetching friends:", error);
      });
  };

  const getAllGroups = async () => {
    fetch("http://localhost:5000/api/groups")
      .then((response) => response.json())
      .then((data) => {
        setGroups(data);
        console.log("All Groups:", data);
      })
      .catch((error) => {
        console.error("Error fetching groups:", error);
      });
  };

  useEffect(() => {
    const fetchPostsWithComments = async () => {
      try {
        const postRes = await axios.get("http://localhost:5000/api/posts", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const postsData = postRes.data;

        // Fetch comments for each post

        const enrichedPosts = await Promise.all(
          postsData.map(async (post) => {
            try {
              const commentRes = await axios.get(
                `http://localhost:5000/api/comments/${post._id}`,
                {
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                  },
                }
              );
              return { ...post, comments: commentRes.data };
            } catch (commentErr) {
              console.error(
                `Failed to fetch comments for post ${post._id}:`,
                commentErr.message
              );
              return { ...post, comments: [] }; // fallback to empty comments
            }
          })
        );

        setPosts(enrichedPosts);
      } catch (err) {
        console.error("Failed to fetch posts:", err.message);
      }
    };

    fetchPostsWithComments();
    getAllFriends();
    getAllGroups();
  }, []);

  const handleNewPost = (post) => {
    const enrichedPost = { ...post, comments: [] }; // Ensure new post has a comments array
    setPosts((prev) => [enrichedPost, ...prev]);
    setShowForm(false);
  };

  // const likePost = (postId) => {
  //   setPosts(posts.map(post =>
  //     post._id === postId ? { ...post, likes: post.likes + 1 } : post
  //   ));
  // };

  const likePost = async (postId) => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/posts/${postId}/like`,
        null,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // your stored token here
          },
        }
      );

      const updatedLikes = res.data.likes;

      setPosts((prev) =>
        prev.map((post) =>
          post._id === postId ? { ...post, likes: updatedLikes } : post
        )
      );
    } catch (err) {
      console.error("Like failed:", err);
    }
  };
  // const addComment = (postId, commentText) => {
  //   if (commentText.trim()) {
  //     setPosts(posts.map(post =>
  //       post._id === postId
  //         ? {
  //             ...post,
  //             comments: [
  //               ...post.comments,
  //               { id: new Date().getTime(), text: commentText }
  //             ]
  //           }
  //         : post
  //     ));
  //   }
  // };

  const addComment = async (postId, commentText) => {
    if (!commentText.trim()) return;

    try {
      const response = await axios.post(
        `http://localhost:5000/api/comments/${postId}`,
        { comment: commentText },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // adjust as needed
          },
        }
      );

      const newComment = response.data;

      // Update the UI with the newly created comment
      setPosts((posts) =>
        posts.map((post) =>
          post._id === postId
            ? {
                ...post,
                comments: [newComment, ...(post.comments || [])],
              }
            : post
        )
      );
    } catch (error) {
      console.error(
        "Failed to add comment:",
        error.response?.data?.message || error.message
      );
    }
  };
  const viewProfile = (userId) => {
    localStorage.setItem("setProfile", userId);
    navigate(`/profile/${userId}`);
  };
  // const friends = ['Alice', 'Bob', 'Charlie', 'David', 'Eva', 'Frank', 'Grace', 'Helen', 'Ian'];

  // const groups = [
  //   { name: 'Sample Group One', description: 'This is a sample Dobble social network group.' },
  //   { name: 'Sample Group Two', description: 'This is a sample Dobble social network group.' },
  //   { name: 'Sample Group Three', description: 'This is a sample Dobble social network group.' },
  // ];

  return (
    <div className="container-fluid p-0">
      <div className="container mt-4">
        <div className="row">
          {/* Left Column */}
          <div className="col-md-8">
            <div className="d-flex align-items-center mb-4">
              <span
                role="img"
                aria-label="brain sparkle"
                style={{ fontSize: "2.5rem", marginRight: "0.5rem" }}
              >
                🧠✨
              </span>
              <span
                style={{
                  fontSize: "2rem",
                  color: "#007bff",
                  fontWeight: "bold",
                }}
              >
                Unfiltered. Unscripted. You
              </span>
            </div>
            <div>
              <Button variant="info" onClick={() => setShowForm(!showForm)}>
                {showForm ? "Cancel" : "Create Post"}
              </Button>
            </div>
            <br />
            {showForm && (
              <PostForm onNewPost={handleNewPost} currentUser={currentUser} />
            )}
            {posts.map((post) => (
              // const firstName = comment.creator?.creatorName?.split(" ")[0] || "User";
              <div key={post._id || post.id} className="card mb-4 shadow-sm">
                <div className="card-body">
                  <div className="d-flex align-items-center mb-2">
                    <h5 className="mb-0">{post.creator?.fullName}</h5>
                  </div>
                  <p>{post.body || post.content}</p>
                  {post.image && (
                    <img
                      src={post.image}
                      alt="Post"
                      className="img-fluid rounded mb-2"
                    />
                  )}
                  <div className="d-flex gap-2 mb-3">
                    <button
                      className="btn btn-outline-primary btn-sm"
                      onClick={() => likePost(post._id)}
                    >
                      👍 Like ({post.likes?.length || 0})
                    </button>
                    {/* <button className="btn btn-outline-secondary btn-sm">Follow</button> */}
                    <button className="btn btn-outline-success btn-sm">
                      🔗 Share
                    </button>
                  </div>
                  <div className="comments">
                    <h6>Comments</h6>
                    {post.comments?.map((comment) => {
                      const firstName =
                        comment.creator?.creatorName?.split(" ")[0] || "User";
                      return (
                        <p key={comment._id} className="mb-1">
                          💬 <strong>{firstName}:</strong> {comment.comment}
                        </p>
                      );
                    })}
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        const commentText =
                          e.target.elements[`comment-${post._id}`].value;
                        addComment(post._id, commentText);
                        e.target.reset();
                      }}
                    >
                      <div className="input-group mt-2">
                        <input
                          type="text"
                          name={`comment-${post._id}`}
                          className="form-control"
                          placeholder="Write a comment..."
                        />
                        <button className="btn btn-primary" type="submit">
                          Post
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column */}
          <div className="col-md-4">
            <h5>My Friends</h5>
            <div className="row">
              {friends.map((friend, index) => (
                <div
                  className="col-4 text-center mb-3"
                  key={index}
                  onClick={() => viewProfile(friend.receiver)}
                >
                  <img
                    src="#"
                    alt={friend.name}
                    className="rounded-circle mb-1"
                  />
                  <p>{friend.name}</p>
                </div>
              ))}
            </div>
            <button className="btn btn-outline-primary mb-4">
              View All Friends
            </button>

            <h5>Latest Groups</h5>
            {groups.map((group, index) => (
              <GroupCard key={index} {...group} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

// import React, { useState } from 'react';
// import PostInput from '../components/PostInput';
// import PostCard from '../components/PostCard';
// import FriendCard from '../components/FriendCard';
// import GroupCard from '../components/GroupCard';
// import PostForm from '../components/PostForm';
// import PostItem from '../components/PostItem';
// import { useEffect } from 'react';
// import axios from 'axios';

// const Home = () => {
//     useEffect(() => {
//         axios.get('http://localhost:5000/api/posts')
//           .then(res => setPosts(res.data))
//           .catch(err => console.error(err));
//       }, []);

//   const [posts, setPosts] = useState([
//     {
//       id: 1,
//       username: 'DevUser1',
//       content: 'This is my first post on this platform!',
//       likes: 7,
//       comments: [
//         { id: 1, text: 'Great post!' },
//         { id: 2, text: 'Welcome to the network!' }
//       ]
//     },
//     {
//       id: 2,
//       username: 'DevUser2',
//       content: 'Loving the new features here!',
//       likes: 2,
//       comments: [{ id: 1, text: 'Same here!' }]
//     }
//   ]);

//   const friends = ['Alice', 'Bob', 'Charlie', 'David', 'Eva', 'Frank', 'Grace', 'Helen', 'Ian'];

//   const groups = [
//     { name: 'Sample Group One', description: 'This is a sample Dobble social network group.' },
//     { name: 'Sample Group Two', description: 'This is a sample Dobble social network group.' },
//     { name: 'Sample Group Three', description: 'This is a sample Dobble social network group.' },
//   ];

//   const addComment = (postId, commentText) => {
//     if (commentText.trim()) {
//       setPosts(posts.map(post =>
//         post.id === postId
//           ? {
//               ...post,
//               comments: [
//                 ...post.comments,
//                 { id: new Date().getTime(), text: commentText }
//               ]
//             }
//           : post
//       ));
//     }
//   };

//   const likePost = (postId) => {
//     setPosts(posts.map(post =>
//       post.id === postId ? { ...post, likes: post.likes + 1 } : post
//     ));
//   };

//   return (
//     <div className="container-fluid p-0">
//       <div className="container mt-4">
//         <div className="row">
//           {/* Left Column */}
//           <div className="col-md-8">
//             <h4>Wall</h4>
//             <PostInput setPosts={setPosts} />
//             {posts.map((post) => (
//               <div key={post.id} className="card mb-4 shadow-sm">
//                 <div className="card-body">
//                   <div className="d-flex align-items-center mb-2">
//                    {/* // https://via.placeholder.com/50 */}
//                     <h5 className="mb-0">{post.username}</h5>
//                   </div>
//                   <p>{post.content}</p>
//                   <div className="d-flex gap-2 mb-3">
//                     <button className="btn btn-outline-primary btn-sm" onClick={() => likePost(post.id)}>
//                       👍 Like ({post.likes})
//                     </button>
//                     <button className="btn btn-outline-secondary btn-sm">Follow</button>
//                     <button className="btn btn-outline-success btn-sm">🔗 Share</button>
//                   </div>
//                   <div className="comments">
//                     <h6>Comments</h6>
//                     {post.comments.map(comment => (
//                       <p key={comment.id} className="mb-1">💬 {comment.text}</p>
//                     ))}
//                     <form
//                       onSubmit={(e) => {
//                         e.preventDefault();
//                         const commentText = e.target.elements[`comment-${post.id}`].value;
//                         addComment(post.id, commentText);
//                         e.target.reset();
//                       }}
//                     >
//                       <div className="input-group mt-2">
//                         <input
//                           type="text"
//                           name={`comment-${post.id}`}
//                           className="form-control"
//                           placeholder="Write a comment..."
//                         />
//                         <div className="input-group-append">
//                           <button className="btn btn-primary" type="submit">Post</button>
//                         </div>
//                       </div>
//                     </form>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Right Column */}
//           <div className="col-md-4">
//             <h5>My Friends</h5>
//             <div className="row">
//               {friends.map((friend, index) => (
//                 <div className="col-4 text-center mb-3" key={index}>
//                   <img
//                     src={`https://via.placeholder.com/60?text=${friend.charAt(0)}`}
//                     alt={friend}
//                     className="rounded-circle mb-1"
//                   />
//                   <p>{friend}</p>
//                 </div>
//               ))}
//             </div>
//             <button className="btn btn-outline-primary mb-4">View All Friends</button>

//             <h5>Latest Groups</h5>
//             {groups.map((group, index) => (
//               <GroupCard key={index} {...group} />
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;
