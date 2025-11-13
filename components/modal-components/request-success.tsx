import Image from "next/image"
import GradientButton from "../ui/gradient-button"
import { useRouter } from "next/navigation"

const RequestSuccess = ({ name }: { name: string }) => {
  const router = useRouter()
  return (
    <div className="flex flex-col items-center justify-center w-full text-center pb-6 px-8">
      <div>
      <Image src={'/request-success.png'} width={88} height={88} alt="success icon" />
      </div>
      <div className="mt-6 space-y-3 max-w-[357px]">
      <h1 className="text-2xl font-semibold text-[#1E1E1E] tracking-[-1.5] mb-4 text-center">Thank you, {name}</h1>
      <p className="text-[#00000099] text-lg leading-[30px] font-normal tracking-[-1] text-center mb-8">Your request has been submitted for review. You’ll receive an email once your  access is approved</p>
      </div>
      <GradientButton btnText={"Back to Homepage"} classes="w-[208px]!" onClick={() => router.push("/")}/>
    </div>
  )
}

export default RequestSuccess