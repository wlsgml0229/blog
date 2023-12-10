import { Link } from "react-router-dom";
import { useCallback, useContext, useEffect, useState } from "react";
import { collection, deleteDoc, doc, where } from "firebase/firestore";
import { getDocs, query, orderBy } from "firebase/firestore";
import { db } from "firebaseApp";
import AuthContext from "../context/AuthContext";
import { toast } from "react-toastify";

export interface PostProps {
  id?: string;
  title: string;
  email: string;
  summary: string;
  content: string;
  createdAt: string;
  updatedAt?: string;
  uid: string;
  category?: CategoryType;
}
export type CategoryType = "Frontend" | "Backend" | "Web" | "Navtive";
export const CATEGORIES: CategoryType[] = [
  "Frontend",
  "Backend",
  "Web",
  "Navtive",
];

interface PostListProps {
  hasNavigation?: Boolean;
  defaultTab?: TabType | CategoryType;
}
type TabType = "all" | "my";
export default function PostList({
  hasNavigation = true,
  defaultTab = "all",
}: PostListProps) {
  const [activeTab, setActiveTab] = useState<TabType | CategoryType>(
    defaultTab,
  );
  const [posts, setPosts] = useState<PostProps[]>([]);

  const { user } = useContext(AuthContext);

  const getPosts = useCallback(async () => {
    setPosts([]);
    const postRef = collection(db, "posts");
    let postQuery;

    if (activeTab === "my" && user) {
      postQuery = query(
        postRef,
        where("uid", "==", user.uid),
        orderBy("createdAt", "asc"),
      );
    } else if ("all") {
      postQuery = query(postRef, orderBy("createdAt", "asc"));
    } else {
      //카테고리
      postQuery = query(
        postRef,
        where("category", "==", activeTab),
        orderBy("createdAt", "asc"),
      );
    }

    const datas = await getDocs(postQuery);
    datas?.forEach((doc) => {
      const dataObj = { ...doc.data(), id: doc.id };
      setPosts((prev) => [...prev, dataObj as PostProps]);
    });
  }, [activeTab, user]);

  const handleDelete = async (id: string) => {
    const confirm = window.confirm("해당 게시글을 삭제하시겠습니까?");

    if (confirm && id) {
      await deleteDoc(doc(db, "posts", id));
      toast.success("게시글 삭제에 성공했습니다.");
      getPosts();
    }
  };

  useEffect(() => {
    getPosts();
  }, [getPosts]);

  return (
    <>
      {hasNavigation && (
        <div className="post__navigation">
          <div
            role="presentation"
            onClick={() => setActiveTab("all")}
            className={activeTab === "all" ? "post__navigation--active" : ""}
          >
            전체
          </div>
          <div
            role="presentation"
            onClick={() => setActiveTab("my")}
            className={activeTab === "my" ? "post__navigation--active" : ""}
          >
            나의글
          </div>
          {CATEGORIES?.map((category) => (
            <div
              key={category}
              role="presentation"
              onClick={() => setActiveTab(category)}
              className={
                activeTab === category ? "post__navigation--active" : ""
              }
            >
              {category}
            </div>
          ))}
        </div>
      )}
      <div className="post__list">
        {posts?.length > 0 ? (
          posts.map((post, idx) => (
            <div key={post.id} className="post__box">
              <Link to={`/posts/${post?.id}`}>
                <div className="post__profile-box">
                  <div className="post__profile" />
                  <div className="post__author-name">{post?.email}</div>
                  <div className="post__date">{post?.createdAt}</div>
                </div>
                <div className="post__title">{post?.title}</div>
                <div className="post__text">{post?.summary}</div>
              </Link>
              {post?.email === user?.email && (
                <div className="post__utils-box">
                  <div
                    className="post__delete"
                    role={"presentation"}
                    onClick={() => handleDelete(post.id as string)}
                  >
                    삭제
                  </div>
                  <Link to={`/posts/edit/${post?.id}`} className="post__edit">
                    수정
                  </Link>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="post__no-post">게시글이 없습니다.</div>
        )}
      </div>
    </>
  );
}
