import React from 'react'
import Template from '../Components/Core/Auth/Template';
import signupImg from '../assets/Images/signup.webp'

const SignUp = () => {
  return (
    <div>
        <Template 
            title="Join the millions learning to code with EduVen for free"
            description1 = "Build skills for today, tomorrow and beyond."
            description2 = "Education to future-proof you career"
            image={signupImg}
            formType="signup"
        />
    </div>
  )
}

export default SignUp;
