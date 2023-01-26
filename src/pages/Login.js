import React from 'react';
import { Redirect } from 'react-router-dom';

export default class Login extends React.Component {
  state = {
    email: '',
    password: '',
    disable: true,
    isLoggedIn: false,
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => {
      const { email, password } = this.state;
      const number = 7;
      if ((this.validateMail(email) === true && password.length >= number)) {
        this.setState({ disable: false });
      } else {
        this.setState({ disable: true });
      }
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const number = 7;
    const { email, password } = this.state;
    if (this.validateMail(email) && password.length >= number) {
      localStorage.setItem('user', JSON.stringify({ email }));
      this.setState({ isLoggedIn: true });
    }
  };

  validateMail(email) {
    return !!(email.includes('@') && email.includes('.com') === true);
  }

  render() {
    const { disable, isLoggedIn } = this.state;
    if (isLoggedIn) {
      return <Redirect to="/meals" />;
    }
    return (
      <main className="main-login">
        <section className="login-section">
          <h1 className="login-title">Login</h1>
          <form onSubmit={ this.handleSubmit }>
            <label className="login-label" htmlFor="email">
              Email
              <input
                data-testid="email-input"
                onChange={ this.handleChange }
                className="login-input"
                type="text"
                name="email"
                placeholder="Digite seu E-mail"
              />
            </label>
            <label className="login-label" htmlFor="password">
              Senha
              <input
                data-testid="password-input"
                className="login-input"
                onChange={ this.handleChange }
                type="password"
                name="password"
                placeholder="Digite sua senha"
              />
            </label>
            <button
              className="login-button"
              type="submit"
              data-testid="login-submit-btn"
              disabled={ disable }
            >
              Entrar
            </button>
          </form>
        </section>
      </main>
    );
  }
}
