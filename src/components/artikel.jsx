import { Image, link } from "@nextui-org/react";
import { Chip } from "@nextui-org/react";
import { Link } from "@nextui-org/react";
import ImageNext from "next/image";
export default function Artikel() {
    const truncateText = (text, maxLength) => {
        if (text.length > maxLength) {
          return text.slice(0, maxLength) + " ...";
        }
        return text;
    }
  return (
    <div className="flex items-center gap-4   shadow-gray-200 shadow-sm py-3 rounded-lg mb-4 sm:w-3/4">
      <div className="w-1/3 h-20 sm:h-full sm:w-[25rem] ">
        <Image
          isZoomed={true}
          width={800}
          height={250}
          src=" https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
          alt="next ui"
          className=" h-20 sm:h-44  sm:w-full "
        />
      </div>
      <div className="flex justify-center flex-col gap-1 w-2/3 sm:w-full">
        <Chip className=" bg-sky-200 sm:mb-2" size="sm">
          Kesehatan
        </Chip>
        <h4 className="text-xs font-semibold sm:text-xl overflow-hidden h-10 sm:h-14">
          {truncateText("Lorem ipsum dolor sit amet consectetur adipisicing elit. amet consectetur adipisicing elit. amet consectetur adipisicing elit.", 60)}
        </h4>
        <p className=" text-justify overflow-y-hidden hidden sm:flex sm:h-18">
        {truncateText("Lorem ipsum dolor sit amet consectetur, adipisicing elit. Error, ea. Nemo labore obcaecati fuga sunt nostrum earum reiciendis, repellat repudiandae doloremque illo totam, explicabo possimus ullam voluptatibus vero error assumenda. Consequatur vitae dolore, nemo quam quia rem libero deserunt repellendus mollitia ab neque modi sit voluptas aut esse, repellat at possimus odio corporis facere inventore maiores sed perspiciatis. Beatae, nesciunt.", 130)}
        </p>
        <Link className="hidden sm:block" href={"#"}>
          Baca Selengkapnya
        </Link>
      </div>
    </div>
  );
}
