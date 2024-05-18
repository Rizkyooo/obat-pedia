import NavHero from "./nav-hero";

export default function Jumbotron() {
  return (
    <div className=" bg-red-600 px-4 ">
      <div className="flex container mx-auto px-2 sm:px-16">
        <div className="flex flex-col w-3/5 justify-center my-4 ">
          <div>
            <h1 className="text-xl font-bold text-white sm:text-5xl">
              Temukan Obatmu di ObatPedia!
            </h1>
          </div>
          <div className="mt-1">
            <p className=" text-xs text-white sm:text-xl sm:mt-4">
              Temukan Obat, Tanya Apoteker dan Forum Kesehatan
            </p>
          </div>
          <div className="hidden sm:block sm:text-white sm:mt-9">
          <NavHero></NavHero>
          </div>
        </div>

        <div className="w-2/5 ">
          <img
            className="h-[12rem]  sm:h-[29rem]"
            src="./images/hero.png"
            alt="handole"
          />
        </div>
      </div>
    </div>
  );
}
