import { Form } from "react-router-dom";
import classes from "../../styles/settings/settings.module.css";
import { useEffect, useState } from "react";

function TimeInput({ day }) {
  const [from, setFrom] = useState(["00", "00"]);
  const [to, setTo] = useState(["00", "01"]);
  const [toMin, setToMin] = useState(-1);
  const write = ([num1, num2]) => {
    var rtn = []
    if (num1 < 10) {
      rtn.push("0" + num1.toString());
    } else {
      rtn.push(num1.toString());
    }
    if (num2 < 10) {
      rtn.push("0" + num2.toString());
    } else {
      rtn.push(num2.toString());
    }
    return rtn;
  }
  // time_from < time_to
  const cmp = (time_from, time_to) => {
    if (parseInt(time_from[0]) > parseInt(time_to[0])) {
      return false
    } else if (parseInt(time_from[0]) === parseInt(time_to[0])) {
      return parseInt(time_from[1]) < parseInt(time_to[1])
    } else {
      return true
    }
  }
  useEffect(() => {
    if (parseInt(to[0]) === 0) {
      setToMin(1)
    } else {
      setToMin(-1)
    }
    if (cmp(from, to)) {
      document.getElementById(day + "_from_h").value = parseInt(from[0]) > 23 ? "23" : from[0]
      document.getElementById(day + "_from_min").value = parseInt(from[1]) > 60 ? "59" : from[1]
    } else {
      let newTime = [parseInt(to[0]), parseInt(to[1])]
      if (newTime[1] > 0) {
        newTime[1]--;
      } else if (newTime[0] > 0) {
        newTime[0]--;
        newTime[1] = 59;
      }
      let temp_time = write(newTime);
      document.getElementById(day + "_from_h").value = parseInt(temp_time[0]) > 23 ? "23" : temp_time[0]
      document.getElementById(day + "_from_min").value = parseInt(temp_time[1]) > 60 ? "59" : temp_time[1]
    }

    document.getElementById(day + "_to_h").value = parseInt(to[0]) > 23 ? "23" : to[0]
    document.getElementById(day + "_to_min").value = parseInt(to[1]) > 60 ? "59" : to[1]


  }, [day, from, to])
  return <div id={day + "_input"}>
    <div><h2>{day[0].toUpperCase() + day.slice(1)}</h2></div>
    <div>
      From:
      <div onChange={(chosen) => {
        let from_v = [parseInt(chosen.currentTarget.childNodes[0].value),
        parseInt(chosen.currentTarget.childNodes[2].value)]
        if (from_v[0] === 0 && from_v[1] === -1) {
          from_v[1] = 0;
        } else if (from_v[1] === -1) {
          from_v[0] = from_v[0] - 1
          from_v[1] = 59;
        }
        if (from_v[0] === 23 && from_v[1] > 59) {
          from_v[1] = 59;
        } else if (from_v[1] === 60) {
          from_v[0] = from_v[0] + 1
          from_v[1] = 0;
        }
        setFrom(write(from_v));

      }}>
        <input type="number" name={day + "_from_h"} id={day + "_from_h"} min={0} max={23} />
        :
        <input type="number" name={day + "_from_min"} id={day + "_from_min"} min={-1} max={60} />
      </div>
    </div>
    <div>
      To:
      <div onChange={(chosen) => {
        let to_v = [parseInt(chosen.currentTarget.childNodes[0].value),
        parseInt(chosen.currentTarget.childNodes[2].value)]
        if (to_v[0] === 0 && to_v[1] === -1) {
          to_v[1] = 0;
        } else if (to_v[1] === -1) {
          to_v[0] = to_v[0] - 1
          to_v[1] = 59;
        }
        if (to_v[0] === 23 && to_v[1] > 59) {
          to_v[1] = 59;
        } else if (to_v[1] === 60) {
          to_v[0] = to_v[0] + 1
          to_v[1] = 0;
        }
        setTo(write(to_v))
      }}>
        <input type="number" name={day + "_to_h"} id={day + "_to_h"} min={0} max={23} />
        :
        <input type="number" name={day + "_to_min"} id={day + "_to_min"} min={toMin} max={60} />
      </div>
    </div>
  </div>
}

export function Settings() {
  useEffect(() => {

  })
  return (
    <div className={classes.wrapper}>
      <Form>
        <label htmlFor="">Available for communication:</label>
        <TimeInput day={"monday"} />
        <TimeInput day={"tuesday"} />
        <TimeInput day={"wednesday"} />
        <TimeInput day={"thursday"} />
        <TimeInput day={"friday"} />
        <TimeInput day={"saturday"} />
        <TimeInput day={"sunday"} />
        <button type="submit">Save</button>
      </Form>

      <div className={classes.components}>
        <h2>Change username:</h2>
        <div>Current username: Username</div>
        <Form method="post" action="/lol">
          <div>
            <label htmlFor="">Type your new username: </label>
            <input
              className={classes.inputs}
              required
              type="text"
              name="username"
            />
          </div>
          <button type="submit">Submit</button>
        </Form>
      </div>
      <div className={classes.components}>
        <h2>Change email:</h2>
        <div>Current email: mail@mail.com</div>
        <Form method="post" action="/lol">
          <div>
            <label htmlFor="">Type your new email: </label>
            <input
              className={classes.inputs}
              required
              type="email"
              name="email"
            />
          </div>
          <button type="submit">Submit</button>
        </Form>
      </div>
      <div className={classes.components}>
        <h2>Change password:</h2>
        <Form method="post" action="/lol">
          <div>
            <label htmlFor="">Type your password: </label>
            <input
              className={classes.inputs}
              required
              type="password"
              name="password"
            />
          </div>
          <div>
            <label htmlFor="">New password: </label>
            <input
              className={classes.inputs}
              required
              type="password"
              name="new_password"
            />
          </div>
          <button type="submit">Submit</button>
        </Form>
      </div>
      <div className={classes.components}>
        <h2>Delete account:</h2>
        <Form method="post" action="/lol">
          <div>
            <label htmlFor="">Type your password: </label>
            <input
              className={classes.inputs}
              required
              type="password"
              name="password"
            />
          </div>
          <button className={classes.delete_btn} type="submit">
            Delete account
          </button>
        </Form>
      </div>
    </div>
  );
}
