import React, { ChangeEvent, useContext, useMemo, useState } from "react";
import { GetServerSideProps } from "next";
import { Entry, EntryStatus } from "@/kanban/interfaces";
import { EntriesContext } from "@/kanban/context";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { useRouter } from "next/router";
import { dbEntries } from "@/database";
import { eq } from "lodash";

const initial_state: Entry = {
  _id: "",
  name: "",
  description: "",
  label: "",
  status: "pending",
};

interface Statuses {
  name: string;
  code: EntryStatus;
}

interface EntryPageProps {
  entry: Entry;
}

function EntryPage({ entry }: EntryPageProps) {
  const router = useRouter();
  const { updateEntry, deleteEntry } = useContext(EntriesContext);

  const statuses: Statuses[] = [
    { name: "TODO", code: "pending" },
    { name: "IN PROGRESS", code: "in-progress" },
    { name: "DONE", code: "finished" },
  ];

  const [inputValue, setInputValue] = useState(entry);
  const [entryStatus, setEntryStatus] = useState<Statuses>(
    statuses.find((item) => eq(item.code, inputValue.status))!
  );
  const [touched, setTouched] = useState(false);
  const isNotValid = useMemo(
    () => inputValue.name.length <= 0 && touched,
    [inputValue.name, touched]
  );

  const onInputValueChanged = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue({
      ...inputValue,
      [event.target.name]: event.target.value,
    });
  };

  const onSave = () => {
    const updatedEntry = { ...inputValue, status: entryStatus.code };
    updateEntry(updatedEntry);
    onClose();
  };

  const onDelete = () => {
    deleteEntry(inputValue);
    onClose();
  };

  const onClose = () => {
    setTouched(false);
    setInputValue(initial_state);
    router.push("/");
  };

  return (
    <>
      <div className="grid">
        <div className="col-12">
          <div className="card">
            <div className="p-fluid formgrid grid">
              <div className="field col-12 md:col-6">
                <label htmlFor="name">Name*</label>
                <InputText
                  id="name"
                  name="name"
                  type="text"
                  value={inputValue.name}
                  onChange={onInputValueChanged}
                  onBlur={() => setTouched(true)}
                  className={isNotValid ? "p-invalid" : ""}
                />
                {isNotValid ? (
                  <small className="p-error">Name is a required.</small>
                ) : (
                  <small></small>
                )}
              </div>
              <div className="field col-12 md:col-6">
                <label htmlFor="category">Category*</label>
                <InputText
                  id="category"
                  name="label"
                  type="text"
                  value={inputValue.label}
                  onChange={onInputValueChanged}
                />
              </div>
              <div className="field col-12">
                <label htmlFor="description">Description*</label>
                <InputText
                  id="description"
                  name="description"
                  value={inputValue.description}
                  onChange={onInputValueChanged}
                />
              </div>
              <div className="field col-12 md:col-6">
                <label htmlFor="state">Status</label>
                <Dropdown
                  id="state"
                  value={entryStatus}
                  onChange={(e) => setEntryStatus(e.value)}
                  options={statuses}
                  optionLabel="name"
                  placeholder="Select One status"
                ></Dropdown>
              </div>
            </div>
            <div className="flex justify-content-between flex-wrap">
              <div>
                <Button
                  label="Delete"
                  icon="pi pi-trash"
                  onClick={onDelete}
                  severity="danger"
                  className="p-button-text"
                />
              </div>
              <div>
                <Button
                  label="Cancel"
                  icon="pi pi-times"
                  onClick={onClose}
                  className="p-button-text"
                />
                <Button
                  disabled={inputValue.name.length <= 0}
                  label="Save"
                  icon="pi pi-check"
                  onClick={() => onSave()}
                  autoFocus
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params as { id: string };

  const entry = await dbEntries.getEntryById(id);

  if (!entry) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      entry,
    },
  };
};

export default EntryPage;
