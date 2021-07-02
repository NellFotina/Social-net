import React from "react";
import Profile from "./Profile";
import { connect } from "react-redux";
import {
  getUserProfileThunk,
  getStatusThunk,
  updateStatusThunk,
  savePhotoThunk,
  saveProfileThunk,
} from "../../redux/profile-reducer";
import { withRouter } from "react-router";
import { compose } from "redux";

class ProfileContainer extends React.Component {
  refreshProfile() {
    //match.params. - урок 60
    //match.params. - значения из консоли, связанные с ф-цией withRouter - вытаскивает данные из url
    let userId = this.props.match.params.userId;
    if (!userId) {
      //если не выбран профиль кого-то и мы авторизованы, то - наша аватарка (наш Profile, наш ID)
      userId = this.props.meAuthUserId;
      //есть такой программный метод редиректа для ознакомления применим его тут (вместо <Redirect />):
      //если мы не авторизованы, то скачем (редирект) на страницу Логин
      if (!userId) {
        //запушим в history новый path - "/login" (программный редирект нужно делать как можно реже, он не связан со state, а любые изменения нужно стараться делать через state)
        this.props.history.push("/login");
      }
    }
    this.props.getUserProfileThunk(userId);
    this.props.getStatusThunk(userId);
  }
  componentDidMount() {
    this.refreshProfile();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    //чтобы не было зацикленности на изменения любого props,
    //вставим проверку на изменение определенного параметра - именно userId
    if (this.props.match.params.userId !== prevProps.match.params.userId)
      this.refreshProfile();
  }
  render() {
    //прокинем в компоненту props, раскукожим их (...) и прокинем дальше
    return (
      <Profile
        {...this.props}
        isOwner={!this.props.match.params.userId} //isOwner=false - я владелец профиля
        profile={this.props.profile}
        status={this.props.status}
        updateStatus={this.props.updateStatusThunk}
        savePhoto={this.props.savePhotoThunk}
        saveProfile={this.props.saveProfileThunk}
      />
    );
  }
}

let mapStateToProps = (state) => ({
  //к нам в пропсах придут пропсы, который мы здесь сейчас попросим
  profile: state.profilePage.profile,
  status: state.profilePage.status,
  meAuthUserId: state.auth.userId,
  isAuth: state.auth.isAuth,
});

export default compose(
  connect(mapStateToProps, {
    getUserProfileThunk,
    getStatusThunk,
    updateStatusThunk,
    savePhotoThunk,
    saveProfileThunk,
  }),
  withRouter
)(ProfileContainer);
