import AccountForm from "./AccountForm";

function Login() {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="bg-primary-800 flex flex-col py-12 rounded-lg px-8">
        <h2 className="text-xl text-accent-500 tracking-widest mb-8">
          LOG INTO YOUR ACCOUNT
        </h2>
        <AccountForm />
      </div>
    </div>
  );
}

export default Login;
