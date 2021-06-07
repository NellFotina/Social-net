import React from "react";
import Profile from "./Profile";
import * as axios from "axios";
import { connect } from "react-redux";
import { setUserProfile } from "../../redux/profile-reducer";
import { withRouter } from "react-router";

class ProfileContainer extends React.Component {
  componentDidMount() {
    let userId = this.props.match.params.userId;
    if (!userId) {
      userId = 2;
    }
    axios
      //делаем get-запрос, запрашиваем текущую страницу (page-название из документации)
      //и количество записей на 1 странице (count-название из документации);
      //получим объект и засетаем его в редьюсер
      .get(`https://social-network.samuraijs.com/api/1.0/profile/` + userId)
      .then((response) => {
        this.props.setUserProfile(response.data); //вызовем здесь АС и передадим в него profile
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

//обернем нашу контейнерную компоненту, перед тем, как отдать в connect другой компоненте,
//withrouter возвращает новую компоненту, которая отрисует ProfileContainer,
//но закинет в нее данные из store (из url)
//если ввести в консоль this.props, то увидим, что появились новые значения
//в консоли: match, location, history
//match - совпадение нашего url с какими-то роутерами

let WithUrlDataContainerComponent = withRouter(ProfileContainer);

//наша ProfileContainer вместо mapDispatchToProps создает объект,
//в который кладет AC, далее connect сам этот АС вызовет, задиспатчит,
//в него передаст profile и т.д.
export default connect(mapStateToProps, { setUserProfile })(
  WithUrlDataContainerComponent
);
