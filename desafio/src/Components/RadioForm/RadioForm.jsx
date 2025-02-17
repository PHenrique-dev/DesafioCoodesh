import React, { useState, useContext } from "react";
import { RadioContext } from "../../Context/RadioContext";
import './RadioForm.css'

const RadioForm = ({ editRadio = null }) => {
  const { addRadio, editRadio: updateRadio } = useContext(RadioContext);
  const [form, setForm] = useState(
    editRadio || { id: Date.now(), name: "", country: "", language: "", streamUrl: "" }
  );

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    editRadio ? updateRadio(form.id, form) : addRadio(form);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" placeholder="Nome" value={form.name} onChange={handleChange} required />
      <input type="text" name="country" placeholder="País" value={form.country} onChange={handleChange} required />
      <input type="text" name="language" placeholder="Idioma" value={form.language} onChange={handleChange} required />
      <input type="text" name="streamUrl" placeholder="URL da Rádio" value={form.streamUrl} onChange={handleChange} required />
      <button type="submit">{editRadio ? "Editar" : "Adicionar"}</button>
    </form>
  );
};

export default RadioForm;
