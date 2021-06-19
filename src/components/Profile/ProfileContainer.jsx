import React from "react";
import Profile from "./Profile";
import { connect } from "react-redux";
import {
  getUserProfileThunk,
  getStatusThunk,
  updateStatusThunk,
} from "../../redux/profile-reducer";
import { withRouter } from "react-router";
import { compose } from "redux";

class ProfileContainer extends React.Component {
  componentDidMount() {
    //match.params. - значения из консоли, связанные с ф-цией withRouter - вытаскивает данные из url
    let userId = this.props.match.params.userId;
    if (!userId && this.props.isAuth) {
      userId = this.props.meAuthUserId; //если не выбран профиль кого-то и мы авторизованы, то наша аватарка (наш ID)
    }
    this.props.getUserProfileThunk(userId);
    this.props.getStatusThunk(userId);
  }
  render() {
    //прокинем в компоненту props, раскукожим их (...) и прокинем дальше
    return (
      <Profile
        {...this.props}
        profile={this.props.profile}
        status={this.props.status}
        updateStatus={this.props.updateStatusThunk}
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
  }),
  withRouter
)(ProfileContainer);
