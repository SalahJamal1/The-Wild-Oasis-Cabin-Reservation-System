import LoginForm from "./LoginForm";

function Login() {
  return (
    <div className="grid grid-cols-[30rem] place-content-center py-12">
      <div className="bg-primary-800 py-12 rounded-lg px-8">
        <h2 className="text-xl text-accent-500 tracking-widest mb-8">
          LOG INTO YOUR ACCOUNT
        </h2>
        <LoginForm />
      </div>
    </div>
  );
}

export default Login;
