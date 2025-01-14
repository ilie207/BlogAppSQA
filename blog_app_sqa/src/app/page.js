import {
  RegisterLink,
  LoginLink,
} from "@kinde-oss/kinde-auth-nextjs/components";

export default function Login() {
  return (
    <>
      <div className="background">
        <div className="shape"></div>
        <div className="shape"></div>
      </div>
      <main>
        <div className="login_container">
          <h3>Welcome Blog App SQA</h3>
          <LoginLink className="login_button">Login</LoginLink>
          <RegisterLink className="login_button">Register</RegisterLink>
        </div>
      </main>
    </>
  );
}
