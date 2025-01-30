import React from 'react'
import { FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import HighLightText from '../Components/Core/HomePage/HighLightText';

const Home = () => {
  return (
    <div>
      {/* Section-1 */}
      <div className="relative mx-auto flex flex-col w-11/12 items-center text-white justify-center">
        <Link to={"/signup"}>
          <div className="mx-auto mt-16 p-2 rounded-xl bg-richblack-800 font-bold text-richblack-100 transition-all duration-150 hover:scale-95 w-fit">
            <div className="flex items-center gap-2 rounded-full px-10 py-[5px] transition-all duration-150 group-hover:bg-richblack-900">
              <p>Become an Instructor</p>
              <FaArrowRight />
            </div>
          </div>
        </Link>

        <div className="font-semibold text-center text-4xl mt-7">
          Empower Your Future with <HighLightText text={"Coding Skills"} />
        </div>

        <div className='mt-4 w-[90%] text-center text-base font-bold text-richblack-400'>
          With our online coding courses, you can learn at your own pace, from
          anywhere in the world, and get access to a wealth of resources,
          including hands-on projects, quizzes, and personalized feedback from
          instructors.
        </div>
      </div>
      {/* Section-2 */}
      {/* Section-3 */}
      {/* Section-4 */}
    </div>
  );
}

export default Home;
