import { useEffect, useState } from "react";
import { Outlet, Link, redirect, Form } from "react-router-dom";

//import { getContacts } from "../contacts";

export async function loader() {
  //const contacts = await getContacts();
  return {};
}

export async function action() {
  const contact = { id: 10 };
  return redirect(`/contacts/${contact.id}/edit`);
}

export default function Root() {
  const [form, setForm] = useState({
    name: "Hello",
    position: "World",
    level: "1",
  });

  // These methods will update the state properties.
  /*  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  } */

  useEffect(() => {
    const newPerson = { ...form };
    async function fetchData() {
      try {
        await fetch("http://localhost:5000/records", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newPerson),
        });
      } catch (error) {
        console.log("Fetch error", error);
        return;
      }
    }
    fetchData();
  }, [form]);

  const contacts = [
    {
      id: "1",
      first: "Lorem",
      last: "Ipsum",
      avatar: "https://placekitten.com/g/200/200",
      notes: "Some notes",
      favorite: true,
    },
  ];
  return (
    <div
      id="container"
      className="h-screen w-screen col-2 font-mono bg-gray-800 flex flex-row"
    >
      <div
        id="sidebar"
        className="h-screen max-w-fit px-10 py-10 font-mono bg-gray-400 relative"
      >
        <div className="absolute inset-x-0 bottom-0 p-2 bg-gray-300 text-center">
          React Router
        </div>
        <div className="flex flex-row gap-3">
          <form id="search-form" role="search">
            <input
              id="q"
              aria-label="Search contacts"
              placeholder="Search"
              type="search"
              name="q"
              className="rounded-lg p-3"
            />
            <div id="search-spinner" aria-hidden hidden={true} />
            <div className="sr-only" aria-live="polite"></div>
          </form>
          <Form method="post">
            <button className="bg-slate-100 py-3 px-5 text-center rounded-lg whitespace-nowrap text-blue-800 hover:bg-green-800 hover:text-slate-50">
              Add New
            </button>
          </Form>
        </div>
        <div className="m-3 border-t-2" />
        <nav>
          {contacts.length ? (
            <ul>
              {contacts.map((contact) => (
                <li key={contact.id}>
                  <Link to={`contacts/${contact.id}`}>
                    {contact.first || contact.last ? (
                      <>
                        {contact.first} {contact.last}
                      </>
                    ) : (
                      <i>No Name</i>
                    )}{" "}
                    {contact.favorite && <span>★</span>}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>No contacts</i>
            </p>
          )}
        </nav>
      </div>
      <div id="detail" className="w-full p-10 grid place-content-center">
        <Outlet />
      </div>
    </div>
  );
}
