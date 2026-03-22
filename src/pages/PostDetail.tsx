import { useParams } from "react-router-dom";

export default function PostDetail() {
  const { postId } = useParams();
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold">Post Details</h1>
      <p className="text-gray-600 mt-2">Post ID: {postId}</p>
    </div>
  );
}
