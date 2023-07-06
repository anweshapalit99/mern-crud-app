import { Form, redirect, useLoaderData } from "react-router-dom";
import { postContactInfo, updateContact } from "../services/records";

export async function action({ request, params }) {
  let formData = await request.formData();
  //console.log("formData", formData, typeof formData);
  let intent = formData.get("intent");

  switch (intent) {
    case "cancel":
      return redirect("/");
    case "submit":
      if (params.id) {
        updateContact(formData, params);
        return redirect(`/contacts/${params.id}`);
      } else {
        postContactInfo(formData);
      }
      return null;
    default:
      return;
  }
}

export default function EditContact() {
  const contact = useLoaderData() || { firstName: "", lastName: "", notes: "" };

  return (
    <Form
      method="post"
      id="contact-form"
      className="bg-orange-50 rounded-lg p-3 flex flex-col gap-5 flex-auto"
    >
      <div className="flex flex-row gap-5">
        <label htmlFor="first">Name</label>
        <input
          placeholder="First"
          aria-label="First name"
          type="text"
          name="first"
          value={contact.firstName}
          className="rounded-lg p-3"
          autoComplete="given-name"
        />
        <input
          placeholder="Last"
          aria-label="Last name"
          type="text"
          name="last"
          value={contact.lastName}
          className="rounded-lg p-3"
          autoComplete="family-name"
        />
      </div>
      <div className="flex flex-row gap-5">
        <label htmlFor="avatar">Avatar URL</label>
        <input
          placeholder="https://example.com/avatar.jpg"
          aria-label="Avatar URL"
          type="text"
          name="avatar"
          value={contact.avatar}
          className="rounded-lg p-3 flex-1"
          autoComplete="url"
        />
      </div>
      <div className="flex flex-row gap-5">
        <label htmlFor="notes">Notes</label>
        <textarea
          name="notes"
          value={contact.notes}
          rows={1}
          className="rounded-lg p-3 flex-1"
          autoComplete="email"
        />
      </div>
      <div className="flex flex-row gap-5">
        <button
          type="post"
          name="intent"
          value="submit"
          className="bg-slate-100 py-3 px-5 text-center rounded-lg text-blue-800 hover:bg-green-800 hover:text-slate-50 border-stone-600 border-2  hover:border-slate-50"
        >
          Save
        </button>
        <button
          type="post"
          name="intent"
          value="cancel"
          className="bg-slate-100 py-3 px-5 text-center rounded-lg text-red-500 hover:bg-red-500 hover:text-slate-50 hover:shadow-stone-500  border-stone-600 border-2 hover:border-slate-50"
        >
          Cancel
        </button>
      </div>
    </Form>
  );
}
