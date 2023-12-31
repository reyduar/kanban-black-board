import React, { ChangeEvent, useContext, useMemo, useState } from "react";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { EntriesContext } from "../context";
import { Entry, EntryStatus } from "../interfaces";

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

function NewEntry() {
  const { createEntry, visibleModalEntry, showModalEntry, closeModalEntry } =
    useContext(EntriesContext);

  const statuses: Statuses[] = [
    { name: "TODO", code: "pending" },
    { name: "IN PROGRESS", code: "in-progress" },
    { name: "DONE", code: "finished" },
  ];

  const [entryStatus, setEntryStatus] = useState<Statuses>(statuses[0]);
  const [inputValue, setInputValue] = useState(initial_state);
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
    const newEntry = { ...inputValue, status: entryStatus.code };
    createEntry(newEntry);
    onClose();
  };

  const onClose = () => {
    setTouched(false);
    setInputValue(initial_state);
    closeModalEntry();
  };

  const footerContent = (
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
  );

  const dialog = (
    <Dialog
      header="Create"
      visible={visibleModalEntry}
      position={"top-right"}
      style={{ width: "50vw" }}
      onHide={closeModalEntry}
      footer={footerContent}
      draggable={false}
      resizable={false}
    >
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
          </div>
        </div>
      </div>
    </Dialog>
  );

  const newButton = (
    <div className="flex justify-content-start flex-wrap gap-2 mb-2 ml-4">
      <Button
        label="Create"
        icon="pi pi-plus"
        onClick={showModalEntry}
        text
        rounded
        severity="info"
        aria-label="Add"
      />
    </div>
  );
  return (
    <>
      {newButton} {dialog}
    </>
  );
}

export default NewEntry;
