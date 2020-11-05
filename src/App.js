import React, { useState, useEffect } from "react";

import Section from "./Components/Section/Section";
import ContactForm from "./Components/ContactForm/ContactForm";
import Contacts from "./Components/Contacts/Contacts";

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const persistedContacts = localStorage.getItem("contacts");
    if (persistedContacts) {
      setContacts(JSON.parse(persistedContacts));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  });
  // const componentDidMount() {
  //   const persistedContacts = localStorage.getItem("contacts");
  //   if (persistedContacts) {
  //     this.setState({ contacts: JSON.parse(persistedContacts) });
  //   }
  // }

  // componentDidUpdate(prevProps, prevState) {
  //   if (prevState.contacts !== this.state.contacts) {
  //     localStorage.setItem("contacts", JSON.stringify(this.state.contacts));
  //   }
  // }

  const addContact = (objContact) => {
    const { name } = objContact;
    if (contacts.every((contact) => !contact.name.includes(name))) {
      setContacts((prev) => [...prev, objContact]);
    } else alert(`${name} is already in contacts`);
  };

  const deleteContact = (idContact) => {
    setContacts((prev) => [
      ...prev.filter((contact) => contact.id !== idContact),
    ]);
  };
  const addFilter = (query) => {
    setFilter(query);
  };
  const getFilter = () => filter;

  const filtredContacts = () => {
    if (filter.length > 0) {
      return contacts.filter((contact) =>
        contact.name.toLowerCase().includes(filter.toLowerCase())
      );
    } else return contacts;
  };

  return (
    <>
      <Section title={"Phonebook"}>
        <ContactForm OnAddContact={addContact} />
      </Section>
      <Section title={"Contacts"}>
        <Contacts
          contacts={filtredContacts}
          OnDeleteContact={deleteContact}
          OnAddFilter={addFilter}
          OnGetFilter={getFilter}
        />
      </Section>
    </>
  );
};

export default App;
