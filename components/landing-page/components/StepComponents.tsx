import Image from "next/image";
const Step1 = () => {
  return (
    <div
      className="w-[243px] h-[148px] rounded-2xl py-[15px] pr-[7px] pl-[11px]"
      style={{
        background:
          "linear-gradient(179.76deg, #3754A3 0.21%, #FDCD20 128.81%)",
      }}
    >
      <div className="flex gap-2 items-center">
        <Image src={"/whatsapp.png"} alt="" width={30} height={30} />
        <p className="text-sm text-white">Community Reporter</p>
      </div>

      <div className="px-3 py-[18px] bg-white rounded-xl mt-3.5">
        <div className="flex gap-4 items-start">
          <Image src={"/mic.png"} alt="" width={20} height={20} />
          <p className="text-sm text-black">Voice message in Hausa</p>
        </div>
        <p className="text-xs mt-1 text-[#00000080]">2:34 ﹒Reporting Flood</p>
      </div>
    </div>
  );
};
const Step2 = () => {
  return (
    <div
      className="w-[243px] h-[148px] rounded-2xl py-[15px] pr-[7px] pl-[11px]"
      style={{
        background:
          "linear-gradient(179.76deg, #3754A3 0.21%, #FDCD20 128.81%)",
      }}
    >
      <div className="flex gap-2 items-center">
        <Image src={"/whatsapp.png"} alt="" width={30} height={30} />
        <p className="text-sm text-white">Step2</p>
      </div>

      <div className="px-3 py-[18px] bg-white rounded-xl mt-3.5">
        <div className="flex gap-4 items-start">
          <Image src={"/mic.png"} alt="" width={20} height={20} />
          <p className="text-sm text-black">Voice message in Efik</p>
        </div>
        <p className="text-xs mt-1 text-[#00000080]">2:34 ﹒Step3</p>
      </div>
    </div>
  );
};
const Step3 = () => {
  return (
    <div
      className="w-[243px] h-[148px] rounded-2xl py-[15px] pr-[7px] pl-[11px]"
      style={{
        background:
          "linear-gradient(179.76deg, #3754A3 0.21%, #FDCD20 128.81%)",
      }}
    >
      <div className="flex gap-2 items-center">
        <Image src={"/whatsapp.png"} alt="" width={30} height={30} />
        <p className="text-sm text-white">Step3</p>
      </div>

      <div className="px-3 py-[18px] bg-white rounded-xl mt-3.5">
        <div className="flex gap-4 items-start">
          <Image src={"/mic.png"} alt="" width={20} height={20} />
          <p className="text-sm text-black">Voice message in Igbo</p>
        </div>
        <p className="text-xs mt-1 text-[#00000080]">2:34 ﹒Step3</p>
      </div>
    </div>
  );
};

const stepInfo = {
  0: Step1,
  1: Step2,
  2: Step3,
};

export { Step1, Step2, Step3, stepInfo };
