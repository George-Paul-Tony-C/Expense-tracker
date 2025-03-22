import React, { useState ,  useContext  } from 'react';
import AuthLayout from '../../components/layouts/AuthLayout';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../components/Inputs/Input';
import ProfilePhotoSelector from '../../components/Inputs/ProfilePhotoSelector.jsx';
import { validateEmail } from '../../utils/helper.js';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { UserContext } from '../../context/userContext.jsx';
import { uploadImage } from '../../utils/uploadImage.js';

const SignUp = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { updateUser } = useContext(UserContext);

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!fullName) {
      setError('Please enter your name');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    if (!password) {
      setError('Please enter the password');
      return;
    }

    setError('');
    setLoading(true);

    try {
      let profileImageUrl = "";

      // If there is a profile picture, upload it
      if (profilePic) {
        const uploadedImage = await uploadImage(profilePic);
        profileImageUrl = uploadedImage?.imageUrl; // Assume the response contains the imageUrl
      }

      // Prepare form data for API request
      const formData = new FormData();
      formData.append('fullName', fullName);
      formData.append('email', email);
      formData.append('password', password);
      if (profilePic) {
        formData.append('profileImageUrl', profileImageUrl); // Send actual file, not URL
      }
      
      

      // Send signup request
      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, formData);

      const { token, user } = response.data;

      if (token) {
        localStorage.setItem('token', token); // Store token
        updateUser(user);
        navigate('/dashboard'); // Redirect to dashboard
      } else {
        setError('Signup failed. Please try again.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Try again.');
    } finally {
      setLoading(false);
    }
  };


  return (
    <AuthLayout>
      <div className="lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center">
        <h3 className="text-xl font-semibold text-black">Create an Account</h3>
        <p className="text-xs text-slate-700 mt-[5px] mb-6">
          Join us today by entering your details below.
        </p>

        <form onSubmit={handleSignUp}>
          <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="col-span-2 sm:col-span-1">
              <Input
                value={fullName}
                onChange={({ target }) => setFullName(target.value)}
                type="text"
                label="Full Name"
                placeholder="Eg: George"
              />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <Input
                value={email}
                onChange={({ target }) => setEmail(target.value)}
                label="Email Address"
                placeholder="geo@gmail.com"
                type="email"
              />
            </div>
            <div className="col-span-2">
              <Input
                value={password}
                onChange={({ target }) => setPassword(target.value)}
                label="Password"
                placeholder="*******"
                type="password"
              />
            </div>
          </div>

          {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Signing Up...' : 'SIGN-UP'}
          </button>

          <p className="text-[13px] text-slate-800 mt-3">
            Already have an account?{' '}
            <Link className="font-medium text-primary underline" to="/login">
              Login
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default SignUp;
