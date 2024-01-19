import { Form, redirect } from "react-router-dom";
import classes from "../../styles/settings/settings.module.css";
import { useEffect, useMemo, useState } from "react";
import ProfileService from "../../services/ProfileService";
import secureLocalStorage from "react-secure-storage";


function TimeInput({ day, st, en }) {
  const [from, setFrom] = useState(st === undefined ? "00" : st);
  const [to, setTo] = useState(en === undefined ? "01" : en);
  useEffect(() => {
    document.getElementById(day + "_from_h").value = from;
    document.getElementById(day + "_to_h").value = to;

  }, [day, from, to])
  return <div id={day + "_input"}>
    <div><h2>{day[0].toUpperCase() + day.slice(1)}</h2></div>
    <div>
      From:
      <div onChange={(chosen) => {
        let v = parseInt(chosen.currentTarget.firstChild.value);
        if (v < 10) {
          v = "0" + v.toString();
        } else {
          v = v.toString();
        }
        setFrom(v);

      }}>
        <input type="number" name={day + "_from_h"} id={day + "_from_h"} min={0} max={parseInt(to) - 1} />
      </div>
    </div>
    <div>
      To:
      <div onChange={(chosen) => {
        let v = parseInt(chosen.currentTarget.firstChild.value);
        if (v < 10) {
          v = "0" + v.toString();
        } else {
          v = v.toString();
        }
        setTo(v);
      }}>
        <input type="number" name={day + "_to_h"} id={day + "_to_h"} min={1} max={24} />
      </div>
    </div>
  </div>
}

export function Settings() {
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [surname, setSurname] = useState("")
  const profileService = useMemo(() => new ProfileService(), [])
  const [startValues, setStartValues] = useState([]);
  const [endValues, setEndValues] = useState([]);
  useEffect(() => {
    profileService.get().then((data) => {
      setEmail(data.email);
      setName(data.name);
      setSurname(data.surname);

      setStartValues([
        data.availability === null ? 0 : data.availability.monday.start,
        data.availability === null ? 0 : data.availability.tuesday.start,
        data.availability === null ? 0 : data.availability.wednesday.start,
        data.availability === null ? 0 : data.availability.thursday.start,
        data.availability === null ? 0 : data.availability.friday.start,
        data.availability === null ? 0 : data.availability.saturday.start,
        data.availability === null ? 0 : data.availability.sunday.start,
      ])
      setEndValues([
        data.availability === null ? 24 : data.availability.monday.end,
        data.availability === null ? 24 : data.availability.tuesday.end,
        data.availability === null ? 24 : data.availability.wednesday.end,
        data.availability === null ? 24 : data.availability.thursday.end,
        data.availability === null ? 24 : data.availability.friday.end,
        data.availability === null ? 24 : data.availability.saturday.end,
        data.availability === null ? 24 : data.availability.sunday.end,
      ])
    }, () => { })
  }, [profileService])
  return (
    <div className={classes.wrapper}>
      <Form method="patch" action="/settings">
        <label htmlFor="">Available for communication:</label>
        {startValues.length > 0 && endValues.length > 0 ?
          <>
            <TimeInput day={"monday"} st={startValues[0]} en={endValues[0]} />
            <TimeInput day={"tuesday"} st={startValues[1]} en={endValues[1]} />
            <TimeInput day={"wednesday"} st={startValues[2]} en={endValues[2]} />
            <TimeInput day={"thursday"} st={startValues[3]} en={endValues[3]} />
            <TimeInput day={"friday"} st={startValues[4]} en={endValues[4]} />
            <TimeInput day={"saturday"} st={startValues[5]} en={endValues[5]} />
            <TimeInput day={"sunday"} st={startValues[6]} en={endValues[6]} />
          </>
          : null
        }



        <div className={classes.components}>
          <h2>Change email:</h2>
          <div>
            <label htmlFor="">Type your new email: </label>
            <input
              className={classes.inputs}
              type="email"
              name="email"
            />
          </div>
        </div>
        <div className={classes.components}>
          <h2>Change name:</h2>
          <div>Current name: {name}</div>
          <div>
            <label htmlFor="">Type your new name: </label>
            <input
              className={classes.inputs}
              type="text"
              name="name"
            />
          </div>
        </div>
        <div className={classes.components}>
          <h2>Change surname:</h2>
          <div>Current surname: {surname}</div>
          <div>
            <label htmlFor="">Type your new surname: </label>
            <input
              className={classes.inputs}
              type="text"
              name="surname"
            />
          </div>
        </div>


        <button type="submit">Save changes</button>
      </Form>
      <div className={classes.components}>
        <h2>Delete account:</h2>
        <button className={classes.delete_btn} type="button" onClick={() => {
          profileService.delete().then(() => {
            secureLocalStorage.removeItem("logInToken");
            secureLocalStorage.removeItem("username");
            secureLocalStorage.removeItem("isAdmin");
            redirect("/")
          }, () => {
            alert("Delete failed!")
          })
        }}>
          Delete account
        </button>
      </div>
    </div>
  );
}
