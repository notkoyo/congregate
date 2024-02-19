import EmailInput from "./EmailInput";
import PasswordInput from "./PasswordInput";

export default function AuthForm() {
  return (
    <form className="flex flex-col gap-4">
      <EmailInput />
      <PasswordInput />
    </form>
  )
}