import Image from "next/image";
export default function ModernVivo() {
  return (
    <section className="mb-10 mt-10 flex h-auto w-full flex-col items-center text-gray-600 shadow-lg">
      <h2 className="text-2xl font-bold text-black">How ModernVivo Works</h2>
      <p className="mb-10 text-center text-base leading-[34px] text-black">
        ModernVivo uses artificial intelligence to decode all existing protocols
        and advanced statistical <br /> techniques to turn methods into
        insights.
      </p>
      <div className="mx-auto px-5">
        <Image
          src={"/graphic.png"}
          alt="section-3"
          width={1200}
          height={400}
          className="m-auto"
        />
      </div>
    </section>
  );
}
