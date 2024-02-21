export default function SignOutButton() {
  return (
    <form action="/auth/signout" method="post">
      <button
        type="submit"
        className="inline-block rounded bg-cyan-600 px-5 py-3 font-satoshi text-xl text-white hover:bg-cyan-600"
      >
        Sign Out
      </button>
    </form>
  );
}
