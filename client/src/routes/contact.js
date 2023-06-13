import { Form } from "react-router-dom";

export default function Contact() {
  const contact = {
    id: "6",
    first: "Testing",
    last: "Something",
    avatar: "https://placekitten.com/g/200/200",
    notes: "Some notes",
    favorite: true,
  };

  return (
    <div
      id="contact"
      className="bg-blue-200 p-3 rounded-md flex flex-row flex-wrap gap-3"
    >
      <div>
        <img
          className="rounded-lg relative"
          alt=""
          key={contact.avatar}
          src={contact.avatar || null}
        />
      </div>

      <div className="">
        <div className="font-mono font-bold flex flex-row gap-2">
          {contact.first || contact.last ? (
            <p>
              {contact.first} {contact.last}
            </p>
          ) : (
            <i>No Name</i>
          )}{" "}
          <Favorite contact={contact} />
        </div>

        {contact.notes && (
          <p className="font-mono font-normal my-2">{contact.notes}</p>
        )}

        <div className="flex flex-row flex-wrap gap-3">
          <Form action="edit">
            <button
              type="submit"
              className="bg-slate-100 py-3 px-5 text-center rounded-lg text-blue-800 hover:bg-green-800 hover:text-slate-50"
            >
              Edit
            </button>
          </Form>
          <Form
            method="post"
            action="destroy"
            onSubmit={(event) => {
              if (
                !window?.confirm(
                  "Please confirm you want to delete this record."
                )
              ) {
                event.preventDefault();
              }
            }}
          >
            <button
              type="submit"
              className="bg-slate-100 py-3 px-5 text-center rounded-lg text-red-500 hover:bg-red-500 hover:text-slate-50 hover:shadow-stone-500"
            >
              Delete
            </button>
          </Form>
        </div>
      </div>
    </div>
  );
}

function Favorite({ contact }) {
  // yes, this is a `let` for later
  let favorite = contact.favorite;
  return (
    <Form method="post">
      <button
        name="favorite"
        value={favorite ? "false" : "true"}
        aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
      >
        {favorite ? "★" : "☆"}
      </button>
    </Form>
  );
}
