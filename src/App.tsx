import { useState } from "react";

import Card from "./components/Card";
import Users from "./components/Users.json";

import logo from "./images/ftc-logo.svg";
import mario from "./images/mario.png";
import luigi from "./images/luigi.png";
import yoshi from "./images/yoshi.png";
import toad from "./images/toad.png";
import wario from "./images/wario.png";
import spiny from "./images/spiny.png";
import bowser from "./images/bowser.png";
import bobomb from "./images/bob-omb.png";
import spike from "./images/spike.png";
import goomba from "./images/goomba.png";
import { useInterval } from "usehooks-ts";

function App() {
  const [token, setToken] = useState(
    "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxMjM0NSIsImlhdCI6MTY1NzA0NjQ3MCwiZXhwIjoxNjU3NjUxMjcwfQ.Q5TKsTExLqWWLvHzY10MKdCRcuDgM1-5s6_9llpytrtWpbr_GKmTq2WTbk5Sz4NZcQV26ophP7y9G9gChL42hw"
  );
  const [users, setUsers] = useState(Users.result.slice(0, 10));

  useInterval(() => {
    fetch(
      "http://" +
        import.meta.env.VITE_APP_IP +
        "/api/users/?include_hidden=false",
      {
        method: "Get",
        headers: { Authorization: "Bearer " + token },
        redirect: "follow",
      }
    )
      .then(async (response) => {
        if (response.status === 401) login();
        return response.json();
      })
      .then((data) => {
        const users = data.result;
        if (users[0].points === 9999) users.shift();
        setUsers(users.slice(0, 10));
      })
      .catch((error) => console.log("error", error));
  }, 10000);

  function login() {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const body = JSON.stringify({
      username: import.meta.env.VITE_APP_USERNAME,
      password: import.meta.env.VITE_APP_PASSWORD,
    });

    const tokenRequestOptions: RequestInit = {
      method: "POST",
      headers: myHeaders,
      body: body,
      redirect: "follow",
    };

    fetch(
      "http://" + import.meta.env.VITE_APP_IP + "/api/login",
      tokenRequestOptions
    )
      .then((response) => response.json())
      .then((result) => setToken(result.token))
      .catch((error) => console.log("error", error));
  }

  const icons = [
    mario,
    luigi,
    yoshi,
    toad,
    wario,
    spiny,
    bowser,
    bobomb,
    spike,
    goomba,
  ];
  return (
    <div
      className="w-screen h-screen text-center cursor-none gap-10 items-center flex flex-col bg-gradient-to-br from-[#6535bb] via-[#4a6ad3] to-[#299de9]"
      style={{ direction: "rtl" }}
    >
      <img src={logo} className="w-1/3" alt="logo" />
      <div className="mx-auto text-white font-[Minecraft] text-8xl align-top">
        FTC LEADERBOARD
      </div>
      <div className="w-full my-auto">
        {users.map((user) => (
          <Card
            key={user.id}
            position={user.user_rank}
            points={user.points}
            icon={icons[user.user_rank - 1]}
            name={user.name}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
