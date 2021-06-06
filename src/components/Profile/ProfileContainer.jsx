import React from "react";
import Profile from "./Profile";
import * as axios from "axios";
import { connect } from "react-redux";
import { setUserProfile } from "../../redux/profile-reducer";

class ProfileContainer extends React.Component {
  componentDidMount() {
    axios
      //делаем get-запрос, запрашиваем текущую страницу (page-название из документации)
      //и количество записей на 1 странице (count-название из документации)
      .get(`https://social-network.samuraijs.com/api/1.0/profile/2`)
      .then((response) => {
        this.props.setUserProfile(response.data); //вызовем здесь АС и предадим в него profile
      });
  }
  render() {
    //прокинем в компоненту props, раскукожим их (...) и прокинем дальше
    return <Profile {...this.props} profile={this.props.profile} />;
  }
}

let mapStateToProps = (state) => ({
  profile: state.profilePage.profile,
});

//наша ProfileContainer вместо mapDispatchToProps создает объект,
//в который кладет AC, далее connect сам этот АС вызовет, задиспатчит,
//в него передаст profile и т.д.
export default connect(mapStateToProps, { setUserProfile })(ProfileContainer);
