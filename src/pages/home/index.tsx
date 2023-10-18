import { Link } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
export default function Home() {
  return (
    <div>
      <Header />
      <div className="post__navigation">
        <div className="post__navigation--active">전체</div>
        <div>나의글</div>
      </div>
      <div className="post__list">
        {[...Array(10)].map((e, idx) => (
          <div key={idx} className="post__box">
            <Link to={`/posts/${idx}`}>
              <div className="post__profile-box">
                <div className="post__profile" />
                <div className="post__author-name">김지닝</div>
                <div className="post__date">2023.10.10 월요일</div>
              </div>
              <div className="post__title">게시글 {idx}</div>
              <div className="post__text">rptlrmfrp</div>
              <div className="post__utils-box">
                <div className="post__delete">삭제</div>
                <div className="post__edit">수정</div>
              </div>
            </Link>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}
