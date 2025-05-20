import React from "react";
import { useEffect } from "react";
import { useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from 'dayjs';
import { format } from "path";


export default function ProfilePage() {
    const API_KEY = "qUubKrhKBBrb0M4uQISHm089PavbKEcLW3v7tgiP";
    const [name, setName] = useState<string>('');
    const [date, setDate] = useState<Date | null>(new Date());
    //const [age, setAge] = useState<number>(0);
    const [showProfile, setShowProfile] =useState<boolean>(false)
    const formattedDate = dayjs(date).format('YYYY-MM-DD');

    const handleClick = () => {
        setShowProfile(true)
        console.log(`Name: ${name}, Date: ${formattedDate}`);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
                setName(event.target.value);
    }

    const calculateAge = (date: Date) => {
        const today = new Date();
        let age = today.getFullYear() - date.getFullYear()
       
        var m = today.getMonth() - date.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < date.getDate())) 
        {
            age--;
        }
        console.log(age);
        return age
    }
    const age = date ? calculateAge(date) : 0;
    const marsAge = Math.round(age / 1.88);
     
    
    return (
        <div>
            <div>
                <h1>Create your Mars profile</h1>
                <label htmlFor="name">
                    <p>Name: </p>
                    <input type="text" name="name" onChange={handleChange}required></input>
                </label>

                <label htmlFor="birthday">
                    <p>Birthday: </p>
                    <DatePicker selected={date} onChange={(date) => setDate(date)}
                    dateFormat="dd/MM/yyyy"
                    maxDate={new Date()}
                    showYearDropdown
                    scrollableMonthYearDropdown/>
                </label>

                <button onClick={handleClick}>
                    Build your profile
                </button>  
            </div>
            {showProfile && (

            
            <div>
                <h2>Welcome to your Mars profile, {name}</h2>
                
                <p>Did you know you would weight 2.5 X less on Mars? This is because the gravity is weaker on Mars than on Earth as it is smaller!</p>
                <p>On Earth you are <strong>{age} years old </strong>, but on Mars you would only be <strong>{marsAge} years old.</strong> This is because 1 year on Mars is roughly twice that on Earth. </p>
            </div>

            )}
        </div>
        
    );

};
