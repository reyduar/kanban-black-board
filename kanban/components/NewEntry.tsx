import React, { ChangeEvent, useContext, useState } from "react";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { EntriesContext } from "../context";

function NewEntry() {
  const { createEntry, visibleModalEntry, showModalEntry, closeModalEntry } =
    useContext(EntriesContext);

  const [inputValue, setInputValue] = useState("");
  const [touched, setTouched] = useState(false);

  const onInputTextChanged = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const onSave = () => {
    if (inputValue.length === 0) return;
    createEntry(inputValue);
    setTouched(false);
    setInputValue("");
    closeModalEntry();
  };

  const footerContent = (
    <div>
      <Button
        label="Cancel"
        icon="pi pi-times"
        onClick={closeModalEntry}
        className="p-button-text"
      />
      <Button
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
                  type="text"
                  value={inputValue}
                  onChange={onInputTextChanged}
                  onBlur={() => setTouched(true)}
                  className={
                    inputValue.length <= 0 && touched ? "p-invalid" : ""
                  }
                />
                {inputValue.length <= 0 && touched ? (
                  <small className="p-error">Name is a required.</small>
                ) : (
                  <small></small>
                )}
              </div>
              <div className="field col-12 md:col-6">
                <label htmlFor="category">Category*</label>
                <InputText id="category" type="text" />
              </div>
              <div className="field col-12">
                <label htmlFor="description">Description*</label>
                <InputTextarea id="description" rows={4} />
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
