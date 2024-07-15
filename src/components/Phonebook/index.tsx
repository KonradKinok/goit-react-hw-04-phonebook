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
        const contactsFromLocalStorage = globalFunctions.loadLocalStorage(localStorageKey) as Contact[];
        console.log("contactsFromLocalStorage", contactsFromLocalStorage.length);
        setContacts(contactsFromLocalStorage);
        console.log("start", contacts.length);
    }, []);
    
    useEffect(() => {
        globalFunctions.saveLocalStorage(localStorageKey, contacts);
    }, [contacts]);

    const addContact = (contact: Contact) => {
        setContacts((prevContacts) =>  [...prevContacts, contact] );
    };     
    
    const handleDelete = (contactId: string) => {
        setContacts((prevContacts) => {
            const updatedContacts = prevContacts.filter(
                (contact) => contact.id !== contactId,
            );
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