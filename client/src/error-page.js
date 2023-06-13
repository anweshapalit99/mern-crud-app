import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError(null);
  console.log(error);

  return (
    <div
      id="error-page"
      className="flex w-screen h-screen text-center bg-black"
    >
      <div className="m-auto bg-pink-200 p-10 rounded-md">
        <h1 className="font-extrabold text-3xl">Oops!</h1>
        <p className="font-medium text-2xl">
          Sorry, an unexpected error has occurred.
        </p>
        <p className="font-normal text-xl text-orange-950">{error.data}</p>
      </div>
    </div>
  );
}
