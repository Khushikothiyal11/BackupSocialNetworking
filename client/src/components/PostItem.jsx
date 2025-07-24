// import React from "react";
// // import { useState } from "react";
// // import axios from "axios";

// function PostItem({ post }) {
// // const [likes, setLikes] = useState(post.likes || []);
// // const currentUserId = localStorage.getItem("userId");
//   return (
//     <div className="card mb-3">
//       <div className="card-body">
//         <p className="card-text">{post.text}</p>
//         {post.image && (
//           <img
//             src={post.image}
//             alt="Posted"
//             className="img-fluid rounded"
//           />
//         )}
//         {/* Add like/comment buttons if needed */}
//       </div>
//     </div>
//   );
// }

// export default PostItem;
import React from "react";

const PostItem = ({ post }) => {
  return (
    <div
      className="card mb-3 shadow-sm"
      style={{ maxWidth: "200px", margin: "auto" }}
    >
      <div className="card-body" style={{ padding: "0.75rem" }}>
        <p className="card-text" style={{ fontSize: "0.95rem" }}>
          {post.body}
        </p>
        {post.image && (
          <img
            src={post.image}
            alt="Posted"
            className="img-fluid rounded mt-2"
            style={{ maxHeight: "200px", objectFit: "cover", width: "100%" }}
          />
        )}
      </div>
    </div>
  );
};

export default PostItem;
