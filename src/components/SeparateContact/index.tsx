import React from "react";
import PropTypes from "prop-types";
import scss from "./SeparateContact.module.scss";

interface Contact {
  id: string;
  name: string;
  number: string;
}
interface SeparateContactProps {
  contact: Contact;
  onDelete: (id: string) => void;
}

const SeparateContact: React.FC<SeparateContactProps> =  ({ contact, onDelete })=> {

    const handleDelete = () => {
        onDelete(contact.id);
    };

    return (
        <li className={scss.containerContact} key={contact.id} >
            <span > {contact.name}: {contact.number}</span>
            <button
                type="button"
                onClick={handleDelete}>
                Delete
            </button>
        </li>
    );
};

SeparateContact.propTypes = {
  contact: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default SeparateContact;