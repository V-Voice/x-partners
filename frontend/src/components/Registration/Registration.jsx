import React, { useState } from 'react';
import st from './Registration.module.css';

export default function RegistrationForm() {
  const [errorMessage, setErrorMessage] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    gender: '',
    birthDate: '',
    avatarUrl: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

const handleFileChange = async (e) => {
  try {
    const file = e.target.files[0];
    const imageData = new FormData();
    imageData.append('image', file);

    const response = await fetch('http://localhost:4444/upload', {
      method: 'POST',
      body: imageData
    });

    if (!response.ok) {
      throw new Error('Upload failed');
    }

    const data = await response.json();
    const avatarUrl = 'avatarUrl';

    setFormData({ ...formData, [avatarUrl]: `http://localhost:4444${data.url}` });
  } catch (error) {
    console.log(error);
  }
};

const handleSubmit = async (e) => {
  e.preventDefault();
  console.log('FRONT: ', formData);
  try {
    const response = await fetch('http://localhost:4444/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'cors': 'true'
      },
      body: JSON.stringify(formData)
    });
    const data = await response.json();
    console.log('BACK: ', data);
    const status = response.status;
    if (status === 500 || status === 400) {
      setErrorMessage(data.message || data[0].msg);
      console.log('ERROR MESSAGE STATUS 500', errorMessage);
      setTimeout(() => {
        setErrorMessage(null);
      }, 1000);
    }
  } catch (error) {
    console.log(error);
  }
};

  return (
    <div className={st.registrationFormContainer}>
      <form onSubmit={handleSubmit} className={st.registrationForm}>
        <div className={st.centerDiv}>
        <h1>Форма регистрации</h1>
        </div>
        <label htmlFor="fullName">Имя:</label>
        <input type="text" id="fullName" name="fullName" minLength={5} placeholder="Имя" onChange={handleInputChange} value={formData.fullName} required />

        <label htmlFor="email">E-mail:</label>
        <input type="email" id="email" name="email" placeholder="E-mail" onChange={handleInputChange} value={formData.email} required />

        <label htmlFor="password">Пароль:</label>
        <input type="password" id="password" name="password" minLength={5} placeholder="Пароль" onChange={handleInputChange} value={formData.password} required />

        <label htmlFor="gender">Пол:</label>
        <div className={st.radio}>
          <input className={st.radioInput} type="radio" id="genderM" name="gender" value="M" onChange={handleInputChange} checked={formData.gender === 'M'} required />
          <label className={st.radioLabel} htmlFor="genderM">Мужской</label>
          <input className={st.radioInput} type="radio" id="genderF" name="gender" value="F" onChange={handleInputChange} checked={formData.gender === 'F'} />
          <label className={st.radioLabel} htmlFor="genderF">Женский</label>
        </div>

        <label htmlFor="birthDate">Дата рождения:</label>
        <input type="date" id="birthDate" name="birthDate" onChange={handleInputChange} pattern="\d{4}-\d{2}-\d{2}" value={formData.birthDate} required />
        <label htmlFor="avatar">Загрузите фото профиля:</label>
        <input type="file" accept="image/jpeg, image/png" id="avatar" name="avatar"  onChange={handleFileChange} required />
        <div className={st.centerDiv}>
        <button type="submit">Зарегистрироваться</button>
        </div>
        {errorMessage !== null ? <p>{errorMessage}</p> : null}
      </form>
    </div>
  );
}


