import { Form, redirect } from "react-router-dom";

export async function action({ request, params }) {
  //const formData = await request.formData();
  //const updates = Object.fromEntries(formData);
  //await updateContact(params.contactId, updates);
  return redirect(`/contacts/1`);
}

export default function EditContact() {
  const contact = {};

  return (
    <Form
      method="post"
      id="contact-form"
      className="bg-orange-50 rounded-lg p-3 flex flex-col gap-5 flex-auto"
    >
      <div className="flex flex-row gap-5">
        <label for="first">Name</label>
        <input
          placeholder="First"
          aria-label="First name"
          type="text"
          name="first"
          defaultValue={contact.first}
          className="rounded-lg p-3"
        />
        <input
          placeholder="Last"
          aria-label="Last name"
          type="text"
          name="last"
          defaultValue={contact.last}
          className="rounded-lg p-3"
        />
      </div>
      <div className="flex flex-row gap-5">
        <label for="avatar">Avatar URL</label>
        <input
          placeholder="https://example.com/avatar.jpg"
          aria-label="Avatar URL"
          type="text"
          name="avatar"
          defaultValue={contact.avatar}
          className="rounded-lg p-3 flex-1"
        />
      </div>
      <div className="flex flex-row gap-5">
        <label for="notes">Notes</label>
        <textarea
          name="notes"
          defaultValue={contact.notes}
          rows={1}
          className="rounded-lg p-3 flex-1"
        />
      </div>
      <div className="flex flex-row gap-5">
        <button
          type="submit"
          className="bg-slate-100 py-3 px-5 text-center rounded-lg text-blue-800 hover:bg-green-800 hover:text-slate-50 border-stone-600 border-2  hover:border-slate-50"
        >
          Save
        </button>
        <button
          type="post"
          className="bg-slate-100 py-3 px-5 text-center rounded-lg text-red-500 hover:bg-red-500 hover:text-slate-50 hover:shadow-stone-500  border-stone-600 border-2 hover:border-slate-50"
        >
          Cancel
        </button>
      </div>
    </Form>
  );
}
