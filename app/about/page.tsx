import Footer from "@/components/Footer";

export default function AboutPage() {
  return (
    <main className="bg-white text-black">
      <section className="mx-auto grid max-w-[1440px] gap-10 px-8 pt-28 md:grid-cols-2 md:px-16 md:pt-36">
        {/* mobile image first */}
        <div className="order-1 h-[230px] rounded-xl bg-[#c9c9c9] md:order-2 md:h-[360px]" />

        <div className="order-2 md:order-1">
          <section>
            <h1 className="text-display">Background</h1>

            <p className="mt-4 max-w-xl text-body leading-tight">
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
              nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat
              volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
              ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo
              consequat.
            </p>
          </section>

          <section className="mt-10">
            <h2 className="text-subtitle font-semibold">Random facts</h2>

            <p className="mt-4 max-w-xl text-body leading-tight">
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
              nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat
              volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
              ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo
              consequat.
            </p>
          </section>
          <section className="order-3 md:col-start-2">

          <h2 className="text-subtitle mt-10">Tools I Use</h2>

          <div className="mt-8 grid gap-8 md:grid-cols-2">
            <div>
              <p className="text-tiny font-bold">Design</p>
              <ul className="mt-3 text-tiny font-semibold leading-tight">
                <li>Fullstack Development</li>
                <li>UI/UX Design</li>
                <li>Web Design</li>
              </ul>
            </div>

            <div>
              <p className="text-tiny font-bold">Developer</p>
              <ul className="mt-3 text-tiny font-semibold leading-tight">
                <li>Fullstack Development</li>
                <li>UI/UX Design</li>
                <li>Web Design</li>
              </ul>
            </div>
          </div>
        </section>
        </div>

        
      </section>

      <Footer />
    </main>
  );
}