export default async function layout({ children }) {
  return (
    <>
      <div className="container mx-auto px-6 bg-gray-100">
        <h3 className="text-md sm:text-lg font-semibold py-4">Forum Kesehatan</h3>
        {children}
      </div>
    </>
  );
}
