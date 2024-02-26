export default function Header({ text }) {
  return (
    <div className="flex justify-center border p-6">
      <h1 className="text-4xl">{text}</h1>
    </div>
  );
}
