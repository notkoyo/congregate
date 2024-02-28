export default function Heading({ heading }) {
  return (
    <div className="flex h-[9rem] items-center justify-center p-8">
      <h1 className="font-satoshi text-4xl font-bold sm:text-5xl">{heading}</h1>
    </div>
  );
}
