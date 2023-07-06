import { useEffect, useState, useRef } from "react";
import { Outlet, NavLink, redirect, Form } from "react-router-dom";
import { fetchAllContactData } from "../services/records";

export async function loader() {
  //const contacts = await getContacts();
  return {};
}

export async function action({ request }) {
  let formData = await request.formData();

  let intent = formData.get("intent");
  let count = formData.get("count");

  switch (intent) {
    case "add_new":
      return redirect(`contacts/add`);
    case "home":
      return redirect("/");
    default:
      return null;
  }
}

export default function Root() {
  const initialState = [];
  const loadingMessage = "Loading...";
  const refContainer = useRef(0);
  const refSearch = useRef(0);
  const [contacts, setContacts] = useState(initialState);
  const [count, setCount] = useState(initialState.length);
  const [navHeight, setNavHeight] = useState(0);

  // These methods will update the state properties.
  /*  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  } */

  useEffect(() => {
    fetchAllContactData().then((obj) => {
      setContacts(obj.data);
      setCount(obj.data.length);
    });
    setNavHeight(
      refContainer.current.clientHeight - refSearch.current.clientHeight - 100
    );
  }, []);

  return (
    <div
      id="container"
      className="h-screen col-2 font-mono bg-gray-800 flex flex-row"
    >
      <div
        id="sidebar"
        ref={refContainer}
        className="h-screen max-w-fit px-10 py-10 font-mono bg-gray-400 relative "
      >
        <Form method="post">
          <div ref={refSearch}>
            <div className="flex flex-row gap-3">
              <div className="flex flex-row justify-start">
                <button
                  type="post"
                  name="intent"
                  value="home"
                  className="p-2 border-stone-600 border-2 hover:bg-green-200 hover:border-green-700"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819"
                    />
                  </svg>
                </button>
              </div>
              <div id="search-form" role="search">
                <input
                  id="q"
                  aria-label="Search contacts"
                  placeholder="Search"
                  type="search"
                  className="rounded-lg p-3"
                />
                <div id="search-spinner" aria-hidden hidden={true} />
                <div className="sr-only" aria-live="polite"></div>
              </div>

              <button
                name="intent"
                value="add_new"
                count={count}
                className="bg-slate-100 py-3 px-5 text-center rounded-lg whitespace-nowrap text-blue-800 hover:bg-green-800 hover:text-slate-50"
              >
                <input className="hidden" name="count" value={count} readOnly />
                Add New
              </button>
            </div>
            <div className="m-3 border-t-2" />
          </div>

          <nav
            style={{ maxHeight: `${navHeight}px` }}
            className="overflow-y-auto"
          >
            {contacts.length ? (
              <ul>
                {contacts.map((contact, index) => (
                  <li className="pb-8" key={index}>
                    <NavLink
                      to={`contacts/${contact._id}`}
                      className={({ isActive }) =>
                        isActive
                          ? "bg-violet-500 w-auto text-white mb-8"
                          : "mb-8"
                      }
                    >
                      {contact.firstName} {contact.lastName}
                      {contact.favorite && <span>★</span>}
                    </NavLink>
                  </li>
                ))}
              </ul>
            ) : (
              <p>
                <i>{loadingMessage}</i>
              </p>
            )}
          </nav>
        </Form>
      </div>
      <div id="detail" className="w-full p-10 grid place-content-center">
        <Outlet />
      </div>
    </div>
  );
}
