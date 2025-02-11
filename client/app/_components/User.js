function User({ user }) {
  return (
    <div className="ml-12">
      <div className="flex flex-col py-12 rounded-lg px-8 max-w-[30rem] flex-1">
        <h2 className="text-xl text-accent-500 tracking-widest mb-8 uppercase">
          {user.firstName} ACCOUNT
        </h2>
        <form method="POST">
          <label className="block text-primary-200 capitalize mb-2">
            first name
          </label>
          <input
            placeholder="first name"
            required
            type="text"
            className="block w-full rounded-full px-4 py-1 mb-6 text-primary-800"
            defaultValue={user.firstName}
            disabled
          />
          <label className="block text-primary-200 capitalize mb-2">
            last name
          </label>
          <input
            placeholder="last name"
            required
            type="text"
            className="block w-full rounded-full px-4 py-1 mb-6 text-primary-800"
            defaultValue={user.lastName}
            disabled
          />
          <label className="block text-primary-200 capitalize mb-2">
            Email address
          </label>
          <input
            placeholder="email"
            required
            type="email"
            className="block w-full rounded-full px-4 py-1 text-primary-800 mb-6"
            defaultValue={user.email}
            disabled
          />
        </form>
      </div>
    </div>
  );
}

export default User;
