import React, { Component } from "react";
import "./Profile.css";

import LStorageUser from "../../services/LStorageUser";
import ProfilePicture from "../../assets/default-profile-picture.jpg";
import UserService from "../../services/UserService";

export default class Profile extends Component {
  state = {
    userReady: false,
    currentUser: { username: "" },
    userInfo: null
  }
  
  componentDidMount() {
    const currentUser = LStorageUser.getUser();
    UserService.getProfileInfo(currentUser.id).then(
        response => {
          this.setState({
            userInfo: response.data,
            currentUser: currentUser,
            userReady: true
          });
        }
    );
  }

  render() {
    const { userInfo } = this.state;

    return (
      <div className="container profile-info">
        {
          (this.state.userReady) ?
          <div className="d-flex justify-content-between">
            <div className="left-image">
              <img className="picture-profile" src={ProfilePicture} alt="Fit-Style"/>
            </div>
            <div className="right-info d-flex justify-content-between">
              <div className="first-column">
              <p>
                <label> Номер клубной карты </label>
                  <strong>{userInfo.id}</strong>
              </p>
              <p>
                <label> ФИО </label>
                <strong>{userInfo.username} </strong>
                <strong>{userInfo.surname} </strong>
                <strong>{userInfo.patronymic} </strong>
              </p>
              <p>
                <label> Возраст </label>
                <strong>{userInfo.age}</strong>
              </p>
              <p>
                <label> Пол </label>
                <strong>{userInfo.gender}</strong>
              </p>
              <p>
                <label> Дата рождения </label>
                <strong>{userInfo.birthdate}</strong>
              </p>
              </div>
              <div className="second-column">
              <p>
                <label> Телефон </label>
                <strong>{userInfo.telephone}</strong>
              </p>
              <p>
                <label> Паспорт </label>
                <strong>{userInfo.passport}</strong>
              </p>
              <p>
                <label> Адрес </label>
                <strong>{userInfo.address}</strong>
              </p>
              <p>
                <label> Вид абонемента </label>
                <strong>Премиум</strong>
              </p>
              <p>
                <label> Дата окончания </label>
                <strong>2021-11-20</strong>
              </p>
              </div>
            </div>
          </div>: null
        }
      </div>
    );
  }
}