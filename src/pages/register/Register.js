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
  Label,
} from "reactstrap";
import Widget from "../../components/Widget/Widget.js";
import Footer from "../../components/Footer/Footer.js";

import loginImage from "../../assets/registerImage.svg";

import { registerUser } from "../../actions/register.js";
import hasToken from "../../services/authService";
import { toast } from "react-toastify";
import { changeTheme } from "../../actions/theme.js";
import { useTheme } from "@material-ui/core";

const Register = (props) => {
  const theme = useTheme();
  const [state, setState] = useState({
    name: "",
    businessname: "",
    domainname: "",
    email: "",
    password: "",
    role: "user",
  });

  const changeCred = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const doRegister = (event) => {
    event.preventDefault();
    let re = new RegExp(
      "^(?=.*([A-Z]){1,})(?=.*[!@#$&*%^()_+]{1,})(?=.*[0-9]{1,})(?=.*[a-z]{1,}).{8,30}$"
    );
    if (!re.test(state.password)) {
      alert(
        "Password should be 8 to 30 character long : atleast 1 Caps, 1 special char, 1 number"
      );
      return;
    }
    if (!state.name || !state.email || !state.password || !state.role) {
      toast.error("Please fill all the fields");
      return;
    }

    if (state.role === "business") {
      if (state.domainname.includes(".com")) {
        props.dispatch(
          registerUser({
            creds: state,
            history: props.history,
          })
        );
      }
    } else {
      props.dispatch(
        registerUser({
          creds: state,
          history: props.history,
        })
      );
    }
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
        <Row className="d-flex align-items-center">
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
                <p className="auth-header mb-0">Sign Up</p>
                <div className="logo-block">
                  <i className={`eva eva-email`}></i>
                  <p className="mb-0">E.M.S</p>
                </div>
              </div>
              {/* <div className="auth-info my-2">
                <p>This is a real app with Node.js backend - use <b>"admin@demo.com / 123456"</b> to login!</p>
              </div> */}
              <form onSubmit={(event) => doRegister(event)}>
                <FormGroup className="my-3">
                  <FormText>Owner Name</FormText>
                  <Input
                    id="name"
                    className="input-transparent pl-3"
                    value={state.name}
                    onChange={(event) => changeCred(event)}
                    type="text"
                    required
                    name="name"
                    placeholder="owner name here..."
                  />
                </FormGroup>

                <FormGroup className="my-3">
                  <FormText>Business Name</FormText>
                  <Input
                    id="businessname"
                    className="input-transparent pl-3"
                    value={state.businessname}
                    onChange={(event) => changeCred(event)}
                    type="text"
                    required={state.role === "business"}
                    disabled={state.role === "user"}
                    name="businessname"
                    placeholder="business name here..."
                  />
                </FormGroup>
                <FormGroup className="my-3">
                  <FormText>Domain Name</FormText>
                  <Input
                    id="domainname"
                    className="input-transparent pl-3"
                    value={state.domainname}
                    onChange={(event) => changeCred(event)}
                    type="text"
                    required={state.role === "business"}
                    disabled={state.role === "user"}
                    name="domainname"
                    placeholder="domain name here..."
                  />
                </FormGroup>

                <FormGroup className="my-3">
                  <FormText>Email</FormText>
                  <Input
                    id="email"
                    className="input-transparent pl-3"
                    value={state.email}
                    onChange={(event) => changeCred(event)}
                    type="email"
                    required
                    name="email"
                    placeholder="example@example.com"
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
                    onChange={(event) => changeCred(event)}
                    type="password"
                    required
                    name="password"
                    placeholder="password here..."
                  />
                </FormGroup>

                <FormGroup tag="fieldset">
                  <div className="d-flex justify-content-between">
                    <FormText>Account Type</FormText>
                  </div>
                  <FormGroup check required>
                    <Label check>
                      <Input
                        type="radio"
                        name="role"
                        value="user"
                        checked={state.role === "user"}
                        onChange={(event) => changeCred(event)}
                      />
                      Individual Account
                    </Label>
                  </FormGroup>
                  <FormGroup check>
                    <Label check>
                      <Input
                        type="radio"
                        name="role"
                        value="business"
                        checked={state.role === "business"}
                        onChange={(event) => changeCred(event)}
                      />{" "}
                      Business Account
                    </Label>
                  </FormGroup>
                </FormGroup>
                <div className="bg-widget d-flex justify-content-center">
                  <Button
                    className="rounded-pill my-3"
                    type="submit"
                    color="secondary-red"
                  >
                    Sign Up
                  </Button>
                </div>
                <p className="dividing-line my-3">&#8195;Or&#8195;</p>

                <Link to="/login">Enter the account</Link>
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

Register.propTypes = {
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

export default withRouter(connect(mapStateToProps)(Register));
