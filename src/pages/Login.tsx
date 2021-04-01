import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import chroma from 'chroma-js';
import { loginUser } from '../redux/actions/student';
import bookSvg from '../assets/img/school_books.svg';
import arrowRightSvg from '../assets/img/enter_arrow.svg';
import Button from '../components/Styled/Button';
import { ThemeType } from '../components/Styled/Theme';

const Main = styled.div`
  width: 100%;
  text-align: center;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  h3 {
    font-size: 4rem;
  }
  form {
    label {
    }
    input {
      transition: all 0.3s ease;
    }
  }

  .login__cover {
    width: 50%;
  }
`;

const Content = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const Form = styled.form`
  text-align: left;
  display: flex;
  flex-direction: column;
  width: 20%;
  min-height: 40%;
  justify-content: space-evenly;
`;

const StyledButton = styled(Button)<{ theme: ThemeType }>`
  overflow: hidden;
  margin: 2rem 0;
  padding: 2rem;
  border: none;
  background-color: ${(props) => props.theme.primary};
  color: white;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1.8rem;
  border-radius: 20px;
  display: flex;
  outline: none;
  justify-content: center;
  align-items: center;
  img {
    margin: 0 1rem;
    height: 1.2rem;
  }
  &:hover {
    background-color: ${(props) =>
      chroma.mix(props.theme.primary, '#fff', 0.3)};
  }
`;

const Label = styled.label`
  position: relative;
  margin: 1rem 0;
  justify-content: space-between;
  display: flex;
  flex-direction: column;
  p {
    padding: 0.6rem;
  }
`;

const Input = ({
  name,
  label,
  value,
  onChange,
  type,
}: {
  name: string;
  value: string;
  label: string;
  type: string;
  onChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
}) => {
  return (
    <Label htmlFor={name}>
      <p>{label}</p>
      <input type={type} name={name} value={value} onChange={onChange} />
    </Label>
  );
};

const SubmitBtn = () => {
  const arrowRef = useRef(null);

  const animateButton = (type: string) => {
    switch (type) {
      case 'over':
        gsap.to(arrowRef.current, { x: 10, duration: 0.2 });
        break;
      case 'out':
        gsap.to(arrowRef.current, { x: 0, duration: 0.2 });
        break;
      case 'click':
        gsap.to(arrowRef.current, { x: 200, duration: 0.2 });
        break;
      default:
        break;
    }
  };

  return (
    <StyledButton
      onMouseOver={() => animateButton('over')}
      onMouseOut={() => animateButton('out')}
      onFocus={() => animateButton('focus')}
      onBlur={() => animateButton('blur')}
      onClick={() => animateButton('click')}
      type="submit"
      primary
    >
      Entra <img ref={arrowRef} src={arrowRightSvg} alt="arrow right" />
    </StyledButton>
  );
};

const Login = () => {
  const [login, setLogin] = useState({
    schoolCode: '',
    username: '',
    password: '',
  });

  const dispatch = useDispatch();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await dispatch(loginUser(login.schoolCode, login.username, login.password));
  };

  const updateSchoolCode = (e) => {
    setLogin({ ...login, schoolCode: e.target.value });
  };
  const updateUsername = (e) => {
    setLogin({ ...login, username: e.target.value });
  };
  const updatePassword = (e) => {
    setLogin({ ...login, password: e.target.value });
  };

  return (
    <Main>
      <h3>
        Benvenuto su <span className="primary">SchoolBoard</span>
      </h3>
      <Content>
        <Form onSubmit={handleLogin}>
          <Input
            type="text"
            name="schoolcode"
            label="Codice Scuola"
            value={login.schoolCode}
            onChange={updateSchoolCode}
          />
          <Input
            type="text"
            name="username"
            label="Username"
            value={login.username}
            onChange={updateUsername}
          />
          <Input
            type="password"
            name="password"
            label="Password"
            value={login.password}
            onChange={updatePassword}
          />
          <SubmitBtn />
        </Form>
        <img className="login__cover" src={bookSvg} alt="girl on a book pile" />
      </Content>
    </Main>
  );
};

export default Login;
