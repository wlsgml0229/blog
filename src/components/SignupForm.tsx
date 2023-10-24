import { Link } from "react-router-dom";
export default function SignupForm() {
  return (
    <form action="/post" method="POST" className="form form--lg">
      <h1 className="form__title">로그인</h1>
      <div className="form__block">
        <label htmlFor="title">이메일</label>
        <input type="email" name="email" id="email" required />
      </div>
      <div className="form__block">
        <label htmlFor="title">비밀번호</label>
        <input type="password" name="password" id="password" required />
      </div>
      <div className="form__block">
        <label htmlFor="title">비밀번호 확인</label>
        <input
          type="password"
          name="password_confirm"
          id="password_confirm"
          required
        />
      </div>
      <div className="form__block">
        계정이 이미 있으신가요?
        <Link to="/login" className="form__link">
          로그인하기
        </Link>
      </div>
      <div className="form__block">
        <button type="submit" value="회언가입" className="form__btn--submit">
          회원가입
        </button>
      </div>
    </form>
  );
}
