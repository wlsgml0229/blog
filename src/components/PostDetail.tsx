import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { PostProps } from "./PostList";
import { db } from "firebaseApp";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import Loader from "./Loader";
import { toast } from "react-toastify";

export default function PostDetail() {
  const [post, setPost] = useState<PostProps | null>(null);
  const params = useParams();
  const navigate = useNavigate();
  console.log(params?.id);
  const getPost = async (id: string) => {
    if (id) {
      const docRef = doc(db, "posts", id);
      const docSnap = await getDoc(docRef);
      setPost({ id: docSnap.id, ...(docSnap.data() as PostProps) });
    }
  };

  const handleDelete = async () => {
    const confirm = window.confirm("해당 게시글을 삭제하시겠습니까?");

    if (confirm && post?.id) {
      await deleteDoc(doc(db, "posts", post.id));
      toast.success("게시글 삭제에 성공했습니다.");
      navigate("/");
    }
  };

  useEffect(() => {
    if (params?.id) getPost(params?.id);
  }, [params?.id]);

  return (
    <>
      <div className="post__detail">
        {post ? (
          <div className="post__box">
            <div className="post__title">{post?.title}</div>
            <div className="post__profile-box">
              <div className="post__profile" />
              <div className="post__author-name">{post?.email}</div>
              <div className="post__date">{post?.createdAt}</div>
            </div>
            <div className="post__utils-box">
              <div className="post__delete" onClick={handleDelete}>
                삭제
              </div>
              <Link
                to={`/posts/edit/${post?.id}`}
                className="post__edit post__text--pre-wrap"
              >
                수정
              </Link>
            </div>
            <div className="post__text">{post?.content}</div>
          </div>
        ) : (
          <Loader />
        )}
      </div>
    </>
  );
}
