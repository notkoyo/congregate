export default function SignOutButton({ text }) {
  if (!text) {
    text = "Logout";
  }

  return (
    <form action="/auth/signout" method="post">
      <button
        type="submit"
        className="inline-block rounded bg-cyan-600 px-5 py-3 font-satoshi text-sm text-white hover:bg-cyan-700"
      >
        {text}
      </button>
    </form>
  );
}
