import SignUpForm from "../_components/SignUpForm";

export const metadata = {
  title: "SIGN UP",
};
async function Page() {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="bg-primary-800 flex flex-col py-12 rounded-lg px-8">
        <h2 className="text-xl text-accent-500 tracking-widest mb-8">
          SIGN UP YOUR ACCOUNT
        </h2>
        <SignUpForm />
      </div>
    </div>
  );
}

export default Page;
