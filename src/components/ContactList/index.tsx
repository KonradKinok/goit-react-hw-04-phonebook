import React from "react";
import PropTypes from "prop-types";
import SeparateContact from "../SeparateContact/index";

interface Contact {
  id: string;
  name: string;
  number: string;
}

interface ContactListProps {
  contacts: Contact[];
  filter: string;
  onDelete: (id: string) => void;
}

const ContactList: React.FC<ContactListProps> = ({ contacts, filter, onDelete }) => {

    const filteredContacts = contacts.filter((contact) =>
        contact.name.toLowerCase().includes(filter.toLowerCase()),
    );

    return (
        <div>
            <ul>
                {filteredContacts.map((contact) => (
                    <SeparateContact
                        key={contact.id}
                        contact={contact}
                        onDelete={onDelete}
                    />
                ))}
            </ul>
        </div>
    );
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  filter: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ContactList;