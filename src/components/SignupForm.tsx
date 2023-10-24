import React, { useState } from "react";

import { Link } from "react-router-dom";
import { validateEmail, validatePassword } from "utils/auth";

import { app } from "firebaseApp";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export default function SignupForm() {
  const [error, setError] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const auth = getAuth(app);
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.log(error);
    }
  };
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let errorMessage = "";

    switch (name) {
      case "email":
        errorMessage = validateEmail(value);
        setEmail(value);
        break;
      case "password":
        errorMessage = validatePassword(value, passwordConfirm);
        setPassword(value);
        break;
      case "password_confirm":
        errorMessage = validatePassword(value, password);
        break;
      default:
        break;
    }

    setError(errorMessage);
  };
  return (
    <form onSubmit={onSubmit} className="form form--lg">
      <h1 className="form__title">회원가입</h1>
      <div className="form__block">
        <label htmlFor="title">이메일</label>
        <input
          type="email"
          name="email"
          id="email"
          required
          onChange={onChange}
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
        />
      </div>
      <div className="form__block">
        <label htmlFor="title">비밀번호 확인</label>
        <input
          type="password"
          name="password_confirm"
          id="password_confirm"
          required
          onChange={onChange}
        />
      </div>
      <div className="form__block">
        계정이 이미 있으신가요?
        <Link to="/login" className="form__link">
          로그인하기
        </Link>
      </div>
      {error && error?.length > 0 && (
        <div className="form_block">
          <div className="form__error">{error}</div>
        </div>
      )}
      <div className="form__block">
        <button
          type="submit"
          value="회언가입"
          className="form__btn--submit"
          disabled={error?.length > 0}
        >
          회원가입
        </button>
      </div>
    </form>
  );
}
