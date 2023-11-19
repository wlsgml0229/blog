import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { validateEmail, validateLoginPassword } from "utils/auth";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "firebaseApp";
import { toast } from "react-toastify";

export default function LoginForm() {
  const [error, setError] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;
    let errorMessage = "";
    switch (name) {
      case "email":
        errorMessage = validateEmail(value);
        setEmail(value);
        break;
      case "password":
        errorMessage = validateLoginPassword(value);
        setPassword(value);
        break;
      default:
        break;
    }
    setError(errorMessage);
  };
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const auth = getAuth(app);
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("로그인에 성공했습니다 ✨");
      navigate("/");
    } catch (err: any) {
      console.log(err);
      toast.error(err?.code);
    }
  };
  return (
    <form onSubmit={onSubmit} method="POST" className="form form--lg">
      <h1 className="form__title">로그인</h1>
      <div className="form__block">
        <label htmlFor="title">이메일</label>
        <input
          type="email"
          name="email"
          id="email"
          required
          onChange={onChange}
          value={email}
        />
      </div>
      <div className="form__block">
        <label htmlFor="title">비밀번호</label>
        <input
          type="password"
          name="password"
          id="password"
          required
          onChange={onChange}
          value={password}
        />
      </div>
      {error && error?.length > 0 && (
        <div className="form__block">
          <div className="form__error">{error}</div>
        </div>
      )}
      <div className="form__block">
        계정이 없으신가요?
        <Link to="/signup" className="form__link">
          회원가입하기
        </Link>
      </div>
      <div className="form__block">
        <button
          type="submit"
          value="로그인"
          className="form__btn--submit"
          disabled={error?.length > 0}
        >
          로그인
        </button>
      </div>
    </form>
  );
}
