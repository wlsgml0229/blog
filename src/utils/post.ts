import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebaseApp";
import { toast } from "react-toastify";

export const deletePost = async (id: string | null) => {
  const confirm = window.confirm("해당 게시글을 삭제하시겠습니까?");

  if (confirm && id) {
    await deleteDoc(doc(db, "posts", id));
    toast.success("게시글 삭제에 성공했습니다.");
    return true;
  }
  return false;
};
