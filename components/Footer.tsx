import Image from "next/image";

export default function Footer() {
  return (
    <footer
      id="contact"
      className="relative mt-24 overflow-hidden bg-light-gray text-black"
    >
      <Image
        src="/footer1.svg"
        alt=""
        width={420}
        height={420}
        className="pointer-events-none absolute z-0 w-[200px] left-4 top-4 md:left-0 md:top-0 md:w-[420px]"
      />

      <Image
        src="/footer2.svg"
        alt=""
        width={420}
        height={320}
        className="block md:hidden lg:block pointer-events-none absolute z-0 w-[200px] right-2 bottom-8 md:right-0 md:top-12 md:bottom-auto md:w-[420px]"
      />

      <div className="relative z-10 mx-auto max-w-6xl px-2 md:px-8 pt-28 md:px-12 md:pt-45">
        <h2 className="hidden md:block md:ml-0 max-w-[240px] text-display font-semibold md:max-w-none">
          Let’s work together!
        </h2>
        <h2 className="md:hidden ml-24 max-w-[240px] text-display font-semibold ">
          Let’s work <br/> together!
        </h2>

        <p className="ml-4 sm:ml-24 md:ml-0 mt-6 max-w-[330px] text-body leading-tight md:mt-4 md:max-w-2xl">
          I’m always interested in new opportunities and exciting projects.
          Let’s get in touch and build something amazing!
        </p>

        <div className="mt-8 ml-4 sm:ml-0grid max-w-3xl gap-y-4 md:mt-12 md:grid-cols-2 md:gap-x-10 md:gap-y-8">
          <div>
            <p className="text-tiny font-semibold">Email</p>
            <a href="mailto:cindynakh@gmail.com" className="text-body hover:underline">
              cindynakh@gmail.com
            </a>
          </div>

          <div className="md:order-2">
            <p className="text-tiny font-semibold">Github</p>
            <a
              href="https://github.com/cnakh"
              target="_blank"
              rel="noopener noreferrer"
              className="text-body hover:underline"
            >
              cnakh
            </a>
          </div>

          <div>
            <p className="text-tiny font-semibold">Instagram</p>
            <a
              href="https://www.instagram.com/cindynakh_design"
              target="_blank"
              rel="noopener noreferrer"
              className="text-body hover:underline"
            >
              cindynakh_design
            </a>
          </div>

          <div>
            <p className="text-tiny font-semibold">LinkedIn</p>
            <a
              href="https://www.linkedin.com/in/cindy-nakhammouane-348a63247/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-body hover:underline"
            >
              cindy-nakhammouane-348a6324
            </a>
          </div>
        </div>
      </div>

      <p className="relative z-10 mx-8 mt-8 pb-38 md:pb-24 text-left text-tiny font-semibold md:mr-10 md:mt-10 md:pb-4 md:text-right md:text-caption">
        Designed and Developed by Cindy Nakhammouane
      </p>

      <div
        className="relative left-1/2 h-[32px] w-screen -translate-x-1/2 bg-cover bg-center bg-repeat-x md:h-[42px]"
        style={{
          backgroundImage: "url('/line.svg')",
        }}
      />
    </footer>
  );
}