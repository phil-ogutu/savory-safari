import PostCard from "../components/Feed/PostCard";
import PostSkeleton from "../components/Feed/PostSkeleton";
import Spinner from "../components/UI/Spinner";
import usePosts from "../hooks/usePosts";

export default function Home() {
  const { posts, loading } = usePosts();
  if (loading) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-6 h-screen bg-gray-800">
        <Spinner />
      </div>
    );
  }
  return (
    <div className="max-w-2xl mx-auto px-4 py-6 ">
      {posts?.length > 0 &&
        posts?.map((post, idx) => (
          <PostCard key={post?.id || idx} post={post} />
        ))}
    </div>
  );
}
