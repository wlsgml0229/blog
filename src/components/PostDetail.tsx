import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { PostProps } from "./PostList";
import { db } from "firebaseApp";
import { doc, getDoc } from "firebase/firestore";
import Loader from "./Loader";

export default function PostDetail() {
  const [post, setPost] = useState<PostProps | null>(null);
  const params = useParams();
  console.log(params?.id);
  const getPost = async (id: string) => {
    if (id) {
      const docRef = doc(db, "posts", id);
      const docSnap = await getDoc(docRef);
      setPost({ id: docSnap.id, ...(docSnap.data() as PostProps) });
    }
  };

  const handleDelete = () => {
    console.log("delete");
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
                to={`/posts/edit/${params?.id}`}
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
