import React,{ useState, ChangeEvent, FormEvent } from "react";
import PropTypes from "prop-types";
import { nanoid } from 'nanoid'
import scss from "./ContactForm.module.scss"

interface Contact {
  id: string;
  name: string;
  number: string;
}

interface ContactFormProps {
  addContact: (contact: Contact) => void;
  contacts: Contact[];
}

const ContactForm: React.FC<ContactFormProps> = ({ addContact, contacts }) => {

    const [contact, setContact] = useState({ name: "", number: "" });

    const handleChange = (ev: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = ev.currentTarget;
        setContact((prevValue) => ({
            ...prevValue,
            [name]: value
        }));
    };

    const handleSubmit = (ev: FormEvent<HTMLFormElement>) => {
        ev.preventDefault();
        const newContact: Contact = {
            id: nanoid(),
            name: contact.name,
            number: contact.number,
        };

        const contactExists = contacts.some(
            (existingContact) =>
                existingContact.name === newContact.name ||
                existingContact.number === newContact.number,
        );

        if (contactExists) {
            window.alert(`${newContact.name} or ${newContact.number} is already in contacts`);
            return;
        }

        addContact(newContact);
        setContact({ name: "", number: "" });
    };

    const nameId = nanoid();
    const numId = nanoid();
    return (
        <>
            <form className={scss.form} onSubmit={handleSubmit}>
                <label htmlFor={nameId}>Name</label>
                <input
                    id={nameId}
                    type="text"
                    name="name"
                    pattern="^[a-zA-Z]+((['\u0020-\u002D][a-zA-Z])?[a-zA-Z]*)*$"
                    title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                    required
                    value={contact.name}
                    onChange={handleChange}
                />
                <label htmlFor={numId}>Phone number</label>
                <input
                    id={numId}
                    type="tel"
                    name="number"
                    // pattern="((\+|00)?[1-9]{2}|0)[1-9]( ?[0-9]){8}"
                    placeholder="567-215-453"
                    pattern="\d\d\d-\d\d\d-\d\d\d"
                    title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with + Example: 567-216-456"
                    required
                    value={contact.number}
                    onChange={handleChange}
                />
                <button type="submit">Add contact</button>
            </form>
        </>
    );
}

ContactForm.propTypes = {
  addContact: PropTypes.func.isRequired,
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
};

export default ContactForm;