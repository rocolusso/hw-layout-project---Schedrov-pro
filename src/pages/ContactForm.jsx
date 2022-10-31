import React, {useState} from 'react';

export const ContactForm = () => {
    const [formIsBlocked, setFormIsBlocked] = useState(false);
    const [firstName,setFirstName] = useState('');
    const [lastName,setLastName] = useState('');
    const [country,setCountry] = useState(1);
    const [phone,setPhone] = useState('');
    const [city,setCity] = useState('');
    const [address,setAddress] = useState('');
    const [address2,setAddress2] = useState('');
    const [email,setEmail] = useState('');
    const [dontCall,setDontCall] = useState(false);
    const [delivery,setDelivery] = useState('');


    const submitHandler = (e)=>{
        e.preventDefault()

        setFormIsBlocked(!formIsBlocked)

        if(firstName && lastName  && phone && city && address && email && delivery   !== ''.trim() && country){
            console.log({
                "firstName":firstName,
                "lastName":lastName,
                "country":country,
                "phone":phone,
                "city":city,
                "address":address,
                "address2":address2,
                "email":email,
                "delivery":delivery,
                "dontCall":dontCall,
            })

            setFirstName('')
            setLastName('')
            setCountry(1)
            setPhone('')
            setCity('')
            setAddress('')
            setAddress2('')
            setEmail('')
            setDontCall(false)
            setDelivery('')
            setFormIsBlocked(false)
        } else {
            alert('data error')
            setFormIsBlocked(false)
        }

    }

    return (
        <div>
            <form onSubmit={submitHandler}>
                 <fieldset disabled={formIsBlocked}>
                    <div style={{maxWidth:'300px'}}>
                    <input value={firstName} onChange={(e)=>setFirstName(e.target.value)} placeholder="first name"/>
                    <input value={lastName} onChange={(e)=>setLastName(e.target.value)} placeholder="last name"/>

                    <select style={{width:'60%'}} value={country}  onChange={(e) => setCountry(parseFloat(e.target.value))}>
                        <option value={1}>country1</option>
                        <option value={2}>country2</option>
                        <option value={3}>country3</option>
                        <option value={4}>country4</option>
                        <option value={5}>country5</option>
                        <option value={6}>country...</option>
                    </select>

                    <input value={phone} onChange={(e) => parseFloat(e.target.value) ? setPhone(parseFloat(e.target.value)) : setPhone('')} placeholder="phone"/>
                    <input value={city} onChange={(e) => setCity(e.target.value)} placeholder="city"/>
                    <input value={address} onChange={(e) => setAddress(e.target.value)} placeholder="address"/>
                    <input value={address2} onChange={(e) => setAddress2(e.target.value)} placeholder="address2"/>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email"/>

                    <div onChange={(e)=> setDelivery(e.target.value)}>
                        <input type="radio"  name="delivery" value="delivery1"/>
                        <label >Delivery1</label>

                        <input type="radio"  name="delivery" value="delivery2"/>
                        <label >Delivery2</label>
                    </div>
                        <input onChange={()=>setDontCall(!dontCall)} type="checkbox" name="dontCall" checked={dontCall}/>
                        <label>dontCall</label>
                    </div>

                    <button>Click</button>
                 </fieldset>
            </form>
        </div>
    );
};
