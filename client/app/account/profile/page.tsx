// import SelectCountry from "@/app/_components/SelectCountry";

import ProfileForm from "@/app/_components/ProfileForm";

export default function Page() {
  // CHANGE

  return (
    <div className="pt-12">
      <h2 className="font-semibold text-2xl text-accent-400 mb-4">
        Update your guest profile
      </h2>

      <p className="text-lg mb-8 text-primary-200">
        Providing the following information will make your check-in process
        faster and smoother. See you soon!
      </p>
      <ProfileForm />
    </div>
  );
}
