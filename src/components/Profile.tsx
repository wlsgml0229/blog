import { getAuth, signOut } from "firebase/auth";
import { app } from "firebaseApp";
import { toast } from "react-toastify";
import AuthContext from "../context/AuthContext";
import { useContext } from "react";

export default function Profile() {
  const { user } = useContext(AuthContext);
  console.log(user);
  const onSignout = async () => {
    try {
      const auth = getAuth(app);
      await signOut(auth);
      toast.success("로그아웃 되었습니다.");
    } catch (e: any) {
      console.log(e);
      toast.error(e?.code);
    }
  };
  return (
    <div className="profile__box">
      <div className="flex__box-lg">
        <div className="profile__image" />
        <div>
          <div className="profile__email">{user?.email}</div>
          <div className="profile__name">{user?.displayName || "사용자"}</div>
        </div>
      </div>
      <div role="presentation" onClick={onSignout} className="profile__logout">
        로그아웃
      </div>
    </div>
  );
}
