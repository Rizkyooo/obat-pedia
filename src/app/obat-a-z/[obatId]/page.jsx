"use client";
import { createClient } from "@supabase/supabase-js";
import { useState, useEffect } from "react";
import { Tabs, Tab, Spinner, Image } from "@nextui-org/react";
import { Link } from "@nextui-org/react";
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);
export default function ObatId({ searchParams }) {
  const [obat, setObat] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeLink, setActiveLink] = useState("");

  const fetchObatData = async (id) => {
    setLoading(true);
    let supabaseQuery = supabase.from("Obats").select("*").eq("id", id);

    let { data, error } = await supabaseQuery;

    if (error) {
      console.error("Error fetching data: ", error);
    } else {
      setInterval(() => {
        setLoading(false);
        setObat(data[0]);
      }, 400);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchObatData(searchParams.id);
  }, []);

  const handleClick = (link) => {
    setActiveLink(link);
  };

  return (
    <main>
      <div className="detail-obat my-4 container mx-auto px-6 sm:flex min-h-screen">
        {loading && (
          <Spinner
            className="flex h-[30rem] justify-center items-center min-w-full"
            color="danger"
            label="Loading"
            size="lg"
          />
        )}
        <div className="hidden sm:flex sm:flex-col gap-2 h-fit items-start w-1/4  bg-slate-100 p-4 px-6 rounded-xl sticky top-[4.5rem]">
          {obat?.ringkasan && obat?.ringkasan !== "null" && (
            <Link
              onClick={() => handleClick("#ringkasan")}
              className={`${
                activeLink === "#ringkasan"
                  ? "bg-[#EE0037] text-white font-medium px-4 py-2 w-full flex justify-center items-center rounded-xl"
                  : "text-black bg-white font-medium px-4 py-2 w-full flex justify-center items-center rounded-xl"
              }`}
              href="#ringkasan"
            >
              Deskripsi
            </Link>
          )}

          {obat?.merek_dagang && obat?.merek_dagang !== "null" && (
            <Link
              onClick={() => handleClick("#merek")}
              className={`${
                activeLink === "#merek"
                  ? "bg-[#EE0037] text-white font-medium px-4 py-2 w-full flex justify-center items-center rounded-xl"
                  : "text-black bg-white font-medium px-4 py-2 w-full flex justify-center items-center rounded-xl"
              } `}
              href="#merek"
            >
              Merek Dagang
            </Link>
          )}

{obat?.tentang && obat?.tentang !== "null" && (
            <Link
              onClick={() => handleClick("#tentang")}
              className={`${
                activeLink === "#tentang"
                  ? "bg-[#EE0037] text-white font-medium px-4 py-2 w-full flex justify-center items-center rounded-xl"
                  : "text-black bg-white font-medium px-4 py-2 w-full flex justify-center items-center rounded-xl"
              } `}
              href="#tentang"
            >
              Tentang
            </Link>
          )}

{obat?.peringatan && obat?.peringatan !== "null" && (
            <Link
              onClick={() => handleClick("#peringatan")}
              className={`${
                activeLink === "#peringatan"
                  ? "bg-[#EE0037] text-white font-medium px-4 py-2 w-full flex justify-center items-center rounded-xl"
                  : "text-black bg-white font-medium px-4 py-2 w-full flex justify-center items-center rounded-xl"
              } `}
              href="#peringatan"
            >
              Peringatan
            </Link>
          )}    

{obat?.dosis && obat?.dosis !== "null" && (
            <Link
              onClick={() => handleClick("#dosis")}
              className={`${
                activeLink === "#dosis"
                  ? "bg-[#EE0037] text-white font-medium px-4 py-2 w-full flex justify-center items-center rounded-xl"
                  : "text-black bg-white font-medium px-4 py-2 w-full flex justify-center items-center rounded-xl"
              } `}
              href="#dosis"
            >
              Dosis
            </Link>
          )}

{obat?.gunakan_benar && obat?.gunakan_benar !== "null" && (
            <Link
              onClick={() => handleClick("#gunakan")}
              className={`${
                activeLink === "#gunakan"
                  ? "bg-[#EE0037] text-white font-medium px-4 py-2 w-full flex justify-center items-center rounded-xl"
                  : "text-black bg-white font-medium px-9 py-2 w-full flex justify-center items-center rounded-xl"
              } `}
              href="#gunakan"
            >
              Cara Penggunaan
            </Link>
          )}

{obat?.interaksi && obat?.interaksi !== "null" && (
            <Link
              onClick={() => handleClick("#interaksi")}
              className={`${
                activeLink === "#interaksi"
                  ? "bg-[#EE0037] text-white font-medium px-4 py-2 w-full flex justify-center items-center rounded-xl"
                  : "text-black bg-white font-medium px-4 py-2 w-full flex justify-center items-center rounded-xl"
              } `}
              href="#interaksi"
            >
              Interaksi
            </Link>
          )}

{obat?.efek_samping && obat?.efek_samping !== "null" && (
            <Link
              onClick={() => handleClick("#efek")}
              className={`${
                activeLink === "#efek"
                  ? "bg-[#EE0037] text-white font-medium px-4 py-2 w-full flex justify-center items-center rounded-xl"
                  : "text-black bg-white font-medium px-4 py-2 w-full flex justify-center items-center rounded-xl"
              } `}
              href="#efek"
            >
              Efek Samping
            </Link>
          )}

{obat?.referensi && obat?.referensi !== "null" && (
            <Link
              onClick={() => handleClick("#referensi")}
              className={`${
                activeLink === "#referensi"
                  ? "bg-[#EE0037] text-white font-medium px-4 py-2 w-full flex justify-center items-center rounded-xl"
                  : "text-black bg-white font-medium px-4 py-2 w-full flex justify-center items-center rounded-xl"
              } `}
              href="#referensi"
            >
              Referensi
            </Link>
          )}
        </div>
        <div className="sm:w-3/4 sm:px-14">
          <h1 className="text-2xl font-bold mb-2">{obat?.title}</h1>
          {obat?.picture && 
          <div className="bg-gray-200 my-2 rounded-md w-fit">
          <Image className="h-72" radius="none" isZoomed src={obat?.picture}/>
          </div>
          }
          <Tabs className="overflow-auto max-w-full sm:hidden mb-4">
            {obat?.ringkasan && obat?.ringkasan !== "null" && (
              <Tab title="Deskripsi">
                <div className="mb-6 sm:hidden">
                  <h4 className="text-lg text-white font-medium bg-[#EE0037] px-2 py-1 rounded-md mb-2">
                    Deskripsi
                  </h4>
                  <div
                    className="text-justify"
                    dangerouslySetInnerHTML={{ __html: obat?.ringkasan }}
                  ></div>
                </div>
              </Tab>
            )}

            {obat?.merek_dagang && obat.merek_dagang !== "null" && (
              <Tab title="Merek Dagang">
                <div className="mb-6">
                  <h4 className="text-lg text-white font-medium bg-[#EE0037] px-2 py-1 rounded-md mb-2">
                    Merek Dagang
                  </h4>
                  <div
                    className="text-justify"
                    dangerouslySetInnerHTML={{ __html: obat?.merek_dagang }}
                  ></div>
                </div>
              </Tab>
            )}

            {obat?.tentang && obat?.tentang !== "null" && (
              <Tab title="Tentang">
                <div className="mb-6">
                  <h4 className="text-lg text-white font-medium bg-[#EE0037] px-2 py-1 rounded-md mb-2">
                    Tentang
                  </h4>
                  <div
                    className="table-container"
                    style={{}}
                    dangerouslySetInnerHTML={{ __html: obat?.tentang }}
                  ></div>
                </div>
              </Tab>
            )}

            {obat?.peringatan && obat?.peringatan !== "null" && (
              <Tab title="Peringatan">
                <div className="mb-6">
                  <h4 className="text-lg text-white font-medium bg-[#EE0037] px-2 py-1 rounded-md mb-2">
                    Peringatan
                  </h4>
                  <div
                    className="text-justify list-container"
                    dangerouslySetInnerHTML={{ __html: obat?.peringatan }}
                  ></div>
                </div>
              </Tab>
            )}

            {obat?.dosis && obat?.dosis !== "null" && (
              <Tab title="Dosis">
                <div className="mb-6">
                  <h4 className="text-lg text-white font-medium bg-[#EE0037] px-2 py-1 rounded-md mb-2">
                    Dosis
                  </h4>
                  <div
                    className="table-container text-justify"
                    style={{}}
                    dangerouslySetInnerHTML={{ __html: obat?.dosis }}
                  ></div>
                </div>
              </Tab>
            )}

            {obat?.gunakan_benar && obat?.gunakan_benar !== "null" && (
              <Tab title="Cara Penggunaan">
                <div className="mb-6">
                  <h4 className="text-lg text-white font-medium bg-[#EE0037] px-2 py-1 rounded-md mb-2">
                    Cara penggunaan
                  </h4>
                  <div
                    className="text-justify"
                    dangerouslySetInnerHTML={{ __html: obat?.gunakan_benar }}
                  ></div>
                </div>
              </Tab>
            )}

            {obat?.interaksi && obat?.interaksi !== "null" && (
              <Tab title="Interaksi">
                <div className="mb-6">
                  <h4 className="text-lg text-white font-medium bg-[#EE0037] px-2 py-1 rounded-md mb-2">
                    Interaksi
                  </h4>
                  <div
                    className="text-justify list-container"
                    dangerouslySetInnerHTML={{ __html: obat?.interaksi }}
                  ></div>
                </div>
              </Tab>
            )}
            {obat?.efek_samping && obat?.efek_samping !== "null" && (
              <Tab title="Efek Samping">
                <div className="mb-6">
                  <h4 className="text-lg text-white font-medium bg-[#EE0037] px-2 py-1 rounded-md mb-2">
                    Efek Samping
                  </h4>
                  <div
                    className="text-justify list-container"
                    dangerouslySetInnerHTML={{ __html: obat?.efek_samping }}
                  ></div>
                </div>
              </Tab>
            )}
            {obat?.referensi && obat?.referensi !== "null" && (
              <Tab title="Referensi">
                <div className="mb-6">
                  <h4 className="text-lg text-white font-medium bg-[#EE0037] px-2 py-1 rounded-md mb-2">
                    Referensi
                  </h4>
                  <div
                    className=" list-container"
                    dangerouslySetInnerHTML={{ __html: obat?.referensi }}
                  ></div>
                </div>
              </Tab>
            )}
          </Tabs>

          <div className="hidden sm:block">
            {obat?.ringkasan && (
              <div id="ringkasan" className="mb-6 scroll-mt-20 ">
                <h4 className="text-lg text-white font-medium bg-[#EE0037] px-2 py-1 rounded-md mb-2">
                  Deskripsi
                </h4>
                <div
                  className="text-justify"
                  dangerouslySetInnerHTML={{ __html: obat?.ringkasan }}
                ></div>
              </div>
            )}
            {obat?.merek_dagang && (
              <div id="merek" className="mb-6 scroll-mt-20 ">
                <h4 className="text-lg text-white font-medium bg-[#EE0037] px-2 py-1 rounded-md mb-2">
                  Merek Dagang
                </h4>
                <div
                  className="text-justify"
                  dangerouslySetInnerHTML={{ __html: obat?.merek_dagang }}
                ></div>
              </div>
            )}
            {obat?.tentang && (
              <div id="tentang" className="mb-6 scroll-mt-20">
                <h4 className="text-lg text-white font-medium bg-[#EE0037] px-2 py-1 rounded-md mb-2">
                  Tentang
                </h4>
                <div
                  className="table-container"
                  style={{}}
                  dangerouslySetInnerHTML={{ __html: obat?.tentang }}
                ></div>
              </div>
            )}
            {obat?.peringatan && (
              <div id="peringatan" className="mb-6 scroll-mt-20">
                <h4 className="text-lg text-white font-medium bg-[#EE0037] px-2 py-1 rounded-md mb-2">
                  Peringatan
                </h4>
                <div
                  className="text-justify list-container"
                  dangerouslySetInnerHTML={{ __html: obat?.peringatan }}
                ></div>
              </div>
            )}
            {obat?.dosis && (
              <div id="dosis" className="mb-6 scroll-mt-20">
                <h4 className="text-lg text-white font-medium bg-[#EE0037] px-2 py-1 rounded-md mb-2">
                  Dosis
                </h4>
                <div
                  className="table-container text-justify"
                  style={{}}
                  dangerouslySetInnerHTML={{ __html: obat?.dosis }}
                ></div>
              </div>
            )}
            {obat?.gunakan_benar && (
              <div id="gunakan" className="mb-6 scroll-mt-20">
                <h4 className="text-lg text-white font-medium bg-[#EE0037] px-2 py-1 rounded-md mb-2">
                  Cara penggunaan
                </h4>
                <div
                  className="text-justify"
                  dangerouslySetInnerHTML={{ __html: obat?.gunakan_benar }}
                ></div>
              </div>
            )}
            {obat?.interaksi && (
              <div id="interaksi" className="mb-6 scroll-mt-20">
                <h4 className="text-lg text-white font-medium bg-[#EE0037] px-2 py-1 rounded-md mb-2">
                  Interaksi
                </h4>
                <div
                  className="text-justify list-container"
                  dangerouslySetInnerHTML={{ __html: obat?.interaksi }}
                ></div>
              </div>
            )}
            {obat?.efek_samping && (
              <div id="efek" className="mb-6 scroll-mt-20">
                <h4 className="text-lg text-white font-medium bg-[#EE0037] px-2 py-1 rounded-md mb-2">
                  Efek Samping
                </h4>
                <div
                  className="text-justify list-container"
                  dangerouslySetInnerHTML={{ __html: obat?.efek_samping }}
                ></div>
              </div>
            )}
            {obat?.referensi && (
              <div id="referensi" className="mb-6 scroll-mt-20">
                <h4 className="text-lg text-white font-medium bg-[#EE0037] px-2 py-1 rounded-md mb-2">
                  Referensi
                </h4>
                <div
                  className=" list-container"
                  dangerouslySetInnerHTML={{ __html: obat?.referensi }}
                ></div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
