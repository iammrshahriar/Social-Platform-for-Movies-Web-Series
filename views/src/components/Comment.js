import React from "react";
const Comment = ({ comment, timeAgo }) => {
  const { user, commentText, createdAt } = comment;
  return (
    <div className="flex items-center gap-3 rounded-full shadow-lg border">
      <div className="flex items-center gap-2 p-2">
        <img
          src={user?.userCoverImg ? user?.userCoverImg : "/img/user.png"}
          alt="user"
          className="h-8 w-8 rounded-full border"
        />
        <div>
          <p className="text-xs text-gray-400">
            {user?.userName ? user?.userName : "Demo User"}
          </p>
        </div>
      </div>

      <div className="p-2">
        <p className="text-sm text-white">{commentText}</p>
        <p className="text-xs text-gray-500">
          {timeAgo.format(new Date(createdAt))}
        </p>
      </div>
    </div>
  );
};

export default Comment;
