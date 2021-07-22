import { API } from "~/constants";
import getUrl from "../utils/getUrl";

const login = async (username: string, password: string) => {
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Origin": "*",
  };

  const data = {
    username,
    password,
  };
  const url = getUrl(API.Login);
  const response = await fetch(url, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(data)
  });
  const jsonResponse = await response.json();
  const { token } = jsonResponse;
  localStorage.setItem("token", token);
};

export default login;
