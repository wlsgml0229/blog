import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { PostProps } from "./PostList";
import { db } from "firebaseApp";
import { doc, getDoc } from "firebase/firestore";

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

  useEffect(() => {
    if (params?.id) getPost(params?.id);
  }, [params?.id]);
  return (
    <>
      <div className="post__detail">
        <div className="post__box">
          <div className="post__title">Lorem ipsum dolor sit amet</div>
          <div className="post__profile-box">
            <div className="post__profile" />
            <div className="post__author-name">김지닝</div>
            <div className="post__date">2023.10.10 월요일</div>
          </div>
          <div className="post__utils-box">
            <div className="post__delete">삭제</div>
            <Link to={"/posts/edit/1"} className="post__edit">
              수정
            </Link>
          </div>
          <div className="post__text">rptlrmfrp</div>
        </div>
      </div>
    </>
  );
}
