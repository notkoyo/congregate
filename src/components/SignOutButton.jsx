export default function SignOutButton() {
  return (
    <form action="/auth/signout" method="post">
      <button
        type="submit"
        className="rounded bg-gray-700 px-4 py-2 font-bold text-white hover:bg-gray-600"
      >
        Sign Out
      </button>
    </form>
  );
}
