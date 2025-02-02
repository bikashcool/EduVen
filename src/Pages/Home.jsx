import React from 'react'
import { FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import CTAButton from "../Components/Core/HomePage/Button";
import HighLightText from '../Components/Core/HomePage/HighLightText';
import Banner from '../assets/Images/banner.mp4';
import CodeBlocks from '../Components/Core/HomePage/CodeBlocks';
import TimeLineSection from '../Components/Core/HomePage/TimeLineSection';
import LearningLanguageSection from '../Components/Core/HomePage/LearningLanguageSection';
import InstructorSection from '../Components/Core/HomePage/InstructorSection';
import Footer from '../Components/Common/Footer';
import ExploreMore from '../Components/Core/HomePage/ExploreMore';

const Home = () => {
  return (
    <div>
      {/* Section-1 */}
      <div className="relative mx-auto flex flex-col w-11/12 items-center text-white justify-center max-w-maxContent">
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

        <div className="mt-4 w-[90%] text-center text-base font-bold text-richblack-400">
          With our online coding courses, you can learn at your own pace, from
          anywhere in the world, and get access to a wealth of resources,
          including hands-on projects, quizzes, and personalized feedback from
          instructors.
        </div>

        <div className="flex gap-7 mt-8">
          <CTAButton active={true} linkto={"/signup"}>
            Learn More
          </CTAButton>

          <CTAButton active={false} linkto={"/login"}>
            Book a Demo
          </CTAButton>
        </div>

        <div className="mx-3 my-12 w-[70%] relative shadow-blue-200">
          <video muted loop autoPlay>
            <source src={Banner} type="video/mp4" />
          </video>
        </div>

        {/* Code Section 1 */}
        <div>
          <CodeBlocks
            position={"lg:flex-row"}
            heading={
              <div className="text-2xl font-semibold lg:text-4xl sm:w-full">
                Unlock Your
                <HighLightText text={" Coding Potential "} />
                with our online courses
              </div>
            }
            subHeading={
              "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
            }
            ctabtn1={{
              btnText: "Try it Yourself",
              linkto: "/signup",
              active: true,
            }}
            ctabtn2={{
              btnText: "Learn More",
              linkto: "/login",
              active: false,
            }}
            codeblock={`<!DOCTYPE html>\n<html>\n<head><title>Example</title>\n</head>\n<body>\n<h1><ahref="/">Header</a>\n</h1>\n<nav><ahref="one/">One</a>\n<ahref="two/">Two</a>\n<ahref="three/">Three</a>\n</nav>`}
            codeColor={"text-yellow-100"}
          />
        </div>

        {/* Code Section 2 */}
        <div>
          <CodeBlocks
            position={"lg: flex-row-reverse"}
            heading={
              <div className="text-4xl font-semibold">
                Start
                <HighLightText text={" Coding in Seconds "} />
              </div>
            }
            subHeading={
              "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
            }
            ctabtn1={{
              btnText: "Continue Lesson",
              linkto: "/signup",
              active: false,
            }}
            ctabtn2={{
              btnText: "Learn More",
              linkto: "/login",
              active: true,
            }}
            codeblock={`<!DOCTYPE html>\n<html>\n<head><title>Example</title>\n</head>\n<body>\n<h1><ahref="/">Header</a>\n</h1>\n<nav><ahref="one/">One</a>\n<ahref="two/">Two</a>\n<ahref="three/">Three</a>\n</nav>`}
            codeColor={"text-richblack-200"}
          />
        </div>

        <ExploreMore/>
      </div>
      {/* Section-2 */}
      <div className="bg-pure-greys-5 text-richblack-700">
        <div className="homePage_bg h-[300px]">
          <div className="w-11/12 max-w-maxContent flex flex-col justify-between items-center gap-5 mx-auto">
            <div className="h-[150px]"></div>
            <div className="flex flex-row gap-7 text-white">
              <CTAButton active={true} linkto={"/signup"}>
                <div className="flex items-center gap-3">
                  Explore Full Catalog
                  <FaArrowRight />
                </div>
              </CTAButton>
              <CTAButton active={false} linkto={"/signup"}>
                <div>Learn More</div>
              </CTAButton>
            </div>
          </div>
        </div>

        <div className="mx-auto w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-7">
          <div className="flex flex-row gap-5 mb-10 mt-[95px]">
            <div className="text-4xl font-semibold w-[45%]">
              Get the Skills you need for a
              <HighLightText text={" job that is in demand "} />
            </div>
            <div className="flex flex-col gap-10 w-[40%] items-start">
              <div className="text-[16px]">
                The modern EduVen redefines learning on its own terms. Today,
                being a competitive specialist requires more than just
                professional skills.
              </div>
              <CTAButton active={true} linkto={"/signup"}>
                <div>Learn More</div>
              </CTAButton>
            </div>
          </div>

          <TimeLineSection />

          <LearningLanguageSection />
        </div>
      </div>
      {/* Section-3 */}
      <div className='relative mx-auto my-20 flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 bg-richblack-900 text-white'>
        <InstructorSection/>

        <p className='text-center text-4xl font-semibold mt-8'>Reviews from other Learners</p>
      </div>
      {/* Section-4 */}
      <Footer/>
    </div>
  );
}

export default Home;
