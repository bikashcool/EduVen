import { apiConnector } from "../apiConnector";
import { studentEndPoints } from "../apis";
import toast from "react-hot-toast";
import { setPaymentLoading } from "../../Reducers/Slices/courseSlice";
import { resetCart } from "../../Reducers/Slices/cartSlice";
import rzpLogo from "../../assets/Logo/LogoEdu.png"

const {COURSE_PAYMENT_API, COURSE_VERIFY_API, SEND_PAYMENT_SUCCESS_EMAIL_API} = studentEndPoints;

const loadScript = (src) => {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;

        script.onload = () => {
            resolve(true);
        }
        script.onerror = () => {
            resolve(false);
        }
        document.body.appendChild(script);
    })
}

export const buyCourse = async (token, courses, userDetails, navigate, dispatch) => {
    const toastId = toast.loading("Loading...")
    try{
        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js")

        if(!res){
            toast.error("Razorpay SDK failed to load")
            return;
        }

        const orderResponse = await apiConnector("POST", COURSE_PAYMENT_API, {courses}, {Authorization: `Bearer ${token}`,})

        if(!orderResponse.data.success){
            throw new Error(orderResponse.data.message)
        }
        console.log("Printing orderResponse", orderResponse)

        const options = {
            key: process.env.RAZORPAY_KEY,
            currency: orderResponse.data.message.currency,
            amount: `${orderResponse.data.message.amount}`,
            order_id: orderResponse.data.message.id,
            name: "EduVen",
            description: "Thank You for Purchasing the Course",
            image: rzpLogo,
            prefill: {
                name: `${userDetails.firstName}`,
                email: userDetails.email
            },
            handler: function(response){
                sendPaymentSuccessEmail(response, orderResponse.data.message.amount, token);
                verifyPayment({...response, courses}, token, navigate, dispatch)
            }
        }

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
        paymentObject.on("payment.failed", function(response){
            toast.error("oops, payment failed");
            console.log(response.error)
        })
    }catch(error){
        console.log("PAYMENT API ERROR...", error)
        toast.error("Could not make payment")
    }
    toast.dismiss(toastId)
}

const sendPaymentSuccessEmail = async (response, amount, token) => {
    try{
        await apiConnector("POST", SEND_PAYMENT_SUCCESS_EMAIL_API, {
            orderId: response.razorpay_order_id,
            paymentId: response.razorpay_payment_id,
            amount,
        }, {
            Authorization: `Bearer ${token}`
        })
    }catch(error){
        console.log("Payment success email Error...", error)
    }
}

const verifyPayment = async (bodyData, token, navigate, dispatch) => {
    const toastId = toast.loading("Verifying Payment....");
    dispatch(setPaymentLoading(true));
    try{
        const response = await apiConnector("POST", COURSE_VERIFY_API, bodyData, {
            Authorization: `Bearer ${token}`,
        })

        if(!response.data.success){
            throw new Error(response.data.message);
        }
        toast.success("payment successful, you are added to the course")
        navigate("/dashboard/enrolled-courses")
        dispatch(resetCart());
    }catch(error){
        console.log("PAYMENT VERIFY ERROR...", error)
        toast.error("Could not Verify Payment");
    }
    toast.dismiss(toastId);
    dispatch(setPaymentLoading(false));
}