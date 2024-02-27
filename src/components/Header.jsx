export default function Heading({ heading }) {
  return (
    <div className="flex justify-center items-center h-[9rem]">
      <h1 className="text-4xl sm:text-5xl font-bold font-satoshi">{heading}</h1>
    </div>
  );
}
