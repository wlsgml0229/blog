export function validateEmail(value: string): string {
  const validRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return !value.match(validRegex) ? "이메일 형식이 올바르지 않습니다." : "";
}

export function validateLoginPassword(value: string): string {
  if (value.length < 8) {
    return "비밀번호는 8자리 이상으로 입력해주세요";
  }
  return "";
}

export function validatePassword(value: string, compareValue: string): string {
  if (value.length < 8) {
    return "비밀번호는 8자리 이상으로 입력해주세요";
  }
  if (value !== compareValue) {
    return "비밀번호와 비밀번호 확인 값이 다릅니다. 다시 확인해주세요";
  }
  return "";
}
