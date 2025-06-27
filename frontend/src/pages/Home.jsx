import PostCard from "../components/Feed/PostCard";
import PostSkeleton from "../components/Feed/PostSkeleton";
import usePosts from "../hooks/usePosts";

export default function Home() {
  const { posts, loading } = usePosts();
  if (loading){
    return(
      <div className="max-w-2xl mx-auto px-4 py-6">
        {Array.from({ length: 3 })?.map((_, i) => <PostSkeleton key={i} />)}
      </div>
    )
  };
  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      {(posts?.length > 0) && posts?.map((post,idx) => <PostCard key={post?.id || idx} post={post} />)}
    </div>
  );
}
