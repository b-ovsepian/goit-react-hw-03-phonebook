import React, { Component } from "react";

import Section from "./Components/Section/Section";
import ContactForm from "./Components/ContactForm/ContactForm";
import Contacts from "./Components/Contacts/Contacts";

class App extends Component {
  state = {
    contacts: [],
    filter: "",
  };

  componentDidMount() {
    const persistedContacts = localStorage.getItem("contacts");
    if (persistedContacts) {
      this.setState({ contacts: JSON.parse(persistedContacts) });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem("contacts", JSON.stringify(this.state.contacts));
    }
  }

  addContact = (objContact) => {
    const { name } = objContact;
    if (this.state.contacts.every((contact) => !contact.name.includes(name))) {
      this.setState((prev) => ({ contacts: [...prev.contacts, objContact] }));
    } else alert(`${name} is already in contacts`);
  };

  deleteContact = (idContact) => {
    this.setState((prev) => ({
      contacts: [
        ...prev.contacts.filter((contact) => contact.id !== idContact),
      ],
    }));
  };
  addFilter = (query) => {
    this.setState({ filter: query });
  };
  getFilter = () => {
    return this.state.filter;
  };
  filtredContacts = () => {
    const { contacts, filter } = this.state;
    if (filter.length > 0) {
      return contacts.filter((contact) =>
        contact.name.toLowerCase().includes(filter.toLowerCase())
      );
    } else return contacts;
  };

  render() {
    const {
      addContact,
      filtredContacts,
      deleteContact,
      addFilter,
      getFilter,
    } = this;
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
  }
}

export default App;
