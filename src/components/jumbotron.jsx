import NavHero from "./nav-hero";

export default function Jumbotron() {
  return (
    <div className=" bg-blue-500 px-4 ">
      <div className="relative container mx-auto">
        <div className="flex pb-6 md:pb-0">
          <div className="flex pl-4 flex-col w-3/5 justify-center md:mb-16 ">
            <div>
              <h1 className="text-2xl font-bold text-white sm:text-5xl">
                Satu sentuhan, <br /> banyak solusi <br /> kesehatan
              </h1>
            </div>
            <div className="mt-1">
              <p className=" text-md text-white sm:text-xl sm:mt-2">
                Bersama <span className="font-semibold">Medisigna</span>
              </p>
            </div>
          </div>
          <div className="w-2/5">
            <img
              className="h-[10rem] sm:h-[25rem]"
              src="./images/men1.png"
              alt="handole"
            />
          </div>
        </div>
        <div className="hidden sm:block absolute  bottom-10 sm:text-white sm:mt-9">
          <NavHero />
        </div>
      </div>
    </div>
  );
}
