export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen flex items-center justify-center font-medium overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="p-2 flex">
          <a href="/" className="w-fit h-fit">
            <img
              className="w-[35rem]"
              alt="YSS white logo"
              src="/logo-blue.png"
            ></img>
          </a>
        </div>
        <div className="my-4">{children}</div>
      </div>
    </div>
  );
}
