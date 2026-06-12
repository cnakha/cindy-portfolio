import Footer from "@/components/Footer";

export default function AboutPage() {
  return (
    <main className="bg-white text-black">
      <section className="mx-auto grid max-w-[1440px] gap-4 px-8 pt-28 md:grid-cols-2 md:px-16 md:pt-36">
        {/* mobile image first */}

        <img
          src="/wood.jpg"
          alt=""
          className="order-1 h-[230px] max-w-none rounded-xl md:order-2 md:h-[300px]"
        />

        <div className="order-2 md:order-1">
          <section>
            <h1 className="text-subtitle">Background</h1>

            <p className="mt-4 max-w-xl text-body ">
              I'm Cindy Nakhammouane, a Fullstack Developer, UI/UX Designer and recent graduate from the 
              University of Illinois Chicago’s first ever Computer Science and Design cohort 
              combining the capabilities of modern computer programming and visual design.
            
              <br/>
              <br/>
              Creating is my favorite freedom. Since forever, I've always been drawn 
              toward expressing myself through various creative avenues, but I also 
              enjoyed problem solving and engineering. Naturally I grew a curiosity 
              towards finding ways to blend the worlds of technology and art together. 
              What I love about creative technology is that the medium is constantly 
              evolving and full of refreshing projects and potential I would love 
              to contribute to.

            </p>
          </section>
          <section className="order-3 md:col-start-2">

          <h2 className="text-subtitle mt-10">Tools I Use</h2>

          <div className="mt-8 grid gap-4 md:grid-cols-2 max-w-[400px]">
            <div>
              <p className="text-tiny font-bold">Design</p>
              <ul className="mt-3 text-tiny leading-tight">
                <li>Adobe Creative Suite</li>
                <li>Photoshop</li>
                <li>InDesign</li>
                <li>Illustrator</li>
                <li>After Effects</li>
                <li>Figma</li>
                <li>Canva</li>
              </ul>
            </div>

            <div>
              <p className="text-tiny font-bold">Developer</p>
              <ul className="mt-3 text-tiny  leading-tight">
                <li>React</li>
                <li>Next.js</li>
                <li>TypeScript</li>
                <li>JavaScript</li>
                <li>Tailwind</li>
                <li>Python</li>
                <li>C/C++</li>
                <li>Firebase</li>
                <li>SQL</li>
                <li>REST API</li>
                <li>FastAPI</li>
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