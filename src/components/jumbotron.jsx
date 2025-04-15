import NavHero from "./nav-hero";

export default function Jumbotron() {
  return (
    <div className=" bg-blue-500 px-4 ">
      <div className="relative container mx-auto">
        <div className="flex ">
          <div className="flex flex-col w-3/5 justify-center md:mb-16 ">
            <div>
              <h1 className="text-xl font-bold text-white sm:text-5xl">
                Satu sentuh banyak solusi kesehatan
              </h1>
            </div>
            <div className="mt-1">
              <p className=" text-xs text-white sm:text-xl sm:mt-2">
                Bersama <span className="font-semibold">Medisigna</span>
              </p>
            </div>
          </div>
          <div className="w-2/5 ">
            <img
              className="h-[12rem] sm:h-[29rem]"
              src="./images/hero.png"
              alt="handole"
            />
          </div>
        </div>
        <div className="hidden sm:block absolute  bottom-12 sm:text-white sm:mt-9">
          <NavHero />
        </div>
      </div>
    </div>
  );
}
