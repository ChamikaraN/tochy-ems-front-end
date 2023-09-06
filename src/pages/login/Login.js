import React, { useState } from "react";
import PropTypes from "prop-types";
import { withRouter, Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  Container,
  Row,
  Col,
  Button,
  FormGroup,
  FormText,
  Input,
} from "reactstrap";
import Widget from "../../components/Widget/Widget";
import Footer from "../../components/Footer/Footer";
import { loginUser } from "../../actions/auth";
import hasToken from "../../services/authService";

import loginImage from "../../assets/loginImage.svg";
import { useTheme } from "@material-ui/core";
import { changeTheme } from "../../actions/theme";

const Login = (props) => {
  const theme = useTheme();

  const [state, setState] = useState({
    email: "connect.chamikara@gmail.com",
    password: "+123456aA",
  });

  const doLogin = (e) => {
    e.preventDefault();
    props
      .dispatch(
        loginUser(
          { password: state.password, email: state.email },
          props.history
        )
      )
      .then((res) => {
        if (res) {
          props.history.go(0);
        }
      });
  };

  const changeCreds = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const { from } = props.location.state || { from: { pathname: "/" } };
  if (hasToken(JSON.parse(localStorage.getItem("authenticated")))) {
    return <Redirect to={from} />;
  }

  return (
    <div
      className="auth-page"
      style={{
        backgroundColor: theme.palette.background.light,
      }}
    >
      <Container className="col-12">
        <Row
          className="d-flex align-items-center"
          style={{
            backgroundColor: theme.palette.background.light,
          }}
        >
          <Col
            xs={12}
            lg={6}
            className="left-column"
            style={{
              backgroundColor: theme.palette.background.light,
            }}
          >
            <Widget className="widget-auth widget-p-lg">
              <div className="d-flex align-items-center justify-content-between py-3">
                <p className="auth-header mb-0">Login</p>
                <div className="logo-block">
                  <i className={`eva eva-email `}></i>
                  <p className="mb-0">E.M.S</p>
                </div>
              </div>
              {/* <div className="auth-info my-2">
                <p>This is a real app with Node.js backend - use <b>"admin@demo.com : 123456"</b> to login!</p>
              </div> */}
              <form onSubmit={(event) => doLogin(event)}>
                <FormGroup className="my-3">
                  <FormText>Email</FormText>
                  <Input
                    id="email"
                    className="input-transparent pl-3"
                    value={state.email}
                    onChange={(event) => changeCreds(event)}
                    type="email"
                    required
                    name="email"
                    placeholder="Email"
                  />
                </FormGroup>
                <FormGroup className="my-3">
                  <div className="d-flex justify-content-between">
                    <FormText>Password</FormText>
                    {/* <Link to="/error">Forgot password?</Link> */}
                  </div>
                  <Input
                    id="password"
                    className="input-transparent pl-3"
                    value={state.password}
                    onChange={(event) => changeCreds(event)}
                    type="password"
                    required
                    name="password"
                    placeholder="Password"
                  />
                </FormGroup>
                <div className="bg-widget d-flex justify-content-center">
                  <Button
                    className="rounded-pill my-3"
                    type="submit"
                    color="secondary-red"
                  >
                    Login
                  </Button>
                </div>
                <p className="dividing-line my-3">&#8195;Or&#8195;</p>
                {/* <div className="d-flex align-items-center my-3">
                  <p className="social-label mb-0">Login with</p>
                  <div className="socials">
                    <a href="https://flatlogic.com/"><GoogleIcon /></a>
                    <a href="https://flatlogic.com/"><TwitterIcon /></a>
                    <a href="https://flatlogic.com/"><FacebookIcon /></a>
                    <a href="https://flatlogic.com/"><GithubIcon /></a>
                    <a href="https://flatlogic.com/"><LinkedinIcon /></a>
                  </div>
                </div> */}
                <Link to="/register">Don’t have an account? Sign Up here</Link>
              </form>
            </Widget>
          </Col>
          <Col
            xs={0}
            lg={6}
            className="right-column"
            style={{
              backgroundColor: theme.palette.background.light,
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "20px",
                right: "10px",
                transform: "translateX(-50%)",
              }}
              onClick={() => props.dispatch(changeTheme())}
            >
              <i
                className={`eva eva-${
                  props.theme === "dark" ? "sun" : "moon"
                }-outline`}
                style={{ color: props.theme === "dark" ? "#ffffff" : "#000" }}
              ></i>
            </div>

            <div>
              <img src={loginImage} alt="Error page" />
            </div>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
};

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    isFetching: state.auth.isFetching,
    isAuthenticated: state.auth.isAuthenticated,
    errorMessage: state.auth.errorMessage,
    theme: state.theme.selectedTheme,
  };
}

export default withRouter(connect(mapStateToProps)(Login));
