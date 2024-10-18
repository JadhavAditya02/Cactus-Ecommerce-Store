import { useState } from "react";
import { Link } from "react-router-dom";
import { UserPlus, Mail, Lock, User, ArrowRight, Loader } from "lucide-react";
import { motion } from "framer-motion";
import { useUserStore } from "../stores/useUserStore";
import PasswordStrengthMeter from "../components/PasswordStrengthMeter";

const InputField = ({
  id,
  type,
  label,
  value,
  onChange,
  icon: Icon,
  placeholder,
  showPasswordStrength,
  onFocus,
  onBlur,
}) => (
  <div>
    <label htmlFor={id} className='block text-sm font-medium text-gray-300'>
      {label}
    </label>
    <div className='mt-1 relative rounded-md shadow-sm'>
      <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
        <Icon className='h-5 w-5 text-gray-400' aria-hidden='true' />
      </div>
      <input
        id={id}
        type={type}
        required
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        className='block w-full px-3 py-2 pl-10 bg-gray-700 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm'
        placeholder={placeholder}
      />
    </div>
    {showPasswordStrength && <PasswordStrengthMeter password={value} />}
  </div>
);

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPasswordStrength, setShowPasswordStrength] = useState(false);
  const { signup, loading } = useUserStore();
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setError(null);
    signup(formData);
  };

  return (
    <div className='flex flex-col justify-center py-12 sm:px-6 lg:px-8'>
      <motion.div
        className='sm:mx-auto sm:w-full sm:max-w-md'
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className='mt-6 text-center text-3xl font-extrabold text-emerald-400'>Create your account</h2>
      </motion.div>

      <motion.div
        className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className='bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10'>
          <form onSubmit={handleSubmit} className='space-y-6'>
            {error && <p className='text-red-500 text-center'>{error}</p>}
            <InputField
              id='name'
              type='text'
              label='Full name'
              value={formData.name}
              onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
              icon={User}
              placeholder='John Doe'
            />
            <InputField
              id='email'
              type='email'
              label='Email address'
              value={formData.email}
              onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
              icon={Mail}
              placeholder='you@example.com'
            />
            <InputField
              id='password'
              type='password'
              label='Password'
              value={formData.password}
              onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
              icon={Lock}
              placeholder='••••••••'
              onFocus={() => setShowPasswordStrength(true)}
              onBlur={() => setShowPasswordStrength(false)}
              showPasswordStrength={showPasswordStrength}
            />
            <InputField
              id='confirmPassword'
              type='password'
              label='Confirm Password'
              value={formData.confirmPassword}
              onChange={(e) => setFormData((prev) => ({ ...prev, confirmPassword: e.target.value }))}
              icon={Lock}
              placeholder='••••••••'
            />

            <button
              type='submit'
              className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition duration-150 ease-in-out disabled:opacity-50'
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader className='mr-2 h-5 w-5 animate-spin' aria-hidden='true' />
                  Loading...
                </>
              ) : (
                <>
                  <UserPlus className='mr-2 h-5 w-5' aria-hidden='true' />
                  Sign up
                </>
              )}
            </button>
          </form>

          <p className='mt-8 text-center text-sm text-gray-400'>
            Already have an account?{" "}
            <Link to='/login' className='font-medium text-emerald-400 hover:text-emerald-300'>
              Login here <ArrowRight className='inline h-4 w-4' />
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default SignUpPage;
