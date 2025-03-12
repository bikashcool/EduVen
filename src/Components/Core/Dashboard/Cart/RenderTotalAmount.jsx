import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import IconBtn from "../../../Common/IconBtn"
import {buyCourse} from "../../../../Services/Operations/studentFeaturesAPI"

const RenderTotalAmount = () => {

    const {cart, total} = useSelector((state) => state.cart)
    const {token} = useSelector((state) => state.auth)
    const {user} = useSelector((state) => state.profile)
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleBuyCourse = () => {
        const courses = cart.map((course) => course._id)
        buyCourse(token, courses, user, navigate, dispatch)
    }

  return (
    <div>
      <p>Total</p>
      <p>₹ {total}</p>
      <IconBtn text={"Buy Now"} onclick={handleBuyCourse} customClasses="w-full justify-center"/>
    </div>
  );
}

export default RenderTotalAmount
