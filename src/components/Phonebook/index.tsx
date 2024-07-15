import React,{ useState, useEffect, ChangeEvent } from "react";
import * as globalFunctions from "../../globalFunctions/functions"
import scss from "./Phonebook.module.scss";
import ContactForm from "../ContactForm/index";
import Filter from "../Filter/index";
import ContactList from "../ContactList/index";
const localStorageKey = 'Phonebook-local-storage';

interface Contact {
  id: string;
  name: string;
  number: string;
}

export function Contacts() {
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [filter, setFilter] = useState<string>("");
    
    useEffect(() => {
    const contactsFromLocalStorage = globalFunctions.loadLocalStorage(localStorageKey) as Contact[] || [];
    setContacts(contactsFromLocalStorage);
    }, []);
    
    const addContact = (contact: Contact) => {
        setContacts((prevContacts) => {
            const updatedContacts = [...prevContacts, contact];
            globalFunctions.saveLocalStorage(localStorageKey, updatedContacts);
            return updatedContacts;
        });
    };

    const handleDelete = (contactId: string) => {
        setContacts((prevContacts) => {
            const updatedContacts = prevContacts.filter(
                (contact) => contact.id !== contactId,
            );
            globalFunctions.saveLocalStorage(localStorageKey, updatedContacts);
            return updatedContacts;
        });
    };

    const handleFilterChange = (event: ChangeEvent<HTMLInputElement>) => {
        setFilter(event.target.value);
    };

    return (
        <div className={scss.phonebookContainer}>
            <h1>Phonebook</h1>
            <ContactForm addContact={addContact} contacts={contacts} />

            <h2>Contacts</h2>
            <Filter filter={filter} onFilterChange={handleFilterChange} />
            <ContactList contacts={contacts}
                filter={filter}
                onDelete={handleDelete}
            />
        </div>
    )
}