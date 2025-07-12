"use client";
import { useReducer, useState } from "react";
import { singUp } from "../_lib/apiService";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const initialState = {
  errors: {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  },
};
const reducer = (state, action) => {
  switch (action.type) {
    case "ERROR_FIRSTNAME":
      return {
        ...state,
        errors: { ...state.errors, firstName: action.payload },
      };
    case "ERROR_LASTNAME":
      return {
        ...state,
        errors: { ...state.errors, lastName: action.payload },
      };

    case "ERROR_EMAIL":
      return {
        ...state,
        errors: { ...state.errors, email: action.payload },
      };
    case "ERROR_PASSWORD":
      return {
        ...state,
        errors: { ...state.errors, password: action.payload },
      };
    default:
      return state;
  }
};
function SignUpForm() {
  const [formData, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [{ errors }, dispatch] = useReducer(reducer, initialState);
  const router = useRouter();
  const isValid = () => {
    let tempError = {};
    if (!formData.firstName.trim())
      tempError.firstName = "please enter the First Name";
    if (!formData.lastName.trim())
      tempError.lastName = "please enter the Last Name";

    if (!formData.email.trim()) tempError.email = "please enter the Email";

    if (!formData.password.trim())
      tempError.password = "please enter the password";
    Object.entries(tempError).forEach(([key, value]) => {
      dispatch({ type: `ERROR_${key.toUpperCase()}`, payload: value });
    });
    return Object.entries(tempError).length === 0;
  };
  const onChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };
  const handelSubmit = async (e) => {
    e.preventDefault();
    if (!isValid()) return;
    try {
      await singUp(formData);

      toast.success("Signup Successfully");
      router.push("/account");
    } catch (err) {
      const message = err?.response?.data?.message || err?.message;
      toast.error(message);
    }
  };
  return (
    <form method="POST" onSubmit={handelSubmit}>
      <div>
        <label className="block text-primary-200 capitalize mb-2">
          first name
        </label>
        <input
          placeholder="first name"
          // required
          type="text"
          className="block w-full rounded-full px-4 py-1 mb-2 text-primary-800"
          name="firstName"
          value={formData.firstName}
          onChange={onChange}
        />
        {errors.firstName && <p className="text-red-500">{errors.firstName}</p>}
      </div>
      <div>
        <label className="block text-primary-200 capitalize mb-2">
          last name
        </label>
        <input
          placeholder="last name"
          // required
          type="text"
          className="block w-full rounded-full px-4 py-1 mb-2 text-primary-800"
          name="lastName"
          value={formData.lastName}
          onChange={onChange}
        />
        {errors.lastName && <p className="text-red-500">{errors.lastName}</p>}
      </div>
      <div>
        <label className="block text-primary-200 capitalize mb-2">
          Email address
        </label>
        <input
          placeholder="email"
          // required
          type="email"
          className="block w-full rounded-full px-4 py-1 mb-2 text-primary-800"
          name="email"
          value={formData.email}
          onChange={onChange}
        />
        {errors.email && <p className="text-red-500">{errors.email}</p>}
      </div>
      <div className="mb-8">
        <label className="text-primary-200 capitalize mb-2">Password</label>
        <input
          placeholder="password"
          // required
          type="password"
          className=" w-full rounded-full px-4 py-1  text-primary-800"
          name="password"
          value={formData.password}
          onChange={onChange}
        />
        {errors.password && <p className="text-red-500">{errors.password}</p>}
      </div>
      <div className="flex items-center justify-center">
        <button
          type="submit"
          className="bg-accent-600 text-primary-900 px-4 py-1 border-none rounded-lg uppercase w-full"
        >
          SIGN UP
        </button>
      </div>
    </form>
  );
}

export default SignUpForm;
